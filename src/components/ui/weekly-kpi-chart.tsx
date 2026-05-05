"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type DayPoint = {
  day: "S" | "M" | "T" | "W" | "T" | "F" | "S";
  value: number;
};

interface WeeklyKPIChartProps {
  data: DayPoint[];
  width?: number;
  height?: number;
  className?: string;
  color?: string;
  gradientColor?: string;
  dotColor?: string;
  lineColor?: string;
}

const WeeklyKPIChart: React.FC<WeeklyKPIChartProps> = ({
  data,
  width = 400,
  height = 280,
  className = "",
  color = "hsl(var(--foreground))", // Dynamic black/white based on theme
  gradientColor = "hsl(var(--primary) / 0.15)",
  dotColor = "hsl(var(--foreground))",
  lineColor = "hsl(var(--border))",
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(2); // Default to Tuesday

  // Chart dimensions with more padding
  const padding = 40;
  const bottomPadding = 45; // Slightly more padding
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding - bottomPadding;
  const barSpacing = chartWidth / data.length;
  const baseline = height - bottomPadding;
  const baselineOffset = 10; 

  // Calculate scaling
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const availableHeight = chartHeight - 40;
  const getBarHeight = (value: number) => (value / maxValue) * availableHeight;

  // Animation variants
  const barVariants = {
    initial: { pathLength: 0, opacity: 0, scaleY: 0 },
    animate: { pathLength: 1, opacity: 1, scaleY: 1 },
    hover: { scale: 1.05 },
  };

  return (
    <div className={`relative ${className}`}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="barGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.25} />
            <stop offset="80%" stopColor={color} stopOpacity={0.05} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
          <filter id="glowBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {data.map((point, index) => {
          const x = padding + index * barSpacing + barSpacing / 2;
          const barHeight = getBarHeight(point.value);
          const lineStartY = baseline - baselineOffset;
          const lineEndY = lineStartY - barHeight;
          const isSelected = index === selectedIndex;

          const gradientTop = Math.max(padding, lineEndY - 40);
          const gradientHeight = (baseline + 40) - gradientTop;

          return (
            <g key={`${point.day}-${index}`} className="group/bar">
              {/* Animated Glow Background - Now inside SVG for perfect centering */}
              <AnimatePresence>
                {isSelected && (
                  <motion.rect
                    key={`glow-${index}`}
                    x={x - 20}
                    y={gradientTop}
                    width={40}
                    height={gradientHeight}
                    rx={20}
                    fill="url(#barGlow)"
                    initial={{ opacity: 0, scaleY: 0.5 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0.5 }}
                    style={{ transformOrigin: "bottom" }}
                    transition={{ type: "spring", damping: 15, stiffness: 100 }}
                  />
                )}
              </AnimatePresence>

              {/* Invisible larger clickable area */}
              <rect
                x={x - 20}
                y={0}
                width={40}
                height={height}
                fill="transparent"
                className="cursor-pointer"
                onClick={() => setSelectedIndex(index)}
              />

              {/* Bar line with improved animation */}
              <motion.line
                x1={x}
                y1={lineStartY}
                x2={x}
                y2={lineStartY}
                animate={{ y2: lineEndY }}
                stroke={isSelected ? color : "hsl(var(--muted-foreground) / 0.4)"}
                strokeWidth={3}
                strokeLinecap="round"
                transition={{ 
                  type: "spring",
                  damping: 20,
                  stiffness: 100,
                  delay: index * 0.05 
                }}
              />

              {isSelected ? (
                <>
                  <motion.rect
                    x={x - 28}
                    y={lineEndY - 35}
                    width={56}
                    height={24}
                    rx={12}
                    fill={color}
                    initial={{ scale: 0, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    className="shadow-xl"
                  />
                  <motion.text
                    x={x}
                    y={lineEndY - 19}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="800"
                    fill="hsl(var(--primary-foreground))"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {point.value.toLocaleString()}
                  </motion.text>
                </>
              ) : (
                <motion.circle
                  cx={x}
                  cy={lineEndY - 12}
                  r={3.5}
                  fill={color}
                  className="opacity-40 group-hover/bar:opacity-100 transition-opacity"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 + 0.3 }}
                />
              )}

              {/* Day Circle Background */}
              {isSelected && (
                <motion.circle
                  cx={x}
                  cy={baseline + 20}
                  r={14}
                  fill={color}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  layoutId="activeDayCircle"
                />
              )}

              {/* Day text */}
              <motion.text
                x={x}
                y={baseline + 20}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fontWeight={isSelected ? "bold" : "600"}
                fill={isSelected ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))"}
                className={cn(
                  "transition-colors duration-200 cursor-pointer font-black",
                  !isSelected && "opacity-80 group-hover/bar:opacity-100"
                )}
                onClick={() => setSelectedIndex(index)}
              >
                {point.day}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export { WeeklyKPIChart };
