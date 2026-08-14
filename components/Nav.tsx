"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Download } from "lucide-react";
import gsap from "gsap";

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "PHOTOGRAPHY", href: "#photography" },
  { label: "LAB", href: "#lab" },
  { label: "CONTACT", href: "#contact" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollYRef.current) {
        setIsVisible(false); // scrolling down
      } else {
        setIsVisible(true); // scrolling up
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu stagger animation
  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add("lenis-stopped");
      document.body.style.overflow = "hidden";
      
      const links = mobileMenuRef.current?.querySelectorAll(".mobile-link");
      if (links) {
        gsap.fromTo(
          links,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out", delay: 0.1 }
        );
      }
    } else {
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[1000] transition-transform duration-500 ease-out py-6 px-6 md:px-12 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between glass-panel px-6 py-4 rounded-none md:px-10 border-b border-[rgba(201,168,118,0.1)]">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="font-serif-display text-lg md:text-xl font-bold tracking-[0.1em] text-[#C9A876] hover:text-[#E8D9BC] transition-colors"
          >
            THANUSHIKA
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-sans-body text-[11px] font-bold tracking-[0.25em] text-[#F4F1EA] hover:text-[#C9A876] transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-[#C9A876] focus:ring-offset-2 focus:ring-offset-[#0A0908] px-1 py-1"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a
              href="/resume.pdf"
              download="Thanushika_Madhusith_CV.pdf"
              className="flex items-center gap-2 px-4 py-2 border border-[#C9A876] text-[#C9A876] hover:bg-[#C9A876] hover:text-[#0A0908] text-[10px] font-bold tracking-[0.2em] font-sans-body transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#C9A876] group/nav-btn"
            >
              <span>CV</span>
              <Download size={12} className="transition-transform group-hover/nav-btn:translate-y-0.5 duration-300" />
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            className="md:hidden text-[#C9A876] hover:text-[#E8D9BC] transition-colors p-1 focus:outline-none focus:ring-1 focus:ring-[#C9A876] rounded"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Full-screen Overlay */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 bg-[#0A0908] z-[999] flex flex-col items-center justify-center pointer-events-auto"
        >
          {/* Noise background overlay on mobile menu */}
          <div className="noise-overlay" />
          
          <nav ref={linksRef} className="flex flex-col items-center gap-8 z-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="mobile-link font-serif-display text-3xl md:text-4xl font-bold tracking-[0.15em] text-[#F4F1EA] hover:text-[#C9A876] transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              download="Thanushika_Madhusith_CV.pdf"
              className="mobile-link mt-4 flex items-center gap-2 px-6 py-3 border border-[#C9A876] text-[#C9A876] hover:bg-[#C9A876] hover:text-[#0A0908] text-xs font-bold tracking-[0.2em] font-sans-body transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#C9A876] group/mob-btn"
            >
              <span>DOWNLOAD CV</span>
              <Download size={14} className="transition-transform group-hover/mob-btn:translate-y-0.5 duration-300" />
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
