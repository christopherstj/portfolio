"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getSiteConfig, getProjects, getRunning } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { StrikingBackground } from "@/components/effects";

export default function HomePage() {
  const site = getSiteConfig();
  const projects = getProjects();
  const running = getRunning();

  return (
    <>
      <StrikingBackground />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center relative px-6 pt-16">
        <div className="max-w-7xl mx-auto w-full">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 text-xs font-mono text-foreground/40 uppercase tracking-widest">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Available for projects
            </span>
          </motion.div>

          {/* Main headline - MASSIVE */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-[family-name:var(--font-display)] text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-foreground leading-[0.85] tracking-tight mb-8"
          >
            <span className="block">I build</span>
            <span className="block text-accent">software</span>
            <span className="block text-foreground/20">that moves.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-foreground/40 max-w-xl mb-12 leading-relaxed"
          >
            AI-empowered engineer. Elite ultrarunner. 
            Building next-gen outdoor tech from Santa Barbara.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground font-semibold hover:bg-accent/90 rounded-none px-8 group"
            >
              <Link href="/projects" className="flex items-center gap-2">
                View Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-secondary hover:border-border rounded-none px-8"
            >
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-24 pt-12 border-t border-border"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {running.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <div className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground stat-number">
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono text-foreground/30 uppercase tracking-widest mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="text-xs font-mono text-accent uppercase tracking-widest">
              Featured Project
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mt-4">
              PathQuest<span className="text-accent">.</span>
            </h2>
          </motion.div>

          {/* Featured project card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
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
                      {projects.featured.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-3 mb-8">
                      {projects.featured.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-mono text-foreground/30 px-3 py-1 border border-border"
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
                  
                  {/* Visual placeholder */}
                  <div className="relative aspect-video bg-secondary border border-border flex items-center justify-center">
                    <div className="text-6xl">🏔️</div>
                    <div className="absolute bottom-4 right-4 text-xs font-mono text-foreground/20">
                      pathquest.app
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="relative py-32 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-16"
          >
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
              {[
                { title: "Web Applications", desc: "React, Next.js, TypeScript. Fast, accessible, beautiful." },
                { title: "Mobile Development", desc: "React Native, Expo. Cross-platform that feels native." },
                { title: "AI Integration", desc: "OpenAI, Claude, LangChain. Intelligence built in." },
                { title: "Real-time Systems", desc: "WebSockets, GPS tracking, live data. Instant updates." },
              ].map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="edge-card p-6 group"
                >
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-foreground/40 text-sm">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Running Section */}
      <section className="relative py-32 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/running" className="group block">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                <div>
                  <span className="text-xs font-mono text-accent uppercase tracking-widest">
                    Ultra Running
                  </span>
                  <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mt-4">
                    250 miles<span className="text-accent">.</span>
                    <br />
                    <span className="text-foreground/20">One weekend.</span>
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                  <span>View race history</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {running.stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="edge-card p-6 text-center"
                  >
                    <div className="font-[family-name:var(--font-display)] text-3xl font-bold text-accent stat-number">
                      {stat.value}
                    </div>
                    <div className="text-xs font-mono text-foreground/30 uppercase tracking-widest mt-2">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              Let&apos;s build something<br />
              <span className="text-accent">together</span><span className="text-foreground">.</span>
            </h2>
            <p className="text-lg text-foreground/40 mb-10 max-w-2xl mx-auto">
              I&apos;m currently available for freelance projects. 
              Whether you need a full-stack application, AI integration, or technical guidance.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground font-semibold hover:bg-accent/90 rounded-none px-12 py-6 text-lg"
            >
              <Link href="/contact">Start a Conversation</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
