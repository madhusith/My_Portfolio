"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Camera, Maximize2, X, Info, ChevronLeft, ChevronRight } from "lucide-react";

interface PhotoItem {
  id: string;
  title: string;
  category: string;
  camera: string;
  lens: string;
  settings: string;
  aspect: string; // Tailwind aspect-ratio class
  lightLeak: string; // Gradient color overlay representation
  image: string;
}

const photoData: PhotoItem[] = [
  {
    id: "photo-1",
    title: "Shadow Play & Warm Contrast",
    category: "Portraits",
    camera: "Canon EOS 90D",
    lens: "EF 50mm f/1.8 STM",
    settings: "1/160s · f/2.0 · ISO 250",
    aspect: "aspect-[3/4]",
    lightLeak: "from-[rgba(201,168,118,0.12)] to-transparent",
    image: "/images/Photo01.jpg",
  },
  {
    id: "photo-2",
    title: "Golden Hour Shimmer",
    category: "Portraits",
    camera: "Canon EOS 90D",
    lens: "EF-S 18-135mm USM",
    settings: "1/400s · f/5.6 · ISO 100",
    aspect: "aspect-[3/4]",
    lightLeak: "from-[rgba(232,217,188,0.15)] via-[rgba(201,168,118,0.05)] to-transparent",
    image: "/images/Photo02.jpg",
  },
  {
    id: "photo-3",
    title: "Bridal Elegance",
    category: "Portraits",
    camera: "Canon EOS 90D",
    lens: "EF 50mm f/1.8 STM",
    settings: "1/1000s · f/2.2 · ISO 200",
    aspect: "aspect-[3/4]",
    lightLeak: "from-transparent to-[rgba(201,168,118,0.1)]",
    image: "/images/Photo03.1.jpg",
  },
  {
    id: "photo-4",
    title: "Urban Moods & Rain Reflections",
    category: "Portraits",
    camera: "Canon EOS 90D",
    lens: "EF 50mm f/1.8 STM",
    settings: "1/80s · f/1.8 · ISO 800",
    aspect: "aspect-[3/4]",
    lightLeak: "from-[rgba(201,168,118,0.06)] via-transparent to-[rgba(201,168,118,0.08)]",
    image: "/images/Photo04.jpg",
  },
  {
    id: "photo-5",
    title: "Creative Prism Expressions",
    category: "Portraits",
    camera: "Canon EOS 90D",
    lens: "EF 50mm f/1.8 STM",
    settings: "1/200s · f/2.0 · ISO 320",
    aspect: "aspect-[3/4]",
    lightLeak: "from-[rgba(201,168,118,0.2)] to-transparent",
    image: "/images/Photo05.jpg",
  },
  {
    id: "photo-6",
    title: "High Key Studio Study",
    category: "Portraits",
    camera: "Canon EOS 90D",
    lens: "EF 50mm f/1.8 STM",
    settings: "1/125s · f/4.0 · ISO 100",
    aspect: "aspect-[3/4]",
    lightLeak: "from-[rgba(232,217,188,0.08)] to-transparent",
    image: "/images/Photo6.jpg",
  },
];

const categories = ["ALL", "PORTRAITS"];

