"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { qaItems } from "@/data/portfolio";

const commands = [
  "whoami",
  "ls --built",
  "cat models.json",
  "grep -i llm resume.md",
  "sakina --analytics",
  "sakina --healthcare",
  "sakina --automation",
  "sakina --top-results",
  "sakina --location",
  "sakina --target-roles",
  "sakina --why-hire",
  "sakina --stack",
];

function TerminalEntry({
  item,
  command,
  animate,
}: {
  item: (typeof qaItems)[number];
  command: string;
  animate: boolean;
}) {
  const [cmdCount, setCmdCount] = useState(animate ? 0 : command.length);
  const [showOutput, setShowOutput] = useState(!animate);
  const [outCount, setOutCount] = useState(animate ? 0 : item.answer.length);

  useEffect(() => {
    if (!animate) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setCmdCount(i);
      if (i >= command.length) {
        clearInterval(timer);
        setTimeout(() => setShowOutput(true), 250);
      }
    }, 32);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!animate || !showOutput) return;
    let i = 0;
    const timer = setInterval(() => {
      i += 2;
      setOutCount(Math.min(i, item.answer.length));
      if (i >= item.answer.length) clearInterval(timer);
    }, 14);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showOutput]);

  const cmdDone = cmdCount >= command.length;
  const outDone = outCount >= item.answer.length;

  return (
    <div className="terminal-entry">
      <div className="terminal-line">
        <span className="terminal-prompt">sakina@resume ~ %</span>{" "}
        <span className="terminal-command">{command.slice(0, cmdCount)}</span>
        {!cmdDone && <span className="terminal-cursor" />}
      </div>

      {showOutput && (
        <div className="terminal-output">
          <p>
            {item.answer.slice(0, outCount)}
            {!outDone && <span className="terminal-cursor" />}
          </p>

          {outDone && (
            <>
              <div className="terminal-facts">
                {item.facts.map((fact) => (
                  <div key={fact} className="terminal-fact">
                    <span className="terminal-arrow">→</span> {fact}
                  </div>
                ))}
              </div>
              {item.links.length > 0 && (
                <div className="terminal-links">
                  {item.links.map((link) => (
                    <Link key={link.href} href={link.href} className="terminal-link">
                      open {link.label.toLowerCase()} →
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function AskResumeTerminal() {
  const [history, setHistory] = useState<number[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);

  function ask(index: number) {
    setHistory((h) => (h.includes(index) ? h : [...h, index]));
  }

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [history]);

  return (
    <div className="terminal-window">
      <div className="terminal-topbar">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-yellow" />
        <span className="terminal-dot terminal-dot-green" />
        <span className="terminal-title">sakina@resume — bash</span>
      </div>

      <div className="terminal-body" ref={bodyRef}>
        <div className="terminal-boot">
          <p>Welcome to Sakina&rsquo;s resume shell.</p>
          <p>Click a command below to run it. No API, no generated answers — every line here comes straight from her resume.</p>
        </div>

        {history.map((qIndex, i) => (
          <TerminalEntry
            key={qIndex}
            item={qaItems[qIndex]}
            command={commands[qIndex] || "help"}
            animate={i === history.length - 1}
          />
        ))}

        <div className="terminal-line terminal-idle">
          <span className="terminal-prompt">sakina@resume ~ %</span>{" "}
          <span className="terminal-cursor" />
        </div>
      </div>

      <div className="terminal-commands">
        {qaItems.map((item, index) => (
          <button
            key={item.question}
            type="button"
            className="terminal-command-btn"
            disabled={history.includes(index)}
            onClick={() => ask(index)}
            title={item.question}
          >
            $ {commands[index] || "help"}
          </button>
        ))}
      </div>
    </div>
  );
}
