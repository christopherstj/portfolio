"use client";

import { FadeInOnScroll } from "@/components/animations";

const services = [
  { title: "AI Agents & Workflows", desc: "Custom agents, MCP servers, workflow orchestration that drives decisions." },
  { title: "Data Unification", desc: "ETL pipelines, multi-source ingestion, confidence-scored joining." },
  { title: "Full-Stack Applications", desc: "React, Next.js, Node.js. Web + mobile, shipped fast." },
  { title: "Technical Problem-Solving", desc: "Ambiguous problems, complex data, real business outcomes." },
];

export function WhatIDo() {
  return (
    <section className="relative py-32 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <FadeInOnScroll className="grid lg:grid-cols-2 gap-16">
          {/* Left - Title */}
          <div>
            <span className="text-xs font-mono text-accent uppercase tracking-widest">
              What I Do
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-foreground mt-4 mb-6">
              AI systems that solve real problems<span className="text-accent">.</span>
            </h2>
            <p className="text-foreground/40 leading-relaxed">
              I build intelligent systems that drive business outcomes—from custom AI agents 
              to enterprise data pipelines. Enterprise rigor, startup speed.
            </p>
          </div>

          {/* Right - Services */}
          <div className="space-y-6">
            {services.map((service, i) => (
              <FadeInOnScroll
                key={service.title}
                xOffset={20}
                yOffset={0}
                delay={i * 0.1}
                className="edge-card p-6 group"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-foreground/40 text-sm">{service.desc}</p>
              </FadeInOnScroll>
            ))}
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}

