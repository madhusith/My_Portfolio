"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const educationHistory = [
  {
    institution: "University of Kelaniya",
    degree: "BSc (Hons) in IT",
    specialization: "Department of Industrial Management",
    period: "2025 — Present",
    details: "Focusing on enterprise information systems, database architectures, and business operations.",
    achievements: ""
  },
  {
    institution: "Ananda College, Colombo",
    degree: "School Education",
    specialization: "G.C.E. Advanced Levels (Physical Science Stream)",
    period: "2010 — 2024",
    details: "Active involvement in astronomy studies and student broadcasting operations.",
    achievements: "Senior member of student committees."
  }
];

const experienceHistory = [
  {
    role: "Owner & Lead Photographer",
    company: "Rome Pixels Photography",
    period: "2024 — Present",
    details: "Managing client portfolios, lighting design, and creative capture settings for commercial and travel portrait projects."
  },
  {
    role: "Technical Officer",
    company: "Wishwin Education Center",
    period: "2023 — Present",
    details: "Maintaining LMS virtual environments, stream coordinations, student portal databases, and automated billing approvals."
  },
  {
    role: "IT Intern (3 Months)",
    company: "Sampath Bank Head Office (NSC Department)",
    period: "2024",
    details: "Supported network administration, configuration monitoring, and database management operations."
  },
  {
    role: "Assistant Media Director",
    company: "Industrial Management Science Student Association (IMSSA)",
    period: "2026 Jan — Present",
    details: "Leading content creation, photography grids, and event coverage highlights at the University of Kelaniya."
  },
  {
    role: "Committee Member & Media Coordinator",
    company: "Industrial Management Science Student Association (IMSSA)",
    period: "2025 — 2026",
    details: "Coordinated Level 01 media publications and departmental branding updates."
  },
  {
    role: "Senior Member",
    company: "Anandian Astronomical Association & Broadcasting Association",
    period: "2010 — 2024",
    details: "Led technical setups and event presentations during secondary school terms at Ananda College."
  }
];

const certificationsAchievements = [
  {
    type: "Certification",
    title: "Advanced Multimedia Web Design and Development Techniques",
    issuer: "University of Colombo School of Computing (UCSC)",
    year: "2024",
    extra: "Developed hands-on mastery over HTML, CSS, JavaScript, and MySQL for professional responsive web products.",
    link: "https://www.linkedin.com/posts/thanushika-madhusith-6b3a37312_webdevelopment-html-css-activity-7436236897183739904-tym6"
  },
  {
    type: "Certification",
    title: "Business Analysis & Process Management Project",
    issuer: "Coursera",
    year: "2024",
    extra: "Validated proficiency in requirement gathering, process mapping, and organizational analytics workflows."
  },
  {
    type: "Award",
    title: "Silver Medalist — Sri Lankan Junior Astronomy Olympiad",
    issuer: "IPS / Astronomy Associations",
    year: "2017 & 2018",
    extra: "Awarded consecutive national medals for excellence in physical science, cosmology, and observational theory."
  },
  {
    type: "Award",
    title: "2nd Place — All Island Inter School News Editing",
    issuer: "“Samahara” News Editorial Awards",
    year: "2023",
    extra: "Recognized at a national level for outstanding news layout design, precision, and content composition."
  }
];

