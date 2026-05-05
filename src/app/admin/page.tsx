"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Building2, 
  Users, 
  Database, 
  Cpu, 
  CreditCard,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Zap,
  HardDrive
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { toast } from "sonner";

const data = [
  { name: 'Jan', revenue: 45000 },
  { name: 'Feb', revenue: 52000 },
  { name: 'Mar', revenue: 48000 },
  { name: 'Apr', revenue: 61000 },
  { name: 'May', revenue: 55000 },
  { name: 'Jun', revenue: 67000 },
];

const usageData = [
  { name: 'Helix', credits: 450, storage: 120 },
  { name: 'Nexus', credits: 380, storage: 85 },
  { name: 'Pulse', credits: 520, storage: 140 },
  { name: 'Quantum', credits: 290, storage: 65 },
  { name: 'Aegis', credits: 410, storage: 110 },
];

export default function AdminDashboard() {
  const stats = [
    { label: "Total Agencies", value: "12", icon: Building2, trend: "+2 this month", color: "text-blue-500" },
    { label: "System Health", value: "Optimal", icon: Activity, trend: "99.9% Uptime", color: "text-green-500" },
    { label: "Total AI Credits", value: "4.2M", icon: Zap, trend: "+12.5% consumption", color: "text-amber-500" },
    { label: "Platform Revenue", value: "$67,400", icon: CreditCard, trend: "+18.2% Growth", color: "text-primary" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Super Admin Overview</h1>
          <p className="text-muted-foreground mt-1 text-lg font-medium">Platform-wide storage allocation and AI Credit analytics.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="cursor-pointer"
            onClick={() => toast.info(`${stat.label} Breakdown`, { description: `Detailed analytics for ${stat.label.toLowerCase()} are being generated...` })}
          >
            <Card className="p-6 bg-background/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 group">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl bg-muted/50 ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.trend.split(' ')[0]}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-2xl font-black text-foreground mt-1 tracking-tighter">{stat.value}</h3>
                <p className="text-[10px] font-bold text-muted-foreground mt-2 opacity-70 tracking-tight">{stat.trend.split(' ').slice(1).join(' ')}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 p-8 bg-background/50 backdrop-blur-sm border-border/50">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-foreground tracking-tight italic">Financial Performance</h3>
              <p className="text-sm text-muted-foreground mt-1 font-medium">Growth overview across setup fees and maintenance tiers.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Revenue</span>
              </div>
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 700 }}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: 700,
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Resource Consumption */}
        <Card className="p-8 bg-background/50 backdrop-blur-sm border-border/50">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-foreground tracking-tight italic">Top Resource Consumers</h3>
            <p className="text-sm text-muted-foreground mt-1 font-medium">Aggregated AI Credits used by agency assistants.</p>
          </div>
          
          <div className="space-y-8">
            {usageData.map((agency, i) => (
              <div key={agency.name} className="space-y-2 cursor-pointer group" onClick={() => toast.info(`${agency.name} Usage Profile`)}>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-foreground">{agency.name} Medical</span>
                  <span className="text-[10px] font-black text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full">{agency.credits}k Credits</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(agency.credits / 600) * 100}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                    className="h-full bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.4)]"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10">
            <div className="flex items-center gap-3 mb-2">
              <HardDrive className="w-5 h-5 text-blue-500" />
              <span className="text-xs font-black text-foreground uppercase tracking-widest">Storage Status</span>
            </div>
            <p className="text-[10px] text-muted-foreground font-medium leading-relaxed mb-4">Total data across all patient records and knowledge bases.</p>
            <div className="text-2xl font-black text-foreground tracking-tighter">1.42 / 2.0 TB</div>
            <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[71%] rounded-full" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
