"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ArrowLeft, Cpu, Terminal, ShieldAlert, Award } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { Project } from "@/lib/projects";

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

interface ProjectCaseStudyProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectCaseStudy({ project, onClose }: ProjectCaseStudyProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Disable body scroll when modal is open
    document.documentElement.classList.add("lenis-stopped");
    document.body.style.overflow = "hidden";

    // GSAP Entrance
    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.1, ease: "power3.out" }
      );
    });

    return () => {
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [mounted]);

  const handleClose = () => {
    gsap.to(contentRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  if (!mounted) return null;

  return createPortal(
    <div
      ref={overlayRef}
      data-lenis-prevent
      className="fixed inset-0 z-[5000] w-full h-full bg-[#0A0908]/95 backdrop-blur-md overflow-y-auto flex justify-center py-10 px-4 md:px-8"
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-[1100px] h-fit bg-[#15130F] border border-[rgba(201,168,118,0.15)] p-6 md:p-12 text-[#F4F1EA] flex flex-col gap-12"
      >
        {/* Close Button Header */}
        <div className="flex justify-between items-center border-b border-[rgba(201,168,118,0.1)] pb-6">
          <button
            onClick={handleClose}
            className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#C9A876] hover:text-[#E8D9BC] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C9A876]"
          >
            <ArrowLeft size={16} /> &larr; ALL PROJECTS
          </button>
          
          <button
            onClick={handleClose}
            aria-label="Close case study"
            className="p-2 border border-[rgba(201,168,118,0.2)] hover:border-[#C9A876] hover:text-[#C9A876] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C9A876]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Title Block */}
        <div className="flex flex-col gap-4">
          <div className="text-[11px] font-bold tracking-[0.3em] text-[#C9A876] uppercase">
            {project.category}
          </div>
          <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8">
            <span className="font-serif-display text-4xl md:text-5xl font-light">
              {project.name}
            </span>
            <span className="font-serif-display text-lg text-[#8C877C] italic">
              Project {project.number}
            </span>
          </div>
          <p className="font-serif-display text-xl md:text-2xl text-[#E8D9BC] font-light leading-relaxed max-w-3xl border-l border-[#C9A876] pl-6 mt-4">
            &ldquo;{project.tagline}&rdquo;
          </p>

          {(project.githubUrl || project.liveUrl) && (
            <div className="flex flex-wrap gap-4 mt-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-wider text-[#C9A876] hover:text-[#E8D9BC] bg-[#1E1B15] px-4 py-2 border border-[rgba(201,168,118,0.15)] hover:border-[#C9A876] transition-all duration-300"
                >
                  <GithubIcon />
                  GITHUB REPOSITORY
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-wider text-[#0A0908] bg-[#C9A876] hover:bg-[#E8D9BC] px-4 py-2 transition-all duration-300"
                >
                  <ExternalLinkIcon />
                  LIVE DEMO
                </a>
              )}
            </div>
          )}
        </div>

        {/* Featured Image */}
        {project.image && (
          <div className="relative w-full aspect-video md:aspect-[21/9] border border-[rgba(201,168,118,0.15)] bg-[#0C0B0A] overflow-hidden select-none photo-glow-frame">
            <Image
              src={project.image}
              alt={`${project.name} Featured Image`}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1100px"
              className="object-cover"
            />
            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#15130F] via-transparent to-transparent opacity-40" />

            {/* Corner highlights */}
            <div className="absolute top-3 left-3 w-1.5 h-1.5 border-t border-l border-[#C9A876] opacity-65" />
            <div className="absolute top-3 right-3 w-1.5 h-1.5 border-t border-r border-[#C9A876] opacity-65" />
            <div className="absolute bottom-3 left-3 w-1.5 h-1.5 border-b border-l border-[#C9A876] opacity-65" />
            <div className="absolute bottom-3 right-3 w-1.5 h-1.5 border-b border-r border-[#C9A876] opacity-65" />
          </div>
        )}

        {/* Grid: Overview & Metadata */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 border-t border-b border-[rgba(201,168,118,0.1)] py-8">
          {/* Overview text */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <h3 className="font-serif-display text-lg text-[#C9A876] font-medium uppercase tracking-wider">
              Overview
            </h3>
            <p className="font-sans-body text-sm md:text-base text-[#8C877C] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech Stack list */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h3 className="font-serif-display text-lg text-[#C9A876] font-medium uppercase tracking-wider">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-[#1E1B15] text-[#F4F1EA] text-[10px] font-bold tracking-wider font-sans-body border border-[rgba(201,168,118,0.1)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Grid: Problem vs Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Problem */}
          <div className="flex flex-col gap-4 bg-[#1E1B15] p-6 border-l-2 border-red-500/50">
            <div className="flex items-center gap-3 text-red-400">
              <ShieldAlert size={20} />
              <h4 className="font-serif-display text-lg font-medium">The Challenge</h4>
            </div>
            <p className="font-sans-body text-xs md:text-sm text-[#8C877C] leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Solution */}
          <div className="flex flex-col gap-4 bg-[#1E1B15] p-6 border-l-2 border-[#C9A876]/50">
            <div className="flex items-center gap-3 text-[#C9A876]">
              <Cpu size={20} />
              <h4 className="font-serif-display text-lg font-medium">The Engineering</h4>
            </div>
            <p className="font-sans-body text-xs md:text-sm text-[#8C877C] leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Section: Key Features */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 text-[#E8D9BC]">
            <Terminal size={18} />
            <h4 className="font-serif-display text-lg uppercase tracking-wider">Key Features</h4>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 font-sans-body text-xs md:text-sm text-[#8C877C] leading-relaxed border-b border-[rgba(201,168,118,0.06)] pb-2"
              >
                <span className="text-[#C9A876] font-bold">&bull;</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section: Outcomes */}
        <div className="flex flex-col gap-4 bg-[#1C1A16]/50 p-6 md:p-8 border border-[rgba(201,168,118,0.12)]">
          <div className="flex items-center gap-3 text-[#C9A876]">
            <Award size={20} />
            <h4 className="font-serif-display text-lg uppercase tracking-wider">Impact & Outcome</h4>
          </div>
          <p className="font-sans-body text-sm md:text-base text-[#F4F1EA] italic leading-relaxed">
            &ldquo;{project.outcome}&rdquo;
          </p>
        </div>

        {/* Case study footer spacer */}
        <div className="flex justify-center border-t border-[rgba(201,168,118,0.1)] pt-8">
          <button
            onClick={handleClose}
            className="px-8 py-3 border border-[#C9A876] text-[#C9A876] hover:bg-[#C9A876] hover:text-[#0A0908] text-xs font-bold tracking-[0.2em] font-sans-body transition-all duration-300"
          >
            CLOSE CASE STUDY
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
