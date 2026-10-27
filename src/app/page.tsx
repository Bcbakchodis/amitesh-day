"use client";

import React, { useState } from "react";
import { ScratchSection } from "@/components/ScratchSection";
import { CakeSection } from "@/components/CakeSection";
import { SecretVideoSection } from "@/components/SecretVideoSection";
import { MemoryStorySection } from "@/components/MemoryStorySection";
import { GiftSection } from "@/components/GiftSection";
import { FinalWishSection } from "@/components/FinalWishSection";

// The exact 6-screen flow requested
type StoryScreen = "scratch" | "cake" | "secretVideo" | "memories" | "gift" | "wish";

export default function Home() {
  // Screen 1: Scratch is the very first screen visitors see
  const [currentScreen, setCurrentScreen] = useState<StoryScreen>("scratch");

  const handleReplay = () => {
    // Restart directly back to Screen 1: Scratch without refreshing page
    setCurrentScreen("scratch");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen w-full bg-slate-950 text-white flex flex-col justify-center items-center overflow-x-hidden">
      {/* 
        NO fixed top header or numbered navigation strip.
        Space is fully reclaimed so all screens (starting with Scratch Card)
        are perfectly centered and visually balanced on mobile & desktop.
      */}
      <div className="w-full flex-1 flex flex-col justify-center items-center">
        {/* 1. Scratch Card */}
        {currentScreen === "scratch" && (
          <ScratchSection onComplete={() => setCurrentScreen("cake")} />
        )}

        {/* 2. Special Cake Screen (Direct post-scratch screen) */}
        {currentScreen === "cake" && (
          <CakeSection onComplete={() => setCurrentScreen("secretVideo")} />
        )}

        {/* 3. Secret Video (Plays first after cake) */}
        {currentScreen === "secretVideo" && (
          <SecretVideoSection onComplete={() => setCurrentScreen("memories")} />
        )}

        {/* 4. All Remaining Photos and Videos — One by One */}
        {currentScreen === "memories" && (
          <MemoryStorySection onComplete={() => setCurrentScreen("gift")} />
        )}

        {/* 5. Empty Gift Box Prank */}
        {currentScreen === "gift" && (
          <GiftSection onComplete={() => setCurrentScreen("wish")} />
        )}

        {/* 6. Final Birthday Screen */}
        {currentScreen === "wish" && (
          <FinalWishSection onReplay={handleReplay} />
        )}
      </div>
    </main>
  );
}