export default function Credentials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(".credential-card");
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
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
      id="credentials"
      className="relative w-full py-24 px-6 md:px-12 bg-[#0A0908]"
    >
      <div className="max-w-[1400px] mx-auto w-full flex flex-col">
        {/* Section Header */}
        <div className="text-[11px] font-bold tracking-[0.3em] text-[#C9A876] uppercase mb-4 font-sans-body">
          CREDENTIALS & HISTORY
        </div>
        <h2 className="font-serif-display text-[clamp(2.2rem,5vw,3.5rem)] font-light text-[#F4F1EA] mb-16">
          Education & Experience
        </h2>

        {/* 3-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Column 1: Academic History (Education) */}
          <div className="lg:col-span-4 flex flex-col gap-8 w-full border-t border-[rgba(201,168,118,0.18)] pt-8">
            <h3 className="font-serif-display text-xl text-[#C9A876] tracking-wider uppercase font-light mb-2">
              01 / Academic History
            </h3>
            
            {educationHistory.map((edu, idx) => (
              <div key={idx} className="credential-card flex flex-col gap-3 group">
                <span className="font-mono text-[9px] text-[#8C877C] tracking-widest">{edu.period}</span>
                <h4 className="font-serif-display text-lg text-[#F4F1EA] group-hover:text-[#C9A876] transition-colors leading-tight font-medium font-sans-body">
                  {edu.degree}
                </h4>
                <p className="font-sans-body text-xs text-[#C9A876] tracking-wider uppercase">
                  {edu.institution}
                </p>
                <p className="font-sans-body text-xs text-[#8C877C] italic leading-relaxed">
                  {edu.specialization}
                </p>
                <p className="font-sans-body text-xs text-[#8C877C] leading-relaxed">
                  {edu.details}
                </p>
                {edu.achievements && (
                  <div className="text-[10px] font-bold tracking-[0.1em] text-[#F4F1EA] border-l border-[#C9A876] pl-3 mt-1">
                    {edu.achievements}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Column 2: Experience & Leadership */}
          <div className="lg:col-span-4 flex flex-col gap-8 w-full border-t border-[rgba(201,168,118,0.18)] pt-8">
            <h3 className="font-serif-display text-xl text-[#C9A876] tracking-wider uppercase font-light mb-2">
              02 / Experience & Leadership
            </h3>
            
            {experienceHistory.map((exp, idx) => (
              <div key={idx} className="credential-card flex flex-col gap-3 group">
                <span className="font-mono text-[9px] text-[#8C877C] tracking-widest">{exp.period}</span>
                <h4 className="font-serif-display text-lg text-[#F4F1EA] group-hover:text-[#C9A876] transition-colors leading-tight font-medium font-sans-body">
                  {exp.role}
                </h4>
                <p className="font-sans-body text-xs text-[#C9A876] tracking-wider uppercase">
                  {exp.company}
                </p>
                <p className="font-sans-body text-xs text-[#8C877C] leading-relaxed">
                  {exp.details}
                </p>
              </div>
            ))}
          </div>

          {/* Column 3: Certifications & Achievements */}
          <div className="lg:col-span-4 flex flex-col gap-8 w-full border-t border-[rgba(201,168,118,0.18)] pt-8">
            <h3 className="font-serif-display text-xl text-[#C9A876] tracking-wider uppercase font-light mb-2">
              03 / Certs & Achievements
            </h3>
            
            {certificationsAchievements.map((item, idx) => (
              <div key={idx} className="credential-card flex flex-col gap-2 group">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[9px] text-[#8C877C] tracking-widest">{item.year}</span>
                  <span className={`px-2 py-0.5 border text-[7px] font-bold tracking-widest font-sans-body ${
                    item.type === "Certification" 
                      ? "border-green-500/30 text-green-400/80 bg-green-500/5" 
                      : "border-[#C9A876]/30 text-[#C9A876] bg-[#C9A876]/5"
                  }`}>
                    {item.type.toUpperCase()}
                  </span>
                </div>
                <h4 className="font-serif-display text-lg text-[#F4F1EA] group-hover:text-[#C9A876] transition-colors leading-tight font-medium font-sans-body">
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                </h4>
                <p className="font-sans-body text-xs text-[#8C877C] italic leading-normal">
                  {item.issuer}
                </p>
                <p className="font-sans-body text-xs text-[#8C877C] leading-relaxed mt-1">
                  {item.extra}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Download CV CTA Row */}
        <div className="mt-20 border-t border-[rgba(201,168,118,0.15)] pt-12 flex justify-center w-full">
          <a
            href="/resume.pdf"
            download="Thanushika_Madhusith_CV.pdf"
            className="flex items-center gap-3 px-8 py-4 border border-[#C9A876] text-[#C9A876] hover:bg-[#C9A876] hover:text-[#0A0908] text-xs font-bold tracking-[0.25em] font-sans-body transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#C9A876] group/btn"
          >
            <span>DOWNLOAD COMPLETE CV / RESUME</span>
            <Download className="w-4 h-4 transition-transform group-hover/btn:translate-y-0.5 duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
