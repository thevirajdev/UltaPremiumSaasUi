"use client";

import React, { useState } from "react";
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Home, Search, Command } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Combobox } from "@/components/ui/combobox";
import Notifications from "@/components/ui/notifications";
import { ModeToggle } from "@/components/dashboard/ModeToggle";
import { endOfDay, startOfDay, subDays, subMonths, subWeeks } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import { useDashboard } from "@/context/DashboardContext";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

const presets = {
  "last-3-days": {
    text: "Last 3 Days",
    start: startOfDay(subDays(new Date(), 3)),
    end: endOfDay(new Date())
  },
  "last-7-days": {
    text: "Last 7 Days",
    start: startOfDay(subWeeks(new Date(), 1)),
    end: endOfDay(new Date())
  },
  "last-14-days": {
    text: "Last 14 Days",
    start: startOfDay(subWeeks(new Date(), 2)),
    end: endOfDay(new Date())
  },
  "last-month": {
    text: "Last Month",
    start: startOfDay(subMonths(new Date(), 1)),
    end: endOfDay(new Date())
  }
};

const searchItems = [
  { 
    category: "Intelligent Assistant", 
    items: [
      { name: "AI Assistant Hub", href: "/dashboard/assistant", sub: "ai, assistant, chat, help, intelligence, bot" },
      { name: "Chat History", href: "/dashboard/assistant", sub: "history, recent chats, ai logs" },
      { name: "AI Support", href: "/dashboard/assistant", sub: "support, help, documentation, ai" },
    ]
  },
  { 
    category: "Dashboard (Home)", 
    items: [
      { name: "Main Overview", href: "/dashboard", sub: "dashboard, overview, home, statistics" },
      { name: "Total Revenue (Summary)", href: "/dashboard", sub: "revenue, income, dashboard" },
      { name: "Total Expenses (Summary)", href: "/dashboard", sub: "expense, burn, dashboard" },
      { name: "Profit Margin (Summary)", href: "/dashboard", sub: "margin, profit, dashboard" },
      { name: "Total Users (Summary)", href: "/dashboard", sub: "user, total user, active users" },
      { name: "Sales vs Expense Chart", href: "/dashboard", sub: "sales, expense, chart, trends" },
      { name: "Total Call Time Chart", href: "/dashboard", sub: "call time, call, usages, minutes" },
      { name: "Income Breakdown Chart", href: "/dashboard", sub: "income, breakdown, revenue source" },
      { name: "Recent Notifications", href: "/dashboard", sub: "alerts, notifications, messages" },
    ]
  },
  { 
    category: "Analytics & Trends", 
    items: [
      { name: "Revenue Performance", href: "/dashboard/analytics", sub: "revenue, total revenue, trends, growth" },
      { name: "Profitability Audit", href: "/dashboard/analytics", sub: "profit, margin, net profit, roi" },
      { name: "Network Usage Analytics", href: "/dashboard/analytics", sub: "usages, network usages, trends" },
      { name: "ROI Indicator", href: "/dashboard/analytics", sub: "roi, profit, return on investment" },
      { name: "Revenue Trends", href: "/dashboard/analytics", sub: "trends, forecasting, revenue" },
      { name: "Profit Margins (Audit)", href: "/dashboard/analytics", sub: "margins, profit margins, margin" },
      { name: "HIPAA Compliance Status", href: "/dashboard/analytics", sub: "hippa, compliance, legal" },
    ]
  },
  { 
    category: "Usage & Infrastructure", 
    items: [
      { name: "Detailed Usage Statistics", href: "/dashboard/usage", sub: "usages, total usages, minutes consumed" },
      { name: "Daily Usage Heatmap", href: "/dashboard/usage", sub: "heatmap, daily usages, usage" },
      { name: "Voice AI Infrastructure", href: "/dashboard/usage", sub: "infrastructure, storage, vapi cost" },
      { name: "Used Total (AI Credits)", href: "/dashboard/usage", sub: "credits, ai credits, usage total" },
      { name: "Facility Consumption", href: "/dashboard/usage", sub: "consumption, facility consumption breakdown, breakdown" },
      { name: "Network Health", href: "/dashboard/usage", sub: "network usages, infrastructure" },
    ]
  },
  { 
    category: "Clinics & Performance", 
    items: [
      { name: "Clinics Directory", href: "/dashboard/clinics", sub: "clinics, management, medical centers" },
      { name: "Top Performing Clinics", href: "/dashboard/clinics", sub: "clinics, profit, success, trends" },
      { name: "Attention Required (Low Performance)", href: "/dashboard/clinics", sub: "alerts, low performing clinic, clinics" },
      { name: "Client Satisfaction Index", href: "/dashboard/clinics", sub: "csi, satisfaction, user, feedback" },
      { name: "Doctors Registry", href: "/dashboard/clinics", sub: "doctor, clinic doctor, team member" },
    ]
  },
  { 
    category: "Financials & Billing", 
    items: [
      { name: "Billing & Invoices", href: "/dashboard/billing", sub: "billing, invoices, recent invoices, payment" },
      { name: "Expense Breakdown (Financial)", href: "/dashboard/billing", sub: "expense, expense breakdown, billing" },
      { name: "Revenue Sources (Financial)", href: "/dashboard/billing", sub: "revenue, revenue source, income breakdown" },
      { name: "HIPAA Compliance Fees", href: "/dashboard/billing", sub: "hippa, hippa compliance, billing" },
      { name: "Vapi Cost & Credits", href: "/dashboard/billing", sub: "vapi cost, vapi credits, available balance" },
      { name: "Payment Settings & Autopay", href: "/dashboard/billing", sub: "payment, payment methods, autopay, enable autopay, disable autopay" },
      { name: "Setup Cost Breakdown", href: "/dashboard/billing", sub: "setup cost, expenses, billing" },
    ]
  },
  { 
    category: "Settings & Administration", 
    items: [
      { name: "Agency Profile", href: "/dashboard/settings", sub: "settings, agency name, agency info" },
      { name: "Team Management", href: "/dashboard/settings", sub: "team, team member, user, administration" },
      { name: "Notification & Alert Settings", href: "/dashboard/settings", sub: "alerts, alert settings, notifications, settings" },
      { name: "Compliance & Assets Registry", href: "/dashboard/settings", sub: "compliance, compliance and assets, legal" },
      { name: "Default Pricing (Margin)", href: "/dashboard/settings", sub: "margin, profit, pricing, default pricing" },
      { name: "Payment Configuration", href: "/dashboard/settings", sub: "payment, payment settings, billing" },
    ]
  }
];

