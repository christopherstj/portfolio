"use client";

import { FadeInOnScroll } from "@/components/animations";

interface StatsCardProps {
  value: string;
  label: string;
  index: number;
}

export function StatsCard({ value, label, index }: StatsCardProps) {
  return (
    <FadeInOnScroll delay={index * 0.1}>
      <div className="edge-card p-6 sm:p-8 text-center">
        <div className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-accent stat-number">
          {value}
        </div>
        <div className="text-sm font-mono text-foreground/60 uppercase tracking-wider mt-2">
          {label}
        </div>
      </div>
    </FadeInOnScroll>
  );
}

