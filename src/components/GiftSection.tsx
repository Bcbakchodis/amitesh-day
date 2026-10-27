"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BIRTHDAY_CONTENT } from "@/data/birthday-content";
import { Gift, ArrowRight, AlertTriangle, Laugh } from "lucide-react";
import confetti from "canvas-confetti";

interface GiftSectionProps {
  onComplete: () => void;
}

export const GiftSection: React.FC<GiftSectionProps> = ({ onComplete }) => {
  const { gift } = BIRTHDAY_CONTENT;
  const [clickCount, setClickCount] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const [boxOpened, setBoxOpened] = useState(false);
  const [twistStage, setTwistStage] = useState(0);

  const statusMessages = gift.statusMessages;
  const maxClicks = statusMessages.length; // 6 clicks

  const handleBoxClick = () => {
    if (isOpening || boxOpened) return;

    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    if (nextCount >= maxClicks) {
      setIsOpening(true);

      setTimeout(() => {
        setBoxOpened(true);

        // Stage 1: "AREY YAAR! 😂"
        setTimeout(() => {
          setTwistStage(1);
        }, 1000);

        // Stage 2: "GIFT BOX TOH KHALI NIKLA!"
        setTimeout(() => {
          setTwistStage(2);
        }, 2200);

        // Stage 3: "MANAS BHAI, GIFT ABHI RAASTE MEIN HAI KYA? 😂"
        setTimeout(() => {
          setTwistStage(3);
          confetti({
            particleCount: 45,
            spread: 60,
            origin: { y: 0.6 },
            colors: ["#f59e0b", "#ec4899", "#3b82f6"],
          });
        }, 3400);
      }, 900);
    }
  };

  const shakeVariants = {
    idle: { rotate: 0, x: 0, y: 0 },
    shake1: { rotate: [-2, 2, -1, 1, 0], x: [-2, 2, 0], transition: { duration: 0.3 } },
    shake2: { rotate: [-5, 5, -4, 4, 0], x: [-4, 4, 0], transition: { duration: 0.3 } },
    shake3: { rotate: [-8, 8, -6, 6, 0], x: [-6, 6, 0], transition: { duration: 0.3 } },
    shake4: { rotate: [-12, 12, -9, 9, 0], x: [-8, 8, 0], transition: { duration: 0.3 } },
    shake5: { rotate: [-16, 16, -12, 12, 0], x: [-11, 11, 0], transition: { duration: 0.3 } },
    shake6: { rotate: [-22, 22, -16, 16, 0], x: [-15, 15, 0], scale: 1.08, transition: { duration: 0.4 } },
  };

  const getShakeVariant = () => {
    if (clickCount === 0) return "idle";
    return `shake${Math.min(6, clickCount)}`;
  };

  return (
    <div className="min-h-[85vh] w-full flex flex-col items-center justify-center px-4 py-8 bg-slate-950 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full flex flex-col items-center z-10 text-center">
        {/* Playful Header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-mono uppercase tracking-wider mb-2">
          <Gift size={13} />
          <span>BIRTHDAY GIFT PRANK</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-white mb-1.5 leading-tight">
          {gift.openingLine}
        </h2>

        <p className="text-sm sm:text-base text-slate-300 mb-4 font-medium">
          {gift.supportingText}
        </p>

        {/* Status Message Pills */}
        <div className="h-10 flex items-center justify-center mb-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={clickCount}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-mono font-bold tracking-wide border ${
                clickCount === 0
                  ? "bg-slate-900 border-slate-800 text-slate-400"
                  : clickCount >= 4
                  ? "bg-amber-950/90 border-amber-500 text-amber-300 animate-pulse"
                  : "bg-slate-900 border-amber-500/50 text-amber-300"
              }`}
            >
              {clickCount === 0
                ? "Tap the box or button below!"
                : statusMessages[clickCount - 1]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Interactive 3D Gift Box Container */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-1 flex items-center justify-center">
          <div className="absolute bottom-4 w-48 h-8 bg-black/60 rounded-full blur-md" />

          <motion.div
            variants={shakeVariants}
            animate={getShakeVariant()}
            onClick={handleBoxClick}
            className="relative w-44 h-44 sm:w-52 sm:h-52 cursor-pointer select-none"
          >
            {/* Box Lid */}
            <motion.div
              animate={
                boxOpened
                  ? { y: -130, rotate: -30, opacity: 0 }
                  : { y: 0, rotate: 0, opacity: 1 }
              }
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute -top-3 -left-3 w-50 sm:w-58 h-12 bg-gradient-to-r from-red-600 via-rose-500 to-red-700 rounded-lg shadow-xl z-30 border-t border-rose-300/40 flex items-center justify-center"
            >
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 shadow-md" />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 border border-amber-300 shadow-lg -mr-1 transform -rotate-12" />
                <div className="w-7 h-7 rounded-full bg-gradient-to-tl from-amber-400 to-yellow-200 border border-amber-300 shadow-lg -ml-1 transform rotate-12" />
                <div className="absolute w-4 h-4 rounded-full bg-amber-200 shadow-md border border-amber-400" />
              </div>
            </motion.div>

            {/* Box Body */}
            <div className="w-full h-full bg-gradient-to-b from-red-700 via-red-800 to-rose-950 rounded-2xl shadow-2xl relative overflow-hidden border border-red-500/30">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 shadow-inner" />
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-gradient-to-b from-amber-300 via-yellow-200 to-amber-400 shadow-inner" />

              {/* Empty Box when opened */}
              {boxOpened && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-3 bg-slate-950 rounded-xl flex flex-col items-center justify-center text-slate-500 p-2 border border-slate-800"
                >
                  <span className="text-3xl mb-1">🕸️</span>
                  <span className="text-[11px] font-mono text-red-400 font-bold uppercase tracking-widest">
                    EMPTY BOX!
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Tap Button */}
        {!isOpening && (
          <div className="flex flex-col items-center gap-2 w-full mt-3">
            <button
              onClick={handleBoxClick}
              className="w-full sm:w-auto px-10 py-4 rounded-xl font-black text-sm sm:text-base tracking-widest uppercase text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Gift size={20} />
              <span>{gift.buttonText}</span>
              <span className="text-xs bg-black/20 px-2 py-0.5 rounded-full ml-1 font-mono">
                {clickCount}/{maxClicks}
              </span>
            </button>
          </div>
        )}

        {/* Staged Twist Reveal */}
        {twistStage >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col items-center mt-5"
          >
            <h3 className="text-3xl sm:text-5xl font-black text-white mb-2">
              {gift.emptyReveal.stage1}
            </h3>

            {twistStage >= 2 && (
              <motion.h4
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl sm:text-3xl font-extrabold text-amber-400 mb-3"
              >
                {gift.emptyReveal.stage2}
              </motion.h4>
            )}

            {twistStage >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex flex-col items-center"
              >
                <div className="w-full bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 p-1 rounded-3xl shadow-[0_0_40px_rgba(239,68,68,0.4)] my-3">
                  <div className="bg-slate-950 rounded-[22px] px-5 py-6 sm:py-7 flex flex-col items-center">
                    <Laugh size={40} className="text-amber-400 mb-2 animate-bounce" />
                    <h5 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-rose-300 leading-tight">
                      &ldquo;{gift.emptyReveal.punchline}&rdquo;
                    </h5>
                    <div className="h-0.5 w-20 bg-amber-500/40 my-2.5" />
                    <p className="text-xs sm:text-sm text-slate-300 font-bold max-w-md">
                      {gift.emptyReveal.supportingText}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onComplete}
                  className="mt-3 px-10 py-4 rounded-xl font-black text-sm sm:text-base tracking-widest uppercase text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{gift.emptyReveal.nextButtonText}</span>
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
