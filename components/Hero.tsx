"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Pre-defined static values for glowing elements to avoid hydration mismatch
const glowItems = [
  { size: 160, left: 15, top: 20, speed: 30, delay: -5, opacity: 0.02 },
  { size: 280, left: 70, top: 30, speed: 40, delay: -12, opacity: 0.015 },
  { size: 200, left: 40, top: 65, speed: 35, delay: -8, opacity: 0.02 }
];

const dustItems = [
  { size: 3, left: 8, top: 75, speed: 12, delay: -1, opacity: 0.35 },
  { size: 4, left: 22, top: 45, speed: 15, delay: -5, opacity: 0.25 },
  { size: 2, left: 38, top: 85, speed: 10, delay: -3, opacity: 0.4 },
  { size: 5, left: 50, top: 25, speed: 18, delay: -8, opacity: 0.22 },
  { size: 3, left: 62, top: 65, speed: 14, delay: -2, opacity: 0.3 },
  { size: 4, left: 78, top: 15, speed: 16, delay: -11, opacity: 0.25 },
  { size: 2, left: 92, top: 55, speed: 11, delay: -4, opacity: 0.4 },
  { size: 5, left: 85, top: 80, speed: 17, delay: -7, opacity: 0.22 }
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLSpanElement>(null);
  const title2Ref = useRef<HTMLSpanElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const portraitContainerRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create initial states
      gsap.set([title1Ref.current, title2Ref.current], { yPercent: 100 });
      gsap.set(eyebrowRef.current, { opacity: 0, y: 15 });
      gsap.set(descRef.current, { opacity: 0, y: 20 });
      gsap.set(ctasRef.current, { opacity: 0, y: 20 });
      gsap.set(portraitContainerRef.current, { opacity: 0, scale: 1.05 });

      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(eyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(
          [title1Ref.current, title2Ref.current],
          {
            yPercent: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
          },
          "-=0.5"
        )
        .to(
          portraitContainerRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
          },
          "-=1.0"
        )
        .to(
          [descRef.current, ctasRef.current],
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.8"
        );

      // Grayscale to warm color tone reveal on portrait image
      gsap.fromTo(
        portraitRef.current,
        { filter: "grayscale(100%) contrast(90%)" },
        {
          filter: "grayscale(25%) contrast(105%)",
          duration: 2.0,
          delay: 1.2,
          ease: "power2.out",
        }
      );

      // Parallax scroll effect on portrait
      gsap.to(portraitContainerRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, selector: string) => {
    e.preventDefault();
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-[100svh] w-full flex items-center justify-center pt-24 px-6 md:px-12 overflow-hidden bg-[#0A0908]"
    >
      {/* Ambient Moving Elements (Soft Glow Spheres & Floating Gold Dust) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        
        {/* Soft Golden Ambient Glow Spots */}
        {glowItems.map((item, index) => (
          <div
            key={`glow-${index}`}
            className="absolute rounded-full bg-[#C9A876] blur-[80px] opacity-10 pointer-events-none mix-blend-screen"
            style={{
              width: `${item.size}px`,
              height: `${item.size}px`,
              left: `${item.left}%`,
              top: `${item.top}%`,
              opacity: item.opacity,
              animation: `float-bokeh ${item.speed}s ease-in-out infinite alternate`,
              animationDelay: `${item.delay}s`,
            }}
          />
        ))}

        {/* Floating Embers / Golden Dust Particles */}
        {dustItems.map((item, index) => (
          <div
            key={`dust-${index}`}
            className="absolute rounded-full bg-[#C9A876] pointer-events-none shadow-[0_0_8px_rgba(201,168,118,0.8)]"
            style={{
              width: `${item.size}px`,
              height: `${item.size}px`,
              left: `${item.left}%`,
              top: `${item.top}%`,
              opacity: item.opacity,
              animation: `float-dust ${item.speed}s linear infinite`,
              animationDelay: `${item.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Column: Typography Content */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Eyebrow */}
          <div
            ref={eyebrowRef}
            className="text-[11px] font-bold tracking-[0.3em] text-[#C9A876] uppercase mb-6 font-sans-body"
          >
            DIGITAL CREATOR &middot; DEVELOPER &middot; PHOTOGRAPHER
          </div>

          {/* Name Display */}
          <h1 className="text-left font-serif-display leading-[0.9] mb-8 select-none">
            <span className="block overflow-hidden h-[clamp(3.5rem,10vw,8rem)]">
              <span ref={title1Ref} className="block text-[clamp(3.5rem,9.5vw,7.5rem)] font-light text-[#F4F1EA]">
                THANUSHIKA
              </span>
            </span>
            <span className="block overflow-hidden h-[clamp(3.5rem,10vw,8rem)]">
              <span ref={title2Ref} className="block text-[clamp(3.5rem,9.5vw,7.5rem)] font-medium text-[#C9A876]">
                MADHUSITH
              </span>
            </span>
          </h1>

          {/* Professional Statement */}
          <p
            ref={descRef}
            className="text-base md:text-lg text-[#8C877C] font-sans-body max-w-lg mb-10 leading-relaxed"
          >
            I build digital experiences where technology meets creativity. BSc (Hons) IT student specializing in software engineering, intelligent systems, and cinematic storytelling.
          </p>

          {/* CTAs */}
          <div ref={ctasRef} className="flex flex-wrap items-center gap-6">
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, "#about")}
              className="px-8 py-4 border border-[#C9A876] text-[#C9A876] text-xs font-bold tracking-[0.2em] font-sans-body hover:bg-[#C9A876] hover:text-[#0A0908] transition-all duration-300"
            >
              EXPLORE MY WORLD
            </a>
            <a
              href="#work"
              onClick={(e) => scrollToSection(e, "#work")}
              className="text-[#F4F1EA] hover:text-[#C9A876] text-xs font-bold tracking-[0.2em] font-sans-body py-4 relative after:content-[''] after:absolute after:bottom-2 after:left-0 after:w-full after:h-[1px] after:bg-[#F4F1EA] hover:after:bg-[#C9A876] after:transition-colors duration-300"
            >
              VIEW PROJECTS &rarr;
            </a>
          </div>
        </div>

        {/* Right Column: Portrait/Lens Display Frame */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div
            ref={portraitContainerRef}
            className="relative w-full max-w-[420px] aspect-[3/4] border border-[rgba(201,168,118,0.15)] bg-[#15130F] p-4 group select-none overflow-hidden photo-glow-frame"
          >
            {/* Ambient gold glow behind the frame */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(201,168,118,0.04)] to-transparent pointer-events-none" />

            <div className="relative w-full h-full border border-[rgba(201,168,118,0.1)] overflow-hidden flex items-center justify-center bg-[#0C0B0A]">
              
              {/* Processed Portrait Image */}
              <Image
                ref={portraitRef}
                src="/images/portrait.png"
                alt="Thanushika Madhusith Portrait"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                style={{ filter: "grayscale(100%) contrast(90%)" }}
              />

              {/* Decorative HUD ticks and lens readings */}
              <div className="absolute top-4 left-4 font-sans-body text-[8px] text-[#F4F1EA] tracking-widest z-10 drop-shadow-md">
                F/1.8 &middot; 50MM
              </div>
              <div className="absolute bottom-4 right-4 font-sans-body text-[8px] text-[#F4F1EA] tracking-widest z-10 drop-shadow-md">
                ISO 400 &middot; 1/250S
              </div>
              
              {/* Editorial vertical text */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 font-sans-body text-[7px] text-[rgba(201,168,118,0.35)] tracking-[0.4em] uppercase rotate-90 origin-right z-10 drop-shadow-md">
                PHOTOGRAPHY &middot; TECHNOLOGY
              </div>

              {/* Subtle glass reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(255,255,255,0.03)] to-[rgba(251,248,240,0.05)] pointer-events-none z-10" />
            </div>
            
            {/* Hairline corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#C9A876]" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#C9A876]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#C9A876]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#C9A876]" />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
        <span className="font-sans-body text-[9px] font-bold tracking-[0.3em] text-[#C9A876]">SCROLL</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#C9A876] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
