"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Camera, Maximize2, X, Info } from "lucide-react";

interface PhotoItem {
  id: string;
  title: string;
  category: string;
  camera: string;
  lens: string;
  settings: string;
  aspect: string; // Tailwind aspect-ratio class
  lightLeak: string; // Gradient color overlay representation
}

const photoData: PhotoItem[] = [
  {
    id: "photo-1",
    title: "Shadow Play & Warm Contrast",
    category: "Portraits",
    camera: "Canon 90D",
    lens: "EF 50mm f/1.8 STM",
    settings: "1/160s · f/2.0 · ISO 250",
    aspect: "aspect-[3/4]",
    lightLeak: "from-[rgba(201,168,118,0.12)] to-transparent",
  },
  {
    id: "photo-2",
    title: "Golden Hour Shimmer",
    category: "Nature",
    camera: "Canon 90D",
    lens: "EF-S 18-135mm USM",
    settings: "1/400s · f/5.6 · ISO 100",
    aspect: "aspect-square",
    lightLeak: "from-[rgba(232,217,188,0.15)] via-[rgba(201,168,118,0.05)] to-transparent",
  },
  {
    id: "photo-3",
    title: "Velocity Lines",
    category: "Automotive",
    camera: "Canon 90D",
    lens: "EF 50mm f/1.8 STM",
    settings: "1/1000s · f/2.2 · ISO 200",
    aspect: "aspect-[16/10]",
    lightLeak: "from-transparent to-[rgba(201,168,118,0.1)]",
  },
  {
    id: "photo-4",
    title: "Midnight Rain Reflections",
    category: "Street",
    camera: "Canon 90D",
    lens: "EF 50mm f/1.8 STM",
    settings: "1/80s · f/1.8 · ISO 800",
    aspect: "aspect-[3/4]",
    lightLeak: "from-[rgba(201,168,118,0.06)] via-transparent to-[rgba(201,168,118,0.08)]",
  },
  {
    id: "photo-5",
    title: "Prism Refractions",
    category: "Creative",
    camera: "Canon 90D",
    lens: "EF 50mm f/1.8 STM",
    settings: "1/200s · f/2.0 · ISO 320",
    aspect: "aspect-square",
    lightLeak: "from-[rgba(201,168,118,0.2)] to-transparent",
  },
  {
    id: "photo-6",
    title: "High Key Studio Study",
    category: "Portraits",
    camera: "Canon 90D",
    lens: "EF 50mm f/1.8 STM",
    settings: "1/125s · f/4.0 · ISO 100",
    aspect: "aspect-[3/4]",
    lightLeak: "from-[rgba(232,217,188,0.08)] to-transparent",
  },
];

const categories = ["ALL", "PORTRAITS", "NATURE", "AUTOMOTIVE", "STREET", "CREATIVE"];

