"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Mic, Users, Calendar, Settings, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const dockItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Mic, label: "Agents", href: "/dashboard/agents" },
  { icon: Users, label: "Patients", href: "/dashboard/patients" },
  { icon: Calendar, label: "Calendar", href: "/dashboard/appointments" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function QuickDock() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
        className="flex items-center gap-1 px-3 py-2.5 rounded-2xl bg-[#0d0d14]/90 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/50"
      >
        {dockItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const isHovered = hovered === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                onHoverStart={() => setHovered(item.href)}
                onHoverEnd={() => setHovered(null)}
                animate={{ scale: isHovered ? 1.2 : active ? 1.05 : 1, y: isHovered ? -4 : 0 }}
                transition={{ type: "spring", bounce: 0.4, duration: 0.25 }}
                className={cn(
                  "relative flex flex-col items-center justify-center w-11 h-11 rounded-xl transition-colors",
                  active ? "bg-violet-600/20" : "hover:bg-white/5"
                )}
              >
                {active && (
                  <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-violet-400" />
                )}
                <item.icon className={cn("w-5 h-5", active ? "text-violet-400" : "text-white/35")} />

                {/* Tooltip */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-[#1a1a24] border border-white/10 text-[10px] text-white/70 whitespace-nowrap"
                  >
                    {item.label}
                  </motion.div>
                )}
              </motion.div>
            </Link>
          );
        })}

        <div className="w-px h-6 bg-white/10 mx-1" />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20"
        >
          <Plus className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </div>
  );
}
