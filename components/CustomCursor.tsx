"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Detect touch device
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    // Defer visibility state setter to avoid synchronous effect warnings
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial centered offset
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement;
      const isLink = (e.target as HTMLElement).closest("a, button, input, textarea, [role='button']");

      if (target) {
        const cursorType = target.getAttribute("data-cursor");
        if (cursorType) {
          setText(cursorType.toUpperCase());
          gsap.to(cursor, {
            scale: 3.5,
            backgroundColor: "#C9A876",
            borderColor: "#C9A876",
            color: "#0A0908",
            duration: 0.2,
          });
        }
      } else if (isLink) {
        gsap.to(cursor, {
          scale: 2,
          borderColor: "#E8D9BC",
          backgroundColor: "rgba(201, 168, 118, 0.15)",
          color: "transparent",
          duration: 0.2,
        });
      } else {
        setText("");
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(201, 168, 118, 0.6)",
          color: "transparent",
          duration: 0.2,
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-5 h-5 rounded-full border border-[rgba(201,168,118,0.6)] pointer-events-none z-[9999] flex items-center justify-center text-[7px] font-bold tracking-widest font-sans-body"
    >
      <span className="select-none pointer-events-none">{text}</span>
    </div>
  );
}
