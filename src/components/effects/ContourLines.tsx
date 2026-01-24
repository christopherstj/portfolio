"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ContourLinesProps {
  className?: string;
  variant?: "hero" | "section" | "subtle";
  animated?: boolean;
}

export function ContourLines({
  className = "",
  variant = "hero",
  animated = true,
}: ContourLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Transform scroll progress to subtle movement
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -70]);

  const opacityMap = {
    hero: { base: 0.4, accent: 0.6 },
    section: { base: 0.2, accent: 0.35 },
    subtle: { base: 0.1, accent: 0.2 },
  };

  const opacity = opacityMap[variant];

  // Generate organic contour paths
  const generateContourPath = (
    yOffset: number,
    amplitude: number,
    frequency: number
  ) => {
    const points: string[] = [];
    const width = 1200;
    const segments = 60;

    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * width;
      const y =
        yOffset +
        Math.sin((i / segments) * Math.PI * frequency) * amplitude +
        Math.sin((i / segments) * Math.PI * frequency * 2.5) * (amplitude * 0.3) +
        Math.sin((i / segments) * Math.PI * frequency * 0.5) * (amplitude * 0.5);

      if (i === 0) {
        points.push(`M ${x} ${y}`);
      } else {
        points.push(`L ${x} ${y}`);
      }
    }

    return points.join(" ");
  };

  // Pre-generate paths for consistent rendering
  const paths = [
    { d: generateContourPath(80, 25, 2), opacity: opacity.base, strokeWidth: 1 },
    { d: generateContourPath(120, 35, 1.5), opacity: opacity.accent, strokeWidth: 1.5 },
    { d: generateContourPath(170, 20, 3), opacity: opacity.base, strokeWidth: 1 },
    { d: generateContourPath(220, 40, 1.2), opacity: opacity.base, strokeWidth: 1 },
    { d: generateContourPath(280, 30, 2.5), opacity: opacity.accent, strokeWidth: 1.5 },
    { d: generateContourPath(330, 25, 1.8), opacity: opacity.base, strokeWidth: 1 },
    { d: generateContourPath(380, 35, 2.2), opacity: opacity.base, strokeWidth: 1 },
    { d: generateContourPath(440, 20, 3.5), opacity: opacity.accent, strokeWidth: 1.5 },
    { d: generateContourPath(500, 30, 1.5), opacity: opacity.base, strokeWidth: 1 },
    { d: generateContourPath(560, 40, 2), opacity: opacity.base, strokeWidth: 1 },
  ];

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 600"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradient for depth effect */}
          <linearGradient id="contourGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4c4a8" stopOpacity="0" />
            <stop offset="15%" stopColor="#d4c4a8" stopOpacity="1" />
            <stop offset="85%" stopColor="#d4c4a8" stopOpacity="1" />
            <stop offset="100%" stopColor="#d4c4a8" stopOpacity="0" />
          </linearGradient>

          {/* Accent gradient */}
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ea580c" stopOpacity="0" />
            <stop offset="20%" stopColor="#ea580c" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#ea580c" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#ea580c" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Layer 1 - Background contours */}
        <motion.g style={animated ? { y: y1 } : undefined}>
          {paths.slice(0, 4).map((path, i) => (
            <motion.path
              key={`layer1-${i}`}
              d={path.d}
              fill="none"
              stroke="url(#contourGradient)"
              strokeWidth={path.strokeWidth}
              opacity={path.opacity}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                delay: i * 0.15,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.g>

        {/* Layer 2 - Mid contours */}
        <motion.g style={animated ? { y: y2 } : undefined}>
          {paths.slice(4, 7).map((path, i) => (
            <motion.path
              key={`layer2-${i}`}
              d={path.d}
              fill="none"
              stroke={i === 0 ? "url(#accentGradient)" : "url(#contourGradient)"}
              strokeWidth={path.strokeWidth}
              opacity={path.opacity}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2.5,
                delay: 0.5 + i * 0.2,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.g>

        {/* Layer 3 - Foreground contours */}
        <motion.g style={animated ? { y: y3 } : undefined}>
          {paths.slice(7).map((path, i) => (
            <motion.path
              key={`layer3-${i}`}
              d={path.d}
              fill="none"
              stroke="url(#contourGradient)"
              strokeWidth={path.strokeWidth}
              opacity={path.opacity}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 3,
                delay: 1 + i * 0.25,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
}



