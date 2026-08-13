"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const words = ["TECHNOLOGY", "CREATIVITY", "PHOTOGRAPHY", "THANUSHIKA"];

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    // Prevent scrolling during preload
    document.documentElement.classList.add("lenis-stopped");
    document.body.style.overflow = "hidden";

    // Word cycling logic
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => {
        if (prev < words.length - 1) {
          return prev + 1;
        } else {
          clearInterval(wordInterval);
          return prev;
        }
      });
    }, 450);

    // GSAP animations
    const ctx = gsap.context(() => {
      // Ring spinning animation
      gsap.to(ringRef.current, {
        rotate: 360,
        duration: 2,
        ease: "none",
        repeat: -1,
      });

      gsap.fromTo(
        ringRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" }
      );

      // Text reveal
      gsap.fromTo(
        textRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, delay: 0.2, ease: "power2.out" }
      );
    });

    // Timeout to finish preloader
    const timeout = setTimeout(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          document.documentElement.classList.remove("lenis-stopped");
          document.body.style.overflow = "";
          onComplete();
        },
      });
    }, 2200);

    return () => {
      clearInterval(wordInterval);
      clearTimeout(timeout);
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#0A0908] z-[99999] flex flex-col items-center justify-center pointer-events-auto"
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* Sleek Gold Shutter-Like Ring */}
        <svg
          ref={ringRef}
          className="w-16 h-16 text-[#C9A876]"
          viewBox="0 0 50 50"
          fill="none"
        >
          <circle
            className="opacity-20"
            cx="25"
            cy="25"
            r="20"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            className="opacity-80"
            cx="25"
            cy="25"
            r="20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="45 15"
            strokeLinecap="round"
          />
        </svg>

        {/* Word Cycling Container */}
        <div className="h-6 overflow-hidden flex flex-col items-center justify-center">
          <div
            ref={textRef}
            className="text-xs font-bold tracking-[0.3em] text-[#C9A876] font-sans-body uppercase"
          >
            {words[currentWordIndex]}
          </div>
        </div>
      </div>
    </div>
  );
}
