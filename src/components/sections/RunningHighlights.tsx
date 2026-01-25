"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeInOnScroll } from "@/components/animations";
import { StravaIcon } from "@/components/icons";
import type { RunningConfig } from "@/lib/content";

interface RunningHighlightsProps {
  running: RunningConfig;
}

export function RunningHighlights({ running }: RunningHighlightsProps) {
  return (
    <section className="relative py-32 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <FadeInOnScroll>
          <Link href="/running" className="group block">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
              <div>
                <span className="text-xs font-mono text-accent uppercase tracking-widest">
                  Ultra Running
                </span>
                <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mt-4">
                  22 Races<span className="text-accent">.</span>
                  <br />
                  <span className="text-foreground/20">Endless Passion.</span>
                </h2>
              </div>
              <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                <span>View race history</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {running.stats.map((stat, i) => (
                <FadeInOnScroll
                  key={stat.label}
                  yOffset={20}
                  delay={i * 0.1}
                  className="edge-card p-6 text-center"
                >
                  <div className="font-[family-name:var(--font-display)] text-3xl font-bold text-accent stat-number">
                    {stat.value}
                  </div>
                  <div className="text-sm font-mono text-foreground/60 uppercase tracking-wider mt-2">
                    {stat.label}
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </Link>

          {/* External links */}
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href={running.links.strava}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono text-foreground/60 hover:text-accent transition-colors"
            >
              <StravaIcon className="w-5 h-5" />
              Strava
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href={running.links.ultrasignup}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono text-foreground/60 hover:text-accent transition-colors"
            >
              <span className="text-lg">🏃</span>
              UltraSignup
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}

