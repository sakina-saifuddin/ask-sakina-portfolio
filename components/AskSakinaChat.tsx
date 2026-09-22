"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Menu, Mic, MoreHorizontal, Pin, Plus, Trash2, X } from "lucide-react";
import { qaItems, profile } from "@/data/portfolio";
import { presetConversations, type PresetMessage } from "@/data/askConversations";
import { playTypewriterTick, attachAudioUnlock } from "@/components/sound";
import { scrollToPanel } from "@/components/panelScroll";

type QaItem = (typeof qaItems)[number];

type Message =
  | { id: number; role: "user"; text: string }
  // Stores just the question text, not a snapshot of the QaItem — the
  // actual answer/facts/links are resolved from the live qaItems array at
  // render time (see resolveItem), so a chat saved to localStorage months
  // ago always shows today's content instead of freezing stale links.
  | { id: number; role: "assistant"; question: string }
  | { id: number; role: "assistant-fallback" };

type Chat = {
  id: string;
  title: string;
  messages: Message[];
  pinned?: boolean;
};

// Minimal surface of the (non-standard, webkit-prefixed) Web Speech API —
// not part of lib.dom, so we type just what we use.
type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  start: () => void;
  stop: () => void;
};

function getSpeechRecognitionCtor(): (new () => SpeechRecognitionLike) | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

const STORAGE_KEY = "ask-sakina-chats";

const STOPWORDS = new Set(["what", "when", "where", "which", "who", "why", "how", "does", "she", "her", "has", "have", "with", "about", "sakina", "tell", "that", "this", "been", "being", "work", "worked", "roles"]);

function findAnswer(input: string): QaItem | null {
  const cleanWords = input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2);

  // A short, valid question can be made entirely of stopwords (e.g. "Tell
  // me about Sakina." is just "tell"/"about"/"sakina", all filtered out),
  // which would otherwise leave zero keywords and wrongly fall back to
  // "that's not in my portfolio yet." Only drop stopwords if doing so
  // still leaves something to match on.
  const stopwordFiltered = cleanWords.filter((w) => !STOPWORDS.has(w));
  const words = stopwordFiltered.length > 0 ? stopwordFiltered : cleanWords;

  if (words.length === 0) return null;

  let best: QaItem | null = null;
  let bestScore = 0;

  for (const item of qaItems) {
    const haystack = item.question.toLowerCase();
    let score = 0;
    for (const w of words) {
      if (haystack.includes(w)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }

  return bestScore > 0 ? best : null;
}

// Looks up the *current* QaItem for a saved question, so edits to answers,
// facts, or links in data/portfolio.ts are reflected even in chats that
// were asked (and persisted to localStorage) before the edit.
function resolveItem(question: string): QaItem | null {
  return qaItems.find((q) => q.question === question) ?? findAnswer(question);
}

function makeTitle(text: string) {
  const trimmed = text.trim();
  return trimmed.length > 42 ? `${trimmed.slice(0, 42)}…` : trimmed;
}

function newChat(): Chat {
  return { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, title: "New chat", messages: [] };
}

// A link that either navigates normally (case studies, /resume, /works) or,
// for an in-page panel link (e.g. "/#chapter-four"), scrolls the horizontal
// track directly when already on the home page — matching Header's nav.
function AskLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();

  function handleClick(event: React.MouseEvent) {
    if (!href.startsWith("/#")) return;
    if (pathname !== "/") return; // let Link navigate to "/#panelId" normally
    event.preventDefault();
    scrollToPanel(href.slice(2));
  }

  return (
    <Link href={href} className="ask-link" onClick={handleClick}>
      {label} <ArrowUpRight size={13} strokeWidth={2} />
    </Link>
  );
}

