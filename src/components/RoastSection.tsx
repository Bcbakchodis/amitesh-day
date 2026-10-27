"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BIRTHDAY_CONTENT } from "@/data/birthday-content";
import { SafeImage } from "./SafeImage";
import { AlertCircle, Camera, ChevronRight, HelpCircle, FileText } from "lucide-react";

interface RoastSectionProps {
  onComplete: () => void;
}

export const RoastSection: React.FC<RoastSectionProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = BIRTHDAY_CONTENT.roast.items;
  const isLastItem = currentIndex === items.length - 1;
  const [showMysteryTransition, setShowMysteryTransition] = useState(false);

  const currentItem = items[currentIndex];

  const handleNext = () => {
    if (isLastItem) {
      setShowMysteryTransition(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 bg-slate-950 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl w-full flex flex-col items-center z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-mono uppercase tracking-wider mb-3">
            <AlertCircle size={13} />
            <span>EXHIBIT A • THE EXPOSÉ</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-2">
            {BIRTHDAY_CONTENT.roast.heading}
          </h2>

          <p className="text-sm sm:text-base text-slate-400">
            {BIRTHDAY_CONTENT.roast.subheading}
          </p>

          {/* Dossier progress pills */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setShowMysteryTransition(false);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-8 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]"
                    : "w-2 bg-slate-700 hover:bg-slate-500"
                }`}
                aria-label={`Jump to evidence ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Evidence Card with AnimatePresence */}
        <div className="w-full relative">
          <AnimatePresence mode="wait">
            {!showMysteryTransition ? (
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.4 }}
                className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-md flex flex-col items-center"
              >
                {/* Photo Tag Badge */}
                <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 mb-3 px-1">
                  <span className="flex items-center gap-1 text-red-400 font-bold">
                    <FileText size={13} /> {currentItem.tag || `FILE #${currentIndex + 1}`}
                  </span>
                  <span>
                    Evidence {currentIndex + 1} of {items.length}
                  </span>
                </div>

                {/* Safe Photo Container */}
                <div className="w-full max-w-sm sm:max-w-md mb-4">
                  <SafeImage
                    src={currentItem.src}
                    fallbackSrc={currentItem.fallbackSrc}
                    alt={currentItem.caption || "Roast evidence photo"}
                    aspectRatio="aspect-4/3"
                    objectFit="contain"
                    priority={true}
                  />
                </div>

                {/* Meme Caption Card */}
                <div className="w-full bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 text-center mb-6">
                  <p className="text-lg sm:text-xl font-bold text-amber-300 tracking-wide font-sans">
                    &ldquo;{currentItem.caption}&rdquo;
                  </p>
                </div>

                {/* Show more evidence button */}
                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase text-white bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    {isLastItem ? "FINAL VERDICT" : BIRTHDAY_CONTENT.roast.nextButtonText}
                  </span>
                  <ChevronRight size={18} />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="mystery-box"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-cyan-500/50 rounded-3xl p-8 text-center shadow-[0_0_50px_rgba(6,182,212,0.2)] flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4 border border-cyan-400/40 animate-pulse">
                  <HelpCircle size={32} />
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                  {BIRTHDAY_CONTENT.roast.transitionNotice}
                </h3>

                <p className="text-slate-400 text-sm sm:text-base max-w-md mb-8">
                  Security protocols have flagged an encrypted confidential file hidden behind a mystery seal.
                </p>

                <button
                  onClick={onComplete}
                  className="px-8 py-4 rounded-xl font-black text-sm tracking-widest uppercase text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-400 shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <Camera size={18} />
                  <span>INSPECT HIDDEN FILE →</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
