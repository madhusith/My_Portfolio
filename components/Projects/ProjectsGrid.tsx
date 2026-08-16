"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { projects, Project } from "@/lib/projects";
import ProjectCaseStudy from "./ProjectCaseStudy";

export default function ProjectsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const doorsTriggerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // 1. Vault Doors Entrance Slide (Only for desktop)
      const isMobile = window.innerWidth < 1024;
      if (!isMobile && !prefersReducedMotion) {
        const leftDoor = doorsTriggerRef.current?.querySelector(".left-door");
        const rightDoor = doorsTriggerRef.current?.querySelector(".right-door");

        if (leftDoor && rightDoor) {
          const doorsTl = gsap.timeline({
            scrollTrigger: {
              trigger: doorsTriggerRef.current,
              start: "top top",
              end: "bottom top",
              pin: true,
              scrub: true,
              anticipatePin: 1,
            },
          });

          doorsTl.to(leftDoor, {
            xPercent: -100,
            ease: "power2.inOut",
          }, 0)
          .to(rightDoor, {
            xPercent: 100,
            ease: "power2.inOut",
          }, 0);
        }
      }

      // 2. Individual Project Panels
      const panels = containerRef.current?.querySelectorAll(".project-panel");
      if (panels && panels.length > 0) {
        panels.forEach((panel, index) => {
          const isEven = index % 2 === 0;
          const wrapper = panel.querySelector(".visual-card-wrapper");
          const inner = panel.querySelector(".visual-card-inner");
          const textElements = panel.querySelectorAll(".reveal-element");

          // Staggered text reveals
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

          // Camera Exposure Shutter slide open for cards
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

          // Parallax offset on visual details
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
  const renderVisualMockup = (project: Project) => {
    if (project.image) {
      return (
        <div className="relative w-full h-full overflow-hidden border border-[rgba(201,168,118,0.15)] bg-[#0C0B0A] group/card photo-glow-frame">
          <Image
            src={project.image}
            alt={`${project.name} Screenshot`}
            fill
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
          />
          {/* Subtle dark gradient overlay and vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908]/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover/card:opacity-40" />
        </div>
      );
    }

    switch (project.id) {
      case "neuromatch":
        return (
          <div className="relative w-full h-full flex flex-col justify-center gap-4 p-8 bg-[#15130F] font-mono text-[9px] text-[#8C877C] overflow-hidden select-none border border-[rgba(201,168,118,0.15)]">
            <div className="text-[#C9A876] font-bold border-b border-[rgba(201,168,118,0.15)] pb-2 flex items-center justify-between">
              <span>NEURO MATCH ENGINE v1.2</span>
              <span className="text-green-500 font-sans text-[7px]">&bull; COMPILED NATIVE</span>
            </div>
            
            <div className="grid grid-cols-4 gap-2 w-fit mx-auto my-2">
              {["[A]", "[B]", "[?]", "[A]", "[?]", "[C]", "[B]", "[?]", "[C]", "[?]", "[?]", "[?]"].map((card, i) => {
                const isMatched = card === "[A]" || card === "[B]" || card === "[C]";
                return (
                  <div
                    key={i}
                    className={`w-10 h-8 border flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                      isMatched
                        ? "border-[#C9A876] bg-[#C9A876]/10 text-[#C9A876] shadow-[0_0_8px_rgba(201,168,118,0.1)]"
                        : "border-[#8C877C]/30 text-[#8C877C]/40"
                    }`}
                  >
                    {card}
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-between items-center text-[7px] border-t border-[rgba(201,168,118,0.1)] pt-2 mt-2">
              <span>Moves: 14</span>
              <span className="text-[#C9A876]">Accuracy: 84.6%</span>
              <span>Latency: 284ms</span>
            </div>
          </div>
        );
      case "clothingwarehouse":
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-8 bg-[#15130F] font-mono text-[9px] text-[#8C877C] overflow-hidden select-none border border-[rgba(201,168,118,0.15)]">
            <div className="text-[#C9A876] font-bold border-b border-[rgba(201,168,118,0.15)] pb-2 flex items-center justify-between">
              <span>WAREHOUSE TRANSACTION MANAGER</span>
              <span className="text-blue-400 font-sans text-[7px]">&bull; JDBC CONNECTED</span>
            </div>
            
            <div className="flex flex-col gap-2 my-2">
              <div className="flex justify-between items-center bg-[#1E1B15] p-2 border-l-2 border-[#C9A876] text-xxs">
                <span>TXT-LINEN-BLU-42</span>
                <span className="text-[#F4F1EA] font-bold">1,250 YARDS</span>
                <span className="text-green-500/80 font-bold">IN STOCK</span>
              </div>
              <div className="flex justify-between items-center bg-[#1E1B15]/50 p-2 border-l-2 border-[#8C877C]/30 text-xxs">
                <span>TXT-COTTON-RED-08</span>
                <span className="text-[#8C877C] font-bold">340 YARDS</span>
                <span className="text-amber-500/80 font-bold">LOW STOCK</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-[7px] border-t border-[rgba(201,168,118,0.1)] pt-2 mt-2">
              <span>Active Suppliers: 12</span>
              <span>DB Status: MySQL Stable</span>
              <span className="text-[#C9A876]">PDF Report Ready</span>
            </div>
          </div>
        );
      case "bookshoperp":
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-8 bg-[#15130F] font-mono text-[9px] text-[#8C877C] overflow-hidden select-none border border-[rgba(201,168,118,0.15)]">
            <div className="text-[#C9A876] font-bold border-b border-[rgba(201,168,118,0.15)] pb-2 flex items-center justify-between">
              <span>BOOKSHOP ERP // POINT OF SALE</span>
              <span className="text-green-400 font-sans text-[7px]">&bull; ELECTRON APPLIANCE</span>
            </div>
            
            <div className="flex gap-4 items-center my-3">
              <div className="flex-1 border border-[rgba(201,168,118,0.15)] p-2 bg-[#0C0B0A]">
                <div className="text-[7px] text-[#8C877C] uppercase">Active Invoice</div>
                <div className="text-[#F4F1EA] font-bold text-[10px] mt-1">$142.50</div>
                <div className="text-[6px] text-green-500/60 mt-0.5">3 Items Pending Print</div>
              </div>
              <div className="w-16 h-8 border border-[#C9A876]/40 flex flex-col justify-center items-center gap-0.5 bg-[#1E1B15] text-[7px] text-[#C9A876] font-bold">
                <span className="leading-none">|||| |||| |</span>
                <span>BARCODE</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-[7px] border-t border-[rgba(201,168,118,0.1)] pt-2 mt-1">
              <span>Catalog: 12,450 SKUs</span>
              <span className="text-[#C9A876]">Sync: Local MySQL</span>
            </div>
          </div>
        );
      case "vipluxurysaloon":
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-8 bg-[#15130F] font-mono text-[9px] text-[#8C877C] overflow-hidden select-none border border-[rgba(201,168,118,0.15)]">
            <div className="text-[#C9A876] font-bold border-b border-[rgba(201,168,118,0.15)] pb-2 flex items-center justify-between">
              <span>VIP LUXURY SALOON PORTAL</span>
              <span className="text-[#C9A876] font-sans text-[7px]">&bull; LIVE CLIENT</span>
            </div>
            
            <div className="flex flex-col gap-1.5 my-3">
              <div className="text-[8px] uppercase tracking-wider text-[#E8D9BC]">Reservation Calendar</div>
              <div className="grid grid-cols-5 gap-1.5 text-center">
                {["09:00", "11:00", "13:00", "15:00", "17:00"].map((time, i) => {
                  const isBooked = i === 1 || i === 3;
                  return (
                    <div
                      key={time}
                      className={`py-1 border text-[7px] transition-all duration-300 ${
                        isBooked
                          ? "border-[#C9A876] bg-[#C9A876] text-[#0A0908] font-bold"
                          : "border-[#8C877C]/20 text-[#8C877C]/60"
                      }`}
                    >
                      {time}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="flex justify-between items-center text-[7px] border-t border-[rgba(201,168,118,0.1)] pt-2 mt-1">
              <span>Database: Firebase Realtime</span>
              <span className="text-green-500 font-bold">100% Slot Sync</span>
            </div>
          </div>
        );
      case "wishwin":
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-8 bg-[#15130F] overflow-hidden select-none border border-[rgba(201,168,118,0.15)] font-mono text-[9px] text-[#8C877C]">
            <div className="flex justify-between items-center">
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

            <div className="flex justify-between items-center font-mono text-[#8C877C] text-[7px]">
              <span>Gamification: Level 14</span>
              <span className="text-green-500/60 font-bold">Weak Area Alert: Optics</span>
            </div>
          </div>
        );
      case "saloonshyani":
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-8 bg-[#15130F] font-mono text-[9px] text-[#8C877C] overflow-hidden select-none border border-[rgba(201,168,118,0.15)]">
            <div className="text-[#C9A876] font-bold border-b border-[rgba(201,168,118,0.15)] pb-2 flex items-center justify-between">
              <span>SALOON SHYANI // STAFF MANAGER</span>
              <span className="text-amber-500 font-sans text-[7px]">&bull; DEV PIPELINE</span>
            </div>
            
            <div className="flex flex-col gap-2 my-2 text-[8px]">
              <div className="flex justify-between items-center bg-[#1E1B15] p-2 border-l border-amber-500/50">
                <span>Stylist: Shyani D.</span>
                <span className="text-[#C9A876]">09:00 AM - 06:00 PM</span>
                <span className="text-green-500 font-bold">ON SHIFT</span>
              </div>
              <div className="flex justify-between items-center bg-[#1E1B15] p-2 border-l border-[#8C877C]/30">
                <span>Stylist: Nimali K.</span>
                <span className="text-[#8C877C]">12:00 PM - 08:00 PM</span>
                <span className="text-[#8C877C]/60">PENDING</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-[7px] border-t border-[rgba(201,168,118,0.1)] pt-2 mt-1">
              <span>Staging: Local SQL</span>
              <span className="text-[#C9A876]">Custom Client Dashboard</span>
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
      case "teafactory":
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-8 bg-[#15130F] overflow-hidden select-none border border-[rgba(201,168,118,0.15)] font-mono text-[9px] text-[#8C877C]">
            <div className="flex justify-between items-center text-[#C9A876]">
              <span>TROUGH 04 WITHERS</span>
              <span>DHT22 SENSOR ARRAY</span>
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

            <div className="flex justify-between items-center text-[7px]">
              <span>AMBIENT: 28.4°C</span>
              <span className="text-[#C9A876] font-bold">WITHERS MOISTURE OPTIMIZATION ACTIVE</span>
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
      id="work"
      ref={containerRef}
      className="relative w-full bg-[#0A0908] border-b border-[rgba(201,168,118,0.08)] z-30"
    >
      {/* Pinned Vault Doors Section (Height 150vh, sticky viewport inside) */}
      <div
        ref={doorsTriggerRef}
        className="relative w-full h-[150vh] bg-[#0A0908] hidden lg:block overflow-visible"
      >
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
          
          {/* Vertical flow line behind doors (running top to bottom) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-[rgba(201,168,118,0.4)] via-[rgba(201,168,118,0.1)] to-[rgba(201,168,118,0.4)] z-0 hidden lg:block" />

          {/* Background Branding (Revealed behind the doors) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0C0B0A] z-10">
            <div className="text-center">
              <div className="text-[11px] font-bold tracking-[0.3em] text-[#C9A876] uppercase mb-4 font-sans-body animate-pulse">
                SECTION 02
              </div>
              <h2 className="font-serif-display text-[clamp(2.5rem,6vw,4rem)] font-light text-[#F4F1EA] tracking-wide mb-6">
                Selected Work
              </h2>
              <div className="w-[1px] h-20 bg-gradient-to-b from-[#C9A876] to-transparent mx-auto mt-8 opacity-60" />
            </div>
          </div>

          {/* Left Door */}
          <div className="left-door absolute left-0 top-0 w-1/2 h-full bg-[#0A0908] border-r border-[#C9A876]/35 flex items-center justify-end overflow-visible z-20">
            {/* Left half circular lock */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[50%] w-[100px] h-[200px] border-t border-b border-l border-[#C9A876]/20 rounded-l-full bg-[#0C0B0A] flex items-center justify-end pr-4 z-50 shadow-[inset_-5px_0_10px_rgba(0,0,0,0.5)]">
              <span className="font-serif-display text-[10px] text-[#C9A876]/50 tracking-[0.3em] uppercase rotate-90 origin-center">
                SELECT
              </span>
              <div className="w-1.5 h-1.5 border border-[#C9A876]/50 rounded-full ml-3 animate-pulse" />
            </div>
          </div>

          {/* Right Door */}
          <div className="right-door absolute right-0 top-0 w-1/2 h-full bg-[#0A0908] border-l border-[#C9A876]/35 flex items-center justify-start overflow-visible z-20">
            {/* Right half circular lock */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[50%] w-[100px] h-[200px] border-t border-b border-r border-[#C9A876]/20 rounded-r-full bg-[#0C0B0A] flex items-center justify-start pl-4 z-50 shadow-[inset_5px_0_10px_rgba(0,0,0,0.5)]">
              <div className="w-1.5 h-1.5 border border-[#C9A876]/50 rounded-full mr-3 animate-pulse" />
              <span className="font-serif-display text-[10px] text-[#C9A876]/50 tracking-[0.3em] uppercase rotate-90 origin-center">
                WORK
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Background vertical line running down the main project panels list */}
      <div className="absolute top-[150vh] bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-[rgba(201,168,118,0.4)] via-[rgba(201,168,118,0.08)] to-transparent pointer-events-none z-0 hidden lg:block" />

      <div className="max-w-[1400px] mx-auto w-full flex flex-col py-32 px-6 md:px-12 z-10 relative">
        
        {/* Section Header (Mobile only, desktop has door reveal) */}
        <div className="text-[11px] font-bold tracking-[0.3em] text-[#C9A876] uppercase mb-4 font-sans-body lg:hidden">
          PORTFOLIO
        </div>
        <h2 className="font-serif-display text-[clamp(2.2rem,5vw,3.5rem)] font-light text-[#F4F1EA] mb-20 lg:hidden">
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
                    {renderVisualMockup(project)}
                    
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
