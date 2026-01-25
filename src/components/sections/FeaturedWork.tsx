"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeInOnScroll } from "@/components/animations";
import type { FeaturedProject } from "@/lib/content";

interface FeaturedWorkProps {
  project: FeaturedProject;
}

export function FeaturedWork({ project }: FeaturedWorkProps) {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <FadeInOnScroll className="mb-16">
          <span className="text-xs font-mono text-accent uppercase tracking-widest">
            Featured Project
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mt-4">
            PathQuest<span className="text-accent">.</span>
          </h2>
        </FadeInOnScroll>

        {/* Featured project card */}
        <FadeInOnScroll delay={0.1}>
          <Link href="/projects" className="group block">
            <div className="edge-card p-8 sm:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="tag">In Development</span>
                    <span className="tag">Real-time GPS</span>
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
                
                {/* Live mobile preview */}
                <div className="relative flex justify-center">
                  <div className="relative w-[280px] h-[560px] bg-black rounded-[3rem] p-2 shadow-2xl border-4 border-foreground/10">
                    {/* Phone notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10" />
                    {/* Screen */}
                    <div className="w-full h-full rounded-[2.25rem] overflow-hidden bg-secondary">
                      <iframe
                        src="https://pathquest.app"
                        className="w-[375px] h-[812px] origin-top-left scale-[0.688]"
                        title="PathQuest App Preview"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs font-mono text-foreground/40">
                    pathquest.app
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </FadeInOnScroll>
      </div>
    </section>
  );
}

