"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import About from "./About";

gsap.registerPlugin(ScrollTrigger);

export default function ApertureTransition() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const clippedRef = useRef<HTMLDivElement>(null);
  const bladesRef = useRef<SVGSVGElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    // Detect mobile browser or reduced-motion preferences
    const isMobile = window.innerWidth < 1024;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || prefersReducedMotion) {
      return;
    }

    const timer = setTimeout(() => {
      setIsInteractive(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isInteractive) return;

    const ctx = gsap.context(() => {
      // Timeline pinned to scroll distance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1. Animate circular clip-path on the inner About container
      tl.to(clippedRef.current, {
        clipPath: "circle(135% at 50% 50%)",
        ease: "none",
      }, 0);

      // 2. Spin the whole iris assembly as it opens
      tl.to(bladesRef.current, {
        rotate: 45,
        ease: "none",
      }, 0);

      // 3. Slide each individual blade radially outward along its coordinate axis
      const blades = bladesRef.current?.querySelectorAll(".aperture-blade-inner");
      if (blades && blades.length > 0) {
        tl.to(blades, {
          x: 75,
          ease: "none",
        }, 0);
      }
    });

    return () => ctx.revert();
  }, [isInteractive]);

  if (!isInteractive) {
    // Render static flow on mobile or when reduced motion is preferred
    return (
      <div id="about-static">
        <About />
      </div>
    );
  }

  return (
    <div
      ref={triggerRef}
      className="relative w-full h-[180vh] bg-[#0A0908] z-40"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Background ambient chapter label */}
        <div className="absolute inset-0 bg-[#0A0908] flex items-center justify-center z-0 select-none">
          <div className="text-center opacity-70">
            <span className="font-serif-display text-[8vw] font-light text-[#C9A876] tracking-[0.4em]">
              CHAPTER 01
            </span>
          </div>
        </div>

        {/* The clipped container which holds the About section */}
        <div
          ref={clippedRef}
          className="absolute inset-0 w-full h-full overflow-hidden z-10"
          style={{ clipPath: "circle(0% at 50% 50%)" }}
        >
          <About />
        </div>

        {/* Custom SVG Shutter Blades */}
        <svg
          ref={bladesRef}
          className="absolute w-full h-full pointer-events-none z-20 text-[#C9A876]"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          style={{ transformOrigin: "center center" }}
        >
          <defs>
            <linearGradient id="shutter-blade-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9A876" stopOpacity="0.8" />
              <stop offset="1%" stopColor="#C9A876" stopOpacity="0.5" />
              <stop offset="3.5%" stopColor="#2D2418" stopOpacity="0.25" />
              <stop offset="5.5%" stopColor="#0A0908" />
              <stop offset="100%" stopColor="#0A0908" />
            </linearGradient>
          </defs>

          {/* Render 8 blades rotated symmetrically */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 45} 50 50)`}>
              {/* Inner group animated by GSAP translate */}
              <g className="aperture-blade-inner" transform="translate(0, 0)">
                {/* The main blade plate with a premium 3D gold gradient edge (no stroke) */}
                <path
                  d="M 50,50 L 50,-150 L 250,-150 L 250,50 Z"
                  fill="url(#shutter-blade-grad)"
                  stroke="none"
                  className="opacity-95"
                />

                {/* Floating mechanical detail lines contained entirely on the blade surface */}
                <line
                  x1="65"
                  y1="35"
                  x2="95"
                  y2="35"
                  stroke="rgba(201, 168, 118, 0.2)"
                  strokeWidth="0.15"
                  strokeDasharray="1 1"
                />
              </g>
            </g>
          ))}

          {/* Subtle guidelines */}
          <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 3" className="opacity-25" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.15" strokeDasharray="2 4" className="opacity-15" />
        </svg>

        {/* Focal Center indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
          <div className="w-[12px] h-[12px] border border-[#C9A876] rounded-full opacity-60 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
