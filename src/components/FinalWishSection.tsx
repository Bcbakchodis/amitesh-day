"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { BIRTHDAY_CONTENT } from "@/data/birthday-content";
import { Heart, RotateCcw, Sparkles } from "lucide-react";
import { SafeImage } from "./SafeImage";
import confetti from "canvas-confetti";

interface FinalWishSectionProps {
  onReplay: () => void;
}

export const FinalWishSection: React.FC<FinalWishSectionProps> = ({ onReplay }) => {
  const content = BIRTHDAY_CONTENT.finalWish;

  useEffect(() => {
    // Warm celebratory confetti on entering final wish screen
    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.5 },
      colors: ["#ec4899", "#f59e0b", "#3b82f6", "#10b981", "#fbbf24"],
    });
  }, []);

  return (
    <div className="min-h-[85vh] w-full flex flex-col items-center justify-center px-4 py-8 bg-slate-950 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full flex flex-col items-center text-center z-10"
      >
        {/* Playful Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs font-mono uppercase tracking-wider mb-2">
          <Heart size={13} className="text-rose-400" fill="currentColor" />
          <span>JIO HAZAARON SAAL • AMITESH BHAI ZINDABAD 🎂❤️</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-yellow-300 tracking-tight mb-2.5 leading-tight">
          {content.heading}
        </h1>

        {/* 4-Photo Memory Collage */}
        <div className="grid grid-cols-2 gap-2.5 w-full max-w-sm my-3">
          {content.collagePhotos.map((photo, idx) => (
            <div key={photo.id || idx} className="rounded-2xl overflow-hidden shadow-md border border-slate-800">
              <SafeImage
                src={photo.src}
                fallbackSrc={photo.fallbackSrc}
                alt={`Memory ${idx + 1}`}
                aspectRatio="aspect-square"
                objectFit="cover"
              />
            </div>
          ))}
        </div>

        {/* Warm & Authentic Message Card */}
        <div className="w-full bg-slate-900/90 border border-amber-500/30 rounded-3xl p-5 sm:p-6 my-3 shadow-2xl backdrop-blur-md">
          <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed mb-3">
            &ldquo;{content.message}&rdquo;
          </p>
          <p className="text-amber-400 font-mono font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-1.5">
            <Sparkles size={14} /> From All Your College Friends ❤️
          </p>
        </div>

        {/* Replay Button: CHAL, EK BAAR AUR DEKH! 😂 */}
        <button
          onClick={onReplay}
          className="px-10 py-4 rounded-xl font-black text-sm sm:text-base tracking-widest uppercase text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-1"
        >
          <RotateCcw size={18} />
          <span>{content.replayButtonText}</span>
        </button>
      </motion.div>
    </div>
  );
};
