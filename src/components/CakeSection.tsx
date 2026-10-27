"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BIRTHDAY_CONTENT } from "@/data/birthday-content";
import confetti from "canvas-confetti";
import { Cake, Sparkles, Flame, ArrowRight, Heart } from "lucide-react";

interface CakeSectionProps {
  onComplete: () => void;
}

export const CakeSection: React.FC<CakeSectionProps> = ({ onComplete }) => {
  const content = BIRTHDAY_CONTENT.cake;
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [celebrated, setCelebrated] = useState(false);

  const handleCelebrate = () => {
    if (celebrated) return;
    setCandlesBlown(true);
    setCelebrated(true);

    // Multi-angle celebratory confetti burst (song continues at full volume)
    const end = Date.now() + 2.5 * 1000;
    const colors = ["#ec4899", "#f59e0b", "#3b82f6", "#10b981", "#fbbf24", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <div className="min-h-[85vh] w-full flex flex-col items-center justify-center px-4 py-8 bg-slate-950 text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full flex flex-col items-center z-10 text-center">
        {/* Playful Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/70 border border-pink-500/40 text-pink-300 text-xs font-mono uppercase tracking-wider mb-2">
          <Cake size={13} />
          <span>TERA SPECIAL CAKE • MOOH MEETHA KAR BHAI 😂</span>
        </div>

        {/* The Exact Post-Scratch Headline */}
        <h2 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-amber-300 tracking-tight mb-2 leading-tight">
          {content.heading}
        </h2>

        <p className="text-sm sm:text-base text-slate-300 mb-5 font-medium">
          {content.supportingText}
        </p>

        {/* Custom Celebratory Birthday Cake with Animated Candles */}
        <div className="relative w-full max-w-sm sm:max-w-md aspect-4/3 max-h-[290px] sm:max-h-[330px] rounded-3xl overflow-hidden border-2 border-slate-800 shadow-[0_0_50px_rgba(236,72,153,0.25)] bg-gradient-to-b from-slate-900 via-slate-950 to-black mb-5 flex flex-col items-center justify-center p-4 select-none">
          {/* Animated Candles */}
          <div className="flex items-center gap-7 mb-1 z-20">
            {[1, 2, 3].map((candle) => (
              <div key={candle} className="flex flex-col items-center">
                {!candlesBlown ? (
                  <motion.div
                    animate={{
                      scale: [1, 1.25, 0.95, 1.15, 1],
                      opacity: [0.9, 1, 0.85, 1, 0.9],
                      y: [-1, 1, -1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.7 + candle * 0.2,
                    }}
                    className="text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.9)]"
                  >
                    <Flame size={24} fill="currentColor" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 1, y: 0, scale: 0.8 }}
                    animate={{ opacity: 0, y: -25, scale: 1.5 }}
                    transition={{ duration: 1 }}
                    className="text-slate-400 text-xs font-mono"
                  >
                    💨
                  </motion.div>
                )}

                <div className="w-3 h-9 bg-gradient-to-b from-pink-400 via-amber-200 to-rose-400 rounded-sm shadow-md border border-white/20" />
              </div>
            ))}
          </div>

          {/* 3-Tier Birthday Cake Structure */}
          <div className="flex flex-col items-center z-10 w-full max-w-[270px]">
            {/* Top Tier */}
            <div className="w-32 h-10 rounded-t-xl bg-gradient-to-r from-pink-500 via-rose-400 to-pink-600 shadow-md border-b-2 border-pink-700 relative overflow-hidden flex items-center justify-center">
              <div className="absolute top-0 inset-x-0 h-2 bg-white/60 rounded-full" />
              <span className="text-[10px] font-mono font-bold text-white tracking-widest uppercase">
                AMITESH
              </span>
            </div>

            {/* Middle Tier */}
            <div className="w-44 h-12 rounded-t-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 shadow-lg border-b-2 border-amber-600 relative overflow-hidden flex items-center justify-center">
              <div className="absolute top-0 inset-x-0 h-2.5 bg-rose-400/80 rounded-full" />
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-500" />
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="w-2 h-2 rounded-full bg-white" />
                <span className="w-2 h-2 rounded-full bg-purple-500" />
              </div>
            </div>

            {/* Bottom Tier */}
            <div className="w-60 h-13 rounded-t-2xl bg-gradient-to-r from-rose-600 via-pink-500 to-rose-700 shadow-2xl relative overflow-hidden flex items-center justify-center">
              <div className="absolute top-0 inset-x-0 h-3 bg-amber-300/80 rounded-full" />
              <span className="text-xs font-black tracking-wider text-white uppercase drop-shadow">
                HAPPY BIRTHDAY • 2026
              </span>
            </div>

            {/* Cake Base */}
            <div className="w-68 h-3.5 bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 rounded-full shadow-2xl border-t border-amber-100" />
          </div>

          {celebrated && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.15, 1], opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center z-30"
            >
              <Sparkles size={34} className="text-amber-400 animate-spin mb-1" />
              <span className="text-lg font-black text-amber-300">
                MOOH MEETHA HO GAYA! 🍰😂
              </span>
            </motion.div>
          )}
        </div>

        {/* Action Button & Celebration Transition */}
        <AnimatePresence mode="wait">
          {!celebrated ? (
            <motion.div
              key="celebrate-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full flex justify-center"
            >
              <button
                onClick={handleCelebrate}
                className="w-full sm:w-auto px-10 py-4 rounded-xl font-black text-sm sm:text-base tracking-widest uppercase text-slate-950 bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400 hover:from-pink-400 hover:to-amber-300 shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Cake size={20} />
                <span>{content.buttonText}</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="post-celebrate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-3.5 w-full"
            >
              <div className="w-full bg-slate-900/90 border border-amber-500/40 rounded-2xl p-4 sm:p-5 text-center shadow-xl">
                <h3 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-rose-400 mb-1 flex items-center justify-center gap-2">
                  <Heart size={20} className="text-pink-500" fill="currentColor" />
                  {content.celebrationTitle}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 font-medium">
                  {content.transitionText}
                </p>
              </div>

              <button
                onClick={onComplete}
                className="w-full sm:w-auto px-10 py-4 rounded-xl font-black text-sm sm:text-base tracking-widest uppercase text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{content.nextButtonText}</span>
                <ArrowRight size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
