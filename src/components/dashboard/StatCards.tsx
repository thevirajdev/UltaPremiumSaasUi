"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Mic, Phone, Calendar, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ElementType;
  gradient: string;
  glow: string;
  index?: number;
}

export function StatCard({ label, value, change, trend = "up", icon: Icon, gradient, glow, index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg ${glow} group-hover:scale-110 transition-transform`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {change && (
          <span className={cn("flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
            trend === "up" ? "text-emerald-400 bg-emerald-500/10" :
            trend === "down" ? "text-red-400 bg-red-500/10" :
            "text-white/40 bg-white/5"
          )}>
            {trend === "up" ? <TrendingUp className="w-3 h-3" /> : trend === "down" ? <TrendingDown className="w-3 h-3" /> : null}
            {change}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-0.5">{value}</div>
      <div className="text-xs text-white/35">{label}</div>
    </motion.div>
  );
}

const defaultStats = [
  { label: "Total Calls Today", value: "1,284", change: "+12%", trend: "up" as const, icon: Phone, gradient: "from-violet-500 to-indigo-500", glow: "shadow-violet-500/20" },
  { label: "Active AI Agents", value: "24", change: "+3", trend: "up" as const, icon: Mic, gradient: "from-blue-500 to-cyan-500", glow: "shadow-blue-500/20" },
  { label: "Appointments Booked", value: "347", change: "+8%", trend: "up" as const, icon: Calendar, gradient: "from-emerald-500 to-teal-500", glow: "shadow-emerald-500/20" },
  { label: "Active Patients", value: "8,921", change: "-2%", trend: "down" as const, icon: Users, gradient: "from-amber-500 to-orange-500", glow: "shadow-amber-500/20" },
];

export function StatCards({ stats = defaultStats }: { stats?: typeof defaultStats }) {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
    </div>
  );
}
