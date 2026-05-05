"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Settings as SettingsIcon, 
  ShieldCheck, 
  CreditCard, 
  Bell, 
  Lock, 
  Globe,
  Save,
  DollarSign
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Global Settings</h1>
        <p className="text-muted-foreground mt-1 text-lg tracking-tight">Configure platform defaults and administrative preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation Sidebar for Settings */}
        <div className="space-y-2">
          {[
            { label: "Platform Defaults", icon: SettingsIcon, active: true },
            { label: "Billing & Pricing", icon: CreditCard, active: false },
            { label: "Security & Auth", icon: Lock, active: false },
            { label: "Notifications", icon: Bell, active: false },
            { label: "API Configuration", icon: Globe, active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 shadow-sm",
                item.active 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-background/50 border border-border/50 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Settings Form */}
        <Card className="lg:col-span-2 p-8 bg-background/50 backdrop-blur-sm border-border/50 space-y-10">
          {/* Pricing Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground tracking-tight italic">Default Agency Pricing</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Setup Cost ($)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">$</span>
                  <input 
                    type="number" 
                    defaultValue={1000}
                    className="w-full bg-background/50 border border-border/50 rounded-2xl py-4 pl-8 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground ml-1">One-time fee charged upon agency onboarding.</p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Monthly Maintenance ($)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">$</span>
                  <input 
                    type="number" 
                    defaultValue={100}
                    className="w-full bg-background/50 border border-border/50 rounded-2xl py-4 pl-8 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground ml-1">Recurring monthly platform maintenance fee.</p>
              </div>
            </div>
          </section>

          <div className="h-px bg-border/50" />

          {/* Platform Access Section */}
          <section className="space-y-6">
             <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground tracking-tight italic">Security Settings</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 rounded-3xl bg-muted/20 border border-border/30">
                <div>
                  <h4 className="text-sm font-bold text-foreground">Multi-Factor Authentication</h4>
                  <p className="text-xs text-muted-foreground mt-1 tracking-tight font-medium">Require MFA for all administrative accounts.</p>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                </div>
              </div>

              <div className="flex items-center justify-between p-6 rounded-3xl bg-muted/20 border border-border/30 opacity-60">
                <div>
                  <h4 className="text-sm font-bold text-foreground">Agency Self-Onboarding</h4>
                  <p className="text-xs text-muted-foreground mt-1 tracking-tight font-medium">Allow agencies to sign up without manual approval.</p>
                </div>
                <div className="w-12 h-6 bg-muted rounded-full relative p-1 cursor-not-allowed">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-4 pt-6 border-t border-border/50">
             <Button variant="ghost" className="rounded-2xl px-8 font-bold text-muted-foreground">Cancel</Button>
             <Button className="rounded-2xl px-10 gap-2 font-bold shadow-lg shadow-primary/20">
               <Save className="w-4 h-4" /> Save Changes
             </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

