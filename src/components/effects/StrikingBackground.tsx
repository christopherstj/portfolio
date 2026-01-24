"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "@/components/theme";

// Generate contour line path
function generateContourPath(
  width: number,
  baseY: number,
  amplitude: number,
  frequency: number,
  phase: number
): string {
  let path = `M 0 ${baseY}`;
  for (let x = 0; x <= width; x += 10) {
    const y =
      baseY +
      Math.sin((x * frequency) / 100 + phase) * amplitude +
      Math.sin((x * frequency * 0.5) / 100 + phase * 1.3) * (amplitude * 0.5);
    path += ` L ${x} ${y}`;
  }
  return path;
}

// Mountain peak generator - extended width for parallax panning
function generateMountainPath(
  width: number,
  baseY: number,
  peaks: { x: number; height: number; width: number }[]
): string {
  const extendedWidth = width * 2;
  let path = `M -${width * 0.5} ${baseY}`;
  
  peaks.forEach((peak) => {
    path += ` L ${peak.x - peak.width / 2} ${baseY}`;
    path += ` L ${peak.x} ${baseY - peak.height}`;
    path += ` L ${peak.x + peak.width / 2} ${baseY}`;
  });
  
  path += ` L ${extendedWidth} ${baseY}`;
  path += ` L ${extendedWidth} ${baseY + 400}`;
  path += ` L -${width * 0.5} ${baseY + 400}`;
  path += ` Z`;
  
  return path;
}

