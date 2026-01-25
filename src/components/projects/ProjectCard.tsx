"use client";

import { Github, ArrowUpRight } from "lucide-react";
import { FadeInOnScroll } from "@/components/animations";
import type { Project } from "@/lib/content";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <FadeInOnScroll delay={index * 0.1}>
      <div className="edge-card p-6 h-full group">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground group-hover:text-accent transition-colors">
            {project.name}
          </h3>
          <div className="flex gap-2">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-foreground/30 hover:text-accent transition-colors"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-foreground/30 hover:text-foreground transition-colors"
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
              <div className="text-accent text-sm font-medium">{project.role}</div>
            )}
            {project.period && (
              <div className="text-foreground/30 text-xs font-mono">{project.period}</div>
            )}
          </div>
        )}
        
        <p className="text-foreground/40 mb-4 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-4 space-y-1">
            {project.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-center gap-2 text-foreground/50 text-xs">
                <div className="w-1 h-1 bg-accent" />
                {highlight}
              </div>
            ))}
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mt-auto">
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
    </FadeInOnScroll>
  );
}

