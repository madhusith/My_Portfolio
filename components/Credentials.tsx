"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const educationHistory = [
  {
    institution: "Sri Lanka Institute of Information Technology (SLIIT)",
    degree: "BSc (Hons) in Information Technology",
    specialization: "Specializing in Software Engineering (GPA: 3.8/4.0)",
    period: "2023 — Present (Expected 2027)",
    details: "Key Coursework: Object-Oriented Programming (Java), Data Structures & Algorithms, Database Management Systems (DBMS), Software Architecture & Design Patterns.",
    achievements: "Dean's List honors for consecutive academic terms."
  },
  {
    institution: "Secondary Education",
    degree: "High School / GCE Advanced Levels",
    specialization: "Physical Sciences Stream (Physics, Chemistry, Combined Mathematics)",
    period: "2012 — 2022",
    details: "Strong background in analytical thinking, calculus, and physics fundamentals.",
    achievements: "Top grade scores in physics and combinatorics."
  }
];

const experienceHistory = [
  {
    role: "Software Engineering Intern",
    company: "Lanka Digital Systems (Pvt) Ltd",
    period: "6 Months (2025)",
    details: "Collaborated in developing enterprise dashboard applications. Wrote RESTful API controllers, optimized Sequelize/Prisma database index lookups, and integrated LangChain OpenAI pipeline workers.",
    leadership: "Led a team of three interns to deploy real-time notifications system utilizing Socket.IO."
  },
  {
    role: "Freelance Systems Developer",
    company: "Self-Employed / Freelance Markets",
    period: "2023 — Present",
    details: "Constructed cross-platform Electron POS systems for regional bookstore retailers. Assembled micro-controller firmwares (ESP32) for private smart home relays integration and environmental telemetry sensors monitoring.",
    leadership: "Managed client expectations, gathered project specifications, and handled deployment schedules."
  },
  {
    role: "Volunteer & Tech Lead",
    company: "University Computer Society / Robotics Club",
    period: "2024 — Present",
    details: "Conducted monthly student bootcamps on hardware prototyping, gesture-based human-computer interfaces using OpenCV, and version control structures using Git/GitHub.",
    leadership: "Orchestrated logistics and mentoring for 50+ participants in campus coding exhibitions."
  }
];

const certificationsAchievements = [
  {
    type: "Certification",
    title: "Oracle Certified Associate, Java SE Programmer (OCAJP)",
    issuer: "Oracle Corporation",
    year: "2024",
    extra: "Validates core Java MVC architectures, exception handling, and object-oriented algorithms."
  },
  {
    type: "Certification",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    year: "2025",
    extra: "Covers cloud infrastructure billing models, identity access management (IAM), and EC2 hosting zones."
  },
  {
    type: "Award",
    title: "Winner — Best IoT / Hardware Project",
    issuer: "SLIIT Tech Innovation Exhibition",
    year: "2025",
    extra: "Awarded for designing a millimeter-wave smart lighting relay hub capable of motionless presence detection."
  },
  {
    type: "Competition",
    title: "Finalist — National Algorithmic Hackathon",
    issuer: "Sri Lanka Tech League",
    year: "2024",
    extra: "Competed against 80+ campus teams solving database concurrency and distributed scaling challenges."
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
                {exp.leadership && (
                  <div className="text-[10px] font-bold tracking-[0.1em] text-[#F4F1EA] border-l border-[#C9A876] pl-3 mt-1">
                    Lshp: {exp.leadership}
                  </div>
                )}
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
                  {item.title}
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
