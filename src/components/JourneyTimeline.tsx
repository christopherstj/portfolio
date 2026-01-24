"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";

interface TimelineItem {
  id: string;
  title: string;
  period: string;
  description: string;
  location?: {
    name: string;
    coordinates: { lat: number; lng: number } | null;
  };
  highlights?: string[];
  type: string;
}

interface JourneyTimelineProps {
  timeline: TimelineItem[];
}

// Ford Transit High-Top Van SVG
function TransitVan({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 56"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Van body - tall high-top shape */}
      <path
        d="M4 48 L4 16 C4 12 6 10 10 10 L50 10 L50 8 C50 6 52 4 54 4 L68 4 C72 4 76 8 76 12 L76 48"
        fill="white"
        stroke="white"
        strokeWidth="1"
      />
      {/* Roof rack */}
      <rect x="8" y="6" width="38" height="2" rx="1" fill="#e5e5e5" />
      <rect x="12" y="4" width="2" height="4" fill="#d4d4d4" />
      <rect x="24" y="4" width="2" height="4" fill="#d4d4d4" />
      <rect x="36" y="4" width="2" height="4" fill="#d4d4d4" />
      {/* Windows - back */}
      <rect x="8" y="14" width="10" height="12" rx="1" fill="#1a1a2e" opacity="0.8" />
      <rect x="20" y="14" width="10" height="12" rx="1" fill="#1a1a2e" opacity="0.8" />
      <rect x="32" y="14" width="10" height="12" rx="1" fill="#1a1a2e" opacity="0.8" />
      {/* Windshield */}
      <path
        d="M52 10 L52 28 L72 28 L72 14 C72 10 70 8 68 8 L56 8 C54 8 52 9 52 10 Z"
        fill="#1a1a2e"
        opacity="0.8"
      />
      {/* Side detail line */}
      <line x1="4" y1="32" x2="76" y2="32" stroke="#e5e5e5" strokeWidth="1" />
      {/* Door handle */}
      <rect x="44" y="34" width="4" height="1.5" rx="0.5" fill="#a3a3a3" />
      {/* Sliding door track */}
      <line x1="18" y1="28" x2="18" y2="44" stroke="#d4d4d4" strokeWidth="0.5" />
      {/* Headlight */}
      <rect x="72" y="24" width="3" height="4" rx="1" fill="#fbbf24" />
      {/* Tail light */}
      <rect x="4" y="36" width="2" height="4" rx="0.5" fill="#ef4444" />
      {/* Wheel wells */}
      <path d="M10 48 C10 42 16 42 22 42 C28 42 28 48 28 48" fill="#1a1a2e" />
      <path d="M52 48 C52 42 58 42 64 42 C70 42 70 48 70 48" fill="#1a1a2e" />
      {/* Wheels */}
      <circle cx="19" cy="48" r="7" fill="#262626" />
      <circle cx="19" cy="48" r="5" fill="#404040" />
      <circle cx="19" cy="48" r="2" fill="#525252" />
      <circle cx="61" cy="48" r="7" fill="#262626" />
      <circle cx="61" cy="48" r="5" fill="#404040" />
      <circle cx="61" cy="48" r="2" fill="#525252" />
      {/* Ground shadow */}
      <ellipse cx="40" cy="54" rx="30" ry="2" fill="black" opacity="0.1" />
    </svg>
  );
}

