"use client";

import { useState } from "react";
import { ClinicCard, Clinic } from "@/components/dashboard/ClinicCard";
import { StatusBadge } from "@/components/ui/badge";
import { Plus, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

const allClinics: Clinic[] = [
  { id: "1", name: "HealthFirst Clinic", type: "Primary Care", location: "Austin, TX", agents: 3, callsToday: 142, status: "active", satisfaction: 96 },
  { id: "2", name: "SmileBright Dental", type: "Dental", location: "Dallas, TX", agents: 2, callsToday: 88, status: "active", satisfaction: 94 },
  { id: "3", name: "OrthoPlus Center", type: "Orthopedics", location: "Houston, TX", agents: 1, callsToday: 31, status: "paused", satisfaction: 91 },
  { id: "4", name: "ClearView Eye Care", type: "Ophthalmology", location: "San Antonio, TX", agents: 2, callsToday: 67, status: "active", satisfaction: 98 },
  { id: "5", name: "MindWell Psychiatry", type: "Mental Health", location: "Austin, TX", agents: 1, callsToday: 0, status: "setup", satisfaction: 0 },
];

export default function ClinicsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "paused" | "setup">("all");

  const filtered = allClinics.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || c.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Clinics</h1>
          <p className="text-sm text-white/35 mt-0.5">{allClinics.length} clinics in your agency</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-indigo-500 transition-all">
          <Plus className="w-4 h-4" /> Add Clinic
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search clinics…"
            className="w-full h-10 pl-9 pr-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70 placeholder:text-white/25 focus:outline-none focus:border-violet-500/50"
          />
        </div>
        <div className="flex gap-1 p-1 bg-white/5 border border-white/10 rounded-xl">
          {(["all", "active", "paused", "setup"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${filter === f ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((c, i) => <ClinicCard key={c.id} clinic={c} index={i} />)}
        {filtered.length === 0 && (
          <div className="col-span-3 py-20 text-center text-white/25 text-sm">No clinics match your search.</div>
        )}
      </motion.div>
    </div>
  );
}
