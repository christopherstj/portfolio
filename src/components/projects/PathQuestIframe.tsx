"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeInOnScroll } from "@/components/animations";
import type { FeaturedProject } from "@/lib/content";

interface PathQuestIframeProps {
  project: FeaturedProject;
}

export function PathQuestIframe({ project }: PathQuestIframeProps) {
  const [iframeExpanded, setIframeExpanded] = useState(false);

  return (
    <section className="relative py-16 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <FadeInOnScroll duration={0.6}>
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="tag">Featured</span>
                <span className="tag">{project.status}</span>
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground">
                {project.name}<span className="text-accent">.</span>
              </h2>
            </div>
            <div className="flex gap-3">
              {project.url && (
                <Button
                  asChild
                  size="sm"
                  className="bg-accent text-accent-foreground font-semibold hover:bg-accent/90 rounded-none"
                >
                  <a
                    href={project.url}
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
                  iframeExpanded ? 'h-[85vh]' : 'h-[650px]'
                }`}
                layout
              >
                {/* Loading state / placeholder */}
                <div className="absolute inset-0 bg-foreground/[0.02] flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-6xl mb-4"
                    >
                      🏔️
                    </motion.div>
                    <div className="text-foreground/30 text-sm font-mono">Loading PathQuest...</div>
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
                  className="absolute bottom-4 right-4 p-2 bg-background/60 border border-border text-foreground/60 hover:text-accent hover:border-accent/30 transition-all z-10"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </motion.div>

              {/* Info bar */}
              <div className="p-6 border-t border-border">
                <p className="text-foreground/50 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Features */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {project.features.map((feature, i) => (
                    <FadeInOnScroll
                      key={feature}
                      xOffset={-20}
                      yOffset={0}
                      delay={i * 0.1}
                      className="flex items-center gap-3 text-foreground/60 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-accent" />
                      {feature}
                    </FadeInOnScroll>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="tag"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}