export default function PhotoGallery() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Drag states
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragDistance = useRef(0);

  const filteredPhotos = activeCategory === "ALL"
    ? photoData
    : photoData.filter(photo => photo.category.toUpperCase() === activeCategory);

  // Maximum of 6 cards
  const displayedPhotos = filteredPhotos.slice(0, 6);

  const selectedIndex = displayedPhotos.findIndex(p => p.id === selectedPhoto?.id);

  // Handle scroll progress
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
    } else {
      setScrollProgress(container.scrollLeft / maxScroll);
    }
  };

  // Drag-to-scroll functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    isDragging.current = true;
    dragDistance.current = 0;
    container.classList.add("cursor-grabbing");
    container.classList.remove("cursor-grab");
    startX.current = e.pageX - container.offsetLeft;
    scrollLeft.current = container.scrollLeft;
  };

  const handleMouseLeave = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    isDragging.current = false;
    container.classList.remove("cursor-grabbing");
    container.classList.add("cursor-grab");
  };

  const handleMouseUp = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    isDragging.current = false;
    container.classList.remove("cursor-grabbing");
    container.classList.add("cursor-grab");
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const container = scrollContainerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    dragDistance.current = Math.abs(x - startX.current);
    container.scrollLeft = scrollLeft.current - walk;
  };

  const handleCardClick = (photo: PhotoItem) => {
    if (dragDistance.current < 8) {
      setSelectedPhoto(photo);
    }
  };

  // Nav buttons for horizontal track
  const handleScrollNav = (direction: "prev" | "next") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.querySelector(".photo-card")?.clientWidth || 300;
    const scrollAmount = cardWidth + 32; // card width + gap
    
    if (direction === "prev") {
      container.scrollTo({
        left: container.scrollLeft - scrollAmount,
        behavior: "smooth"
      });
    } else {
      container.scrollTo({
        left: container.scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  // Nav buttons inside Lightbox
  const handleLightboxNav = (direction: "prev" | "next") => {
    if (selectedIndex === -1) return;
    let nextIndex = selectedIndex;
    if (direction === "prev") {
      nextIndex = (selectedIndex - 1 + displayedPhotos.length) % displayedPhotos.length;
    } else {
      nextIndex = (selectedIndex + 1) % displayedPhotos.length;
    }
    setSelectedPhoto(displayedPhotos[nextIndex]);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === "Escape") {
        setSelectedPhoto(null);
      } else if (e.key === "ArrowLeft") {
        handleLightboxNav("prev");
      } else if (e.key === "ArrowRight") {
        handleLightboxNav("next");
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto, selectedIndex]);

  // Entrance staggered animations
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
      setScrollProgress(0);
    }

    const ctx = gsap.context(() => {
      const cards = scrollContainerRef.current?.querySelectorAll(".photo-card");
      if (cards && cards.length > 0) {
        gsap.killTweensOf(cards);
        gsap.fromTo(
          cards,
          { 
            opacity: 0, 
            x: 80, 
            rotateY: 15,
            scale: 0.95,
            transformOrigin: "center left"
          },
          { 
            opacity: 1, 
            x: 0, 
            rotateY: 0,
            scale: 1,
            duration: 0.7, 
            stagger: 0.08, 
            ease: "power2.out" 
          }
        );
      }
    }, scrollContainerRef);

    return () => ctx.revert();
  }, [activeCategory]);

  // Lightbox opening scale/back animation
  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = "hidden";
      gsap.killTweensOf(".lightbox-content");
      gsap.fromTo(
        ".lightbox-content",
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
      );
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedPhoto?.id]);

  // 3D Card Hover Tilt Effects
  const handleMouseMoveTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 4; // Max 4 degrees
    const rotateY = ((x - centerX) / centerX) * 4; // Max 4 degrees
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.015,
      ease: "power1.out",
      duration: 0.3,
    });
  };

  const handleMouseLeaveTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      ease: "power2.out",
      duration: 0.5,
    });
  };

  return (
    <section
      ref={containerRef}
      id="photography"
      className="relative w-full min-h-screen py-24 px-6 md:px-12 bg-[#15130F] border-t border-b border-[rgba(201,168,118,0.08)] overflow-hidden"
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

        {/* Photography Horizontal Scroll Container */}
        <div className="relative w-full overflow-hidden" style={{ perspective: "1200px" }}>
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex gap-8 overflow-x-auto select-none cursor-grab snap-x snap-mandatory scroll-smooth pb-8 pt-4 px-1"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {displayedPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => handleCardClick(photo)}
                onMouseMove={handleMouseMoveTilt}
                onMouseLeave={handleMouseLeaveTilt}
                className="photo-card flex-shrink-0 w-[85vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw] snap-center group relative overflow-hidden bg-[#0C0B0A] border border-[rgba(201,168,118,0.1)] p-3.5 cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Photo Frame Container */}
                <div className={`relative w-full ${photo.aspect} bg-[#070605] overflow-hidden flex items-center justify-center`}>
                  
                  {/* Actual Photo Image */}
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 768px) 85vw, (max-width: 1024px) 35vw, 28vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Light Leak simulation overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-tr ${photo.lightLeak} mix-blend-screen opacity-70 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none`} />
                  
                  {/* Focus Target / Brackets simulation overlay */}
                  <div className="absolute inset-4 border border-[rgba(201,168,118,0.05)] pointer-events-none group-hover:border-[rgba(201,168,118,0.12)] transition-colors duration-500">
                    {/* Center brackets - rotates on hover */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-dashed border-[#C9A876]/15 rounded-full scale-90 group-hover:scale-100 group-hover:rotate-45 group-hover:border-[#C9A876]/30 transition-all duration-700" />
                  </div>

                  {/* Shutter reading indicator */}
                  <span className="absolute bottom-3 left-3 font-mono text-[8px] text-[#8C877C] tracking-widest bg-[#0C0B0A]/70 px-1.5 py-0.5 border border-[rgba(201,168,118,0.1)] opacity-50 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    {photo.settings}
                  </span>

                  {/* Maximize Icon */}
                  <div className="absolute top-3 right-3 p-1.5 bg-[#0C0B0A]/85 border border-[rgba(201,168,118,0.1)] text-[#C9A876] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
        </div>

        {/* Gallery Scroll Controls & Progress Indicator */}
        <div className="flex items-center justify-between gap-8 mt-6 border-t border-[rgba(201,168,118,0.08)] pt-6">
          {/* Scroll Progress Bar */}
          <div className="flex-1 max-w-[200px] h-[1px] bg-[#1E1B15] relative overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-[#C9A876] transition-all duration-150 ease-out"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          
          {/* Next/Prev Navigation Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => handleScrollNav("prev")}
              className="p-2.5 border border-[rgba(201,168,118,0.15)] text-[#C9A876] hover:bg-[#C9A876] hover:text-[#0A0908] transition-colors focus:outline-none cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => handleScrollNav("next")}
              className="p-2.5 border border-[rgba(201,168,118,0.15)] text-[#C9A876] hover:bg-[#C9A876] hover:text-[#0A0908] transition-colors focus:outline-none cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight size={14} />
            </button>
          </div>
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
          className="fixed inset-0 z-[6000] w-full h-full backdrop-blur-md bg-[#0A0908]/92 flex items-center justify-center p-4 md:p-8 cursor-pointer select-none"
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 p-2 border border-[rgba(201,168,118,0.2)] text-[#C9A876] hover:text-[#E8D9BC] hover:border-[#C9A876] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          {/* Prev/Next buttons for Lightbox (Left side of overlay) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLightboxNav("prev");
            }}
            className="absolute left-4 md:left-8 p-3 border border-[rgba(201,168,118,0.15)] text-[#C9A876] hover:bg-[#C9A876]/10 hover:text-[#E8D9BC] transition-colors cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Prev/Next buttons for Lightbox (Right side of overlay) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLightboxNav("next");
            }}
            className="absolute right-4 md:right-8 p-3 border border-[rgba(201,168,118,0.15)] text-[#C9A876] hover:bg-[#C9A876]/10 hover:text-[#E8D9BC] transition-colors cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight size={20} />
          </button>

          {/* Lightbox photo frame */}
          <div
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking card
            className="lightbox-content relative w-full max-w-[950px] bg-[#15130F] border border-[rgba(201,168,118,0.15)] p-5 md:p-8 cursor-default flex flex-col md:flex-row gap-8 shadow-2xl"
          >
            {/* Visual Frame */}
            <div className={`relative w-full md:w-3/5 ${selectedPhoto.aspect} bg-[#0C0B0A] overflow-hidden flex items-center justify-center border border-[rgba(201,168,118,0.06)] self-center`}>
              <Image
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-tr ${selectedPhoto.lightLeak} mix-blend-screen opacity-85 pointer-events-none`} />
              
              <div className="absolute inset-8 border border-[rgba(201,168,118,0.04)] pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-dashed border-[#C9A876]/20 rounded-full" />
              </div>
            </div>

            {/* Lightbox Metadata Column */}
            <div className="flex-1 flex flex-col justify-between pt-2">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-[rgba(201,168,118,0.1)] pb-3">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#C9A876] uppercase">
                    {selectedPhoto.category}
                  </span>
                  <span className="font-mono text-[10px] text-[#8C877C]">
                    {String(selectedIndex + 1).padStart(2, "0")} / {String(displayedPhotos.length).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h4 className="font-serif-display text-2xl font-light text-[#F4F1EA] mb-3">
                    {selectedPhoto.title}
                  </h4>
                  <p className="text-[11px] text-[#8C877C] leading-relaxed max-w-sm">
                    Captured on Location using analog lighting frameworks, custom light-leak filtration simulations, and focusing setups.
                  </p>
                </div>
              </div>

              {/* Extended EXIF Settings Grid */}
              <div className="mt-8 border-t border-[rgba(201,168,118,0.1)] pt-6">
                <div className="text-[9px] font-bold tracking-[0.2em] text-[#C9A876] uppercase mb-4 flex items-center gap-1.5">
                  <Info size={12} />
                  <span>TECHNICAL DATA</span>
                </div>
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-[10px] font-mono text-[#8C877C]">
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider opacity-50 mb-0.5">CAMERA</span>
                    <span className="text-[#F4F1EA] font-semibold">{selectedPhoto.camera}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider opacity-50 mb-0.5">LENS</span>
                    <span className="text-[#F4F1EA] font-semibold">{selectedPhoto.lens}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider opacity-50 mb-0.5">SETTINGS</span>
                    <span className="text-[#F4F1EA] font-semibold">{selectedPhoto.settings.split("·")[0].trim()}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider opacity-50 mb-0.5">APERTURE</span>
                    <span className="text-[#F4F1EA] font-semibold">{selectedPhoto.settings.split("·")[1]?.trim() || "f/2.0"}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider opacity-50 mb-0.5">ISO</span>
                    <span className="text-[#F4F1EA] font-semibold">{selectedPhoto.settings.split("·")[2]?.trim() || "ISO 200"}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider opacity-50 mb-0.5">RATIO</span>
                    <span className="text-[#F4F1EA] font-semibold">{selectedPhoto.aspect.replace("aspect-", "")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
