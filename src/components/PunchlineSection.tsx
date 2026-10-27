"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BIRTHDAY_CONTENT } from "@/data/birthday-content";
import { AlertTriangle, Laugh, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

interface PunchlineSectionProps {
  onComplete: () => void;
}

export const PunchlineSection: React.FC<PunchlineSectionProps> = ({ onComplete }) => {
  const twist = BIRTHDAY_CONTENT.emptyGiftTwist;
  const [stage, setStage] = useState(1);

  useEffect(() => {
    // Stage 1: "AREY YAAR! 😂"
    // Stage 2: "GIFT BOX TOH KHALI NIKLA!"
    const t1 = setTimeout(() => {
      setStage(2);
    }, 1200);

    // Stage 3: "MANAS BHAI, GIFT ABHI RAASTE MEIN HAI KYA? 💀"
    const t2 = setTimeout(() => {
      setStage(3);
      // Small celebratory comedy burst
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#f59e0b", "#ec4899", "#3b82f6"],
      });
    }, 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="min-h-[85vh] w-full flex flex-col items-center justify-center px-4 py-8 bg-slate-950 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full flex flex-col items-center text-center z-10"
      >
        {/* Comedic Error Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-950/80 border border-red-500 text-red-400 text-xs font-mono uppercase tracking-widest mb-3 animate-bounce">
          <AlertTriangle size={14} />
          <span>SCREEN 6 • THE EMPTY GIFT TWIST</span>
        </div>

        {/* Stage 1: AREY YAAR! 😂 */}
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-2">
          {twist.stage1}
        </h1>

        {/* Stage 2: GIFT BOX TOH KHALI NIKLA! */}
        <AnimatePresence>
          {stage >= 2 && (
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl font-extrabold text-amber-400 mb-4"
            >
              {twist.stage2}
            </motion.h2>
          )}
        </AnimatePresence>

        {/* Stage 3: THE FINAL PUNCHLINE */}
        <AnimatePresence>
          {stage >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center"
            >
              <div className="w-full bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 p-1 rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.4)] my-3">
                <div className="bg-slate-950 rounded-[22px] px-5 py-6 sm:py-8 flex flex-col items-center">
                  <Laugh size={44} className="text-amber-400 mb-2 animate-bounce" />
                  <h3 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-rose-300 leading-tight">
                    &ldquo;{twist.punchline}&rdquo;
                  </h3>
                  <div className="h-0.5 w-24 bg-amber-500/40 my-3" />
                  <p className="text-sm sm:text-base text-slate-300 font-bold max-w-lg leading-relaxed">
                    {twist.supportingText}
                  </p>
                </div>
              </div>

              {/* Proceed to Final Birthday Wish */}
              <button
                onClick={onComplete}
                className="mt-4 px-10 py-4 rounded-xl font-black text-sm sm:text-base tracking-widest uppercase text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{twist.nextButtonText}</span>
                <ArrowRight size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
