"use client";

import { StatCards } from "@/components/dashboard/StatCards";
import { UsageChart } from "@/components/dashboard/UsageChart";
import { ClinicCard, Clinic } from "@/components/dashboard/ClinicCard";
import { DetailCard } from "@/components/dashboard/DetailCard";
import { StatusBadge } from "@/components/ui/badge";
import { Bell, Plus, Search } from "lucide-react";

const clinics: Clinic[] = [
  { id: "1", name: "HealthFirst Clinic", type: "Primary Care", location: "Austin, TX", agents: 3, callsToday: 142, status: "active", satisfaction: 96 },
  { id: "2", name: "SmileBright Dental", type: "Dental", location: "Dallas, TX", agents: 2, callsToday: 88, status: "active", satisfaction: 94 },
  { id: "3", name: "OrthoPlus Center", type: "Orthopedics", location: "Houston, TX", agents: 1, callsToday: 31, status: "paused", satisfaction: 91 },
];

const recentCalls = [
  { caller: "+1 512-555-0182", clinic: "HealthFirst", outcome: "Booked", time: "2m ago" },
  { caller: "+1 214-555-0931", clinic: "SmileBright", outcome: "Follow-up", time: "8m ago" },
  { caller: "+1 713-555-0477", clinic: "HealthFirst", outcome: "Booked", time: "15m ago" },
  { caller: "+1 512-555-0265", clinic: "OrthoPlus", outcome: "Voicemail", time: "24m ago" },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6 pb-24">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Agency Overview</h1>
          <p className="text-sm text-white/35 mt-0.5">Friday, May 2 · 3 clinics active</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-xl border border-white/10 text-white/30 hover:text-white/60 hover:bg-white/5 transition-all">
            <Search className="w-4 h-4" />
          </button>
          <button className="relative p-2.5 rounded-xl border border-white/10 text-white/30 hover:text-white/60 hover:bg-white/5 transition-all">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-500" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-indigo-500 transition-all">
            <Plus className="w-4 h-4" /> Add Clinic
          </button>
        </div>
      </div>

      {/* Stats */}
      <StatCards />

      {/* Chart + recent calls */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <UsageChart />
        </div>
        <DetailCard
          title="Recent Calls"
          subtitle="Last 30 minutes"
          rows={recentCalls.map(c => ({
            label: (
              <span className="flex flex-col">
                <span className="text-xs text-white/55">{c.caller}</span>
                <span className="text-[10px] text-white/25">{c.clinic}</span>
              </span>
            ) as unknown as string,
            value: (
              <span className="flex items-center gap-2">
                <StatusBadge variant={c.outcome === "Booked" ? "success" : c.outcome === "Follow-up" ? "info" : "warning"}>
                  {c.outcome}
                </StatusBadge>
                <span className="text-[10px] text-white/20">{c.time}</span>
              </span>
            ) as unknown as string,
          }))}
        />
      </div>

      {/* Clinics grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">Your Clinics</h2>
          <a href="/dashboard/clinics" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">View all →</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {clinics.map((c, i) => <ClinicCard key={c.id} clinic={c} index={i} />)}
        </div>
      </div>
    </div>
  );
}
