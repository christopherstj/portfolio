"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageHeroProps {
  label: string;
  title: ReactNode;
  description?: string;
  variant?: "default" | "centered";
  children?: ReactNode;
}

export function PageHero({ 
  label, 
  title, 
  description, 
  variant = "default",
  children 
}: PageHeroProps) {
  const alignClass = variant === "centered" ? "items-center" : "items-end";
  
  return (
    <section className={`flex ${alignClass} relative px-6 pt-20 sm:pt-32 pb-8 sm:pb-16`}>
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono text-accent uppercase tracking-widest">
            {label}
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-bold text-foreground mt-4">
            {title}
          </h1>
          {description && (
            <p className="text-lg sm:text-xl text-foreground/40 max-w-2xl mt-8 leading-relaxed">
              {description}
            </p>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  );
}

