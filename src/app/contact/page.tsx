"use client";

import { motion } from "framer-motion";
import { MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { getSiteConfig } from "@/lib/content";
import { StrikingBackground } from "@/components/effects";
import { ContactForm } from "@/components/ContactForm";

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

  // Filter out null social links
  const activeSocialLinks = socialLinks.filter(
    (social) => site.social[social.key as keyof typeof site.social]
  );

  return (
    <>
      <StrikingBackground />
      
      {/* Hero */}
      <section className="min-h-[70vh] flex items-center relative px-6 pt-32">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - Header + Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-mono text-accent uppercase tracking-widest">
                Contact
              </span>
              <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-bold text-foreground mt-4 leading-[0.9]">
                Let&apos;s<br />
                <span className="text-accent">talk</span><span className="text-foreground/20">.</span>
              </h1>
              <p className="text-lg sm:text-xl text-foreground/40 max-w-lg mt-8 mb-12 leading-relaxed">
                Have a project in mind? Looking for a technical partner? 
                Send me a message and I&apos;ll get back to you soon.
              </p>
              
              {/* Contact Form */}
              <div className="edge-card p-6 sm:p-8">
                <ContactForm />
              </div>
            </motion.div>

            {/* Right - Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8 lg:sticky lg:top-32"
            >
              {/* Email - now just display, form handles sending */}
              <div className="edge-card p-6">
                <div className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-3">
                  Email
                </div>
                <div className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-foreground">
                  {site.email}
                </div>
              </div>

              {/* Location */}
              <div className="edge-card p-6">
                <div className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-3">
                  Location
                </div>
                <div className="flex items-center gap-2 text-foreground/60">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>{site.location.name}</span>
                </div>
              </div>

              {/* Social */}
              {activeSocialLinks.length > 0 && (
                <div className="edge-card p-6">
                  <div className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-4">
                    Connect
                  </div>
                  <div className="flex gap-3">
                    {activeSocialLinks.map((social) => {
                      const Icon = social.icon;
                      const href = site.social[social.key as keyof typeof site.social];
                      if (!href) return null;
                      return (
                        <a
                          key={social.key}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 flex items-center justify-center border border-border text-foreground/40 hover:text-accent hover:border-accent/30 transition-all"
                          aria-label={social.label}
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Response time */}
              <div className="edge-card p-6">
                <div className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-3">
                  Response Time
                </div>
                <div className="text-foreground/60">
                  Usually within <span className="text-accent font-semibold">24 hours</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What I can help with */}
      <section className="relative py-32 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-xs font-mono text-foreground/30 uppercase tracking-widest">
              Services
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mt-4">
              What I can help with<span className="text-accent">.</span>
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
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-foreground/40 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
