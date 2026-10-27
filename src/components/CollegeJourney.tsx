"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BIRTHDAY_CONTENT, CollegeYear, PhotoItem } from "@/data/birthday-content";
import { SafeImage } from "./SafeImage";
import { GraduationCap, ChevronLeft, ChevronRight, Gift, Calendar, Heart, Film, Play, X, Image as ImageIcon } from "lucide-react";

interface CollegeJourneyProps {
  onComplete: () => void;
}

export const CollegeJourney: React.FC<CollegeJourneyProps> = ({ onComplete }) => {
  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const years = BIRTHDAY_CONTENT.collegeJourney.years;
  const isLastYear = currentYearIndex === years.length - 1;
  const currentYear: CollegeYear = years[currentYearIndex];
  const activePhoto: PhotoItem = currentYear.photos[activePhotoIndex] || currentYear.photos[0];

  const handleNextYear = () => {
    if (isLastYear) {
      onComplete();
    } else {
      setCurrentYearIndex((prev) => prev + 1);
      setActivePhotoIndex(0);
    }
  };

  const handlePrevYear = () => {
    if (currentYearIndex > 0) {
      setCurrentYearIndex((prev) => prev - 1);
      setActivePhotoIndex(0);
    }
  };

  return (
    <div className="min-h-[85vh] w-full flex flex-col items-center justify-center px-4 py-8 bg-slate-950 text-white relative overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-10 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl w-full flex flex-col items-center z-10">
        {/* Header Badge & Section Title */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/40 text-blue-300 text-xs font-mono uppercase tracking-wider mb-1.5">
            <GraduationCap size={13} />
            <span>SCREEN 4 • {BIRTHDAY_CONTENT.collegeJourney.sectionTitle}</span>
          </div>

          <p className="text-xs font-mono text-amber-400 tracking-widest uppercase">
            {BIRTHDAY_CONTENT.collegeJourney.openingQuote}
          </p>
        </div>

        {/* Timeline Stepper Navigation */}
        <div className="w-full flex items-center justify-between mb-5 max-w-lg px-2">
          {years.map((y, idx) => {
            const isActive = idx === currentYearIndex;
            const isPassed = idx < currentYearIndex;
            return (
              <div key={y.yearId} className="flex-1 flex flex-col items-center relative">
                {idx > 0 && (
                  <div
                    className={`absolute top-4 -left-1/2 right-1/2 h-0.5 -z-10 transition-colors duration-300 ${
                      isPassed || isActive ? "bg-amber-400" : "bg-slate-800"
                    }`}
                  />
                )}

                <button
                  onClick={() => {
                    setCurrentYearIndex(idx);
                    setActivePhotoIndex(0);
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-amber-400 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.6)] scale-110"
                      : isPassed
                      ? "bg-slate-700 text-amber-300"
                      : "bg-slate-900 text-slate-500 border border-slate-800"
                  }`}
                  aria-label={`Go to ${y.title}`}
                >
                  {idx + 1}
                </button>

                <span
                  className={`text-[10px] sm:text-xs font-semibold mt-1 transition-colors ${
                    isActive ? "text-amber-300 font-bold" : "text-slate-500"
                  }`}
                >
                  {y.yearNumber}
                </span>
              </div>
            );
          })}
        </div>

        {/* Main Active Year Memory Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentYear.yearId}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.35 }}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-md flex flex-col items-center"
          >
            {/* Year Header info */}
            <div className="w-full flex items-center justify-between mb-3 pb-2.5 border-b border-slate-800">
              <div className="text-left">
                <span className="text-xs font-mono text-amber-400 font-bold flex items-center gap-1">
                  <Calendar size={12} /> {currentYear.yearNumber}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {currentYear.title}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                {currentYear.subtitle}
              </span>
            </div>

            {/* Featured Active Photo */}
            <div className="w-full max-w-sm sm:max-w-md mb-3">
              <SafeImage
                src={activePhoto.src}
                fallbackSrc={activePhoto.fallbackSrc}
                alt={activePhoto.caption || currentYear.title}
                aspectRatio="aspect-4/3"
                objectFit="contain"
                priority={true}
              />
              {activePhoto.caption && (
                <p className="text-[11px] sm:text-xs text-slate-400 font-mono mt-1 text-center">
                  📸 {activePhoto.caption} ({activePhotoIndex + 1}/{currentYear.photos.length})
                </p>
              )}
            </div>

            {/* Photo Thumbnails Selector for the Year */}
            <div className="flex items-center gap-2 mb-4 overflow-x-auto p-1 max-w-full">
              {currentYear.photos.map((photo, pIdx) => (
                <button
                  key={photo.id}
                  onClick={() => setActivePhotoIndex(pIdx)}
                  className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activePhotoIndex === pIdx
                      ? "border-amber-400 scale-105 shadow-md"
                      : "border-slate-700 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={photo.src}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}

              {/* Special Video Button if this year has video */}
              {currentYear.video && (
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="h-12 px-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 border border-amber-400/50 flex items-center gap-1 text-[11px] font-bold text-white shrink-0 shadow-md hover:scale-105 transition-all cursor-pointer"
                >
                  <Film size={14} />
                  <span>WATCH CLIP</span>
                </button>
              )}
            </div>

            {/* Natural Hinglish Caption Narrative */}
            <div className="w-full bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 text-center mb-5">
              <p className="text-base sm:text-lg font-bold text-amber-300 mb-1">
                &ldquo;{currentYear.caption}&rdquo;
              </p>
              {currentYear.memoryText && (
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {currentYear.memoryText}
                </p>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="w-full flex items-center justify-between gap-3">
              <button
                onClick={handlePrevYear}
                disabled={currentYearIndex === 0}
                className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-all ${
                  currentYearIndex === 0
                    ? "opacity-30 cursor-not-allowed text-slate-600"
                    : "text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 active:scale-95 cursor-pointer"
                }`}
              >
                <ChevronLeft size={16} />
                <span>PREV YEAR</span>
              </button>

              <button
                onClick={handleNextYear}
                className="flex-1 sm:flex-initial px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {isLastYear ? BIRTHDAY_CONTENT.collegeJourney.nextButtonText : "NEXT YEAR"}
                </span>
                {isLastYear ? <Gift size={16} /> : <ChevronRight size={16} />}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Emotional milestone banner at end of Final Year */}
        {isLastYear && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 text-center px-2"
          >
            <p className="text-sm sm:text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-amber-300 to-yellow-300 flex items-center justify-center gap-1.5">
              <Heart size={16} className="text-pink-400" fill="currentColor" />
              {BIRTHDAY_CONTENT.collegeJourney.emotionalQuote}
            </p>
          </motion.div>
        )}
      </div>

      {/* College Middle Video Modal */}
      <AnimatePresence>
        {showVideoModal && currentYear.video && (
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
                <span>{currentYear.video.caption}</span>
              </div>

              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                <video
                  src={currentYear.video.src}
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
                Back to Journey
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
