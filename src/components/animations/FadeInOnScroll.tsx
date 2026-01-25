"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  scale?: number;
  once?: boolean;
}

export function FadeInOnScroll({
  children,
  className,
  delay = 0,
  duration = 0.5,
  yOffset = 40,
  xOffset = 0,
  scale,
  once = true,
}: FadeInOnScrollProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: yOffset,
        x: xOffset,
        ...(scale !== undefined && { scale })
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        x: 0,
        ...(scale !== undefined && { scale: 1 })
      }}
      viewport={{ once }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Preset variants for common use cases
export function FadeIn({ 
  children, 
  className, 
  delay = 0 
}: { 
  children: ReactNode; 
  className?: string; 
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

