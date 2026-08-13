"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal text elements when scrolled into view (simple IntersectionObserver or GSAP scroll trigger)
    const ctx = gsap.context(() => {
      const elements = elementsRef.current?.querySelectorAll(".scroll-reveal");
      if (elements && elements.length > 0) {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
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
      id="about"
      className="relative min-h-screen w-full flex items-center justify-center py-24 px-6 md:px-12 bg-[#15130F] border-t border-b border-[rgba(201,168,118,0.08)]"
    >
      <div ref={elementsRef} className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Heading & Detailed Bio */}
        <div className="lg:col-span-6 flex flex-col justify-start">
          <div className="scroll-reveal text-[11px] font-bold tracking-[0.3em] text-[#C9A876] uppercase mb-4 font-sans-body">
            A LITTLE ABOUT ME
          </div>
          
          <h2 className="scroll-reveal font-serif-display text-[clamp(2.2rem,5vw,3.5rem)] font-light text-[#F4F1EA] leading-tight mb-8">
            Where Technology meets Visual Creativity.
          </h2>

          <div className="scroll-reveal w-20 h-[1px] bg-[#C9A876] mb-8" />

          <p className="scroll-reveal font-sans-body text-base md:text-lg text-[#8C877C] leading-relaxed mb-6">
            Thanushika is a BSc (Hons) IT student from Sri Lanka with a strong interest in software development, artificial intelligence, IoT, automation, interactive interfaces, and creative technology.
          </p>
          
          <p className="scroll-reveal font-sans-body text-base text-[#8C877C] leading-relaxed">
            He also works with photography, allowing technology and visual creativity to exist side by side — one discipline sharpening the other. He combines analytical systems development with the creative eye required for cinematic photography.
          </p>
        </div>

        {/* Right Column: Three Themes Grid with Gold Dividers */}
        <div className="lg:col-span-6 flex flex-col gap-8 w-full">
          
          {/* Theme 1: Technology */}
          <div className="scroll-reveal border-t border-[rgba(201,168,118,0.18)] pt-6 flex flex-col md:flex-row gap-4 justify-between items-start">
            <div className="w-6 font-serif-display text-[#C9A876] text-xl font-light">I</div>
            <div className="flex-1">
              <h3 className="font-serif-display text-xl text-[#F4F1EA] mb-2 font-medium">Technology</h3>
              <p className="font-sans-body text-xs md:text-sm text-[#8C877C] leading-relaxed">
                Building efficient, scalable code solutions across web platforms, desktop ERPs, and embedded systems frameworks.
              </p>
            </div>
          </div>

          {/* Theme 2: Innovation */}
          <div className="scroll-reveal border-t border-[rgba(201,168,118,0.18)] pt-6 flex flex-col md:flex-row gap-4 justify-between items-start">
            <div className="w-6 font-serif-display text-[#C9A876] text-xl font-light">II</div>
            <div className="flex-1">
              <h3 className="font-serif-display text-xl text-[#F4F1EA] mb-2 font-medium">Innovation</h3>
              <p className="font-sans-body text-xs md:text-sm text-[#8C877C] leading-relaxed">
                Integrating AI agents, computer vision classifiers, and physical microcontrollers to solve everyday interface problems.
              </p>
            </div>
          </div>

          {/* Theme 3: Creativity */}
          <div className="scroll-reveal border-t border-b border-[rgba(201,168,118,0.18)] pt-6 pb-6 flex flex-col md:flex-row gap-4 justify-between items-start">
            <div className="w-6 font-serif-display text-[#C9A876] text-xl font-light">III</div>
            <div className="flex-1">
              <h3 className="font-serif-display text-xl text-[#F4F1EA] mb-2 font-medium">Creativity</h3>
              <p className="font-sans-body text-xs md:text-sm text-[#8C877C] leading-relaxed">
                Capturing emotion through the photography lens and designing tactile, interactive web interfaces with subtle motion details.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
