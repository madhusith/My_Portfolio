"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import AmbientGlow from "@/components/AmbientGlow";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ApertureTransition from "@/components/ApertureTransition";
import WhatIBuild from "@/components/WhatIBuild";
import ProjectsGrid from "@/components/Projects/ProjectsGrid";
import PhotoGallery from "@/components/Photography/PhotoGallery";
import Lab from "@/components/Lab";
import CurrentStack from "@/components/CurrentStack";
import Journey from "@/components/Journey";
import Credentials from "@/components/Credentials";
import Philosophy from "@/components/Philosophy";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      {/* Background Interactive Ambient Glow */}
      <AmbientGlow />

      <SmoothScroll>
        <div className={`relative w-full min-h-screen transition-opacity duration-1000 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}>
          {/* Header Navigation */}
          <Nav />

          <main className="w-full flex flex-col">
            {/* Hero Section */}
            <Hero />

            {/* Pinned Aperture Shutter Transition -> About */}
            <ApertureTransition />

            {/* Capabilities Row List */}
            <WhatIBuild />

            {/* Asymmetrical selected work */}
            <ProjectsGrid />

            {/* Lens Journal Masonry Filters */}
            <PhotoGallery />

            {/* Experimental R&D Sandbox */}
            <Lab />

            {/* Structured Stack Matrix */}
            <CurrentStack />

            {/* Historical learning timeline */}
            <Journey />

            {/* Credentials & achievements */}
            <Credentials />

            {/* Mantra Philosophy quotes */}
            <Philosophy />

            {/* Underlined inputs Form */}
            <Contact />
          </main>

          {/* Footer branding links */}
          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
}
