"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { cn } from "@/lib/utils";

const defaultData = [
  { day: "Mon", calls: 120, booked: 84 },
  { day: "Tue", calls: 180, booked: 130 },
  { day: "Wed", calls: 240, booked: 170 },
  { day: "Thu", calls: 190, booked: 140 },
  { day: "Fri", calls: 310, booked: 220 },
  { day: "Sat", calls: 95, booked: 60 },
  { day: "Sun", calls: 60, booked: 35 },
];

interface UsageChartProps {
  data?: typeof defaultData;
  className?: string;
  title?: string;
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-3 py-2 rounded-xl bg-[#0d0d14] border border-white/10 text-xs shadow-xl">
      <p className="text-white/40 mb-1.5 font-medium">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-white/70">
          <span className={p.name === "calls" ? "text-violet-400" : "text-emerald-400"}>{p.name}: </span>
          {p.value}
        </p>
      ))}
    </div>
  );
};

export function UsageChart({ data = defaultData, className, title = "Call Activity" }: UsageChartProps) {
  return (
    <div className={cn("rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5", className)}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="h-0.5 w-8 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 mb-2" />
          <h3 className="text-sm font-semibold text-white">{title}</h3>
        </div>
        <div className="flex gap-4 text-xs text-white/35">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-violet-500" />Calls</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" />Booked</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="callsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="bookedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="calls" stroke="#7c3aed" strokeWidth={2} fill="url(#callsGrad)" dot={false} />
          <Area type="monotone" dataKey="booked" stroke="#10b981" strokeWidth={2} fill="url(#bookedGrad)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
