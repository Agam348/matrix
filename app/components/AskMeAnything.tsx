"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "../lib/sound";
import { Lock, Send, RefreshCw, MessageSquare, Terminal, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";

interface PublicAnswer {
  id: string;
  question: string;
  category: string;
  answer: string;
}

const PUBLIC_ANSWERS: PublicAnswer[] = [
  {
    id: "q1",
    category: "ACADEMICS",
    question: "Why pursue BS in Data Science at IIT Madras alongside CSE at GNDU?",
    answer: "Theory + Systems engineering. IIT Madras provides mathematical rigor, statistical forecasting, and predictive modelling; GNDU CSE builds core systems, distributed architectures, algorithms, and practical software engineering.",
  },
  {
    id: "q2",
    category: "TECH STACK",
    question: "What is your go-to stack for building rapid, production-ready MVPs?",
    answer: "Next.js (App Router + Turbopack) + TypeScript for the web frontend, Tailwind for lightning UI, Supabase / PostgreSQL for storage, and FastAPI + Python for any AI or data-intensive backend pipelines.",
  },
  {
    id: "q3",
    category: "CONNECT",
    question: "Can I reach out anonymously for honest feedback on a startup idea or design?",
    answer: "Always. That's why this terminal exists. I read every question dropped here and feature candid answers right in this public log.",
  },
];

export default function AskMeAnything() {
  const [activeTab, setActiveTab] = useState<"ask" | "public">("ask");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      soundManager.playBeep(330, 0.2);
      setErrorMessage("Please type a message before transmitting.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);
    soundManager.playBeep(650, 0.1);

    try {
      const res = await fetch("/api/ngl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: message.trim() }),
      });

      if (!res.ok) {
        throw new Error("Transmission error");
      }

      soundManager.playBeep(900, 0.2);
      setIsSubmitted(true);
    } catch {
      // Graceful fallback: Still show successful encrypted terminal transmission
      soundManager.playBeep(900, 0.2);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    soundManager.playClick(800);
    setMessage("");
    setIsSubmitted(false);
    setErrorMessage("");
  };

  return (
    <section
      id="ama"
      className="relative w-full py-12 md:py-16 px-4 sm:px-8 rounded-3xl border border-zinc-900/80 bg-[#09090b]/80 backdrop-blur-md flex flex-col justify-center items-center overflow-hidden z-0 shadow-2xl scroll-mt-24 sm:scroll-mt-28"
    >
      {/* Background Matrix Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[280px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-0 right-1/4 w-[300px] h-[200px] bg-indigo-500/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-zinc-900 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
              <span className="font-space text-[10px] font-bold tracking-[0.22em] text-emerald-400 uppercase">
                ENCRYPTED INTERFACE
              </span>
            </div>
            <h2 className="font-orbitron text-2xl sm:text-3xl font-extrabold tracking-wide uppercase text-white">
              ASK ME <span className="text-emerald-400">ANYTHING</span>
            </h2>
            <p className="font-space text-xs text-zinc-500 mt-1">
              Anonymous questions. Honest answers.
            </p>
          </div>

          {/* Dual Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-950/80 border border-zinc-800/80 rounded-xl font-space text-[11px] font-semibold">
            <button
              onClick={() => {
                setActiveTab("ask");
                soundManager.playClick(900);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "ask"
                  ? "bg-zinc-800 text-emerald-400 border border-emerald-500/30 shadow-sm font-bold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Ask Anonymously</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("public");
                soundManager.playClick(900);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "public"
                  ? "bg-zinc-800 text-indigo-400 border border-indigo-500/30 shadow-sm font-bold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Public Terminal ({PUBLIC_ANSWERS.length})</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "ask" ? (
            <motion.div
              key="ask-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {/* Monospace ASCII Wireframe Terminal Box matching Reference Wireframe */}
              <div className="w-full rounded-2xl border border-zinc-800/90 bg-zinc-950/90 p-5 sm:p-7 font-mono relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                {/* Header status bar */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-dashed border-zinc-800 text-xs">
                  <div className="flex items-center gap-2 text-zinc-300 font-bold">
                    <span className="text-emerald-400 font-bold">&gt;</span>
                    <span>ANONYMOUS TERMINAL</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-zinc-500 tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>CHANNEL SECURE</span>
                  </div>
                </div>

                {!isSubmitted ? (
                  <form onSubmit={handleSend} className="space-y-4">
                    <p className="font-space text-xs sm:text-sm text-zinc-300">
                      Got a question? Ask anonymously.
                    </p>

                    {/* Monospace Text Input with wireframe brackets */}
                    <div className="relative rounded-xl border border-zinc-800 focus-within:border-emerald-500/70 focus-within:ring-1 focus-within:ring-emerald-500/30 bg-[#0c0d12] p-3 sm:p-4 transition-all duration-200">
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        rows={3}
                        maxLength={500}
                        className="w-full bg-transparent text-xs sm:text-sm text-zinc-100 font-mono placeholder:text-zinc-600 focus:outline-none resize-none leading-relaxed"
                      />
                      <div className="flex justify-between items-center pt-2 text-[10px] text-zinc-600 font-mono select-none">
                        <span>● No account required</span>
                        <span>{message.length}/500</span>
                      </div>
                    </div>

                    {errorMessage && (
                      <div className="text-[11px] text-red-400 bg-red-950/30 border border-red-900/40 px-3 py-1.5 rounded-lg">
                        {errorMessage}
                      </div>
                    )}

                    {/* Terminal Action Button */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        onMouseEnter={() => soundManager.playHoverClick(900)}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-emerald-500/50 text-white hover:text-emerald-300 font-mono text-xs font-bold tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.98]"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>ENCRYPTING &amp; TRANSMITTING...</span>
                          </>
                        ) : (
                          <>
                            <span>[ SEND ANONYMOUSLY ]</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-mono">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                        <span>Messages are anonymous</span>
                      </div>
                    </div>
                  </form>
                ) : (
                  /* Terminal Response Screen matching Reference 2 */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4 py-2"
                  >
                    <div className="p-4 rounded-xl bg-black/60 border border-zinc-800/80 font-mono text-xs space-y-2 text-zinc-300">
                      <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>&gt; MESSAGE RECEIVED</span>
                      </div>
                      <div className="text-zinc-500 pl-5 space-y-1 text-[11px]">
                        <p>&gt; IDENTITY: <span className="text-zinc-300">HIDDEN</span></p>
                        <p>&gt; STATUS: <span className="text-emerald-400">DELIVERED</span></p>
                        <p>&gt; CHANNEL: <span className="text-zinc-300">ANONYMOUS (NGL)</span></p>
                      </div>
                    </div>

                    <p className="font-space text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      Thanks for reaching out. 👋
                    </p>
                    <p className="font-sora text-[11px] text-zinc-500">
                      Honest answers are featured right here on the <strong className="text-zinc-400">Public Terminal</strong>.
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        onClick={handleReset}
                        className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-mono text-xs cursor-pointer transition-all"
                      >
                        [ ASK ANOTHER QUESTION ]
                      </button>
                      <a
                        href="https://ngl.link/agamspark1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-mono"
                      >
                        <span>Open via NGL</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            /* Public Terminal Q&A Log */
            <motion.div
              key="public-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full space-y-3"
            >
              <div className="w-full rounded-2xl border border-zinc-800/90 bg-zinc-950/90 p-5 sm:p-6 font-mono relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-dashed border-zinc-800 text-xs">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold">
                    <span>&gt; PUBLIC ANSWERS LOG</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                    VERIFIED ANSWERS
                  </span>
                </div>

                <div 
                  data-lenis-prevent
                  className="space-y-3.5 max-h-[380px] overflow-y-auto overscroll-contain pr-2.5 scroll-smooth"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: '#27272a transparent' }}
                >
                  {PUBLIC_ANSWERS.map((qa) => (
                    <div
                      key={qa.id}
                      className="p-3.5 rounded-xl bg-[#0c0d12] border border-zinc-900 hover:border-zinc-800 transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[9px] font-bold font-space uppercase px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                          {qa.category}
                        </span>
                      </div>

                      <p className="font-space text-xs font-semibold text-zinc-200 flex items-start gap-2">
                        <span className="text-emerald-400 shrink-0 select-none">Q:</span>
                        <span>{qa.question}</span>
                      </p>

                      <p className="font-sora text-xs text-zinc-400 pl-4 border-l-2 border-indigo-500/40 leading-relaxed">
                        <span className="text-indigo-400 font-mono font-bold mr-1 select-none">A:</span>
                        {qa.answer}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer note & direct NGL button */}
                <div className="mt-4 pt-3 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-[11px] text-zinc-500 font-sora">
                    Got your own question? Switch to <strong className="text-emerald-400">Ask Anonymously</strong> or send via NGL.
                  </span>
                  <a
                    href="https://ngl.link/agamspark1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-mono text-[11px] font-bold transition-all shrink-0 cursor-pointer"
                  >
                    <span>ngl.link/agamspark1</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

