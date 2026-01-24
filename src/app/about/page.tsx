"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { getJourney, getSkills, getSiteConfig } from "@/lib/content";
import { StrikingBackground } from "@/components/effects";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  const journey = getJourney();
  const skills = getSkills();
  const site = getSiteConfig();

  return (
    <>
      <StrikingBackground />
      
      {/* Hero */}
      <section className="min-h-[60vh] flex items-end relative px-6 pt-32 pb-16">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-mono text-ember uppercase tracking-widest">
              About
            </span>
            <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-bold text-white mt-4">
              The<br />
              <span className="text-ember">journey</span><span className="text-white/20">.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/40 max-w-2xl mt-8 leading-relaxed">
              {journey.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
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
              Timeline
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-white mt-4">
              Where I&apos;ve been<span className="text-ember">.</span>
            </h2>
          </motion.div>

          {/* Timeline items */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />

            <div className="space-y-8">
              {journey.timeline.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative pl-12"
                >
                  {/* Node */}
                  <div className="absolute left-2 top-3 w-5 h-5 flex items-center justify-center">
                    <div className="w-2 h-2 bg-ember" />
                  </div>

                  {/* Content */}
                  <div className="edge-card p-6 group">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-xs font-mono text-ember">
                        {item.period}
                      </span>
                      {item.location && (
                        <span className="flex items-center gap-1 text-xs text-white/30">
                          <MapPin className="w-3 h-3" />
                          {item.location.name}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white mb-3 group-hover:text-ember transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-white/40 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {item.highlights && (
                      <div className="flex flex-wrap gap-2">
                        {item.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="text-xs font-mono text-white/30 px-2 py-1 border border-white/5"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
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
              Skills
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-white mt-4">
              What I work with<span className="text-ember">.</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.categories.map((category, i) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="edge-card p-6 group"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white mb-4 group-hover:text-ember transition-colors">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-mono text-white/40 px-2 py-1 border border-white/10 hover:border-ember/30 hover:text-white/60 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Approach */}
      <section className="relative py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="edge-card p-8 sm:p-12"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-mono text-ember uppercase tracking-widest">
                  My Approach
                </span>
                <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-white mt-4 mb-6">
                  {skills.approach.title}<span className="text-ember">.</span>
                </h2>
                <p className="text-white/50 leading-relaxed">
                  {skills.approach.description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {skills.tools.slice(0, 4).map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="edge-card p-4 text-center"
                  >
                    <div className="font-[family-name:var(--font-display)] font-bold text-white">
                      {tool.name}
                    </div>
                    <div className="text-xs font-mono text-white/30">
                      {tool.category}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-white mb-4">
              Want to work together<span className="text-ember">?</span>
            </h2>
            <p className="text-white/40 mb-8 max-w-xl mx-auto">
              I&apos;m always open to discussing new projects and opportunities.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-ember text-black font-semibold hover:bg-ember/90 rounded-none px-8"
            >
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
