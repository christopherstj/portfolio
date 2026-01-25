"use client";

import { FadeInOnScroll } from "@/components/animations";

const services = [
  { title: "Web Applications", desc: "React, Next.js, TypeScript. Fast, accessible, beautiful." },
  { title: "Mobile Development", desc: "React Native, Expo. Cross-platform that feels native." },
  { title: "AI Integration", desc: "OpenAI, Claude, LangChain. Intelligence built in." },
  { title: "Real-time Systems", desc: "WebSockets, GPS tracking, live data. Instant updates." },
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
              Full-stack development with AI acceleration<span className="text-accent">.</span>
            </h2>
            <p className="text-foreground/40 leading-relaxed">
              I leverage cutting-edge AI tools to build faster without sacrificing quality. 
              From real-time systems to mobile apps, I ship production-ready software.
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

