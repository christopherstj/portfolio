"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mountain, Trophy, Clock, MapPin } from "lucide-react";
import { getRunning } from "@/lib/content";
import { StrikingBackground } from "@/components/effects";
import { Button } from "@/components/ui/button";

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
            <span className="text-xs font-mono text-ember uppercase tracking-widest">
              Ultra Running
            </span>
            <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mt-4 leading-[0.9]">
              {running.headline.split('.')[0]}<span className="text-ember">.</span>
              <br />
              <span className="text-white/20">{running.headline.split('.').slice(1).join('.')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/40 max-w-2xl mt-8 leading-relaxed">
              {running.philosophy}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="relative py-16 px-6 border-t border-white/5">
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
                <div className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-ember stat-number">
                  {stat.value}
                </div>
                <div className="text-xs font-mono text-white/30 uppercase tracking-widest mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Races */}
      <section className="relative py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
              Race Results
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-white mt-4">
              Recent finishes<span className="text-ember">.</span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {running.races.filter(r => r.featured).map((race, i) => (
              <motion.div
                key={race.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="edge-card p-6 sm:p-8 group">
                  <div className="grid lg:grid-cols-[1fr,auto] gap-8">
                    {/* Main content */}
                    <div>
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-white group-hover:text-ember transition-colors">
                          {race.name}
                        </h3>
                        {race.highlight && (
                          <span className="tag">{race.highlight}</span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-6 text-sm text-white/40 mb-6">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {race.location}
                        </span>
                        <span>{race.year}</span>
                      </div>
                      
                      <p className="text-white/50 leading-relaxed max-w-2xl">
                        {race.description}
                      </p>

                      {/* Elevation visualization */}
                      {race.elevationData && (
                        <div className="mt-6 h-16 flex items-end gap-0.5">
                          {race.elevationData.map((elev, j) => {
                            const maxElev = Math.max(...race.elevationData);
                            const height = (elev / maxElev) * 100;
                            return (
                              <motion.div
                                key={j}
                                initial={{ height: 0 }}
                                whileInView={{ height: `${height}%` }}
                                viewport={{ once: true }}
                                transition={{ delay: j * 0.02, duration: 0.3 }}
                                className="flex-1 bg-ember/20 group-hover:bg-ember/40 transition-colors"
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Stats sidebar */}
                    <div className="flex lg:flex-col gap-6 lg:gap-4 lg:text-right">
                      <div>
                        <div className="font-[family-name:var(--font-display)] text-3xl font-bold text-ember">
                          {race.place}
                        </div>
                        <div className="text-xs font-mono text-white/30 uppercase tracking-widest">
                          Place
                        </div>
                      </div>
                      <div>
                        <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                          {race.distance}
                        </div>
                        <div className="text-xs font-mono text-white/30 uppercase tracking-widest">
                          Distance
                        </div>
                      </div>
                      <div>
                        <div className="font-[family-name:var(--font-display)] text-xl font-bold text-white/60">
                          {race.elevation}
                        </div>
                        <div className="text-xs font-mono text-white/30 uppercase tracking-widest">
                          Gain
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Races */}
      <section className="relative py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
              All races<span className="text-ember">.</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {running.races.map((race, i) => (
              <motion.div
                key={race.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="edge-card p-5 group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] font-bold text-white group-hover:text-ember transition-colors">
                      {race.name}
                    </h3>
                    <div className="text-xs text-white/30">{race.year}</div>
                  </div>
                  <div className="font-[family-name:var(--font-display)] text-xl font-bold text-ember">
                    {race.place}
                  </div>
                </div>
                <div className="flex gap-4 text-xs font-mono text-white/40">
                  <span>{race.distance}</span>
                  <span>{race.elevation}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strava CTA */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-white mb-4">
              Follow the journey<span className="text-ember">.</span>
            </h2>
            <p className="text-white/40 mb-8 max-w-xl mx-auto">
              Track my training and adventures on Strava.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[#FC4C02] text-white font-semibold hover:bg-[#FC4C02]/90 rounded-none px-8"
            >
              <a
                href="https://strava.com/athletes/chrisstjean"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <StravaIcon className="w-5 h-5" />
                Follow on Strava
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
