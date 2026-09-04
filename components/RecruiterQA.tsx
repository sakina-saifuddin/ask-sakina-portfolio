"use client";

import Link from "next/link";
import { useState } from "react";
import { Bot, BriefcaseBusiness, ChartNoAxesCombined, GraduationCap, RotateCcw, Send, Sparkles } from "lucide-react";
import { qaItems } from "@/data/portfolio";

type ChatMessage = { type: "user" | "assistant"; index: number };

const factIcons = [ChartNoAxesCombined, BriefcaseBusiness, Sparkles];

export function RecruiterQA() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const ask = (index: number) => {
    setMessages((current) => [...current, { type: "user", index }, { type: "assistant", index }]);
    requestAnimationFrame(() => document.getElementById("chat-end")?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
  };

  return (
    <section className="resume-chat-section" id="ask-resume">
      <div className="section-heading reveal">
        <span className="section-kicker">01 / QUICK ANSWERS</span>
        <h2>Ask My Resume</h2>
        <p>Choose a recruiter question and the answer will appear here. No API, no billing, and no generated answers.</p>
      </div>

      <div className="resume-chat-shell reveal">
        <aside className="chat-questions">
          <div className="chat-side-title"><span>Recommended questions</span><GraduationCap size={18}/></div>
          {qaItems.map((item, index) => (
            <button key={item.question} onClick={() => ask(index)}>{item.question}</button>
          ))}
        </aside>

        <div className="chat-window">
          <header className="chat-header">
            <div className="bot-avatar"><Bot size={21}/></div>
            <div><strong>Sakina’s Resume</strong><span><i/> Ready</span></div>
            <button aria-label="Clear conversation" onClick={() => setMessages([])}><RotateCcw size={17}/></button>
          </header>

          <div className="chat-body">
            <div className="assistant-row">
              <div className="bot-avatar small"><Bot size={17}/></div>
              <div className="assistant-bubble">
                <b>Hi — what would you like to know?</b>
                <p>Use one of the questions on the left. I’ll show the answer from Sakina’s resume and portfolio.</p>
              </div>
            </div>

            {messages.map((message, messageIndex) => {
              const item = qaItems[message.index];
              if (message.type === "user") {
                return <div className="user-row" key={`${messageIndex}-u`}><div className="user-bubble">{item.question}</div></div>;
              }
              return (
                <div className="assistant-row" key={`${messageIndex}-a`}>
                  <div className="bot-avatar small"><Bot size={17}/></div>
                  <div className="assistant-bubble answer-bubble">
                    <p>{item.answer}</p>
                    <div className="chat-facts">
                      {item.facts.map((fact, i) => {
                        const Icon = factIcons[i % factIcons.length];
                        return <span key={fact}><Icon size={16}/><b>{fact}</b></span>;
                      })}
                    </div>
                    <div className="chat-links">{item.links.map((link) => <Link key={link.href + link.label} href={link.href}>{link.label} →</Link>)}</div>
                  </div>
                </div>
              );
            })}
            <div id="chat-end" />
          </div>

          <div className="chat-input"><span>Choose a recommended question to continue</span><button aria-label="Recommended questions only"><Send size={18}/></button></div>
        </div>
      </div>
    </section>
  );
}