export function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { dateRange, setDateRange } = useDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Dynamic Breadcrumbs
  const pathParts = pathname.split("/").filter(Boolean);
  
  const getBreadcrumbs = () => {
    const items = [];
    let currentPath = "";
    
    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      currentPath += `/${part}`;
      // Clean up dynamic route parts like [id]
      const label = part.replace(/-/g, ' ').charAt(0).toUpperCase() + part.replace(/-/g, ' ').slice(1);
      
      const isLast = i === pathParts.length - 1;
      
      items.push(
        <React.Fragment key={currentPath}>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {isLast ? (
              <BreadcrumbPage>{label}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink href={currentPath}>{label}</BreadcrumbLink>
            )}
          </BreadcrumbItem>
        </React.Fragment>
      );
    }
    return items;
  };

  const filteredSearch = searchItems.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sub.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <header className="flex items-center justify-between mb-8 relative z-50">
      <div className="flex items-center gap-6 flex-1">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            {getBreadcrumbs()}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="relative group max-w-md w-full">
          <div className="flex items-center bg-muted/40 border border-border/50 rounded-lg px-3 py-2 w-full transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30 focus-within:bg-background">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <input 
              type="text"
              placeholder="Search analytics, clinics, costs..."
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-foreground/50 text-foreground font-medium"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearch(true);
              }}
              onFocus={() => setShowSearch(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.length > 0 && filteredSearch.length > 0) {
                  router.push(filteredSearch[0].items[0].href);
                  setShowSearch(false);
                  setSearchQuery("");
                }
              }}
              onBlur={() => setTimeout(() => setShowSearch(false), 200)}
            />
            <div className="flex items-center gap-1 bg-background/50 border rounded px-1.5 py-0.5 ml-2">
              <Command className="h-3 w-3 text-muted-foreground" />
              <span className="text-[10px] font-medium text-muted-foreground uppercase">K</span>
            </div>
          </div>

          <AnimatePresence>
            {showSearch && searchQuery.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                className="absolute top-full left-0 w-full mt-2 bg-popover border border-border shadow-2xl rounded-xl overflow-hidden"
              >
                <div className="max-h-[480px] overflow-y-auto p-2 space-y-4">
                  {filteredSearch.length === 0 ? (
                    <div className="p-8 text-center flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                         <Search className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <p className="text-sm font-medium">No results for &quot;{searchQuery}&quot;</p>
                      <p className="text-xs text-muted-foreground">Try searching for settings, clinics, or reports.</p>
                    </div>
                  ) : (
                    filteredSearch.map(cat => (
                      <div key={cat.category}>
                        <div className="px-3 py-1 flex items-center justify-between">
                           <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">{cat.category}</h4>
                           <span className="text-[9px] text-muted-foreground/40 font-medium italic">{cat.items.length} matches</span>
                        </div>
                        <div className="space-y-0.5 mt-1">
                          {cat.items.map(item => (
                            <button
                              key={item.name}
                              onClick={() => {
                                router.push(item.href);
                                setSearchQuery("");
                                setShowSearch(false);
                              }}
                              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm hover:bg-accent transition-colors group text-left"
                            >
                              <div className="flex flex-col">
                                <span className="font-medium">{item.name}</span>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-tight">{item.sub}</span>
                              </div>
                              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[10px] font-medium text-primary">Navigate</span>
                                <Command className="h-3 w-3 text-primary" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Calendar
          compact
          onChange={setDateRange}
          presets={presets}
          value={dateRange}
        />
        <div className="h-8 w-px bg-border mx-2" />
        <Notifications />
        <ModeToggle />
      </div>
    </header>
  );
}
