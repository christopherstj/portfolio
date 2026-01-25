"use client";

import { MapPin } from "lucide-react";
import { FadeInOnScroll } from "@/components/animations";
import type { Race } from "@/lib/content";

interface RaceCardProps {
  race: Race;
  index: number;
  variant?: "featured" | "compact";
}

export function RaceCard({ race, index, variant = "featured" }: RaceCardProps) {
  if (variant === "compact") {
    return (
      <FadeInOnScroll delay={index * 0.02} duration={0.4} yOffset={20}>
        <div className="edge-card p-3 group">
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="font-[family-name:var(--font-display)] text-sm font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
              {race.name}
            </h3>
            <div className="font-[family-name:var(--font-display)] text-lg font-bold text-accent shrink-0">
              {race.place}
            </div>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-0 text-xs font-mono text-foreground/40">
            <span>{race.year}</span>
            {race.distance && <span>{race.distance}</span>}
            {race.time && <span>{race.time}</span>}
          </div>
        </div>
      </FadeInOnScroll>
    );
  }

  return (
    <FadeInOnScroll delay={index * 0.05} duration={0.4} yOffset={20}>
      <div className="edge-card p-4 group h-full">
        <div className="flex justify-between items-start gap-3 mb-1">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
            {race.name}
          </h3>
          <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-accent shrink-0">
            {race.place}
          </div>
        </div>

        {/* Distance, Elevation & Time - prominent */}
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          {race.distance && (
            <span className="text-sm font-semibold text-foreground/70">{race.distance}</span>
          )}
          {race.elevation && (
            <>
              <span className="text-foreground/30">↑</span>
              <span className="text-sm font-semibold text-foreground/70">{race.elevation}</span>
            </>
          )}
          {(race.distance || race.elevation) && race.time && (
            <span className="text-foreground/30">•</span>
          )}
          {race.time && (
            <span className="text-sm font-mono font-semibold text-foreground/70">{race.time}</span>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground/40 mb-3">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {race.location}
          </span>
          <span>{race.year}</span>
        </div>

        {race.highlight && (
          <div className="mb-3">
            <span className="tag text-xs">{race.highlight}</span>
          </div>
        )}
        
        {race.description && (
          <p className="text-xs text-foreground/40 leading-relaxed line-clamp-2">
            {race.description}
          </p>
        )}
      </div>
    </FadeInOnScroll>
  );
}

