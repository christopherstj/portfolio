"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeInOnScroll } from "@/components/animations";
import type { FeaturedProject as FeaturedProjectType } from "@/lib/content";

interface FeaturedProjectProps {
  project: FeaturedProjectType;
}

export function FeaturedProject({ project }: FeaturedProjectProps) {
  const isIframe = project.displayType === "iframe" && project.url;

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

          {/* Featured project card */}
          <div className="edge-card overflow-hidden">
            <div className="relative">
              {/* Visual area - Logo or iframe based on displayType */}
              {isIframe ? (
                <div className="relative h-[500px] sm:h-[650px] bg-foreground/[0.02] flex items-center justify-center">
                  <div className="relative w-[280px] h-[560px] bg-black rounded-[3rem] p-2 shadow-2xl border-4 border-foreground/10">
                    {/* Phone notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10" />
                    {/* Screen */}
                    <div className="w-full h-full rounded-[2.25rem] overflow-hidden bg-secondary">
                      <iframe
                        src={project.url!}
                        className="w-[375px] h-[812px] origin-top-left scale-[0.688]"
                        title={`${project.name} App Preview`}
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-mono text-foreground/40">
                    {project.url!.replace("https://", "")}
                  </div>
                </div>
              ) : (
                <div className="relative h-[300px] sm:h-[400px] bg-foreground/[0.02] flex items-center justify-center">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.name} logo`}
                      width={400}
                      height={200}
                      className="object-contain max-h-[200px] w-auto"
                      priority
                    />
                  ) : (
                    <div className="text-6xl text-foreground/20">🏢</div>
                  )}
                </div>
              )}

              {/* Info bar */}
              <div className="p-6 border-t border-border">
                <p className="text-foreground/50 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Features */}
                {project.features && project.features.length > 0 && (
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
                )}

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
