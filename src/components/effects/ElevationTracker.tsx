"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ElevationTracker() {
  const { scrollYProgress } = useScroll();
  
  // Transform scroll to elevation (0 to 14,000 ft - roughly summit of a 14er)
  const elevation = useTransform(scrollYProgress, [0, 1], [0, 14000]);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-2"
    >
      {/* Elevation display */}
      <div className="glass-card px-4 py-3 rounded-lg">
        <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">
          Elevation
        </div>
        <motion.div className="font-mono text-2xl text-golden tabular-nums">
          {elevation.get().toLocaleString(undefined, { maximumFractionDigits: 0 })}
          <span className="text-sm text-white/40 ml-1">ft</span>
        </motion.div>
      </div>
      
      {/* Vertical progress bar */}
      <div className="h-32 w-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="w-full bg-gradient-to-t from-golden to-coral rounded-full origin-bottom"
          style={{
            scaleY: scrollYProgress,
          }}
        />
      </div>
      
      {/* Summit indicator */}
      <motion.div
        className="text-[10px] font-mono text-white/30 uppercase tracking-widest"
        style={{
          opacity: useTransform(scrollYProgress, [0.8, 1], [0, 1]),
        }}
      >
        Summit
      </motion.div>
    </motion.div>
  );
}



