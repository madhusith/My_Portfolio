"use client";

import { useState } from "react";
import { Send, Mail } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setFormState({ name: "", email: "", message: "" });
      
      // Reset success notification after 5s
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-24 px-6 md:px-12 bg-[#0A0908]"
    >
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Column: Contact info & Social Actions */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          <div className="text-[11px] font-bold tracking-[0.3em] text-[#C9A876] uppercase mb-4 font-sans-body">
            GET IN TOUCH
          </div>
          
          <h2 className="font-serif-display text-[clamp(2.2rem,5vw,3.5rem)] font-light text-[#F4F1EA] mb-6">
            Let&apos;s create something.
          </h2>
          
          <p className="font-sans-body text-sm md:text-base text-[#8C877C] leading-relaxed mb-10 max-w-sm">
            Have an idea, project, or collaboration in mind? Reach out and let&apos;s build something exceptional.
          </p>

          {/* Social CTAs */}
          <div className="flex flex-col gap-4 font-sans-body text-xs font-bold tracking-[0.15em] text-[#F4F1EA]">
            
            {/* Email */}
            <a
              href="mailto:thanushika@example.com"
              className="flex items-center gap-4 hover:text-[#C9A876] transition-colors p-3 bg-[#15130F] border border-[rgba(201,168,118,0.1)] w-fit"
            >
              <Mail size={16} className="text-[#C9A876]" />
              <span>EMAIL ME &rarr;</span>
            </a>

            {/* Social Grid */}
            <div className="flex flex-wrap gap-3 mt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 border border-[rgba(201,168,118,0.1)] bg-[#15130F] hover:bg-[#1E1B15] text-[#8C877C] hover:text-[#C9A876] transition-all flex items-center justify-center w-10 h-10"
                aria-label="GitHub Profile"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 border border-[rgba(201,168,118,0.1)] bg-[#15130F] hover:bg-[#1E1B15] text-[#8C877C] hover:text-[#C9A876] transition-all flex items-center justify-center w-10 h-10"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 border border-[rgba(201,168,118,0.1)] bg-[#15130F] hover:bg-[#1E1B15] text-[#8C877C] hover:text-[#C9A876] transition-all flex items-center justify-center w-10 h-10"
                aria-label="Instagram Profile"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>

          </div>
        </div>

        {/* Right Column: Custom Underline Input Form */}
        <div className="lg:col-span-7 w-full bg-[#15130F] border border-[rgba(201,168,118,0.1)] p-8 md:p-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
            
            {/* Input Name */}
            <div className="relative flex flex-col gap-2">
              <label htmlFor="name" className="text-[10px] font-bold tracking-[0.2em] text-[#C9A876] uppercase">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full bg-transparent border-b border-[rgba(201,168,118,0.2)] hover:border-[#C9A876] focus:border-[#C9A876] text-sm text-[#F4F1EA] py-2 focus:outline-none transition-colors"
                placeholder="Thanushika Madhusith"
              />
            </div>

            {/* Input Email */}
            <div className="relative flex flex-col gap-2">
              <label htmlFor="email" className="text-[10px] font-bold tracking-[0.2em] text-[#C9A876] uppercase">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full bg-transparent border-b border-[rgba(201,168,118,0.2)] hover:border-[#C9A876] focus:border-[#C9A876] text-sm text-[#F4F1EA] py-2 focus:outline-none transition-colors"
                placeholder="thanushika@example.com"
              />
            </div>

            {/* Input Message */}
            <div className="relative flex flex-col gap-2">
              <label htmlFor="message" className="text-[10px] font-bold tracking-[0.2em] text-[#C9A876] uppercase">
                Your Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full bg-transparent border-b border-[rgba(201,168,118,0.2)] hover:border-[#C9A876] focus:border-[#C9A876] text-sm text-[#F4F1EA] py-2 focus:outline-none resize-none transition-colors"
                placeholder="Hello, I would love to collaborate on..."
              />
            </div>

            {/* Submit Notification */}
            {success && (
              <div className="text-xs font-bold tracking-wide text-green-500 font-sans-body">
                ✓ Message sent successfully! I will get back to you shortly.
              </div>
            )}

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-3 px-8 py-4 border border-[#C9A876] text-[#C9A876] hover:bg-[#C9A876] hover:text-[#0A0908] text-xs font-bold tracking-[0.2em] font-sans-body transition-all duration-300 disabled:opacity-50"
            >
              <span>{isSubmitting ? "SENDING..." : "SEND MESSAGE"}</span>
              {!isSubmitting && <Send size={12} />}
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}
