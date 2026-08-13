"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Terminal } from "lucide-react";

interface LabItem {
  id: string;
  title: string;
  category: string;
  description: string;
  status: string;
  metric: string;
}

const labData: LabItem[] = [
  {
    id: "lab-1",
    title: "AI Voice Chatbot",
    category: "Natural Language Processing",
    description: "Integrating speech-to-text classifiers directly with custom local LLM endpoints for low-latency Sinhala-English speech inputs.",
    status: "Completed",
    metric: "92% transcription success",
  },
  {
    id: "lab-2",
    title: "Computer Vision HUD",
    category: "Human-Computer Interaction",
    description: "Overlaying real-time hand skeleton trackers onto standard cameras to build gesture-triggered sci-fi control displays.",
    status: "Beta testing",
    metric: "60 FPS pipeline",
  },
  {
    id: "lab-3",
    title: "mmWave Breathing Sensor",
    category: "Embedded IoT Architecture",
    description: "Interfacing micro-controllers with multi-zone radar boards to test presence limits and micro-motion updates.",
    status: "Active research",
    metric: "Detects still posture up to 6m",
  },
  {
    id: "lab-4",
    title: "Smart Home Automation Relay",
    category: "Automation & Home Assistant",
    description: "Designing isolated smart power sockets controlled by ESP32 microcontrollers communicating over MQTT protocols.",
    status: "Prototype active",
    metric: "4 channel relay matrix",
  },
  {
    id: "lab-5",
    title: "Procedural WebGL Shaders",
    category: "Creative Technology",
    description: "Exploring mathematical fragment shaders to build noise filters, glow layers, and light-refraction simulations in browsers.",
    status: "Ongoing",
    metric: "Zero dependencies",
  },
];

export default function Lab() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll(".lab-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
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
      id="lab"
      className="relative w-full min-h-screen py-24 px-6 md:px-12 bg-[#0A0908]"
    >
      <div className="max-w-[1400px] mx-auto w-full flex flex-col">
        
        {/* Title */}
        <div className="text-[11px] font-bold tracking-[0.3em] text-[#C9A876] uppercase mb-4 font-sans-body">
          R&D SANDBOX
        </div>
        <h2 className="font-serif-display text-[clamp(2.2rem,5vw,3.5rem)] font-light text-[#F4F1EA] mb-16">
          The Lab
        </h2>

        {/* Interactive card list grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {labData.map((item) => (
            <div
              key={item.id}
              className="lab-card group relative w-full h-[220px] bg-[#15130F] border border-[rgba(201,168,118,0.1)] p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[#C9A876] hover:bg-[#1E1B15] select-none"
            >
              {/* Top Row: category and icons */}
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-bold tracking-[0.2em] text-[#C9A876] uppercase font-sans-body">
                  {item.category}
                </span>
                <Terminal size={14} className="text-[#8C877C] group-hover:text-[#C9A876] transition-colors" />
              </div>

              {/* Main content - reveals description details on hover cleanly */}
              <div className="my-4 flex flex-col gap-2 relative">
                <h3 className="font-serif-display text-xl text-[#F4F1EA] group-hover:text-[#C9A876] transition-colors duration-300 font-light">
                  {item.title}
                </h3>
                
                {/* Description - transitions to full opacity on hover */}
                <p className="font-sans-body text-xs text-[#8C877C] leading-relaxed line-clamp-3 group-hover:text-[#F4F1EA] transition-colors duration-300">
                  {item.description}
                </p>
              </div>

              {/* Footer row: status and telemetry info */}
              <div className="flex justify-between items-center text-[8px] font-mono text-[#8C877C] border-t border-[rgba(201,168,118,0.06)] pt-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#C9A876] animate-pulse" />
                  {item.status}
                </span>
                <span>{item.metric}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
