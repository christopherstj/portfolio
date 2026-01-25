"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme";
import { cn } from "@/lib/utils";
import { getSiteConfig } from "@/lib/content";

function StravaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
    </svg>
  );
}

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/running", label: "Running" },
  { href: "/about", label: "Journey" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const site = getSiteConfig();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "glass-nav"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="font-[family-name:var(--font-display)] text-foreground text-xl font-bold tracking-tight">
              CSJ<span className="text-accent">.dev</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "text-accent"
                    : "text-foreground/50 hover:text-foreground"
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right side - Social + Theme toggle + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-foreground/40 hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-foreground/40 hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={site.social.strava}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-foreground/40 hover:text-accent transition-colors"
              aria-label="Strava"
            >
              <StravaIcon className="w-4 h-4" />
            </a>
            <div className="w-px h-4 bg-border mx-1" />
            <ThemeToggle />
            <Button asChild size="sm" className="bg-accent text-accent-foreground font-semibold hover:bg-accent/90 rounded-none">
              <Link href="/contact">Let&apos;s Talk</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 text-foreground/60 hover:text-foreground transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/95"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background border-l border-border"
            >
              {/* Close button */}
              <div className="flex justify-end p-6">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav items */}
              <div className="px-6 py-8">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block py-4 text-2xl font-[family-name:var(--font-display)] font-bold transition-colors border-b border-border",
                        pathname === item.href
                          ? "text-accent"
                          : "text-foreground/50 hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="px-6 mt-8 flex gap-4">
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-foreground/40 hover:text-accent border border-border hover:border-accent/30 transition-all"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-foreground/40 hover:text-accent border border-border hover:border-accent/30 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={site.social.strava}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-foreground/40 hover:text-accent border border-border hover:border-accent/30 transition-all"
                  aria-label="Strava"
                >
                  <StravaIcon className="w-5 h-5" />
                </a>
              </div>

              {/* CTA */}
              <div className="px-6 mt-8">
                <Button
                  asChild
                  className="w-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 rounded-none"
                  size="lg"
                >
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>
                    Let&apos;s Work Together
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
