"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Building2, 
  Calendar,
  CreditCard,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const agencies = [
  {
    id: "1",
    name: "Helix Medical Agency",
    email: "contact@helix.com",
    status: "Active",
    setupCost: 1000,
    maintenanceCost: 100,
    joinDate: "Jan 12, 2024",
    planRemaining: 15,
    logo: "H"
  },
  {
    id: "2",
    name: "Nexus Health Marketing",
    email: "info@nexushealth.com",
    status: "Active",
    setupCost: 1000,
    maintenanceCost: 100,
    joinDate: "Feb 05, 2024",
    planRemaining: 242,
    logo: "N"
  },
  {
    id: "3",
    name: "Pulse Media Group",
    email: "support@pulsemedia.io",
    status: "Active",
    setupCost: 1000,
    maintenanceCost: 100,
    joinDate: "Mar 20, 2024",
    planRemaining: 5,
    logo: "P"
  },
  {
    id: "4",
    name: "Quantum Clinics",
    email: "admin@quantum.co",
    status: "Suspended",
    setupCost: 1000,
    maintenanceCost: 100,
    joinDate: "Apr 02, 2024",
    planRemaining: 0,
    logo: "Q"
  },
  {
    id: "5",
    name: "Aegis Agency",
    email: "ops@aegis.ai",
    status: "Active",
    setupCost: 1000,
    maintenanceCost: 100,
    joinDate: "May 15, 2024",
    planRemaining: 30,
    logo: "A"
  }
];

export default function AgencyListPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Agency Management</h1>
          <p className="text-muted-foreground mt-1 text-lg">Monitor and manage all onboarded medical agencies.</p>
        </div>
        <Button className="rounded-full px-6 shadow-lg shadow-primary/20" onClick={() => toast.info("Agency Registration", { description: "Opening the manual onboarding flow for new medical agencies..." })}>
          Add New Agency
        </Button>
      </div>

      {/* Pricing Banner */}
      <Card className="p-6 bg-primary/5 border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground tracking-tight italic">Standard Pricing Model</h3>
            <p className="text-muted-foreground text-sm font-medium">Applied to all new agencies by default</p>
          </div>
        </div>
        <div className="flex gap-8 relative z-10">
          <div className="text-center">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Setup Cost</p>
            <p className="text-2xl font-black text-primary tracking-tighter">$1,000</p>
            <p className="text-[10px] text-muted-foreground font-medium">One-time payment</p>
          </div>
          <div className="w-px h-12 bg-primary/20" />
          <div className="text-center">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Maintenance</p>
            <p className="text-2xl font-black text-primary tracking-tighter">$100/mo</p>
            <p className="text-[10px] text-muted-foreground font-medium">Platform fee</p>
          </div>
        </div>
      </Card>

      {/* Filter Bar */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            placeholder="Search agencies by name or email..."
            className="w-full bg-background/50 border border-border/50 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
          />
        </div>
        <Button variant="outline" className="rounded-2xl gap-2 border-border/50 px-6 font-semibold" onClick={() => toast.info("Filter applied")}>
          <Filter className="w-4 h-4" /> Filters
        </Button>
      </div>

      {/* Agency Table/Cards */}
      <div className="grid gap-6">
        {agencies.map((agency, i) => (
          <motion.div
            key={agency.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="p-6 bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 group">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Agency Info */}
                <div className="flex items-center gap-4 lg:w-1/4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl shadow-inner">
                    {agency.logo}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-foreground truncate tracking-tight">{agency.name}</h3>
                    <p className="text-xs text-muted-foreground truncate font-medium">{agency.email}</p>
                  </div>
                </div>

                {/* Status & Plan */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Status</p>
                    <Badge className={cn(
                      "rounded-full px-3 py-0.5 text-[10px] font-bold uppercase",
                      agency.status === 'Active' 
                        ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" 
                        : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                    )}>
                      {agency.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Joined Date</p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      {agency.joinDate}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Plan Expiry</p>
                    <div className={cn(
                      "flex items-center gap-2 text-sm font-bold",
                      agency.planRemaining <= 10 ? "text-red-500" : "text-foreground"
                    )}>
                      <AlertCircle className={cn("w-3 h-3", agency.planRemaining <= 10 ? "text-red-500" : "text-muted-foreground")} />
                      {agency.planRemaining} days left
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Costs</p>
                    <div className="text-xs font-bold text-foreground">
                      Setup: <span className="text-primary font-black">$1k</span> • Maint: <span className="text-primary font-black">$100/m</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 lg:ml-auto">
                  <Button variant="ghost" size="sm" className="rounded-xl font-bold text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground" onClick={() => toast.info("Edit Details", { description: `Modifying configuration for ${agency.name}...` })}>
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-xl border-border/50 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300" onClick={() => toast.success("Accessing Portal", { description: `Redirecting to ${agency.name} dashboard.` })}>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-xl h-9 w-9" onClick={() => toast.info("More Actions")}>
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
