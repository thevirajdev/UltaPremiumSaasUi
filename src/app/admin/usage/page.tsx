"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Database, 
  Cpu, 
  TrendingUp,
  Activity,
  ArrowUpRight,
  HardDrive,
  Zap,
  Filter,
  Download
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const usageData = [
  {
    agency: "Helix Medical Agency",
    storage: "42.5 GB",
    storagePercent: 85,
    aiCredits: "84,200",
    creditsPercent: 70,
    cost: "$1,240"
  },
  {
    agency: "Nexus Health Marketing",
    storage: "18.2 GB",
    storagePercent: 36,
    aiCredits: "124,000",
    creditsPercent: 92,
    cost: "$2,100"
  },
  {
    agency: "Pulse Media Group",
    storage: "31.8 GB",
    storagePercent: 63,
    aiCredits: "41,200",
    creditsPercent: 34,
    cost: "$850"
  },
  {
    agency: "Quantum Clinics",
    storage: "12.4 GB",
    storagePercent: 24,
    aiCredits: "9,500",
    creditsPercent: 8,
    cost: "$240"
  },
  {
    agency: "Aegis Agency",
    storage: "25.6 GB",
    storagePercent: 51,
    aiCredits: "63,000",
    creditsPercent: 52,
    cost: "$1,120"
  }
];

export default function UsagePage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Usage Monitoring</h1>
          <p className="text-muted-foreground mt-1 text-lg tracking-tight">Real-time resource allocation and AI Credit consumption tracking.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-border/50" onClick={() => toast.info("Exporting Data", { description: "Preparing usage reports for all agencies..." })}>
             <Download className="w-4 h-4 mr-2" /> Export Usage
          </Button>
        </div>
      </div>

      {/* Global Totals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-8 bg-background/50 backdrop-blur-sm border-border/50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
            <HardDrive className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Storage Used</p>
              <h3 className="text-3xl font-black text-foreground tracking-tighter">1.42 TB</h3>
            </div>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "68%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            />
          </div>
          <div className="mt-4 flex justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <span>Used: 68%</span>
            <span>Capacity: 2.0 TB</span>
          </div>
        </Card>

        <Card className="p-8 bg-background/50 backdrop-blur-sm border-border/50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
            <Zap className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total AI Credits Consumed</p>
              <h3 className="text-3xl font-black text-foreground tracking-tighter">1.2M</h3>
            </div>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "82%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]"
            />
          </div>
          <div className="mt-4 flex justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <span>Consumed: 82%</span>
            <span>Total Available: 1.5M</span>
          </div>
        </Card>
      </div>

      {/* Usage Table */}
      <Card className="bg-background/50 backdrop-blur-sm border-border/50 overflow-hidden">
        <div className="p-6 border-b border-border/50 flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground tracking-tight italic">Agency Resource Allocation</h3>
          <Button variant="ghost" size="sm" className="rounded-xl" onClick={() => toast.info("Filter applied")}>
             <Filter className="w-4 h-4 mr-2" /> Filter List
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30">
                <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/50">Agency Name</th>
                <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/50">Storage Usage</th>
                <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/50">AI Assistant Credits</th>
                <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/50 text-right">Billable Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {usageData.map((data, i) => (
                <motion.tr 
                  key={data.agency}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="hover:bg-muted/20 transition-colors group cursor-pointer"
                  onClick={() => toast.success(`Viewing details for ${data.agency}`)}
                >
                  <td className="p-6">
                    <span className="font-bold text-foreground text-sm tracking-tight">{data.agency}</span>
                  </td>
                  <td className="p-6">
                    <div className="space-y-2 max-w-[150px]">
                      <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                        <span>{data.storage}</span>
                        <span>{data.storagePercent}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${data.storagePercent}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="space-y-2 max-w-[150px]">
                      <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                        <span>{data.aiCredits}</span>
                        <span>{data.creditsPercent}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${data.creditsPercent}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <span className="text-sm font-black text-foreground tracking-tighter">{data.cost}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
