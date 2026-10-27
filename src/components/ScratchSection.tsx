"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { BIRTHDAY_CONTENT } from "@/data/birthday-content";
import { SafeImage } from "./SafeImage";
import { useAudio } from "@/context/AudioContext";
import confetti from "canvas-confetti";
import { Sparkles, Eye, Music, Laugh } from "lucide-react";

interface ScratchSectionProps {
  onComplete: () => void;
}

export const ScratchSection: React.FC<ScratchSectionProps> = ({ onComplete }) => {
  const { startMusic, hasStarted } = useAudio();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchedPercentage, setScratchedPercentage] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const isRevealedRef = useRef(false);
  const audioStartedRef = useRef(false);

  // Trigger anthem start on the very first scratch interaction
  const triggerAudioStart = useCallback(() => {
    if (!audioStartedRef.current) {
      audioStartedRef.current = true;
      startMusic();
    }
  }, [startMusic]);

  // Initialize Canvas with celebratory silver metallic texture
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Silver metallic gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#94a3b8");
    gradient.addColorStop(0.25, "#e2e8f0");
    gradient.addColorStop(0.5, "#64748b");
    gradient.addColorStop(0.75, "#cbd5e1");
    gradient.addColorStop(1, "#475569");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Festive textured glitter dots
    ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
    for (let i = 0; i < 350; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const r = Math.random() * 2.2;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Requested overlay text: IDHAR GHIS BHAI, SHARMA MAT 😭
    ctx.font = "bold 18px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#090d16";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("IDHAR GHIS BHAI, SHARMA MAT 😭", rect.width / 2, rect.height / 2 - 12);

    ctx.font = "bold 12px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#1e293b";
    ctx.fillText("Ungli chala, free ka surprise hai! 😂", rect.width / 2, rect.height / 2 + 16);
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      if (!isRevealedRef.current) {
        initCanvas();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initCanvas]);

  // Reveal trigger: confetti burst and transition to Screen 2
  const triggerReveal = useCallback(() => {
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;
    setIsRevealed(true);
    setScratchedPercentage(100);

    confetti({
      particleCount: 50,
      spread: 65,
      origin: { y: 0.55 },
      colors: ["#38bdf8", "#f59e0b", "#ec4899", "#ffffff"],
    });

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    // Auto-transition to Screen 2 after visitor glimpses the image
    setTimeout(() => {
      onComplete();
    }, 1300);
  }, [onComplete]);

  // Calculate scratched area percentage
  const calculateScratchedArea = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealedRef.current) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;
      let transparentPixels = 0;
      const totalPixels = pixels.length / 4;

      for (let i = 3; i < pixels.length; i += 64) {
        if (pixels[i] === 0) {
          transparentPixels++;
        }
      }

      const ratio = transparentPixels / (totalPixels / 16);
      const percent = Math.min(100, Math.round(ratio * 100));
      setScratchedPercentage(percent);

      if (percent >= 45) {
        triggerReveal();
      }
    } catch {
      // Ignore
    }
  }, [triggerReveal]);

  // Scratch action
  const scratch = (clientX: number, clientY: number) => {
    triggerAudioStart();
    if (isRevealedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 32, 0, Math.PI * 2);
    ctx.fill();

    calculateScratchedArea();
  };

  return (
    <div className="w-full min-h-[90vh] flex flex-col items-center justify-center px-4 py-6 bg-slate-950 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full flex flex-col items-center z-10 text-center">
        {/* Helper start music tag if not started */}
        {!hasStarted && (
          <button
            onClick={triggerAudioStart}
            className="mb-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-mono animate-pulse hover:bg-amber-500/30 transition-all cursor-pointer shadow-lg"
          >
            <Music size={13} className="text-amber-400" />
            <span>🎵 Tap or scratch to play anthem</span>
          </button>
        )}

        {/* Playful Friendly Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-2.5">
          <Laugh size={13} />
          <span>SURPRISE FOR AMITESH • GHIS KE DEKH 😂</span>
        </div>

        {/* Exact Requested Headline */}
        <h1 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-amber-200 tracking-tight mb-2 leading-tight">
          {BIRTHDAY_CONTENT.scratch.heading}
        </h1>

        {/* Short & Playful Instruction */}
        <p className="text-sm sm:text-base text-amber-300/95 font-bold mb-1">
          {BIRTHDAY_CONTENT.scratch.supportingText}
        </p>

        {/* Exact Requested Helper text */}
        <p className="text-xs sm:text-sm text-slate-400 mb-4 max-w-md font-medium">
          {BIRTHDAY_CONTENT.scratch.helperText}
        </p>

        {/* Scratched percentage indicator */}
        <div className="w-full max-w-xs flex items-center gap-3 mb-4">
          <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-400 to-teal-400 h-full transition-all duration-150"
              style={{ width: `${scratchedPercentage}%` }}
            />
          </div>
          <span className="text-xs font-mono text-cyan-400 font-bold min-w-10">
            {scratchedPercentage}%
          </span>
        </div>

        {/* Scratch Card Canvas Container */}
        <div
          ref={containerRef}
          className="relative w-full max-w-sm sm:max-w-md aspect-4/3 max-h-[300px] sm:max-h-[360px] rounded-3xl overflow-hidden border-2 border-slate-700/80 shadow-[0_0_40px_rgba(6,182,212,0.15)] bg-slate-900 select-none touch-none mb-4"
        >
          {/* Actual uploaded image underneath */}
          <div className="absolute inset-0 w-full h-full">
            <SafeImage
              src={BIRTHDAY_CONTENT.scratch.image.src}
              fallbackSrc={BIRTHDAY_CONTENT.scratch.image.fallbackSrc}
              alt="Mystery Surprise"
              aspectRatio="aspect-4/3"
              objectFit="contain"
              priority={true}
            />
          </div>

          {/* HTML Canvas overlay with IDHAR GHIS BHAI, SHARMA MAT 😭 */}
          <canvas
            ref={canvasRef}
            onMouseDown={(e) => {
              setIsScratching(true);
              scratch(e.clientX, e.clientY);
            }}
            onMouseMove={(e) => {
              if (isScratching) scratch(e.clientX, e.clientY);
            }}
            onMouseUp={() => setIsScratching(false)}
            onMouseLeave={() => setIsScratching(false)}
            onTouchStart={(e) => {
              setIsScratching(true);
              const touch = e.touches[0];
              scratch(touch.clientX, touch.clientY);
            }}
            onTouchMove={(e) => {
              if (isScratching) {
                const touch = e.touches[0];
                scratch(touch.clientX, touch.clientY);
              }
            }}
            onTouchEnd={() => setIsScratching(false)}
            className={`absolute inset-0 w-full h-full cursor-crosshair z-20 transition-opacity duration-700 ${
              isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            style={{ touchAction: "none" }}
          />

          {isRevealed && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-3 right-3 z-30 bg-amber-500 text-slate-950 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
            >
              <Sparkles size={12} />
              <span>REVEALED!</span>
            </motion.div>
          )}
        </div>

        {/* Reveal button: CHAL, AB ASLI KAND DEKH 😂 */}
        {!isRevealed ? (
          <button
            onClick={() => {
              triggerAudioStart();
              triggerReveal();
            }}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-amber-300 hover:text-white bg-slate-900/90 border border-amber-500/50 hover:border-amber-400 hover:bg-amber-500/20 shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Eye size={14} className="text-amber-400" />
            <span>{BIRTHDAY_CONTENT.scratch.fallbackButtonText}</span>
          </button>
        ) : (
          <span className="text-xs sm:text-sm font-mono text-amber-300 font-bold animate-pulse">
            Special cake aa chuka hai... 🎂
          </span>
        )}
      </div>
    </div>
  );
};
