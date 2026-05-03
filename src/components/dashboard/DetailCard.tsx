"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DetailRow {
  label: string;
  value: string | React.ReactNode;
}

interface DetailCardProps {
  title: string;
  subtitle?: string;
  rows: DetailRow[];
  action?: React.ReactNode;
  className?: string;
  accentColor?: string;
}

export function DetailCard({ title, subtitle, rows, action, className, accentColor = "from-violet-500 to-indigo-500" }: DetailCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden", className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <div>
          <div className={`h-0.5 w-8 rounded-full bg-gradient-to-r ${accentColor} mb-2`} />
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          {subtitle && <p className="text-xs text-white/35 mt-0.5">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>

      {/* Rows */}
      <div className="divide-y divide-white/[0.04]">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center justify-between px-5 py-3">
            <span className="text-xs text-white/35">{row.label}</span>
            <span className="text-xs font-medium text-white/70">{row.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
