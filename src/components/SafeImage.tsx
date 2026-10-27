"use client";

import React, { useState } from "react";
import Image from "next/image";

interface SafeImageProps {
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  priority?: boolean;
  objectFit?: "contain" | "cover";
  aspectRatio?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = "",
  priority = false,
  objectFit = "contain",
  aspectRatio = "aspect-4/3",
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <div
      className={`relative w-full max-h-[340px] sm:max-h-[420px] overflow-hidden rounded-2xl bg-slate-900/80 border border-slate-700/50 shadow-2xl flex items-center justify-center ${aspectRatio} ${className}`}
    >
      {/* Blurred ambient background glow */}
      {imgSrc && (
        <div
          className="absolute inset-0 scale-110 opacity-30 blur-2xl pointer-events-none"
          style={{
            backgroundImage: `url(${imgSrc})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
      )}

      {/* Main image with object-contain to never cut off faces */}
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        loading={priority ? "eager" : "lazy"}
        className={`relative z-10 w-full h-full transition-transform duration-500 ${
          objectFit === "contain" ? "object-contain p-2" : "object-cover"
        }`}
      />
    </div>
  );
};
