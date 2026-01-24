"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ElevationProfileProps {
  data: number[];
  label?: string;
  color?: "marker" | "sage" | "contour";
  height?: number;
  className?: string;
  showGrid?: boolean;
  animated?: boolean;
}

export function ElevationProfile({
  data,
  label,
  color = "marker",
  height = 80,
  className,
  showGrid = false,
  animated = true,
}: ElevationProfileProps) {
  if (!data || data.length === 0) return null;

  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const range = maxVal - minVal || 1;

  // Normalize data to fit within the height
  const normalizedData = data.map(
    (val) => height - ((val - minVal) / range) * (height * 0.8) - height * 0.1
  );

  // Generate SVG path
  const width = 100;
  const stepX = width / (data.length - 1);

  const pathData = normalizedData
    .map((y, i) => {
      const x = i * stepX;
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(" ");

  // Create filled area path
  const areaPath = `${pathData} L ${width} ${height} L 0 ${height} Z`;

  const colorMap = {
    marker: { stroke: "#ea580c", fill: "#ea580c" },
    sage: { stroke: "#4d7c5e", fill: "#4d7c5e" },
    contour: { stroke: "#d4c4a8", fill: "#d4c4a8" },
  };

  const colors = colorMap[color];

  return (
    <div className={cn("relative", className)}>
      {label && (
        <div className="absolute -top-6 left-0 text-xs font-mono text-elevation uppercase tracking-wider">
          {label}
        </div>
      )}

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        preserveAspectRatio="none"
        style={{ height: `${height}px` }}
      >
        <defs>
          <linearGradient
            id={`elevGradient-${color}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor={colors.fill} stopOpacity="0.3" />
            <stop offset="100%" stopColor={colors.fill} stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {showGrid && (
          <g opacity="0.2">
            {[0.25, 0.5, 0.75].map((ratio) => (
              <line
                key={ratio}
                x1="0"
                y1={height * ratio}
                x2={width}
                y2={height * ratio}
                stroke="#d4c4a8"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
            ))}
          </g>
        )}

        {/* Filled area */}
        <motion.path
          d={areaPath}
          fill={`url(#elevGradient-${color})`}
          initial={animated ? { opacity: 0 } : undefined}
          animate={animated ? { opacity: 1 } : undefined}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Line */}
        <motion.path
          d={pathData}
          fill="none"
          stroke={colors.stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animated ? { pathLength: 0 } : undefined}
          animate={animated ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Start and end markers */}
        <circle cx="0" cy={normalizedData[0]} r="3" fill={colors.stroke} />
        <circle
          cx={width}
          cy={normalizedData[normalizedData.length - 1]}
          r="3"
          fill={colors.stroke}
        />
      </svg>

      {/* Elevation labels */}
      <div className="flex justify-between mt-1 text-xs font-mono text-elevation">
        <span>{minVal.toLocaleString()} ft</span>
        <span>{maxVal.toLocaleString()} ft</span>
      </div>
    </div>
  );
}



