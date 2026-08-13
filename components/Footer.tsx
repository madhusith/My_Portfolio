"use client";

export default function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#15130F] border-t border-[rgba(201,168,118,0.08)] py-12 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left Side: Brand name and tag */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-serif-display text-xl font-bold tracking-[0.1em] text-[#C9A876]">
            THANUSHIKA
          </span>
          <span className="font-sans-body text-[10px] font-bold tracking-[0.25em] text-[#8C877C]">
            TECHNOLOGY &times; CREATIVITY
          </span>
        </div>

        {/* Center: Anchored Page Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 font-sans-body text-[10px] font-bold tracking-[0.2em] text-[#8C877C]">
          <a
            href="#about"
            onClick={(e) => handleLinkClick(e, "#about")}
            className="hover:text-[#C9A876] transition-colors"
          >
            ABOUT
          </a>
          <a
            href="#work"
            onClick={(e) => handleLinkClick(e, "#work")}
            className="hover:text-[#C9A876] transition-colors"
          >
            PROJECTS
          </a>
          <a
            href="#photography"
            onClick={(e) => handleLinkClick(e, "#photography")}
            className="hover:text-[#C9A876] transition-colors"
          >
            PHOTOGRAPHY
          </a>
          <a
            href="#lab"
            onClick={(e) => handleLinkClick(e, "#lab")}
            className="hover:text-[#C9A876] transition-colors"
          >
            LAB
          </a>
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="hover:text-[#C9A876] transition-colors"
          >
            CONTACT
          </a>
        </nav>

        {/* Right Side: Copyright */}
        <div className="font-sans-body text-[10px] text-[#8C877C] tracking-wide">
          &copy; 2026 Thanushika Madhusith. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
