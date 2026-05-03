"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mic, Clock, PhoneIncoming, PhoneOutgoing, PhoneMissed, Search } from "lucide-react";
import { StatusBadge } from "@/components/ui/badge";
import { Tabs, TabPanel } from "@/components/ui/tabs";
import { StatCards } from "@/components/dashboard/StatCards";

const calls = [
  { id: "1", caller: "+1 512-555-0182", clinic: "HealthFirst", agent: "Alex", type: "inbound", outcome: "Booked", duration: "3:24", time: "10:02 AM", date: "Today" },
  { id: "2", caller: "+1 214-555-0931", clinic: "SmileBright", agent: "Maya", type: "inbound", outcome: "Follow-up", duration: "1:48", time: "9:47 AM", date: "Today" },
  { id: "3", caller: "+1 713-555-0477", clinic: "HealthFirst", agent: "Alex", type: "outbound", outcome: "Booked", duration: "2:10", time: "9:31 AM", date: "Today" },
  { id: "4", caller: "+1 512-555-0265", clinic: "OrthoPlus", agent: "Sam", type: "inbound", outcome: "Missed", duration: "0:00", time: "9:15 AM", date: "Today" },
  { id: "5", caller: "+1 210-555-0844", clinic: "ClearView", agent: "Maya", type: "inbound", outcome: "Booked", duration: "4:02", time: "8:58 AM", date: "Today" },
  { id: "6", caller: "+1 512-555-0319", clinic: "HealthFirst", agent: "Alex", type: "outbound", outcome: "No Answer", duration: "0:22", time: "8:30 AM", date: "Today" },
];

const outcomeVariant = (o: string) =>
  o === "Booked" ? "success" : o === "Follow-up" ? "info" : o === "Missed" || o === "No Answer" ? "error" : "default";

const TypeIcon = ({ type }: { type: string }) => {
  if (type === "inbound") return <PhoneIncoming className="w-3.5 h-3.5 text-emerald-400" />;
  if (type === "outbound") return <PhoneOutgoing className="w-3.5 h-3.5 text-blue-400" />;
  return <PhoneMissed className="w-3.5 h-3.5 text-red-400" />;
};

const callStats = [
  { label: "Total Calls", value: "1,284", change: "+12%", trend: "up" as const, icon: Phone, gradient: "from-violet-500 to-indigo-500", glow: "shadow-violet-500/20" },
  { label: "Avg Duration", value: "2:38", change: "+0:12", trend: "up" as const, icon: Clock, gradient: "from-blue-500 to-cyan-500", glow: "shadow-blue-500/20" },
  { label: "Booking Rate", value: "68%", change: "+4%", trend: "up" as const, icon: Mic, gradient: "from-emerald-500 to-teal-500", glow: "shadow-emerald-500/20" },
  { label: "Missed Calls", value: "34", change: "-8%", trend: "up" as const, icon: PhoneMissed, gradient: "from-red-500 to-pink-500", glow: "shadow-red-500/20" },
];

export default function CallsPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Calls", count: calls.length },
    { id: "inbound", label: "Inbound" },
    { id: "outbound", label: "Outbound" },
  ];

  const filtered = calls.filter(c => {
    const matchTab = activeTab === "all" || c.type === activeTab;
    const matchSearch = c.caller.includes(search) || c.clinic.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Calls</h1>
          <p className="text-sm text-white/35 mt-0.5">Real-time call logs across all clinics</p>
        </div>
      </div>

      <StatCards stats={callStats} />

      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-4">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="relative mb-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
              className="h-9 pl-8 pr-3 rounded-lg bg-white/5 border border-white/10 text-xs text-white/60 placeholder:text-white/25 focus:outline-none focus:border-violet-500/40 w-44" />
          </div>
        </div>

        <TabPanel className="divide-y divide-white/[0.04]">
          {filtered.map((call, i) => (
            <motion.div key={call.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <TypeIcon type={call.type} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white/70">{call.caller}</span>
                  <span className="text-xs text-white/25">·</span>
                  <span className="text-xs text-white/35">{call.clinic}</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <Mic className="w-3 h-3 text-violet-400" />
                  <span className="text-xs text-white/25">Agent: {call.agent}</span>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-xs text-white/35">{call.time}</div>
                <div className="text-xs text-white/20">{call.duration}</div>
              </div>
              <StatusBadge variant={outcomeVariant(call.outcome) as Parameters<typeof StatusBadge>[0]["variant"]}>
                {call.outcome}
              </StatusBadge>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="py-16 text-center text-white/20 text-sm">No calls found.</div>
          )}
        </TabPanel>
      </div>
    </div>
  );
}
