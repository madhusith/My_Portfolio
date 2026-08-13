"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const journeySteps = [
  {
    phase: "01",
    title: "Programming Fundamentals",
    focus: "Basic structures, algorithms, and logical problem solving.",
    tech: "Java, C++, python basics",
  },
  {
    phase: "02",
    title: "Software Engineering",
    focus: "Object-oriented design patterns, MVC structures, and database engines.",
    tech: "Java, Java Swing, MySQL",
  },
  {
    phase: "03",
    title: "Database Architecture",
    focus: "Relational database models, indexes, triggers, and transactions optimization.",
    tech: "PostgreSQL, MySQL, Prisma",
  },
  {
    phase: "04",
    title: "Web Platforms",
    focus: "Responsive design systems, client-server synchronization, and single page applications.",
    tech: "React, Next.js, Node.js, Socket.IO",
  },
  {
    phase: "05",
    title: "Physical Computing (IoT)",
    focus: "Firmware routines, microcontrollers mesh, and smart sensor telemetry reporting.",
    tech: "ESP32, ESP8266, mmWave, MQTT",
  },
  {
    phase: "06",
    title: "Artificial Intelligence",
    focus: "LLM agents execution pipelines, dynamic context structures, and AI embeddings.",
    tech: "LangChain, Azure OpenAI",
  },
  {
    phase: "07",
    title: "Computer Vision",
    focus: "Real-time image matrix classification, spatial coordinates tracking, and HCI gesture mappings.",
    tech: "OpenCV, MediaPipe, Python",
  },
  {
    phase: "08",
    title: "Creative Technology",
    focus: "Aesthetic interfaces, cinematic lighting interactions, and micro-scroll animations.",
    tech: "WebGL shaders, GSAP, Lens dynamics",
  },
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(".journey-item");
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
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
      id="journey"
      className="relative w-full py-24 px-6 md:px-12 bg-[#0A0908]"
    >
      <div className="max-w-[1400px] mx-auto w-full flex flex-col">
        
        {/* Title */}
        <div className="text-[11px] font-bold tracking-[0.3em] text-[#C9A876] uppercase mb-4 font-sans-body">
          CONTINUOUS DISCOVERY
        </div>
        <h2 className="font-serif-display text-[clamp(2.2rem,5vw,3.5rem)] font-light text-[#F4F1EA] mb-6">
          The Journey
        </h2>
        <p className="font-sans-body text-xs md:text-sm text-[#8C877C] max-w-lg mb-16 leading-relaxed">
          Framed as continuous exploration and learning, mapping new capabilities over semesters.
        </p>

        {/* Step Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {journeySteps.map((step) => (
            <div
              key={step.phase}
              className="journey-item flex flex-col justify-between border-l border-[rgba(201,168,118,0.18)] pl-6 py-4 hover:border-[#C9A876] transition-colors duration-300"
            >
              <div>
                <span className="font-serif-display text-sm text-[#C9A876]/40 block mb-3">
                  Phase {step.phase}
                </span>
                <h3 className="font-serif-display text-lg text-[#F4F1EA] font-medium mb-3">
                  {step.title}
                </h3>
                <p className="font-sans-body text-xs text-[#8C877C] leading-relaxed mb-4">
                  {step.focus}
                </p>
              </div>
              
              <div>
                <span className="font-mono text-[8px] tracking-wider text-[#C9A876]/60 uppercase">
                  Stack: {step.tech}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
