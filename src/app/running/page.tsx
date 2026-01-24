"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mountain, Trophy, Clock, MapPin } from "lucide-react";
import { getRunning } from "@/lib/content";
import { StrikingBackground } from "@/components/effects";
import { Button } from "@/components/ui/button";
import { RaceMap } from "@/components/maps";

// Strava icon
function StravaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
    </svg>
  );
}

export default function RunningPage() {
  const running = getRunning();

  return (
    <>
      <StrikingBackground />
      
      {/* Hero */}
      <section className="min-h-[70vh] flex items-end relative px-6 pt-32 pb-16">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-mono text-accent uppercase tracking-widest">
              Ultra Running
            </span>
            <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mt-4 leading-[0.9]">
              {running.headline.split('.')[0]}<span className="text-accent">.</span>
              <br />
              <span className="text-foreground/20">{running.headline.split('.').slice(1).join('.')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground/40 max-w-2xl mt-8 leading-relaxed">
              {running.philosophy}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="relative py-16 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {running.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="edge-card p-6 sm:p-8 text-center"
              >
                <div className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-accent stat-number">
                  {stat.value}
                </div>
                <div className="text-sm font-mono text-foreground/60 uppercase tracking-wider mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Routes with Maps */}
      <section className="relative py-16 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-xs font-mono text-foreground/30 uppercase tracking-widest">
              Featured Routes
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mt-4">
              The courses<span className="text-accent">.</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {running.featuredRoutes.map((route, i) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="edge-card overflow-hidden group"
              >
                <RaceMap
                  routeUrl={route.routeUrl}
                  name={route.name}
                  className="h-64"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {route.name}
                    </h3>
                    <span className="tag">
                      {route.result}
                    </span>
                  </div>
                  {(route.distance || route.elevation) && (
                    <div className="flex gap-4 text-sm font-mono text-foreground/40">
                      {route.distance && <span>{route.distance}</span>}
                      {route.elevation && <span>{route.elevation}</span>}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Races */}
      <section className="relative py-16 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-xs font-mono text-foreground/30 uppercase tracking-widest">
              Race Results
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mt-4">
              Recent finishes<span className="text-accent">.</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {running.races.filter(r => r.featured).map((race, i) => (
              <motion.div
                key={race.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Races */}
      <section className="relative py-16 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground">
              All races<span className="text-accent">.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {running.races.map((race, i) => (
              <motion.div
                key={race.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.02 }}
                className="edge-card p-3 group"
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strava CTA */}
      <section className="relative py-32 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Follow the journey<span className="text-accent">.</span>
            </h2>
            <p className="text-foreground/40 mb-8 max-w-xl mx-auto">
              Track my training and adventures on Strava.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#FC4C02] text-white font-semibold hover:bg-[#FC4C02]/90 rounded-none px-8"
              >
                <a
                  href={running.links.strava}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <StravaIcon className="w-5 h-5" />
                  Follow on Strava
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary hover:border-border rounded-none px-8"
              >
                <a
                  href={running.links.ultrasignup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <span className="text-lg">🏃</span>
                  UltraSignup Results
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
