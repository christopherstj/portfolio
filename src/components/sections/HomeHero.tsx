"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SiteConfig } from "@/lib/content";

interface HomeHeroProps {
  site: SiteConfig;
}

export function HomeHero({ site }: HomeHeroProps) {
  return (
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

        {/* Main headline with headshot */}
        <div className="flex items-start gap-8 lg:gap-12 mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-[family-name:var(--font-display)] text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-foreground leading-[0.85] tracking-tight"
          >
            <span className="block">I build</span>
            <span className="block text-accent">software</span>
            <span className="block text-foreground/20">that moves.</span>
          </motion.h1>

          {/* Headshot - next to title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:block shrink-0 self-center"
          >
            <div className="relative w-48 h-48 lg:w-64 lg:h-64 xl:w-80 xl:h-80">
              <div className="absolute inset-0 bg-accent/20 -rotate-3" />
              <Image
                src="/images/post-coco.jpg"
                alt="Chris St Jean, freelance full-stack developer and ultrarunner"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl text-foreground/40 max-w-xl mb-12 leading-relaxed"
        >
          {site.hero.subline}
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

        {/* Stats row - Professional highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 pt-12 border-t border-border"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {site.homeStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <div className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-accent stat-number">
                  {stat.value}
                </div>
                <div className="text-sm font-mono text-foreground/60 uppercase tracking-wider mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

