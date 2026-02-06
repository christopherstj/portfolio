"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FadeInOnScroll } from "@/components/animations";
import type { FeaturedProject } from "@/lib/content";

interface FeaturedWorkProps {
  projects: FeaturedProject[];
}

export function FeaturedWork({ projects }: FeaturedWorkProps) {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <FadeInOnScroll className="mb-16">
          <span className="text-xs font-mono text-accent uppercase tracking-widest">
            Featured Projects
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mt-4">
            What I&apos;m building<span className="text-accent">.</span>
          </h2>
        </FadeInOnScroll>

        {/* Featured project cards */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <FadeInOnScroll key={project.id} delay={0.1 * index}>
              <Link href="/projects" className="group block">
                <div className="edge-card p-8 sm:p-12">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                        {project.name}<span className="text-accent">.</span>
                      </h3>
                      
                      <div className="flex items-center gap-3 mb-6">
                        <span className="tag">{project.status}</span>
                        <span className="tag">{project.role}</span>
                      </div>
                      
                      <p className="text-foreground/60 text-lg leading-relaxed mb-8">
                        {project.description}
                      </p>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="tag"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                        <span>Explore project</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                    
                    {/* Visual - Logo or iframe based on displayType */}
                    <div className="relative flex justify-center">
                      {project.displayType === "iframe" && project.url ? (
                        <>
                          <div className="relative w-[280px] h-[560px] bg-black rounded-[3rem] p-2 shadow-2xl border-4 border-foreground/10">
                            {/* Phone notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10" />
                            {/* Screen */}
                            <div className="w-full h-full rounded-[2.25rem] overflow-hidden bg-secondary">
                              <iframe
                                src={project.url}
                                className="w-[375px] h-[812px] origin-top-left scale-[0.688]"
                                title={`${project.name} App Preview`}
                              />
                            </div>
                          </div>
                          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs font-mono text-foreground/40">
                            {project.url.replace("https://", "")}
                          </div>
                        </>
                      ) : (
                        <div className="relative w-full h-[300px] sm:h-[350px] flex items-center justify-center bg-foreground/[0.02] rounded-lg">
                          {project.image ? (
                            <Image
                              src={project.image}
                              alt={`${project.name} logo`}
                              width={350}
                              height={175}
                              className="object-contain max-h-[180px] w-auto"
                            />
                          ) : (
                            <div className="text-6xl text-foreground/20">🏢</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

