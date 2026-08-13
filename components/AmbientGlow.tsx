"use client";

import { useEffect, useRef, useState } from "react";

export default function AmbientGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Detect reduced motion settings
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const initialMatch = mediaQuery.matches;
    
    const timer = setTimeout(() => {
      setReducedMotion(initialMatch);
    }, 0);
    
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      clearTimeout(timer);
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates (interpolated)
    const mouse = { x: width / 2, y: height / 2 };
    const targetMouse = { x: width / 2, y: height / 2 };

    // Floating background lights
    const orbs = [
      { x: width * 0.15, y: height * 0.25, radius: 300, vx: 0.3, vy: 0.25, color: "rgba(201, 168, 118, 0.04)" },
      { x: width * 0.8, y: height * 0.75, radius: 400, vx: -0.2, vy: -0.3, color: "rgba(232, 217, 188, 0.02)" },
      { x: width * 0.5, y: height * 0.5, radius: 350, vx: 0.15, vy: -0.15, color: "rgba(201, 168, 118, 0.03)" }
    ];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.fillStyle = "#0A0908";
      ctx.fillRect(0, 0, width, height);

      // Interpolate mouse coordinates (smooth damping mouse follow)
      mouse.x += (targetMouse.x - mouse.x) * 0.04;
      mouse.y += (targetMouse.y - mouse.y) * 0.04;

      // 1. Draw floating ambient light orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Boundary reflection
        if (orb.x < -orb.radius || orb.x > width + orb.radius) orb.vx *= -1;
        if (orb.y < -orb.radius || orb.y > height + orb.radius) orb.vy *= -1;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, "rgba(10, 9, 8, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw mouse follow glow spotlight
      const spotlightRadius = 380;
      const spotGradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        spotlightRadius
      );
      spotGradient.addColorStop(0, "rgba(201, 168, 118, 0.07)");
      spotGradient.addColorStop(0.5, "rgba(201, 168, 118, 0.015)");
      spotGradient.addColorStop(1, "rgba(10, 9, 8, 0)");

      ctx.fillStyle = spotGradient;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, spotlightRadius, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0A0908]">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,168,118,0.03)_0%,rgba(10,9,8,0)_70%)] blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(232,217,188,0.015)_0%,rgba(10,9,8,0)_70%)] blur-[120px]" />
      </div>
    );
  }

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-1] pointer-events-none w-full h-full bg-[#0A0908]" />;
}
