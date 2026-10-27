"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { BIRTHDAY_CONTENT } from "@/data/birthday-content";
import { Film, ArrowRight, Play } from "lucide-react";

interface SecretVideoSectionProps {
  onComplete: () => void;
}

export const SecretVideoSection: React.FC<SecretVideoSectionProps> = ({ onComplete }) => {
  const content = BIRTHDAY_CONTENT.secretVideo;
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <div className="min-h-[85vh] w-full flex flex-col items-center justify-center px-4 py-8 bg-slate-950 text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-red-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full flex flex-col items-center z-10 text-center"
      >
        {/* Playful Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/70 border border-red-500/40 text-red-300 text-xs font-mono uppercase tracking-wider mb-2">
          <Film size={13} className="text-red-400" />
          <span>EXCLUSIVE SECRET CLIP • LEAKED FOOTAGE 😂🎬</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-rose-300 tracking-tight mb-1.5 leading-tight">
          {content.heading}
        </h2>

        <p className="text-sm sm:text-base text-slate-300 mb-4 font-medium">
          {content.subheading}
        </p>

        {/* Video Player Card */}
        <div className="w-full max-w-sm sm:max-w-md aspect-video rounded-3xl overflow-hidden border-2 border-slate-700/80 shadow-[0_0_40px_rgba(239,68,68,0.2)] bg-black mb-5 relative group">
          <video
            ref={videoRef}
            src={content.src}
            controls
            playsInline
            autoPlay
            muted
            className="w-full h-full object-contain"
          />
        </div>

        {/* Button: CHAL, AB YAADEIN DEKHTE HAIN → */}
        <button
          onClick={onComplete}
          className="w-full sm:w-auto px-10 py-4 rounded-xl font-black text-sm sm:text-base tracking-widest uppercase text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{content.buttonText}</span>
          <ArrowRight size={20} />
        </button>
      </motion.div>
    </div>
  );
};
