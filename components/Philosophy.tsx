"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Large text reveal
      const elements = textRef.current?.querySelectorAll(".word-reveal");
      if (elements && elements.length > 0) {
        gsap.fromTo(
          elements,
          { opacity: 0, scale: 0.95, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[80vh] w-full flex items-center justify-center py-24 px-6 md:px-12 bg-[#15130F] border-t border-b border-[rgba(201,168,118,0.08)] overflow-hidden"
    >
      {/* Background large decorative letters */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.015] pointer-events-none select-none z-0">
        <span className="font-serif-display text-[30vw] font-bold text-[#C9A876]">MINDSET</span>
      </div>

      <div
        ref={textRef}
        className="max-w-[1000px] w-full flex flex-col items-center justify-center text-center z-10 gap-8"
      >
        <div className="word-reveal text-[10px] font-bold tracking-[0.3em] text-[#C9A876] uppercase font-sans-body">
          PHILOSOPHY
        </div>

        <h2 className="word-reveal font-serif-display text-[clamp(2.5rem,7vw,5.5rem)] font-light text-[#F4F1EA] tracking-wide leading-tight select-none">
          BUILD. EXPERIMENT. CREATE.
        </h2>

        <div className="word-reveal w-12 h-[1px] bg-[#C9A876]" />

        <p className="word-reveal font-sans-body text-base md:text-lg text-[#8C877C] max-w-xl leading-relaxed">
          I believe the best projects happen when technology is combined with curiosity and creativity.
        </p>
      </div>
    </section>
  );
}
