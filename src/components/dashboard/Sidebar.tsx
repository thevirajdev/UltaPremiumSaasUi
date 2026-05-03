"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Mic,
  Users,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  CreditCard,
  Bell,
  LogOut,
  ChevronLeft,
  Building2,
  Stethoscope,
  Phone,
  ClipboardList,
} from "lucide-react";

const navItems = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "AI Voice Agents",
    icon: Mic,
    href: "/dashboard/agents",
  },
  {
    label: "Calls",
    icon: Phone,
    href: "/dashboard/calls",
  },
  {
    label: "Patients",
    icon: Users,
    href: "/dashboard/patients",
  },
  {
    label: "Appointments",
    icon: Calendar,
    href: "/dashboard/appointments",
  },
  {
    label: "Transcripts",
    icon: ClipboardList,
    href: "/dashboard/transcripts",
  },
  {
    label: "Reports",
    icon: BarChart3,
    href: "/dashboard/reports",
  },
  {
    label: "Billing",
    icon: CreditCard,
    href: "/dashboard/billing",
  },
];

const bottomItems = [
  { label: "Notifications", icon: Bell, href: "/dashboard/notifications" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

interface SidebarProps {
  clinicName?: string;
  clinicType?: string;
}

export function Sidebar({
  clinicName = "ClinicAI",
  clinicType = "Medical Practice",
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative flex flex-col h-screen bg-[#0d0d12] border-r border-white/5 overflow-hidden shrink-0"
    >
      {/* Gradient accent top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/20 shrink-0">
          <Stethoscope className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="text-sm font-semibold text-white leading-tight whitespace-nowrap">
                {clinicName}
              </p>
              <p className="text-[11px] text-white/40 whitespace-nowrap">
                {clinicType}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "ml-auto p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5 transition-all duration-200",
            collapsed && "mx-auto ml-0"
          )}
        >
          <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronLeft className="w-4 h-4" />
          </motion.div>
        </button>
      </div>

      {/* Clinic badge */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-3 mt-3"
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
              <Building2 className="w-4 h-4 text-violet-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-medium text-white/70 truncate">Agency Plan</p>
                <p className="text-[10px] text-white/30 truncate">3 clinics active</p>
              </div>
              <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav section label */}
      <AnimatePresence>
        {!collapsed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 pt-5 pb-1 text-[10px] font-semibold uppercase tracking-widest text-white/20"
          >
            Navigation
          </motion.p>
        )}
      </AnimatePresence>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-1 space-y-0.5 scrollbar-hide">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group cursor-pointer",
                  active
                    ? "bg-gradient-to-r from-violet-600/20 to-indigo-600/10 text-white"
                    : "text-white/40 hover:text-white/70 hover:bg-white/5"
                )}
              >
                {active && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/20 to-indigo-600/10 border border-violet-500/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-violet-400" />
                )}
                <item.icon
                  className={cn(
                    "w-4.5 h-4.5 shrink-0 z-10 transition-colors",
                    active ? "text-violet-400" : "text-white/40 group-hover:text-white/60"
                  )}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      className="text-sm font-medium z-10 whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-white/5 px-2 py-3 space-y-0.5">
        {bottomItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/30 hover:text-white/60 hover:bg-white/5 transition-all duration-200 cursor-pointer">
              <item.icon className="w-4.5 h-4.5 shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </Link>
        ))}

        {/* User profile */}
        <div className="mt-1 flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer group">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shrink-0">
            <span className="text-[11px] font-bold text-white">A</span>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-xs font-semibold text-white/70 truncate">Admin</p>
                <p className="text-[10px] text-white/30 truncate">admin@clinicai.app</p>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <LogOut className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
