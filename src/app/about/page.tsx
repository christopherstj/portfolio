"use client";

import { motion } from "framer-motion";
import { getJourney, getSkills, getSiteConfig } from "@/lib/content";
import { StrikingBackground } from "@/components/effects";
import { Button } from "@/components/ui/button";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import Link from "next/link";

export default function AboutPage() {
  const journey = getJourney();
  const skills = getSkills();
  const site = getSiteConfig();

  return (
    <>
      <StrikingBackground />
      
      {/* Hero */}
      <section className="min-h-[50vh] sm:min-h-[60vh] flex items-end relative px-6 pt-20 sm:pt-32 pb-8 sm:pb-16">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-mono text-accent uppercase tracking-widest">
              About
            </span>
            <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-bold text-foreground mt-4">
              The<br />
              <span className="text-accent">journey</span><span className="text-foreground/20">.</span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground/40 max-w-2xl mt-8 leading-relaxed">
              {journey.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline with Van - Full page takeover */}
      <section className="relative border-t border-border">
        <JourneyTimeline timeline={journey.timeline} />
      </section>

      {/* Skills */}
      <section className="relative py-16 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-xs font-mono text-foreground/30 uppercase tracking-widest">
              Skills
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mt-4">
              What I work with<span className="text-accent">.</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.categories.map((category, i) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="edge-card p-6 group"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <span
                      key={skill}
                      className="tag"
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
      <section className="relative py-16 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="edge-card p-8 sm:p-12"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-mono text-accent uppercase tracking-widest">
                  My Approach
                </span>
                <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-6">
                  {skills.approach.title}<span className="text-accent">.</span>
                </h2>
                <p className="text-foreground/50 leading-relaxed">
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
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="edge-card p-4 text-center"
                  >
                    <div className="font-[family-name:var(--font-display)] font-bold text-foreground">
                      {tool.name}
                    </div>
                    <div className="text-xs font-mono text-foreground/30">
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
      <section className="relative py-32 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Want to work together<span className="text-accent">?</span>
            </h2>
            <p className="text-foreground/40 mb-8 max-w-xl mx-auto">
              I&apos;m always open to discussing new projects and opportunities.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground font-semibold hover:bg-accent/90 rounded-none px-8"
            >
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
