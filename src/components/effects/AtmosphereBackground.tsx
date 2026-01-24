"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  delay: number;
}

export function AtmosphereBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Transform scroll to gradient position
  const gradientPosition = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  // Generate particles on mount
  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
    >
      {/* Dynamic gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            180deg,
            #0f0f23 0%,
            #1a1a3e 15%,
            #2d2d5a 30%,
            #4a3f6b 45%,
            #6b5a7d 55%,
            #8c6f7d 65%,
            #b8846e 75%,
            #d4956a 85%,
            #f4a261 95%,
            #ffb87a 100%
          )`,
        }}
      />
      
      {/* Animated gradient overlay that shifts with scroll */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse 150% 100% at 50% 100%,
            rgba(244, 162, 97, 0.15) 0%,
            transparent 50%
          )`,
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 1]),
        }}
      />
      
      {/* Mountain silhouette layers */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: "40vh" }}
      >
        {/* Far mountains - darkest */}
        <motion.path
          d="M0,320 L0,200 Q180,120 360,180 Q540,100 720,160 Q900,80 1080,140 Q1260,100 1440,180 L1440,320 Z"
          fill="rgba(15, 15, 35, 0.8)"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, 50]),
          }}
        />
        {/* Mid mountains */}
        <motion.path
          d="M0,320 L0,220 Q120,160 240,200 Q480,120 720,180 Q960,140 1200,190 Q1320,160 1440,200 L1440,320 Z"
          fill="rgba(26, 26, 62, 0.7)"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, 30]),
          }}
        />
        {/* Near mountains - lightest */}
        <motion.path
          d="M0,320 L0,260 Q200,220 400,250 Q600,200 800,240 Q1000,210 1200,250 Q1320,230 1440,260 L1440,320 Z"
          fill="rgba(45, 45, 90, 0.6)"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, 10]),
          }}
        />
      </svg>
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `rgba(255, 255, 255, ${particle.opacity})`,
            boxShadow: `0 0 ${particle.size * 2}px rgba(244, 162, 97, ${particle.opacity * 0.5})`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: particle.speed,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Subtle horizon glow */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          bottom: "30%",
          background: `linear-gradient(
            90deg,
            transparent 0%,
            rgba(244, 162, 97, 0.2) 20%,
            rgba(244, 162, 97, 0.4) 50%,
            rgba(244, 162, 97, 0.2) 80%,
            transparent 100%
          )`,
          boxShadow: "0 0 30px rgba(244, 162, 97, 0.3)",
          opacity: useTransform(scrollYProgress, [0, 0.3, 1], [0.5, 1, 0.3]),
        }}
      />
    </div>
  );
}



