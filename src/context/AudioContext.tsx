"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { BIRTHDAY_CONTENT } from "@/data/birthday-content";
import { Volume2, VolumeX, Play, Pause, Music, RotateCcw } from "lucide-react";

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  hasStarted: boolean;
  startMusic: () => Promise<void>;
  togglePlay: () => void;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume] = useState(1.0); // Full configured volume (1.0)
  const [hasStarted, setHasStarted] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);

  // Initialize persistent audio element
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 1.0;

    // Set source priority: Khilji Gang Anthem.mp4, fallback to birthday-song.mp4 or mp3
    const sources = [
      BIRTHDAY_CONTENT.audio.bgSongSrc,
      "/audio/birthday-song.mp4",
      "/audio/birthday-song.mp3",
    ];

    audio.src = sources[0];
    audioRef.current = audio;

    audio.addEventListener("playing", () => {
      setIsPlaying(true);
      isPlayingRef.current = true;
      setPlaybackError(false);
    });

    audio.addEventListener("pause", () => {
      setIsPlaying(false);
      isPlayingRef.current = false;
    });

    audio.addEventListener("error", (e) => {
      console.warn("Audio element error on source, trying alternative:", e);
      // Try next source if available
      if (audio.src.endsWith(".mp4")) {
        audio.src = "/audio/birthday-song.mp3";
      }
    });

    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const startMusic = useCallback(async () => {
    setHasStarted(true);
    setPlaybackError(false);

    if (audioRef.current) {
      try {
        audioRef.current.volume = 1.0;
        await audioRef.current.play();
        setIsPlaying(true);
        isPlayingRef.current = true;
      } catch (err) {
        console.warn("Autoplay gesture required or play error:", err);
        setPlaybackError(true);
      }
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      isPlayingRef.current = false;
    } else {
      audioRef.current.volume = 1.0;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        isPlayingRef.current = true;
        setPlaybackError(false);
      }).catch((err) => {
        console.warn("Play failed:", err);
        setPlaybackError(true);
      });
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        hasStarted,
        startMusic,
        togglePlay,
        toggleMute,
      }}
    >
      {children}

      {/* Floating Persistent Audio Bar */}
      {hasStarted && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2.5 bg-slate-900/95 backdrop-blur-xl border border-amber-500/40 px-3.5 py-2.5 rounded-full shadow-2xl text-white transition-all duration-300 hover:border-amber-400">
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center hover:bg-amber-400 transition-transform active:scale-95 shadow-md cursor-pointer"
            title={isPlaying ? "Pause Anthem" : "Play Anthem"}
            aria-label={isPlaying ? "Pause Anthem" : "Play Anthem"}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
          </button>

          {/* Animated sound bars */}
          <div className="flex items-center gap-1 h-4 px-1">
            <span className={`w-1 bg-amber-400 rounded-full transition-all duration-200 ${isPlaying && !isMuted ? "h-4 animate-pulse" : "h-1"}`} />
            <span className={`w-1 bg-amber-300 rounded-full transition-all duration-300 ${isPlaying && !isMuted ? "h-3 animate-bounce" : "h-1"}`} />
            <span className={`w-1 bg-amber-500 rounded-full transition-all duration-150 ${isPlaying && !isMuted ? "h-4 animate-pulse" : "h-1"}`} />
            <span className={`w-1 bg-amber-400 rounded-full transition-all duration-200 ${isPlaying && !isMuted ? "h-2 animate-bounce" : "h-1"}`} />
          </div>

          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[11px] font-bold text-amber-300 leading-tight flex items-center gap-1">
              <Music size={10} /> {BIRTHDAY_CONTENT.audio.title}
            </span>
            <span className="text-[9px] text-slate-400">
              {isPlaying ? "Playing continuously" : "Paused"}
            </span>
          </div>

          <button
            onClick={toggleMute}
            className="text-slate-400 hover:text-white transition-colors p-1 cursor-pointer"
            title={isMuted ? "Unmute" : "Mute"}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={15} className="text-red-400" /> : <Volume2 size={15} />}
          </button>
        </div>
      )}

      {/* Retry banner if browser blocked audio gesture */}
      {playbackError && (
        <div className="fixed bottom-16 right-4 z-50 bg-slate-900 border border-amber-500 text-white px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 shadow-2xl">
          <span className="text-amber-300 font-medium">Click to unpause anthem:</span>
          <button
            onClick={togglePlay}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-2 py-1 rounded text-[11px] flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw size={12} /> Play
          </button>
        </div>
      )}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
