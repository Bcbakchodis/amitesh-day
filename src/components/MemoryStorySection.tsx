"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BIRTHDAY_CONTENT, MemoryItem } from "@/data/birthday-content";
import { SafeImage } from "./SafeImage";
import { ChevronLeft, ChevronRight, Gift, Sparkles, Laugh } from "lucide-react";

interface MemoryStorySectionProps {
  onComplete: () => void;
}

export const MemoryStorySection: React.FC<MemoryStorySectionProps> = ({ onComplete }) => {
  const { items, closingHeading, closingSubtitle, nextButtonText } = BIRTHDAY_CONTENT.memories;
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = items.length;
  const isLast = currentIndex === total - 1;
  const currentItem: MemoryItem = items[currentIndex];

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full min-h-[90vh] flex flex-col items-center justify-center px-4 py-6 bg-slate-950 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full flex flex-col items-center z-10 text-center">
        {/* Progress Pill: YAAD 01 / 17 */}
        <div className="flex items-center justify-between w-full max-w-sm sm:max-w-md mb-2.5 px-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-amber-300 text-xs font-mono font-bold tracking-wider">
            <Sparkles size={12} className="text-amber-400" />
            <span>YAAD {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
          </div>

          <span className="text-xs font-mono text-slate-400">
            {currentItem.type === "video" ? "🎬 Video Recording" : "📸 College Memory"}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-sm sm:max-w-md bg-slate-900 h-1.5 rounded-full overflow-hidden mb-3.5">
          <div
            className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          />
        </div>

        {/* Active Memory Card with Slide Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.35 }}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur-md flex flex-col items-center mb-3"
          >
            {/* Memory Title Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold tracking-wide mb-3">
              <Laugh size={12} className="text-amber-400" />
              <span>{currentItem.title}</span>
            </div>

            {/* Visual media container: Photo or Video */}
            <div className="w-full max-w-sm sm:max-w-md mb-3.5">
              {currentItem.type === "photo" ? (
                <SafeImage
                  src={currentItem.src}
                  fallbackSrc={currentItem.fallbackSrc || currentItem.src}
                  alt={currentItem.title}
                  aspectRatio="aspect-4/3"
                  objectFit="contain"
                  priority={true}
                />
              ) : (
                <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-xl flex items-center justify-center">
                  <video
                    src={currentItem.src}
                    controls
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>

            {/* Photo-specific Roast Caption & Punchline */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="w-full bg-slate-950/85 border border-slate-800/90 rounded-2xl p-4 text-center mb-4 shadow-inner"
            >
              {/* Main Roast Line */}
              <p className="text-base sm:text-lg font-bold text-amber-300 leading-snug mb-1">
                &ldquo;{currentItem.caption}&rdquo;
              </p>

              {/* Secondary Punchline */}
              {currentItem.punchline && (
                <p className="text-xs sm:text-sm font-medium text-slate-300 mt-1 italic">
                  👉 {currentItem.punchline}
                </p>
              )}
            </motion.div>

            {/* Navigation Controls */}
            <div className="w-full flex items-center justify-between gap-3">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`px-3 sm:px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-all ${
                  currentIndex === 0
                    ? "opacity-25 cursor-not-allowed text-slate-600"
                    : "text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 active:scale-95 cursor-pointer"
                }`}
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">PEECHE</span>
              </button>

              <button
                onClick={handleNext}
                className="flex-1 px-4 sm:px-6 py-3.5 rounded-xl font-black text-xs sm:text-sm tracking-wider uppercase text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isLast ? nextButtonText : "AAGE BADH BHAI, PICTURE ABHI BAAKI HAI 👀"}</span>
                {isLast ? <Gift size={16} /> : <ChevronRight size={16} />}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Closing card on final memory */}
        {isLast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-slate-900/90 border border-amber-500/40 rounded-2xl p-3.5 text-center shadow-xl"
          >
            <p className="text-sm sm:text-base font-extrabold text-amber-300 mb-0.5">
              {closingHeading}
            </p>
            <p className="text-xs text-slate-300">
              {closingSubtitle}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
