"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Building2,
  DollarSign
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button-2";
import { Badge } from "@/components/ui/badge-2";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useAgencies } from "@/hooks/use-local-data";

export default function PaymentsPage() {
  const { data: agencies, loading } = useAgencies();

  const stats = useMemo(() => {
    const totalNetRevenue = agencies.reduce((acc, a) => acc + (a.revenue || 0), 0);
    const setupFees = agencies.length * 1000;
    const maintenance = agencies.length * 100;

    return {
      totalNetRevenue,
      setupFees,
      maintenance,
      activeSubs: agencies.filter(a => a.status === "Active").length
    };
  }, [agencies]);

  const simulatedTransactions = useMemo(() => {
    return agencies.map((agency, i) => ({
      id: `TXN-${(i + 1).toString().padStart(3, '0')}`,
      agency: agency.name,
      amount: `$${(agency.revenue || 0).toLocaleString()}`,
      type: "Setup + Maint",
      status: "Completed",
      date: new Date(agency.createdAt).toLocaleDateString(),
      method: "Stripe"
    }));
  }, [agencies]);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Revenue & Payments</h1>
        <p className="text-muted-foreground mt-1 text-lg tracking-tight">Track agency onboarding fees and recurring platform revenue.</p>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-8 bg-background/50 backdrop-blur-sm border-border/50 group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-2xl bg-green-500/10 text-green-500">
              <DollarSign className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
              <ArrowUpRight className="w-3 h-3" />
              Live
            </div>
          </div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Net Revenue</p>
          <h3 className="text-3xl font-black text-foreground tracking-tighter mt-1">${stats.totalNetRevenue.toLocaleString()}</h3>
        </Card>

        <Card className="p-8 bg-background/50 backdrop-blur-sm border-border/50 group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
              <ArrowUpRight className="w-3 h-3" />
              +{agencies.length}
            </div>
          </div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Setup Fees Collected</p>
          <h3 className="text-3xl font-black text-foreground tracking-tighter mt-1">${stats.setupFees.toLocaleString()}</h3>
        </Card>

        <Card className="p-8 bg-background/50 backdrop-blur-sm border-border/50 group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
              <Clock className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full">
              {stats.activeSubs} active
            </div>
          </div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Maintenance Subscriptions</p>
          <h3 className="text-3xl font-black text-foreground tracking-tighter mt-1">${stats.maintenance.toLocaleString()}/mo</h3>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="bg-background/50 backdrop-blur-sm border-border/50 overflow-hidden">
        <div className="p-6 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-foreground tracking-tight italic">Transaction History</h3>
          <div className="flex gap-2">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  placeholder="TXN ID or Agency..."
                  className="bg-background/50 border border-border/50 rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                />
             </div>
             <Button variant="outline" size="sm" className="rounded-xl border-border/50 text-xs font-bold" onClick={() => toast.success("Export Initiated", { description: "Your transaction history is being compiled into a CSV file." })}>
               <Filter className="w-3 h-3 mr-2" /> Export
             </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30">
                <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/50">Transaction</th>
                <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/50">Agency</th>
                <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/50">Type</th>
                <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/50">Date</th>
                <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/50">Status</th>
                <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/50 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {simulatedTransactions.map((txn, i) => (
                <motion.tr 
                  key={txn.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <td className="p-6">
                    <span className="font-bold text-foreground text-xs">{txn.id}</span>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-tighter mt-0.5">{txn.method}</p>
                  </td>
                  <td className="p-6 font-bold text-foreground text-sm tracking-tight">{txn.agency}</td>
                  <td className="p-6 font-medium text-muted-foreground text-xs uppercase">{txn.type}</td>
                  <td className="p-6 font-medium text-muted-foreground text-xs uppercase">{txn.date}</td>
                  <td className="p-6">
                    <Badge className={cn(
                      "rounded-full px-3 py-0.5 text-[10px] font-bold uppercase",
                      txn.status === 'Completed' ? "bg-green-500/10 text-green-500" : 
                      txn.status === 'Pending' ? "bg-amber-500/10 text-amber-500" :
                      "bg-red-500/10 text-red-500"
                    )}>
                      {txn.status}
                    </Badge>
                  </td>
                  <td className="p-6 text-right">
                    <span className="text-sm font-black text-foreground tracking-tighter">{txn.amount}</span>
                  </td>
                </motion.tr>
              ))}
              {simulatedTransactions.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-muted-foreground italic text-xs">No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
