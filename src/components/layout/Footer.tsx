"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { getSiteConfig } from "@/lib/content";

// Strava icon
function StravaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
    </svg>
  );
}

const socialLinks = [
  { href: "github", icon: Github, label: "GitHub" },
  { href: "linkedin", icon: Linkedin, label: "LinkedIn" },
  { href: "strava", icon: StravaIcon, label: "Strava" },
  { href: "twitter", icon: Twitter, label: "Twitter" },
];

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/running", label: "Running" },
  { href: "/about", label: "Journey" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const site = getSiteConfig();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-[family-name:var(--font-display)] text-foreground text-2xl font-bold mb-4">
              Chris St Jean<span className="text-accent">.</span>
            </div>
            <p className="text-foreground/40 text-sm leading-relaxed max-w-md">
              Freelance full-stack developer building fitness apps and outdoor tech with AI-powered development. 
              Elite ultrarunner. Based in Santa Barbara, CA.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground/40 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-4">
              Connect
            </h3>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                const href = site.social[social.href as keyof typeof site.social];
                if (!href) return null;
                return (
                  <a
                    key={social.href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center text-foreground/30 hover:text-accent border border-border hover:border-accent/30 transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 text-foreground/40 hover:text-accent transition-colors text-sm"
            >
              <Mail className="w-4 h-4" />
              {site.email}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-foreground/20 font-mono">
            © {year} Chris St Jean
          </div>
          <div className="text-xs text-foreground/20 font-mono">
            Built with intensity
          </div>
        </div>
      </div>
    </footer>
  );
}