export default function PhotoGallery() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredPhotos = activeCategory === "ALL"
    ? photoData
    : photoData.filter(photo => photo.category.toUpperCase() === activeCategory);

  useEffect(() => {
    // Fade in photos when list shifts
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".photo-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, scale: 0.96, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
        );
      }
    }, gridRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section
      ref={containerRef}
      id="photography"
      className="relative w-full min-h-screen py-24 px-6 md:px-12 bg-[#15130F] border-t border-b border-[rgba(201,168,118,0.08)]"
    >
      <div className="max-w-[1400px] mx-auto w-full flex flex-col">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-[11px] font-bold tracking-[0.3em] text-[#C9A876] uppercase mb-4 font-sans-body">
              VISUAL JOURNAL
            </div>
            <h2 className="font-serif-display text-[clamp(2.2rem,5vw,3.5rem)] font-light text-[#F4F1EA] mb-2">
              Through My Lens
            </h2>
            <p className="font-sans-body text-xs md:text-sm text-[#8C877C] italic">
              Moments, light, and stories.
            </p>
          </div>
          
          {/* Camera Gear & Rome Pixels Brand Alignment */}
          <div className="flex items-center gap-6 md:gap-8">
            {/* Identity/Camera Line */}
            <div className="hidden sm:flex items-center gap-3 text-[#8C877C] font-sans-body text-xs border-r border-[rgba(201,168,118,0.15)] pr-6 h-10">
              <Camera size={16} className="text-[#C9A876]" />
              <div>
                <p className="text-[#F4F1EA] font-semibold">Canon EOS 90D</p>
                <p className="text-[10px] opacity-75">Prime glass setups</p>
              </div>
            </div>

            {/* ROME PIXELS Logo Component */}
            <div className="flex flex-col items-center justify-center text-center px-4 py-2.5 border border-[rgba(201,168,118,0.15)] bg-[#1E1B15]/40 select-none">
              <div className="font-serif-display text-base leading-none text-[#F4F1EA] tracking-[0.1em] flex flex-col items-center">
                <span className="flex items-center justify-center relative font-light tracking-[0.18em] ml-1">
                  R
                  <span className="inline-block relative">
                    O
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C9A876] text-[6px] mt-[0.5px]">✦</span>
                  </span>
                  M E
                </span>
                <span className="font-light tracking-[0.08em] -mt-0.5 text-[#C9A876]">
                  PIXELS
                </span>
              </div>
              <div className="text-[6px] font-bold tracking-[0.3em] text-[#8C877C] uppercase font-sans-body mt-1 border-t border-[rgba(201,168,118,0.12)] pt-1 w-full">
                TRAVEL PHOTOGRAPHY
              </div>
            </div>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-3 border-b border-[rgba(201,168,118,0.1)] pb-6 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-[10px] font-bold tracking-[0.2em] font-sans-body transition-all duration-300 border focus:outline-none focus:ring-1 focus:ring-[#C9A876] ${
                activeCategory === cat
                  ? "bg-[#C9A876] text-[#0A0908] border-[#C9A876]"
                  : "bg-[#1E1B15] text-[#8C877C] border-[rgba(201,168,118,0.1)] hover:text-[#F4F1EA] hover:border-[#C9A876]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photography Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
        >
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              data-cursor="explore"
              onClick={() => setSelectedPhoto(photo)}
              className="photo-card group relative w-full overflow-hidden bg-[#0C0B0A] border border-[rgba(201,168,118,0.1)] p-3 cursor-pointer select-none transition-transform duration-500 hover:scale-[1.01]"
            >
              {/* Photo Frame Container */}
              <div className={`relative w-full ${photo.aspect} bg-[#070605] overflow-hidden flex items-center justify-center`}>
                
                {/* Light Leak simulation overlay */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${photo.lightLeak} mix-blend-screen opacity-70 group-hover:opacity-90 transition-opacity duration-500`} />
                
                {/* Focus Target / Brackets simulation overlay */}
                <div className="absolute inset-4 border border-[rgba(201,168,118,0.05)] pointer-events-none group-hover:border-[rgba(201,168,118,0.12)] transition-colors duration-500">
                  {/* Center brackets */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-dashed border-[#C9A876]/15 rounded-full scale-90 group-hover:scale-100 transition-transform duration-500" />
                </div>

                {/* Shutter reading indicator */}
                <span className="absolute bottom-3 left-3 font-mono text-[8px] text-[#8C877C] tracking-widest opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                  {photo.settings}
                </span>

                {/* Maximize Icon */}
                <div className="absolute top-3 right-3 p-1.5 bg-[#0C0B0A]/80 border border-[rgba(201,168,118,0.1)] text-[#C9A876] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 size={12} />
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="mt-4 flex flex-col gap-1">
                <span className="text-[9px] font-bold tracking-[0.2em] text-[#C9A876] uppercase">
                  {photo.category}
                </span>
                <h3 className="font-serif-display text-base text-[#F4F1EA] group-hover:text-[#E8D9BC] transition-colors duration-300 font-light">
                  {photo.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Signature Statement Row */}
        <div className="mt-20 border-t border-[rgba(201,168,118,0.15)] pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="font-serif-display text-lg md:text-xl italic text-[#8C877C] max-w-xl font-light">
            &ldquo;Technology captures information. Photography captures emotion.&rdquo;
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#C9A876] uppercase font-sans-body">
              THANUSHIKA MADHUSITH
            </span>
            <span className="text-[#8C877C]/40 text-xs font-serif-display">&times;</span>
            <div className="flex items-center gap-1 font-serif-display text-xs tracking-wider text-[#F4F1EA] select-none">
              <span>R</span>
              <span className="relative">O<span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C9A876] text-[4px] mt-[0.5px]">✦</span></span>
              <span>ME</span>
              <span className="text-[#C9A876] ml-0.5">PIXELS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Overlay */}
      {selectedPhoto && (
        <div
          data-cursor="close"
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-[6000] w-full h-full bg-[#0A0908]/98 flex items-center justify-center p-4 md:p-8 cursor-pointer select-none"
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 p-2 border border-[rgba(201,168,118,0.2)] text-[#C9A876] hover:text-[#E8D9BC] hover:border-[#C9A876] transition-colors"
          >
            <X size={18} />
          </button>

          {/* Lightbox photo frame */}
          <div
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking card
            className="relative w-full max-w-[700px] bg-[#15130F] border border-[rgba(201,168,118,0.15)] p-4 cursor-default flex flex-col gap-6"
          >
            {/* Visual Frame */}
            <div className={`relative w-full ${selectedPhoto.aspect} bg-[#0C0B0A] overflow-hidden flex items-center justify-center border border-[rgba(201,168,118,0.06)]`}>
              <div className={`absolute inset-0 bg-gradient-to-tr ${selectedPhoto.lightLeak} mix-blend-screen opacity-85`} />
              
              <div className="absolute inset-8 border border-[rgba(201,168,118,0.04)]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-dashed border-[#C9A876]/20 rounded-full" />
              </div>
            </div>

            {/* Lightbox Metadata */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-2">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#C9A876] uppercase">
                  {selectedPhoto.category}
                </span>
                <h4 className="font-serif-display text-xl font-light text-[#F4F1EA]">
                  {selectedPhoto.title}
                </h4>
              </div>

              {/* Camera configuration report */}
              <div className="flex items-center gap-3 text-[#8C877C] font-mono text-[9px] border-l border-[rgba(201,168,118,0.15)] pl-4">
                <Info size={14} className="text-[#C9A876]" />
                <div>
                  <p className="text-[#F4F1EA] font-semibold">{selectedPhoto.camera} &middot; {selectedPhoto.lens}</p>
                  <p>{selectedPhoto.settings}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
