"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BIRTHDAY_CONTENT } from "@/data/birthday-content";
import { useAudio } from "@/context/AudioContext";
import { ShieldAlert, Terminal, Lock, ChevronRight, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onEnter: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  const { startMusic } = useAudio();
  const [isAccessing, setIsAccessing] = useState(false);
  const [accessStep, setAccessStep] = useState(0);

  const steps = [
    "VERIFYING BIOMETRICS...",
    "LOCATING CLASSIFIED ARCHIVES [2020 - 2024]...",
    "DECRYPTING MALLICK DOSSIER...",
    "WARNING: UNFILTERED HOSTEL EVIDENCE DETECTED...",
    "ACCESS GRANTED.",
  ];

  const handleEnterClick = async () => {
    // 1. Start continuous birthday music
    await startMusic();

    // 2. Run cinematic access sequence
    setIsAccessing(true);

    steps.forEach((_, idx) => {
      setTimeout(() => {
        setAccessStep(idx);
        if (idx === steps.length - 1) {
          setTimeout(() => {
            onEnter();
          }, 700);
        }
      }, (idx + 1) * 550);
    });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 overflow-hidden bg-radial from-slate-900 via-slate-950 to-black text-white">
      {/* Cinematic Golden Ambient Spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Grid Lines Overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-xl w-full text-center flex flex-col items-center">
        {/* Top Confidential Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono tracking-widest uppercase mb-8 shadow-inner"
        >
          <Lock size={12} className="text-amber-400" />
          <span>CLASSIFIED RECOVERY DOSSIER</span>
        </motion.div>

        {/* Main Title: WELCOME, MR. MALLICK */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-amber-200 drop-shadow-sm mb-4"
        >
          {BIRTHDAY_CONTENT.welcome.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg sm:text-2xl font-semibold text-amber-400/90 tracking-wide mb-3"
        >
          {BIRTHDAY_CONTENT.welcome.subtitle}
        </motion.p>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-sm sm:text-base text-slate-400 max-w-md mx-auto mb-10 leading-relaxed"
        >
          {BIRTHDAY_CONTENT.welcome.supportingText}
        </motion.p>

        {/* Interactive Access Action or Loading Sequence */}
        <AnimatePresence mode="wait">
          {!isAccessing ? (
            <motion.div
              key="enter-btn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-col items-center gap-3 w-full"
            >
              <button
                onClick={handleEnterClick}
                className="group relative w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm sm:text-base tracking-wider uppercase text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
              >
                <Sparkles size={18} className="animate-pulse" />
                <span>{BIRTHDAY_CONTENT.welcome.buttonText}</span>
                <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>

              <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5 mt-2">
                <ShieldAlert size={12} className="text-amber-500/70" />
                Headphones recommended • Continuous audio will start
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="access-terminal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-md bg-slate-950/90 border border-amber-500/40 rounded-xl p-5 font-mono text-left shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800 text-xs text-amber-400">
                <Terminal size={14} />
                <span>TERMINAL://MALLICK-ARCHIVE</span>
              </div>

              <div className="space-y-1.5 text-xs">
                {steps.slice(0, accessStep + 1).map((text, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 ${
                      i === accessStep ? "text-amber-300 font-bold" : "text-slate-400"
                    }`}
                  >
                    <span className="text-amber-500">›</span>
                    <span>{text}</span>
                    {i === accessStep && <span className="inline-block w-2 h-4 bg-amber-400 animate-pulse ml-1" />}
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                <div
                  className="bg-amber-400 h-full transition-all duration-300"
                  style={{ width: `${((accessStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
