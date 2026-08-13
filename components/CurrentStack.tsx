"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const stackGroups = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "Java", "C++ (Arduino)", "SQL", "HTML5 & CSS3"],
  },
  {
    category: "Frontend & Web",
    skills: ["React", "Next.js (App Router)", "Tailwind CSS", "GSAP & ScrollTrigger", "Lenis", "Framer Motion"],
  },
  {
    category: "Backend & Systems",
    skills: ["Node.js", "Express", "RESTful APIs", "Electron ERPs", "Java Swing (Desktop)"],
  },
  {
    category: "Databases & ORMs",
    skills: ["PostgreSQL", "MySQL", "Prisma ORM", "SQLite", "InfluxDB (Time Series)", "JDBC Client Connection", "Redis Caching"],
  },
  {
    category: "Artificial Intelligence",
    skills: ["LangChain pipelines", "Azure OpenAI Integration", "OpenCV Classifiers", "MediaPipe (Landmark Tracking)"],
  },
  {
    category: "IoT & Hardware",
    skills: ["ESP32 DevBoards", "ESP8266 Modules", "LD2410C Presence Sensors", "MQTT Protocols", "Relay Control Matrices"],
  },
  {
    category: "Tools & Ecosystem",
    skills: ["Git & GitHub", "Vercel Deployments", "npm & Node Package Ecosystem", "OBS Studio Stream Sync", "PayHere Billing Gateway"],
  },
];

export default function CurrentStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = containerRef.current?.querySelectorAll(".stack-row");
      if (rows && rows.length > 0) {
        gsap.fromTo(
          rows,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
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
      className="relative w-full py-24 px-6 md:px-12 bg-[#15130F] border-t border-b border-[rgba(201,168,118,0.08)]"
    >
      <div className="max-w-[1400px] mx-auto w-full flex flex-col">
        
        {/* Title */}
        <div className="text-[11px] font-bold tracking-[0.3em] text-[#C9A876] uppercase mb-4 font-sans-body">
          TECHNOLOGY MATRIX
        </div>
        <h2 className="font-serif-display text-[clamp(2.2rem,5vw,3.5rem)] font-light text-[#F4F1EA] mb-16">
          Current Stack
        </h2>

        {/* List grouped by rows */}
        <div className="flex flex-col gap-10 w-full">
          {stackGroups.map((group, idx) => (
            <div
              key={idx}
              className="stack-row flex flex-col md:flex-row md:items-center gap-4 md:gap-8 border-b border-[rgba(201,168,118,0.06)] pb-6"
            >
              {/* Category Name */}
              <div className="md:w-64 flex-shrink-0">
                <h3 className="font-serif-display text-lg text-[#F4F1EA] font-light">
                  {group.category}
                </h3>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 bg-[#1E1B15] text-[#8C877C] hover:text-[#C9A876] hover:border-[#C9A876] transition-all duration-300 text-[10px] font-bold tracking-wider font-sans-body border border-[rgba(201,168,118,0.08)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