export function JourneyTimeline({ timeline }: JourneyTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate scroll progress through the entire container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Van moves from left (5%) to right (85%) of the track - direct transform, no spring
  const vanX = useTransform(scrollYProgress, [0, 1], ["5%", "85%"]);
  
  // Subtle bounce as van moves
  const vanY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    [0, -1, 0, -1, 0, -1, 0, -1, 0, -1, 0]
  );

  // Road markers opacity based on van position
  const getMarkerOpacity = (index: number) => {
    const markerPosition = index / (timeline.length - 1);
    return useTransform(
      scrollYProgress,
      [markerPosition - 0.1, markerPosition, markerPosition + 0.1],
      [0.3, 1, 0.3]
    );
  };

  return (
    <div 
      ref={containerRef} 
      className="relative"
      style={{ height: `${(timeline.length + 1) * 100}vh` }}
    >
      {/* Sticky container - this stays fixed in the viewport */}
      <div className="sticky top-16 sm:top-0 h-[calc(100vh-4rem)] sm:h-screen flex flex-col justify-start sm:justify-center pt-4 sm:pt-0 overflow-hidden">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-6 mb-4 sm:mb-8"
        >
          <span className="text-xs font-mono text-foreground/30 uppercase tracking-widest">
            Timeline
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-4xl font-bold text-foreground mt-2">
            Where I&apos;ve been<span className="text-accent">.</span>
          </h2>
        </motion.div>

        {/* Van & Road Section */}
        <div className="relative px-6 mb-4 sm:mb-8">
          {/* Road background */}
          <div className="relative h-24 sm:h-40">
            {/* Sky gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/5 rounded-lg" />
            
            {/* Road surface */}
            <div className="absolute bottom-8 left-0 right-0 h-3 bg-foreground/10 rounded-full" />
            
            {/* Road dashes */}
            <div className="absolute bottom-9 left-0 right-0 flex justify-around px-8">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="w-6 sm:w-8 h-0.5 bg-foreground/20" />
              ))}
            </div>

            {/* Timeline markers on the road */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-between px-8 sm:px-16">
              {timeline.map((item, i) => {
                const opacity = getMarkerOpacity(i);
                return (
                  <motion.div
                    key={item.id}
                    className="flex flex-col items-center"
                    style={{ opacity }}
                  >
                    <div className="w-3 h-3 rounded-full bg-accent mb-2" />
                    <span className="text-xs font-mono text-foreground/50 whitespace-nowrap">
                      {item.period.split("-")[0]}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* The Van - center stage */}
            <motion.div
              className="absolute bottom-10 sm:bottom-12"
              style={{ 
                left: vanX,
                y: vanY,
                x: "-50%", // Center the van on its position
              }}
            >
              {/* Dust cloud behind van */}
              <motion.div
                className="absolute -left-6 bottom-2 flex gap-1 opacity-30"
                animate={{ 
                  x: [-2, -8, -2],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                <div className="w-3 h-3 rounded-full bg-foreground/20" />
                <div className="w-2 h-2 rounded-full bg-foreground/15" />
                <div className="w-1.5 h-1.5 rounded-full bg-foreground/10" />
              </motion.div>
              
              <TransitVan className="w-20 h-14 sm:w-28 sm:h-20 drop-shadow-xl" />
            </motion.div>
          </div>
        </div>

        {/* Current Location Card */}
        <div className="px-6">
          <div className="max-w-2xl mx-auto">
            {timeline.map((item, i) => {
              const start = i / timeline.length;
              const end = (i + 1) / timeline.length;
              const cardOpacity = useTransform(
                scrollYProgress,
                [start - 0.05, start + 0.05, end - 0.05, end + 0.05],
                [0, 1, 1, 0]
              );
              const cardY = useTransform(
                scrollYProgress,
                [start - 0.05, start + 0.05, end - 0.05, end + 0.05],
                [30, 0, 0, -30]
              );

              return (
                <motion.div
                  key={item.id}
                  className="absolute inset-x-6 edge-card p-4 sm:p-8"
                  style={{
                    opacity: cardOpacity,
                    y: cardY,
                  }}
                >
                  {/* Period & Location */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
                    <span className="text-base sm:text-xl font-mono text-accent font-bold">
                      {item.period}
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-2 text-sm text-foreground/40">
                        <MapPin className="w-4 h-4" />
                        {item.location.name}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-3xl font-bold text-foreground mb-2 sm:mb-4">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-foreground/50 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                    {item.description}
                  </p>

                  {/* Highlights */}
                  {item.highlights && (
                    <div className="flex flex-wrap gap-2">
                      {item.highlights.map((highlight) => (
                        <span key={highlight} className="tag">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/30"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {timeline.map((item, i) => {
            const dotOpacity = useTransform(
              scrollYProgress,
              [i / timeline.length - 0.1, i / timeline.length, i / timeline.length + 0.1],
              [0.2, 1, 0.2]
            );
            const dotScale = useTransform(
              scrollYProgress,
              [i / timeline.length - 0.1, i / timeline.length, i / timeline.length + 0.1],
              [1, 1.5, 1]
            );
            return (
              <motion.div
                key={item.id}
                className="w-2 h-2 rounded-full bg-accent"
                style={{ opacity: dotOpacity, scale: dotScale }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
