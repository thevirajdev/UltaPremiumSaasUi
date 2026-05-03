"use client";

import { motion } from "framer-motion";
import { Building2, Mic, Phone, MoreHorizontal, TrendingUp } from "lucide-react";
import { StatusBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Clinic {
  id: string;
  name: string;
  type: string;
  location: string;
  agents: number;
  callsToday: number;
  status: "active" | "paused" | "setup";
  satisfaction: number;
}

interface ClinicCardProps {
  clinic: Clinic;
  index?: number;
  onManage?: (id: string) => void;
}

const statusMap = {
  active: { variant: "success" as const, label: "Active" },
  paused: { variant: "warning" as const, label: "Paused" },
  setup: { variant: "info" as const, label: "Setup" },
};

export function ClinicCard({ clinic, index = 0, onManage }: ClinicCardProps) {
  const status = statusMap[clinic.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="group relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/30 to-indigo-600/20 border border-violet-500/20 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{clinic.name}</p>
            <p className="text-xs text-white/35">{clinic.type} · {clinic.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge variant={status.variant} pulse={clinic.status === "active"}>{status.label}</StatusBadge>
          <button
            onClick={() => onManage?.(clinic.id)}
            className="p-1.5 rounded-lg text-white/20 hover:text-white/60 hover:bg-white/5 transition-all opacity-0 group-hover:opacity-100"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-2.5 rounded-xl bg-white/[0.03]">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Mic className="w-3 h-3 text-violet-400" />
            <span className="text-lg font-bold text-white">{clinic.agents}</span>
          </div>
          <p className="text-[10px] text-white/30">Agents</p>
        </div>
        <div className="text-center p-2.5 rounded-xl bg-white/[0.03]">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Phone className="w-3 h-3 text-blue-400" />
            <span className="text-lg font-bold text-white">{clinic.callsToday}</span>
          </div>
          <p className="text-[10px] text-white/30">Calls today</p>
        </div>
        <div className="text-center p-2.5 rounded-xl bg-white/[0.03]">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span className="text-lg font-bold text-white">{clinic.satisfaction}%</span>
          </div>
          <p className="text-[10px] text-white/30">Satisfaction</p>
        </div>
      </div>
    </motion.div>
  );
}