export function StrikingBackground() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  
  const { scrollYProgress } = useScroll();
  
  // Parallax transforms for different mountain layers
  const layer1X = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const layer2X = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const layer3X = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contourY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    setMounted(true);
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const { width, height } = dimensions;

  // Theme-aware colors
  const isDark = resolvedTheme === "dark";
  const accentColor = isDark ? "#ff4d00" : "#2d8a4e";
  const bgColor = isDark ? "#000000" : "#f5f0e8";

  // Generate mountain layers with overlapping peaks (no flat spots)
  const mountainLayers = [
    {
      peaks: [
        { x: -width * 0.1, height: 150, width: 280 },
        { x: width * 0.02, height: 200, width: 320 },
        { x: width * 0.15, height: 280, width: 380 },
        { x: width * 0.28, height: 220, width: 340 },
        { x: width * 0.42, height: 320, width: 420 },
        { x: width * 0.56, height: 240, width: 360 },
        { x: width * 0.70, height: 290, width: 400 },
        { x: width * 0.84, height: 260, width: 380 },
        { x: width * 0.98, height: 200, width: 320 },
        { x: width * 1.12, height: 270, width: 360 },
        { x: width * 1.26, height: 230, width: 340 },
      ],
      baseY: height * 0.82,
      opacity: isDark ? 0.18 : 0.12,
      parallax: layer1X,
    },
    {
      peaks: [
        { x: -width * 0.12, height: 100, width: 260 },
        { x: width * 0.0, height: 140, width: 300 },
        { x: width * 0.12, height: 200, width: 340 },
        { x: width * 0.25, height: 160, width: 300 },
        { x: width * 0.38, height: 240, width: 380 },
        { x: width * 0.52, height: 180, width: 320 },
        { x: width * 0.66, height: 220, width: 360 },
        { x: width * 0.80, height: 190, width: 340 },
        { x: width * 0.94, height: 230, width: 360 },
        { x: width * 1.08, height: 170, width: 300 },
        { x: width * 1.22, height: 210, width: 340 },
      ],
      baseY: height * 0.88,
      opacity: isDark ? 0.1 : 0.08,
      parallax: layer2X,
    },
    {
      peaks: [
        { x: -width * 0.08, height: 80, width: 240 },
        { x: width * 0.05, height: 110, width: 280 },
        { x: width * 0.18, height: 150, width: 320 },
        { x: width * 0.32, height: 100, width: 280 },
        { x: width * 0.46, height: 170, width: 340 },
        { x: width * 0.60, height: 130, width: 300 },
        { x: width * 0.74, height: 160, width: 320 },
        { x: width * 0.88, height: 120, width: 280 },
        { x: width * 1.02, height: 150, width: 300 },
        { x: width * 1.16, height: 140, width: 280 },
      ],
      baseY: height * 0.94,
      opacity: isDark ? 0.05 : 0.04,
      parallax: layer3X,
    },
  ];

  if (!mounted) {
    return null;
  }

  // Generate contour lines - only after mounted to avoid hydration issues
  const contourLines = Array.from({ length: 10 }, (_, i) => ({
    baseY: height * 0.25 + i * 70,
    amplitude: 12 + (i * 1.8), // Deterministic instead of random
    frequency: 0.7 + (i * 0.05), // Deterministic instead of random
    phase: (i * Math.PI * 0.2), // Deterministic instead of random
    delay: i * 0.12,
    duration: 10 + (i * 0.6), // Deterministic instead of random
  }));

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden transition-colors duration-300" 
      style={{ zIndex: -1, backgroundColor: bgColor }}
    >
      {/* Diagonal slash accent */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `linear-gradient(
            135deg,
            transparent 0%,
            transparent 40%,
            ${accentColor}08 40%,
            ${accentColor}08 60%,
            transparent 60%,
            transparent 100%
          )`,
        }}
      />

      {/* Animated Contour Lines SVG */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        style={{ y: contourY }}
      >
        <defs>
          <filter id="contourGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {contourLines.map((line, i) => (
          <motion.path
            key={i}
            d={generateContourPath(width * 1.5, line.baseY, line.amplitude, line.frequency, line.phase)}
            fill="none"
            stroke={accentColor}
            strokeWidth={0.5 + (i % 3 === 0 ? 0.5 : 0)}
            strokeOpacity={(isDark ? 0.06 : 0.08) + (i % 3 === 0 ? 0.03 : 0)}
            filter="url(#contourGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: 1,
              d: [
                generateContourPath(width * 1.5, line.baseY, line.amplitude, line.frequency, line.phase),
                generateContourPath(width * 1.5, line.baseY, line.amplitude, line.frequency, line.phase + Math.PI),
                generateContourPath(width * 1.5, line.baseY, line.amplitude, line.frequency, line.phase + Math.PI * 2),
              ]
            }}
            transition={{
              pathLength: { duration: 2, delay: line.delay, ease: "easeOut" },
              opacity: { duration: 1, delay: line.delay },
              d: { 
                duration: line.duration, 
                repeat: Infinity, 
                ease: "linear",
                delay: line.delay + 2
              }
            }}
          />
        ))}
      </motion.svg>

      {/* Parallax Mountain Layers */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        style={{ overflow: 'visible' }}
      >
        {mountainLayers.map((layer, i) => (
          <motion.g
            key={`mountain-${i}`}
            style={{ x: layer.parallax }}
          >
            <motion.path
              d={generateMountainPath(width, layer.baseY, layer.peaks)}
              fill={accentColor}
              fillOpacity={layer.opacity}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1.5, 
                delay: 0.3 + i * 0.2,
                ease: "easeOut"
              }}
            />
          </motion.g>
        ))}
      </svg>

      {/* Animated horizontal scan line */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.line
          x1="0"
          y1="0"
          x2={width}
          y2="0"
          stroke={accentColor}
          strokeWidth="1"
          strokeOpacity={isDark ? 0.08 : 0.1}
          initial={{ y1: -10, y2: -10 }}
          animate={{ y1: height + 10, y2: height + 10 }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 3,
          }}
        />
      </svg>

      {/* Corner glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 transition-opacity duration-300"
        style={{
          background: `radial-gradient(
            circle at center,
            ${accentColor}${isDark ? '0d' : '08'} 0%,
            transparent 60%
          )`,
        }}
      />

      {/* Bottom glow from mountains */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute bottom-0 left-0 right-0 h-1/3 transition-opacity duration-300"
        style={{
          background: `linear-gradient(
            to top,
            ${accentColor}${isDark ? '08' : '05'} 0%,
            transparent 100%
          )`,
        }}
      />
    </div>
  );
}
