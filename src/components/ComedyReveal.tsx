"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BIRTHDAY_CONTENT } from "@/data/birthday-content";
import { SafeImage } from "./SafeImage";
import { Laugh, ArrowRight, Play, X, Film } from "lucide-react";

interface ComedyRevealProps {
  onComplete: () => void;
}

export const ComedyReveal: React.FC<ComedyRevealProps> = ({ onComplete }) => {
  const content = BIRTHDAY_CONTENT.comedyReveal;
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <div className="min-h-[85vh] w-full flex flex-col items-center justify-center px-4 py-8 bg-slate-950 text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full flex flex-col items-center z-10 text-center"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono uppercase tracking-wider mb-2">
          <Laugh size={14} className="text-rose-400" />
          <span>SCREEN 2 • MEMORY REVEAL</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-rose-300 tracking-tight mb-2">
          {content.heading}
        </h2>

        {/* Revealed Image Container */}
        <div className="w-full max-w-sm sm:max-w-md my-3">
          <SafeImage
            src={content.image.src}
            fallbackSrc={content.image.fallbackSrc}
            alt={content.image.caption || "Revealed funny moment"}
            aspectRatio="aspect-4/3"
            objectFit="contain"
            priority={true}
          />
        </div>

        {/* Playful Secret Video Clip Button if video exists */}
        {content.video && (
          <button
            onClick={() => setShowVideoModal(true)}
            className="mb-3 px-4 py-2 rounded-full bg-slate-900 border border-amber-500/50 hover:border-amber-400 text-amber-300 text-xs font-bold flex items-center gap-2 hover:bg-slate-800 transition-all cursor-pointer shadow-md"
          >
            <Play size={13} fill="currentColor" />
            <span>{content.video.buttonText}</span>
          </button>
        )}

        {/* Natural Hinglish Friendly Caption */}
        <div className="w-full bg-slate-900/90 border border-amber-500/40 rounded-2xl p-4 sm:p-5 text-center mb-6 shadow-xl backdrop-blur-md">
          <p className="text-base sm:text-lg font-bold text-amber-300 font-sans leading-snug">
            &ldquo;{content.caption}&rdquo;
          </p>
        </div>

        {/* Button: CHAL, AAGE DEKHTE HAIN → */}
        <button
          onClick={onComplete}
          className="w-full sm:w-auto px-10 py-4 rounded-xl font-black text-sm sm:text-base tracking-widest uppercase text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{content.buttonText}</span>
          <ArrowRight size={20} />
        </button>
      </motion.div>

      {/* Secret Video Modal */}
      <AnimatePresence>
        {showVideoModal && content.video && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-lg bg-slate-950 border border-slate-800 rounded-3xl p-4 shadow-2xl flex flex-col items-center">
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full bg-slate-900 border border-slate-700 cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 mb-3 text-amber-300 text-sm font-bold font-mono">
                <Film size={16} />
                <span>{content.video.title}</span>
              </div>

              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                <video
                  src={content.video.src}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>

              <button
                onClick={() => setShowVideoModal(false)}
                className="mt-4 px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-all cursor-pointer"
              >
                Close Video
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
