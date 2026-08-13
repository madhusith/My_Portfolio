"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { projects, Project } from "@/lib/projects";
import ProjectCaseStudy from "./ProjectCaseStudy";

export default function ProjectsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const panels = containerRef.current?.querySelectorAll(".project-panel");
      if (panels && panels.length > 0) {
        panels.forEach((panel, index) => {
          const isEven = index % 2 === 0;
          const wrapper = panel.querySelector(".visual-card-wrapper");
          const inner = panel.querySelector(".visual-card-inner");
          const textElements = panel.querySelectorAll(".reveal-element");

          // 1. Staggered text reveals
          gsap.fromTo(
            textElements,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );

          if (prefersReducedMotion) {
            if (wrapper) gsap.set(wrapper, { clipPath: "inset(0% 0% 0% 0%)" });
            return;
          }

          // 2. Camera Exposure Shutter slide open for cards
          if (wrapper) {
            gsap.fromTo(
              wrapper,
              {
                clipPath: isEven ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)",
              },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.4,
                ease: "power3.inOut",
                scrollTrigger: {
                  trigger: panel,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          // 3. Subtle Parallax offset on visual details
          if (inner) {
            gsap.fromTo(
              inner,
              { yPercent: 10 },
              {
                yPercent: -10,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Procedural visual layout mockups matching each project
  const renderVisualMockup = (projectId: string) => {
    switch (projectId) {
      case "valuflow":
        return (
          <div className="relative w-full h-full flex flex-col justify-center gap-4 p-8 bg-[#15130F] font-mono text-[9px] text-[#8C877C] overflow-hidden select-none border border-[rgba(201,168,118,0.15)]">
            <div className="text-[#C9A876] font-bold border-b border-[rgba(201,168,118,0.15)] pb-2 flex items-center justify-between">
              <span>WORKFLOW ENGINE V1.0</span>
              <span className="animate-pulse text-green-500 font-sans text-[7px]">&bull; ACTIVE</span>
            </div>
            
            <div className="flex gap-4 items-center">
              <div className="p-2 border border-[#C9A876] w-24 text-center text-[#F4F1EA]">INCOMING FILE</div>
              <div className="text-xl text-[#C9A876]">&rarr;</div>
              <div className="p-2 border border-[#C9A876]/40 w-24 text-center">AI SCAN</div>
              <div className="text-xl text-[#C9A876]">&rarr;</div>
              <div className="p-2 border border-[#C9A876]/40 w-24 text-center">AUTO ROUTE</div>
            </div>
            
            <div className="flex flex-col gap-2 mt-4">
              <div className="w-full bg-[rgba(201,168,118,0.06)] p-2 border-l border-[#C9A876] text-xxs leading-relaxed">
                <span className="text-[#C9A876]">LANGCHAIN RUN:</span> Valuation doc summarized. Confidence: 94%. Appraiser assigned: R048-Colombo. Status: Queue.
              </div>
              <div className="w-fit border border-green-500/20 text-green-500/60 px-2 py-0.5 text-[8px]">
                SOCKETS: 12 clients connected
              </div>
            </div>
          </div>
        );
      case "wishwin":
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-8 bg-[#15130F] overflow-hidden select-none border border-[rgba(201,168,118,0.15)]">
            <div className="flex justify-between items-center text-[9px] text-[#8C877C] font-mono">
              <span className="text-[#C9A876]">WISHWIN LMS v2</span>
              <span>LIVE: PHYSICS GRADE 13</span>
            </div>

            {/* Video HUD overlay */}
            <div className="relative flex-1 my-4 border border-[rgba(201,168,118,0.1)] flex items-center justify-center bg-[#0C0B0A]">
              <div className="absolute top-2 left-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="font-mono text-[7px] text-red-500 font-bold">REC OBS STREAM</span>
              </div>
              <div className="text-center font-serif-display text-lg text-[#C9A876] tracking-widest font-light">
                [ SECURE PLAYER CONTENT ]
              </div>
              <div className="absolute bottom-2 right-2 text-[8px] text-[#8C877C] font-mono">
                Sinhala TTS Enabled
              </div>
            </div>

            <div className="flex justify-between items-center text-[9px] font-mono text-[#8C877C]">
              <span>Gamification: Level 14</span>
              <span className="text-green-500/60 font-bold">Weak Area Alert: Optics</span>
            </div>
          </div>
        );
      case "jarvis":
        return (
          <div className="relative w-full h-full flex items-center justify-center p-8 bg-[#15130F] overflow-hidden select-none border border-[rgba(201,168,118,0.15)]">
            {/* Hand Landmark Skeleton Representation */}
            <svg className="w-[60%] h-auto text-[#C9A876] opacity-60" viewBox="0 0 100 100" fill="none">
              {/* Hand bones */}
              <circle cx="50" cy="90" r="2" fill="currentColor" /> {/* Wrist */}
              
              <circle cx="50" cy="65" r="1.5" fill="currentColor" />
              <circle cx="50" cy="50" r="1.5" fill="currentColor" />
              <circle cx="50" cy="35" r="1.5" fill="currentColor" />
              <circle cx="50" cy="20" r="2" fill="currentColor" /> {/* Middle Tip */}
              
              <circle cx="35" cy="68" r="1.5" fill="currentColor" />
              <circle cx="25" cy="55" r="1.5" fill="currentColor" />
              <circle cx="18" cy="40" r="1.5" fill="currentColor" />
              <circle cx="12" cy="28" r="2" fill="currentColor" /> {/* Index Tip */}
              
              <circle cx="65" cy="70" r="1.5" fill="currentColor" />
              <circle cx="75" cy="58" r="1.5" fill="currentColor" />
              <circle cx="82" cy="46" r="1.5" fill="currentColor" />
              <circle cx="88" cy="35" r="2" fill="currentColor" /> {/* Ring Tip */}

              {/* Connecting lines */}
              <path d="M 50 90 L 50 65 L 50 50 L 50 35 L 50 20" stroke="currentColor" strokeWidth="0.5" />
              <path d="M 50 90 L 35 68 L 25 55 L 18 40 L 12 28" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
              <path d="M 50 90 L 65 70 L 75 58 L 82 46 L 88 35" stroke="currentColor" strokeWidth="0.5" />

              {/* Cursor mapping target */}
              <circle cx="12" cy="28" r="6" stroke="#E8D9BC" strokeWidth="0.5" className="animate-ping" />
            </svg>

            <div className="absolute top-4 left-4 font-mono text-[8px] text-[#8C877C] tracking-widest">
              OPENCV &bull; 60 FPS &bull; PINCH-CLICK
            </div>
          </div>
        );
      case "smartbulb":
        return (
          <div className="relative w-full h-full flex flex-col justify-center items-center gap-6 p-8 bg-[#15130F] overflow-hidden select-none border border-[rgba(201,168,118,0.15)]">
            {/* IoT Device visualization */}
            <div className="relative flex flex-col items-center">
              {/* ESP32 Chip schematic */}
              <div className="w-20 h-28 border border-[rgba(201,168,118,0.3)] bg-[#0C0B0A] flex flex-col items-center justify-between p-3 font-mono text-[7px] text-[#8C877C]">
                <span>ESP32-WROOM</span>
                <div className="w-12 h-12 border border-dashed border-[#C9A876] rounded-full flex items-center justify-center text-[#C9A876] text-[8px] font-bold">
                  mmWave
                </div>
                <span>LD2410C</span>
              </div>
              {/* Radar waves simulation */}
              <div className="absolute -top-6 w-32 h-32 border-t border-dashed border-[#C9A876]/30 rounded-full animate-ping pointer-events-none" />
              <div className="absolute -top-10 w-40 h-40 border-t border-dashed border-[#C9A876]/10 rounded-full animate-pulse pointer-events-none" />
            </div>

            <div className="font-mono text-[8px] text-[#8C877C] tracking-widest">
              MQTT: ONLINE &bull; STABLE &bull; OCCUPANCY: 1
            </div>
          </div>
        );
      case "teafactory":
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-8 bg-[#15130F] overflow-hidden select-none border border-[rgba(201,168,118,0.15)] font-mono text-[9px] text-[#8C877C]">
            <div className="flex justify-between items-center text-[#C9A876]">
              <span>TROUGH 04 CLIMATE</span>
              <span>DHT22 MESH</span>
            </div>

            {/* Simulated monitor waves */}
            <div className="flex items-end gap-1 h-20 border-b border-[rgba(201,168,118,0.15)] pb-2">
              <div className="w-full bg-[#C9A876]/20 h-[30%]"></div>
              <div className="w-full bg-[#C9A876]/40 h-[45%]"></div>
              <div className="w-full bg-[#C9A876]/30 h-[60%]"></div>
              <div className="w-full bg-[#C9A876]/70 h-[80%]"></div>
              <div className="w-full bg-[#C9A876]/50 h-[50%]"></div>
              <div className="w-full bg-red-500/80 h-[92%] animate-pulse"></div> {/* Spike threshold */}
              <div className="w-full bg-[#C9A876]/60 h-[70%]"></div>
            </div>

            <div className="flex justify-between items-center text-[8px]">
              <span>TEMP: 28.4°C</span>
              <span className="text-red-400 font-bold">ALARM: WITHERS HUMIDITY EXCEEDED (88%)</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="relative w-full h-full flex flex-col justify-center items-center p-8 bg-[#15130F] overflow-hidden select-none border border-[rgba(201,168,118,0.15)] font-mono text-[#8C877C] text-[10px]">
            <div className="w-16 h-16 border border-[#C9A876]/30 rounded-full flex items-center justify-center mb-4 text-[#C9A876]">
              &lt;/&gt;
            </div>
            <span>SYSTEM CONSOLE v1.0</span>
            <span className="text-[#C9A876] mt-2">QUERY &bull; RENDER &bull; COMPILE</span>
          </div>
        );
    }
  };

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative w-full min-h-screen py-24 px-6 md:px-12 bg-[#0A0908]"
    >
      <div className="max-w-[1400px] mx-auto w-full flex flex-col">
        
        {/* Section Header */}
        <div className="text-[11px] font-bold tracking-[0.3em] text-[#C9A876] uppercase mb-4 font-sans-body">
          PORTFOLIO
        </div>
        <h2 className="font-serif-display text-[clamp(2.2rem,5vw,3.5rem)] font-light text-[#F4F1EA] mb-20">
          Selected Work
        </h2>

        {/* Asymmetrical grid panels */}
        <div className="flex flex-col gap-24 lg:gap-32 w-full">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={project.id}
                className="project-panel w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
              >
                
                {/* Visual card column (alternates left/right on desktop) */}
                <div
                  data-cursor="view"
                  onClick={() => setActiveProject(project)}
                  className={`visual-card-wrapper lg:col-span-6 w-full aspect-[4/3] relative overflow-hidden cursor-pointer ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="visual-card-inner w-full h-full relative flex items-center justify-center p-3">
                    {renderVisualMockup(project.id)}
                    
                    {/* Decorative corner highlights */}
                    <div className="absolute top-3 left-3 w-1.5 h-1.5 border-t border-l border-[#C9A876] opacity-65" />
                    <div className="absolute top-3 right-3 w-1.5 h-1.5 border-t border-r border-[#C9A876] opacity-65" />
                    <div className="absolute bottom-3 left-3 w-1.5 h-1.5 border-b border-l border-[#C9A876] opacity-65" />
                    <div className="absolute bottom-3 right-3 w-1.5 h-1.5 border-b border-r border-[#C9A876] opacity-65" />
                  </div>
                </div>

                {/* Text explanation column */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-center ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="reveal-element text-[10px] font-bold tracking-[0.25em] text-[#C9A876] uppercase mb-4 font-sans-body">
                    {project.category}
                  </div>
                  
                  <h3 className="reveal-element font-serif-display text-3xl md:text-4xl font-light text-[#F4F1EA] leading-tight mb-6">
                    <span className="text-[#C9A876]/40 italic font-light mr-4 font-serif-display text-2xl">
                      {project.number}
                    </span>
                    {project.name}
                  </h3>

                  <p className="reveal-element font-sans-body text-sm md:text-base text-[#8C877C] leading-relaxed mb-8">
                    {project.tagline} {project.description.slice(0, 100)}...
                  </p>

                  {/* Core stack labels */}
                  <div className="reveal-element flex flex-wrap gap-2 mb-8">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 border border-[rgba(201,168,118,0.1)] text-[#8C877C] text-[10px] tracking-wider font-bold font-sans-body"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA button */}
                  <button
                    onClick={() => setActiveProject(project)}
                    className="reveal-element w-fit text-[#C9A876] hover:text-[#E8D9BC] text-xs font-bold tracking-[0.2em] font-sans-body py-2 border-b border-transparent hover:border-[#E8D9BC] transition-all duration-300"
                  >
                    VIEW PROJECT &rarr;
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      {activeProject && (
        <ProjectCaseStudy
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}