function HistoryItem({
  chat,
  isActive,
  menuOpen,
  onSelect,
  onTogglePin,
  onToggleMenu,
  onRequestDelete,
}: {
  chat: Chat;
  isActive: boolean;
  menuOpen: boolean;
  onSelect: () => void;
  onTogglePin: () => void;
  onToggleMenu: () => void;
  onRequestDelete: () => void;
}) {
  const moreBtnRef = useRef<HTMLButtonElement>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);

  // Position the popup itself (fixed to the viewport, anchored off the real
  // button position) instead of letting it sit inside the scrollable/clipped
  // history list — that's what was causing it to overlap neighboring chats.
  useLayoutEffect(() => {
    if (!menuOpen) {
      setMenuPos(null);
      return;
    }
    const rect = moreBtnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const MENU_WIDTH = 160;
    const fitsOnRight = window.innerWidth - rect.right >= MENU_WIDTH + 12;
    const left = fitsOnRight ? rect.right + 8 : Math.max(8, rect.left - MENU_WIDTH - 8);
    setMenuPos({ top: rect.top, left });
  }, [menuOpen]);

  return (
    <div className={`ask-history-row${menuOpen ? " menu-open" : ""}`}>
      <button
        type="button"
        className={`ask-history-item${isActive ? " is-active" : ""}`}
        onClick={onSelect}
        title={chat.title}
      >
        {chat.title}
      </button>

      <div className="ask-history-actions">
        <button
          type="button"
          className={`ask-history-pin${chat.pinned ? " is-pinned" : ""}`}
          aria-label={chat.pinned ? "Unpin chat" : "Pin chat"}
          aria-pressed={Boolean(chat.pinned)}
          onClick={(event) => {
            event.stopPropagation();
            onTogglePin();
          }}
        >
          <Pin size={15} strokeWidth={2} fill={chat.pinned ? "currentColor" : "none"} />
        </button>

        <button
          ref={moreBtnRef}
          type="button"
          className="ask-history-more"
          aria-label="Chat options"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={(event) => {
            event.stopPropagation();
            onToggleMenu();
          }}
        >
          <MoreHorizontal size={16} strokeWidth={2} />
        </button>
      </div>

      {menuOpen &&
        menuPos &&
        createPortal(
          <>
            <button
              type="button"
              className="ask-history-menu-backdrop"
              aria-hidden="true"
              tabIndex={-1}
              onClick={(event) => {
                event.stopPropagation();
                onToggleMenu();
              }}
            />
            <motion.div
              className="ask-history-menu"
              style={{ top: menuPos.top, left: menuPos.left }}
              role="menu"
              initial={{ opacity: 0, scale: 0.9, x: -6 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                role="menuitem"
                className="ask-history-menu-delete"
                onClick={(event) => {
                  event.stopPropagation();
                  onRequestDelete();
                }}
              >
                <Trash2 size={13} strokeWidth={2} /> Delete chat
              </button>
            </motion.div>
          </>,
          document.body
        )}
    </div>
  );
}

function AssistantBubble({ item, active }: { item: QaItem; active: boolean }) {
  const [count, setCount] = useState(active ? 0 : item.answer.length);

  useEffect(() => {
    if (!active) return;
    let i = 0;
    const timer = setInterval(() => {
      i += 2;
      setCount(Math.min(i, item.answer.length));
      if (i % 6 === 0) playTypewriterTick();
      if (i >= item.answer.length) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const done = count >= item.answer.length;

  return (
    <div className="ask-msg ask-msg-assistant">
      <p>
        {item.answer.slice(0, count)}
        {!done && <span className="ask-cursor" />}
      </p>
      {done && (
        <>
          <div className="ask-facts">
            {item.facts.map((fact) => (
              <span key={fact} className="ask-fact">{fact}</span>
            ))}
          </div>
          {item.links.length > 0 && (
            <div className="ask-links">
              {item.links.map((link) => (
                <AskLink key={link.href} href={link.href} label={link.label} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function PresetBubble({ msg }: { msg: Extract<PresetMessage, { role: "assistant" }> }) {
  return (
    <div className="ask-msg ask-msg-assistant">
      <p>{msg.text}</p>
      {msg.facts && msg.facts.length > 0 && (
        <div className="ask-facts">
          {msg.facts.map((fact) => (
            <span key={fact} className="ask-fact">{fact}</span>
          ))}
        </div>
      )}
      {msg.links && msg.links.length > 0 && (
        <div className="ask-links">
          {msg.links.map((link) => (
            <AskLink key={link.href} href={link.href} label={link.label} />
          ))}
        </div>
      )}
    </div>
  );
}

export function AskSakinaChat({ embedded = false }: { embedded?: boolean } = {}) {
  const [dynamicChats, setDynamicChats] = useState<Chat[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const idRef = useRef(0);
  const lastAddedIdRef = useRef(-1);
  const mainRef = useRef<HTMLElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const voiceBarRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    attachAudioUnlock();
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: Chat[] = JSON.parse(saved);
        // Migrate chats saved before assistant messages stored just the
        // question text: old entries have a full `item` snapshot instead
        // of `question`, which would otherwise crash resolveItem/findAnswer
        // on undefined input.
        const migrated = parsed.map((chat) => ({
          ...chat,
          messages: chat.messages.map((m) => {
            if (m.role === "assistant" && !("question" in m) && "item" in m) {
              const legacy = m as unknown as { id: number; role: "assistant"; item: QaItem };
              return { id: legacy.id, role: "assistant" as const, question: legacy.item.question };
            }
            return m;
          }),
        }));
        setDynamicChats(migrated);
        idRef.current = migrated.reduce((max, c) => Math.max(max, ...c.messages.map((m) => m.id), max), 0) + 1;
      }
    } catch {}
    setLoaded(true);
    setVoiceSupported(Boolean(getSpeechRecognitionCtor()));
  }, []);

  function stopVisualizer() {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    micStreamRef.current?.getTracks().forEach((track) => track.stop());
    micStreamRef.current = null;
    audioCtxRef.current?.close().catch(() => {});
    audioCtxRef.current = null;
    voiceBarRefs.current.forEach((bar) => bar && (bar.style.transform = "scaleY(.2)"));
  }

  function startVisualizer() {
    // Runs alongside SpeechRecognition's own mic capture, purely to drive
    // the bar animation — never awaited before recognition.start(), so it
    // can't delay/interfere with actual listening.
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        micStreamRef.current = stream;
        const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Ctor) return;
        const ctx = new Ctor();
        audioCtxRef.current = ctx;
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        analyser.smoothingTimeConstant = 0.6;
        source.connect(analyser);
        const data = new Uint8Array(analyser.frequencyBinCount);

        function tick() {
          analyser.getByteFrequencyData(data);
          const bars = voiceBarRefs.current;
          for (let i = 0; i < bars.length; i++) {
            const binIndex = Math.floor(((i + 1) / bars.length) * data.length * 0.7);
            const level = Math.max(0.15, data[binIndex] / 255);
            const bar = bars[i];
            if (bar) bar.style.transform = `scaleY(${level})`;
          }
          rafRef.current = requestAnimationFrame(tick);
        }
        tick();
      })
      .catch(() => {});
  }

  function toggleVoiceInput() {
    if (listening) {
      recognitionRef.current?.stop();
      stopVisualizer();
      return;
    }

    const SpeechRecognitionCtor = getSpeechRecognitionCtor();
    if (!SpeechRecognitionCtor) {
      setVoiceError("Voice input isn't supported in this browser.");
      return;
    }

    setVoiceError(null);
    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      const transcript = result?.[0]?.transcript ?? "";
      setInput(transcript);
    };
    recognition.onend = () => {
      setListening(false);
      stopVisualizer();
    };
    recognition.onerror = (event) => {
      setListening(false);
      stopVisualizer();
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        setVoiceError("Microphone access was blocked. Allow it in your browser's site settings to use voice input.");
      } else if (event.error === "no-speech") {
        setVoiceError("Didn't catch that — click the mic and start speaking right away.");
      } else {
        setVoiceError("Voice input failed. Please try typing instead.");
      }
    };

    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
    startVisualizer();
  }

  useEffect(() => () => stopVisualizer(), []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dynamicChats));
    } catch {}
  }, [dynamicChats, loaded]);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: mainRef.current.scrollHeight, behavior: "smooth" });
  }, [dynamicChats, activeId]);

  const activePreset = activeId.startsWith("preset-")
    ? presetConversations.find((c) => `preset-${c.id}` === activeId)
    : undefined;
  const activeDynamic = !activePreset ? dynamicChats.find((c) => c.id === activeId) : undefined;

  const activeTitle = activePreset?.title ?? activeDynamic?.title ?? "AskSakina";
  const hasMessages = Boolean(activePreset) || (activeDynamic ? activeDynamic.messages.length > 0 : false);

  function ask(question: string, knownItem?: QaItem) {
    const trimmed = question.trim();
    if (!trimmed) return;

    // Free-text always starts (or continues) a dynamic chat, never a preset.
    let targetId = activeId;
    if (activePreset || !activeDynamic) {
      const chat = newChat();
      targetId = chat.id;
      setDynamicChats((prev) => [chat, ...prev]);
      setActiveId(chat.id);
    }

    // Clicking a suggested-question pill already tells us exactly which
    // QaItem it is — use it directly instead of re-deriving it through the
    // fuzzy matcher below, whose stopword list can strip a short, valid
    // question (e.g. "Tell me about Sakina.") down to zero keywords and
    // wrongly fall back to "that's not in my portfolio yet." Only actual
    // free-typed text needs the fuzzy match, since there's no known item
    // to fall back on there.
    const match = knownItem ?? findAnswer(trimmed);
    const userId = idRef.current++;
    const replyId = idRef.current++;
    lastAddedIdRef.current = replyId;

    setDynamicChats((prev) =>
      prev.map((c) => {
        if (c.id !== targetId) return c;
        const isFirst = c.messages.length === 0;
        return {
          ...c,
          title: isFirst ? makeTitle(trimmed) : c.title,
          messages: [
            ...c.messages,
            { id: userId, role: "user", text: trimmed },
            match ? { id: replyId, role: "assistant", question: match.question } : { id: replyId, role: "assistant-fallback" },
          ],
        };
      })
    );
    setInput("");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    ask(input);
  }

  function handleNewChat() {
    const chat = newChat();
    setDynamicChats((prev) => [chat, ...prev]);
    setActiveId(chat.id);
    setSidebarOpen(false);
  }

  function handleSelect(id: string) {
    setActiveId(id);
    setSidebarOpen(false);
  }

  function togglePin(id: string) {
    setDynamicChats((prev) => prev.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c)));
  }

  function toggleMenu(id: string) {
    setMenuOpenId((current) => (current === id ? null : id));
  }

  function requestDelete(id: string) {
    setMenuOpenId(null);
    setDeleteConfirmId(id);
  }

  function cancelDelete() {
    setDeleteConfirmId(null);
  }

  function confirmDelete() {
    if (!deleteConfirmId) return;
    setDynamicChats((prev) => prev.filter((c) => c.id !== deleteConfirmId));
    if (activeId === deleteConfirmId) setActiveId("");
    setDeleteConfirmId(null);
  }

  const pinnedChats = dynamicChats.filter((c) => c.pinned);
  const recentChats = dynamicChats.filter((c) => !c.pinned);
  const chatPendingDelete = dynamicChats.find((c) => c.id === deleteConfirmId);

  const nameParts = profile.name.split(" ");
  const initials = `${nameParts[0]?.[0] ?? "S"}${nameParts[1]?.[0] ?? "S"}`;

  return (
    <div className={`ask-app${embedded ? " ask-embedded" : ""}`}>
      {sidebarOpen && <button type="button" className="ask-sidebar-backdrop" aria-label="Close sidebar" onClick={() => setSidebarOpen(false)} />}

      <aside className={`ask-sidebar${sidebarOpen ? " is-open" : ""}`}>
        <div className="ask-sidebar-top">
          <span className="ask-avatar">{initials}</span>
          <span className="ask-sidebar-name">{profile.name}</span>
          <button type="button" className="ask-sidebar-close" aria-label="Close sidebar" onClick={() => setSidebarOpen(false)}>
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        <button type="button" className="ask-new-chat" onClick={handleNewChat}>
          <Plus size={16} strokeWidth={2} /> New chat
        </button>

        <div className="ask-history">
          <span className="ask-history-label">Suggested for recruiters</span>
          {presetConversations.map((chat) => {
            const id = `preset-${chat.id}`;
            return (
              <button
                key={id}
                type="button"
                className={`ask-history-item${id === activeId ? " is-active" : ""}`}
                onClick={() => handleSelect(id)}
                title={chat.title}
              >
                {chat.title}
              </button>
            );
          })}

          {pinnedChats.length > 0 && (
            <>
              <span className="ask-history-label">Pinned</span>
              {pinnedChats.map((chat) => (
                <HistoryItem
                  key={chat.id}
                  chat={chat}
                  isActive={chat.id === activeId}
                  menuOpen={chat.id === menuOpenId}
                  onSelect={() => handleSelect(chat.id)}
                  onTogglePin={() => togglePin(chat.id)}
                  onToggleMenu={() => toggleMenu(chat.id)}
                  onRequestDelete={() => requestDelete(chat.id)}
                />
              ))}
            </>
          )}

          {recentChats.length > 0 && (
            <>
              <span className="ask-history-label">Recent</span>
              {recentChats.map((chat) => (
                <HistoryItem
                  key={chat.id}
                  chat={chat}
                  isActive={chat.id === activeId}
                  menuOpen={chat.id === menuOpenId}
                  onSelect={() => handleSelect(chat.id)}
                  onTogglePin={() => togglePin(chat.id)}
                  onToggleMenu={() => toggleMenu(chat.id)}
                  onRequestDelete={() => requestDelete(chat.id)}
                />
              ))}
            </>
          )}
        </div>

        {!embedded && (
          <Link href="/" className="ask-sidebar-back">
            <ArrowLeft size={14} strokeWidth={2} /> Back to portfolio
          </Link>
        )}
      </aside>

      <div className="ask-main-col">
        <header className="ask-topbar">
          <button type="button" className="ask-sidebar-toggle" aria-label="Open sidebar" onClick={() => setSidebarOpen(true)}>
            <Menu size={18} strokeWidth={2} />
          </button>
          <span className="ask-topbar-title">{activeTitle}</span>
        </header>

        <main className="ask-main" ref={mainRef}>
          {!hasMessages && (
            <div className="ask-hero">
              <span className="ask-kicker">Conversational Portfolio</span>
              <h1>Ask anything about my work</h1>
              <p>A conversational version of Sakina Saifuddin&rsquo;s AI, data &amp; software portfolio.</p>
            </div>
          )}

          {activePreset && (
            <div className="ask-thread">
              {activePreset.messages.map((msg, i) =>
                msg.role === "user" ? (
                  <div key={i} className="ask-msg ask-msg-user">
                    <p>{msg.text}</p>
                  </div>
                ) : (
                  <PresetBubble key={i} msg={msg} />
                )
              )}
            </div>
          )}

          {activeDynamic && activeDynamic.messages.length > 0 && (
            <div className="ask-thread">
              {activeDynamic.messages.map((msg) => {
                if (msg.role === "user") {
                  return (
                    <div key={msg.id} className="ask-msg ask-msg-user">
                      <p>{msg.text}</p>
                    </div>
                  );
                }
                if (msg.role === "assistant-fallback") {
                  return (
                    <div key={msg.id} className="ask-msg ask-msg-assistant">
                      <p>
                        That&rsquo;s not in my portfolio yet — try one of the questions below, or{" "}
                        <a href={`mailto:${profile.email}`}>email Sakina directly</a>.
                      </p>
                    </div>
                  );
                }
                const liveItem = resolveItem(msg.question);
                if (!liveItem) {
                  return (
                    <div key={msg.id} className="ask-msg ask-msg-assistant">
                      <p>
                        That&rsquo;s not in my portfolio yet — try one of the questions below, or{" "}
                        <a href={`mailto:${profile.email}`}>email Sakina directly</a>.
                      </p>
                    </div>
                  );
                }
                return <AssistantBubble key={msg.id} item={liveItem} active={msg.id === lastAddedIdRef.current} />;
              })}
            </div>
          )}

          {!hasMessages && (
            <div className="ask-suggestions">
              <span className="ask-suggestions-label">Popular questions</span>
              <div className="ask-pill-grid">
                {qaItems.map((item) => (
                  <button key={item.question} type="button" className="ask-pill" onClick={() => ask(item.question, item)}>
                    {item.question}
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>

        {voiceError && <p className="ask-voice-error">{voiceError}</p>}

        <form className="ask-input-bar" onSubmit={handleSubmit}>
          {listening ? (
            <div className="ask-voice-bars-full" role="status" aria-label="Recording your voice">
              {Array.from({ length: 28 }, (_, i) => i).map((i) => (
                <span
                  key={i}
                  className="ask-voice-bar"
                  ref={(el) => {
                    voiceBarRefs.current[i] = el;
                  }}
                />
              ))}
            </div>
          ) : (
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask anything about Sakina's work..."
              aria-label="Ask a question"
            />
          )}
          {voiceSupported && (
            <button
              type="button"
              className={`ask-mic-btn${listening ? " is-listening" : ""}`}
              aria-label={listening ? "Stop voice input" : "Ask with your voice"}
              onClick={toggleVoiceInput}
            >
              <Mic size={16} strokeWidth={2} />
            </button>
          )}
          <button type="submit" aria-label="Send" disabled={!input.trim()}>
            <ArrowUpRight size={17} strokeWidth={2} />
          </button>
        </form>

        <div className="ask-footer">
          <p className="ask-footer-text">
            AskSakina is an AI assistant grounded in Sakina&rsquo;s public portfolio. Answers may be incomplete.
          </p>
          <div className="ask-footer-links">
            <a href="/resume.pdf" download>CV</a>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>

      {chatPendingDelete && (
        <div className="ask-modal-backdrop" onClick={cancelDelete}>
          <div className="ask-modal" role="alertdialog" aria-modal="true" aria-labelledby="ask-modal-title" onClick={(event) => event.stopPropagation()}>
            <h3 id="ask-modal-title">Delete this chat?</h3>
            <p>
              Do you really want to delete &ldquo;{chatPendingDelete.title}&rdquo;? This removes it from your chat history and can&rsquo;t be undone.
            </p>
            <div className="ask-modal-actions">
              <button type="button" className="ask-modal-cancel" onClick={cancelDelete}>Cancel</button>
              <button type="button" className="ask-modal-delete" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
