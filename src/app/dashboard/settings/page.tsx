"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { DetailCard } from "@/components/dashboard/DetailCard";
import { GlowBadge } from "@/components/ui/badge";
import { User, Bell, Shield, CreditCard, Mic, Palette, ChevronRight, Save } from "lucide-react";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "agents", label: "AI Agents", icon: Mic },
  { id: "appearance", label: "Appearance", icon: Palette },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Settings</h1>
          <p className="text-sm text-white/35 mt-0.5">Manage your agency account and preferences</p>
        </div>
        <button onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${saved ? "bg-emerald-600 text-white" : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20"}`}>
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar nav */}
        <div className="w-48 shrink-0">
          <nav className="space-y-0.5">
            {sections.map((s) => (
              <button key={s.id} onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${activeSection === s.id ? "bg-violet-500/10 text-violet-300 border border-violet-500/20" : "text-white/35 hover:text-white/60 hover:bg-white/5"}`}>
                <s.icon className="w-4 h-4 shrink-0" />
                {s.label}
                {activeSection === s.id && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <motion.div key={activeSection} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>

            {activeSection === "profile" && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-4">
                  <h2 className="text-sm font-semibold text-white mb-4">Agency Profile</h2>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white">A</div>
                    <div>
                      <p className="text-sm font-semibold text-white">Agency Admin</p>
                      <p className="text-xs text-white/35 mt-0.5">admin@clinicai.app</p>
                      <button className="text-xs text-violet-400 hover:text-violet-300 transition-colors mt-1">Change avatar</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Full Name" defaultValue="Agency Admin" />
                    <Input label="Agency Name" defaultValue="ClinicAI Agency" />
                    <Input label="Email" type="email" defaultValue="admin@clinicai.app" />
                    <Input label="Phone" type="tel" defaultValue="+1 512-555-0000" />
                  </div>
                </div>
              </div>
            )}

            {activeSection === "billing" && (
              <div className="space-y-4">
                <DetailCard title="Current Plan" subtitle="Your active subscription"
                  rows={[
                    { label: "Plan", value: <GlowBadge variant="purple">Agency — $297/mo</GlowBadge> as unknown as string },
                    { label: "Next billing date", value: "June 2, 2026" },
                    { label: "Clinics included", value: "Up to 10" },
                    { label: "Calls this month", value: "3,241 / unlimited" },
                  ]}
                  action={<button className="text-xs text-violet-400 hover:text-violet-300 transition-colors">Upgrade →</button>}
                />
                <DetailCard title="Payment Method" subtitle="Visa ending in 4242"
                  rows={[
                    { label: "Card", value: "Visa •••• 4242" },
                    { label: "Expires", value: "09/27" },
                    { label: "Billing email", value: "billing@clinicai.app" },
                  ]}
                  action={<button className="text-xs text-violet-400 hover:text-violet-300 transition-colors">Update →</button>}
                />
              </div>
            )}

            {activeSection === "agents" && (
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-5">
                <h2 className="text-sm font-semibold text-white">Default AI Agent Settings</h2>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-white/60">Default Voice</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Female — Warm", "Male — Professional", "Female — Calm"].map(v => (
                        <button key={v} className="py-2 px-3 rounded-xl border border-white/10 bg-white/5 text-xs text-white/40 hover:text-white/70 hover:border-white/20 transition-all">{v}</button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-white/60">Default Greeting</label>
                    <textarea defaultValue="Good morning! You've reached {Clinic Name}. I'm {Agent Name}, your AI assistant. How can I help you today?" rows={3}
                      className="w-full rounded-xl border border-white/10 bg-white/5 text-white/60 text-sm px-3 py-2.5 focus:outline-none focus:border-violet-500/50 resize-none" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <div>
                      <p className="text-sm font-medium text-white/70">HIPAA Mode</p>
                      <p className="text-xs text-white/30 mt-0.5">Never store PHI in call recordings</p>
                    </div>
                    <div className="w-10 h-6 rounded-full bg-violet-600 relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!["profile", "billing", "agents"].includes(activeSection) && (
              <div className="p-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
                <p className="text-white/25 text-sm">
                  {sections.find(s => s.id === activeSection)?.label} settings coming soon.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
