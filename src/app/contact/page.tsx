"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { getSiteConfig } from "@/lib/content";
import { StrikingBackground } from "@/components/effects";
import { Button } from "@/components/ui/button";

// Strava icon
function StravaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
    </svg>
  );
}

const socialLinks = [
  { key: "github", icon: Github, label: "GitHub" },
  { key: "linkedin", icon: Linkedin, label: "LinkedIn" },
  { key: "strava", icon: StravaIcon, label: "Strava" },
  { key: "twitter", icon: Twitter, label: "Twitter" },
];

export default function ContactPage() {
  const site = getSiteConfig();

  return (
    <>
      <StrikingBackground />
      
      {/* Hero */}
      <section className="min-h-[70vh] flex items-center relative px-6 pt-32">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Main CTA */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-mono text-ember uppercase tracking-widest">
                Contact
              </span>
              <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-bold text-white mt-4 leading-[0.9]">
                Let&apos;s<br />
                <span className="text-ember">talk</span><span className="text-white/20">.</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/40 max-w-lg mt-8 leading-relaxed">
                Have a project in mind? Looking for a technical partner? 
                Or just want to chat about ultrarunning and code?
              </p>
              
              <div className="mt-10">
                <Button
                  asChild
                  size="lg"
                  className="bg-ember text-black font-semibold hover:bg-ember/90 rounded-none px-10 py-6 text-lg"
                >
                  <a href={`mailto:${site.email}`}>
                    <Mail className="w-5 h-5 mr-2" />
                    Send an Email
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Right - Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Email */}
              <div className="edge-card p-6">
                <div className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3">
                  Email
                </div>
                <a
                  href={`mailto:${site.email}`}
                  className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-white hover:text-ember transition-colors"
                >
                  {site.email}
                </a>
              </div>

              {/* Location */}
              <div className="edge-card p-6">
                <div className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3">
                  Location
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <MapPin className="w-4 h-4 text-ember" />
                  <span>{site.location.name}</span>
                </div>
              </div>

              {/* Social */}
              <div className="edge-card p-6">
                <div className="text-xs font-mono text-white/30 uppercase tracking-widest mb-4">
                  Connect
                </div>
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    const href = site.social[social.key as keyof typeof site.social];
                    return (
                      <a
                        key={social.key}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center border border-white/10 text-white/40 hover:text-ember hover:border-ember/30 transition-all"
                        aria-label={social.label}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What I can help with */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
              Services
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-white mt-4">
              What I can help with<span className="text-ember">.</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Full-Stack Development",
                desc: "End-to-end web and mobile applications built with modern frameworks.",
              },
              {
                title: "AI Integration",
                desc: "Add intelligent features to your existing products using LLMs and ML.",
              },
              {
                title: "Technical Consulting",
                desc: "Architecture reviews, tech stack decisions, and team guidance.",
              },
              {
                title: "MVP Development",
                desc: "Rapid prototyping to validate your idea and get to market fast.",
              },
              {
                title: "Real-Time Systems",
                desc: "GPS tracking, live updates, WebSockets - systems that need to be instant.",
              },
              {
                title: "Code Review & Audit",
                desc: "In-depth analysis of your codebase with actionable improvements.",
              },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="edge-card p-6 group"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white mb-3 group-hover:text-ember transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to start<span className="text-ember">?</span>
            </h2>
            <p className="text-lg text-white/40 mb-10 max-w-2xl mx-auto">
              Every great project starts with a conversation. 
              Let&apos;s discuss your ideas and see how we can bring them to life.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-ember text-black font-semibold hover:bg-ember/90 rounded-none px-12 py-6 text-lg"
            >
              <a href={`mailto:${site.email}`}>
                Send Me an Email
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
