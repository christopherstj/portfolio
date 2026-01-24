"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Maximize2 } from "lucide-react";
import { getProjects } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { StrikingBackground } from "@/components/effects";
import { useState } from "react";

export default function ProjectsPage() {
  const projects = getProjects();
  const [iframeExpanded, setIframeExpanded] = useState(false);

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
              Projects
            </span>
            <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-bold text-white mt-4">
              Things I&apos;ve<br />
              <span className="text-ember">built</span><span className="text-white/20">.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Featured Project - PathQuest with iframe */}
      <section className="relative py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="tag">Featured</span>
                  <span className="tag">{projects.featured.status}</span>
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-white">
                  {projects.featured.name}<span className="text-ember">.</span>
                </h2>
              </div>
              <div className="flex gap-3">
                {projects.featured.url && (
                  <Button
                    asChild
                    size="sm"
                    className="bg-ember text-black font-semibold hover:bg-ember/90 rounded-none"
                  >
                    <a
                      href={projects.featured.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Site
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Interactive iframe preview */}
            <div className="edge-card overflow-hidden">
              <div className="relative">
                {/* Iframe container */}
                <motion.div 
                  className={`relative transition-all duration-500 ${
                    iframeExpanded ? 'h-[80vh]' : 'h-[500px]'
                  }`}
                  layout
                >
                  {/* Loading state / placeholder */}
                  <div className="absolute inset-0 bg-white/[0.02] flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-6xl mb-4"
                      >
                        🏔️
                      </motion.div>
                      <div className="text-white/30 text-sm font-mono">Loading PathQuest...</div>
                    </div>
                  </div>
                  
                  {/* Actual iframe */}
                  <iframe
                    src="https://pathquest.app"
                    className="absolute inset-0 w-full h-full border-0"
                    title="PathQuest - Live Preview"
                    loading="lazy"
                    allow="geolocation"
                    style={{ 
                      backgroundColor: '#000',
                    }}
                  />
                  
                  {/* Overlay gradient at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                  
                  {/* Expand button */}
                  <button
                    onClick={() => setIframeExpanded(!iframeExpanded)}
                    className="absolute bottom-4 right-4 p-2 bg-black/60 border border-white/10 text-white/60 hover:text-ember hover:border-ember/30 transition-all z-10"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </motion.div>

                {/* Info bar */}
                <div className="p-6 border-t border-white/5">
                  <p className="text-white/50 mb-6 leading-relaxed">
                    {projects.featured.description}
                  </p>

                  {/* Features */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {projects.featured.features.map((feature, i) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 text-white/60 text-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-ember" />
                        {feature}
                      </motion.div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {projects.featured.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono text-white/30 px-3 py-1.5 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other Projects / Work Experience */}
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
              Experience
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-white mt-4">
              Other work<span className="text-ember">.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.other.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="edge-card p-6 h-full group">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white group-hover:text-ember transition-colors">
                      {project.name}
                    </h3>
                    <div className="flex gap-2">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-white/30 hover:text-ember transition-colors"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-white/30 hover:text-white transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Role and period */}
                  {(project.role || project.period) && (
                    <div className="mb-4">
                      {project.role && (
                        <div className="text-ember text-sm font-medium">{project.role}</div>
                      )}
                      {project.period && (
                        <div className="text-white/30 text-xs font-mono">{project.period}</div>
                      )}
                    </div>
                  )}
                  
                  <p className="text-white/40 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="mb-4 space-y-1">
                      {project.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-white/50 text-xs">
                          <div className="w-1 h-1 bg-ember" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono text-white/30 px-2 py-1 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
              Have a project in mind<span className="text-ember">?</span>
            </h2>
            <p className="text-white/40 mb-8 max-w-xl mx-auto">
              I&apos;m always excited to work on new challenges. Let&apos;s discuss how I can help.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-ember text-black font-semibold hover:bg-ember/90 rounded-none px-8"
            >
              <a href="/contact">Start a Conversation</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
