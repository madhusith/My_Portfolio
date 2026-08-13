"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const skillsData = [
  {
    category: "Software Development",
    stack: "React, Next.js, Node.js, TypeScript, Java, Electron, C++, Python, Electron ERPs",
  },
  {
    category: "Databases & ORMs",
    stack: "PostgreSQL, MySQL, SQLite, Prisma ORM, InfluxDB time-series, JDBC, Redis caching",
  },
  {
    category: "AI & Intelligent Systems",
    stack: "LangChain pipelines, Azure OpenAI, computer vision (OpenCV), face/gesture tracking (MediaPipe)",
  },
  {
    category: "Real-Time & Infrastructure",
    stack: "Socket.IO sync, MQTT messaging, Express servers, REST APIs, local database clustering",
  },
  {
    category: "Internet of Things (IoT)",
    stack: "ESP32 nodes, ESP8266 mesh, LD2410C millimeter-wave presence, automation sensors, relay control",
  },
];

export default function WhatIBuild() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = rowsRef.current?.querySelectorAll(".skill-row");
      if (rows && rows.length > 0) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
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
      id="skills"
      className="relative min-h-screen w-full flex items-center justify-center py-24 px-6 md:px-12 bg-[#0A0908] overflow-hidden"
    >
      {/* Background Vertical Flow Line linking sections */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-[rgba(201,168,118,0.4)] via-[rgba(201,168,118,0.06)] to-[rgba(201,168,118,0.4)] pointer-events-none z-0 hidden lg:block">
        {/* Technical diamond guide ticks along the vertical thread */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border border-[#C9A876]/40 rotate-45 bg-[#0A0908]" />
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border border-[#C9A876]/40 rotate-45 bg-[#0A0908]" />
        
        {/* Centered camera focal target ornament in the middle of the flow line */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-[#C9A876]/15 rounded-full flex items-center justify-center bg-[#0A0908] z-10 shadow-[0_0_15px_rgba(0,0,0,0.8)]">
          <div className="w-8 h-8 border border-dashed border-[#C9A876]/25 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
            <div className="w-2 h-2 border border-[#C9A876]/30 rounded-full flex items-center justify-center">
              <div className="w-0.5 h-0.5 bg-[#C9A876]/50 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] w-full flex flex-col justify-start z-10">
        
        {/* Title */}
        <div className="text-[11px] font-bold tracking-[0.3em] text-[#C9A876] uppercase mb-4 font-sans-body">
          CAPABILITIES
        </div>
        
        <h2 className="font-serif-display text-[clamp(2.2rem,5vw,3.5rem)] font-light text-[#F4F1EA] mb-16">
          What I Build
        </h2>

        {/* Large Typographic Skill Rows */}
        <div ref={rowsRef} className="flex flex-col w-full">
          {skillsData.map((skill, index) => (
            <div
              key={index}
              className="skill-row group relative w-full border-t border-[rgba(201,168,118,0.15)] py-8 md:py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-colors duration-300 hover:bg-[rgba(21,19,15,0.4)] px-4"
            >
              {/* Gold overlay line that expands on hover */}
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-[#C9A876] transition-all duration-500 ease-out group-hover:w-full" />
              
              {/* Category Name */}
              <div className="flex items-center gap-6">
                <span className="font-serif-display text-[#C9A876] text-sm opacity-60">
                  0{index + 1}
                </span>
                <h3 className="font-serif-display text-2xl md:text-3xl lg:text-4xl font-light text-[#F4F1EA] group-hover:text-[#E8D9BC] transition-colors duration-300">
                  {skill.category}
                </h3>
              </div>

              {/* Skill Stack details */}
              <div className="lg:max-w-xl xl:max-w-2xl">
                <p className="font-sans-body text-xs md:text-sm text-[#8C877C] group-hover:text-[#F4F1EA] transition-colors duration-300 leading-relaxed">
                  {skill.stack}
                </p>
              </div>

              {/* Micro interactive arrow */}
              <div className="hidden lg:block text-[#C9A876] opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </div>
          ))}

          {/* Bottom boundary line */}
          <div className="border-t border-[rgba(201,168,118,0.15)] w-full" />
        </div>
      </div>
    </section>
  );
}
