"use client";

import React, { useMemo } from "react";
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
import { Button } from "@/components/ui/button-2";
import { toast } from "sonner";
import { useAgencies } from "@/hooks/use-local-data";

export default function UsagePage() {
  const { data: agencies, loading } = useAgencies();

  const stats = useMemo(() => {
    const totalCredits = agencies.reduce((acc, a) => acc + (a.credits || 0), 0);
    const totalStorage = agencies.length * 0.01; // Mock storage as 0.01GB per agency
    const maxStorage = 2.0; // TB
    const maxCredits = 1500000;

    return {
      totalCredits,
      totalStorage,
      storagePercent: Math.min((totalStorage / (maxStorage * 1024)) * 100, 100),
      creditsPercent: Math.min((totalCredits / maxCredits) * 100, 100),
      capacity: maxStorage,
      creditLimit: maxCredits
    };
  }, [agencies]);

  if (loading) return <div className="p-8">Loading...</div>;

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
              <h3 className="text-3xl font-black text-foreground tracking-tighter">{stats.totalStorage.toFixed(2)} GB</h3>
            </div>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${stats.storagePercent}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            />
          </div>
          <div className="mt-4 flex justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <span>Used: {stats.storagePercent.toFixed(1)}%</span>
            <span>Capacity: {stats.capacity} TB</span>
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
              <h3 className="text-3xl font-black text-foreground tracking-tighter">{stats.totalCredits >= 1000 ? `${(stats.totalCredits / 1000).toFixed(1)}k` : stats.totalCredits}</h3>
            </div>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${stats.creditsPercent}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]"
            />
          </div>
          <div className="mt-4 flex justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <span>Consumed: {stats.creditsPercent.toFixed(1)}%</span>
            <span>Limit: {(stats.creditLimit / 1000000).toFixed(1)}M</span>
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
                <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/50 text-right">Revenue Contributed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {agencies.map((agency, i) => {
                const storagePercent = 0.5; // Mock per agency
                const creditsPercent = Math.min(((agency.credits || 0) / 100000) * 100, 100);
                
                return (
                  <motion.tr 
                    key={agency.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="hover:bg-muted/20 transition-colors group cursor-pointer"
                    onClick={() => toast.success(`Viewing details for ${agency.name}`)}
                  >
                    <td className="p-6">
                      <span className="font-bold text-foreground text-sm tracking-tight">{agency.name}</span>
                    </td>
                    <td className="p-6">
                      <div className="space-y-2 max-w-[150px]">
                        <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                          <span>0.01 GB</span>
                          <span>{storagePercent}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${storagePercent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="space-y-2 max-w-[150px]">
                        <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                          <span>{agency.credits >= 1000 ? `${(agency.credits / 1000).toFixed(1)}k` : agency.credits}</span>
                          <span>{creditsPercent.toFixed(0)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-500 rounded-full"
                            style={{ width: `${creditsPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <span className="text-sm font-black text-foreground tracking-tighter">${agency.revenue?.toLocaleString()}</span>
                    </td>
                  </motion.tr>
                );
              })}
              {agencies.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-muted-foreground italic text-xs">No usage data found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
