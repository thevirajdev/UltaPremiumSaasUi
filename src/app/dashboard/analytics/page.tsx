"use client";

import React from "react";
import { Button } from "@/components/ui/button-2";
import { Card, CardContent, CardHeader, CardTitle, CardToolbar, CardDescription } from "@/components/ui/card-2";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/line-charts-4";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu-2";
import { 
  Calendar, 
  Download, 
  Filter, 
  MoreHorizontal, 
  RefreshCw, 
  Share2, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Zap,
  AlertTriangle,
  Users,
  CheckCircle2,
  FileDown
} from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge-2";
import { Avatar, AvatarFallback, AvatarImage, AvatarStatus } from "@/components/ui/avatar-2";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Mock data for Revenue and Profit trends
const analyticsData = [
  { month: 'Jan', revenue: 45000, profit: 12000, usage: 4500 },
  { month: 'Feb', revenue: 52000, profit: 15000, usage: 5200 },
  { month: 'Mar', revenue: 48000, profit: 11000, usage: 4800 },
  { month: 'Apr', revenue: 61000, profit: 22000, usage: 6100 },
  { month: 'May', revenue: 58000, profit: 19000, usage: 5800 },
  { month: 'Jun', revenue: 72000, profit: 28000, usage: 7200 },
];

const highPerformingClinics = [
  { id: 1, name: "Central Medical Center", doctor: "Dr. Sarah Johnson", revenue: "$12,450", usage: "1,200 mins", growth: "+15%", status: "online" as const },
  { id: 2, name: "City Dental Clinic", doctor: "Dr. Mike Ross", revenue: "$9,800", usage: "950 mins", growth: "+12%", status: "online" as const },
  { id: 3, name: "Wellness Family Clinic", doctor: "Dr. Elena Gilbert", revenue: "$8,200", usage: "820 mins", growth: "+8%", status: "online" as const },
];

const revenueConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const profitConfig = {
  profit: {
    label: "Profit",
    color: "#10b981",
  },
} satisfies ChartConfig;

const FinanceTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border bg-card/95 backdrop-blur-md p-4 shadow-2xl border-border/50 min-w-[180px] animate-in fade-in zoom-in duration-200">
        <div className="text-[10px] font-black text-foreground/40 uppercase tracking-widest mb-3 border-b border-border/50 pb-2">{label} Analytics</div>
        <div className="space-y-3">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.2)]" style={{ backgroundColor: entry.color }} />
                <span className="text-[11px] font-bold text-foreground/60 uppercase">{entry.name}</span>
              </div>
              <div className="flex items-baseline gap-1 ml-4">
                <span className="text-lg font-black text-foreground tracking-tight">${entry.value.toLocaleString()}</span>
                <span className="text-[10px] font-bold text-emerald-500">+12%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
            <Zap className="h-4 w-4 fill-primary" />
            Performance Hub
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-foreground">Analytics Overview</h1>
          <p className="text-muted-foreground font-medium">Deep dive into your agency's financial and operational growth.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="dim" size="sm" className="gap-2 font-bold rounded-xl h-10 px-4">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => {
              toast.success("Report generation started", {
                description: "You will be notified once the PDF is ready for download.",
                icon: <FileDown className="h-4 w-4 text-primary" />
              });
            }}
            className="gap-2 font-bold rounded-xl h-10 px-4 shadow-lg shadow-primary/20"
          >
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card variant="accent" className="p-0 border-none shadow-xl shadow-primary/5">
          <CardContent className="p-6 bg-primary text-primary-foreground rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-white/20 rounded-lg">
                <DollarSign className="h-5 w-5" />
              </div>
              <Badge variant="outline" className="bg-white/10 border-white/20 text-white gap-1 font-bold">
                <ArrowUpRight className="h-3 w-3" />
                +12.5%
              </Badge>
            </div>
            <div>
              <p className="text-sm font-bold text-primary-foreground/80 uppercase tracking-widest">Total Revenue</p>
              <p className="text-3xl font-black tracking-tighter">$336,000</p>
            </div>
          </CardContent>
        </Card>

        <Card variant="accent" className="p-0 border-none">
          <CardContent className="p-6 bg-card rounded-xl border border-border shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-600">
                <TrendingUp className="h-5 w-5" />
              </div>
              <Badge variant="success" appearance="light" className="gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +8.2%
              </Badge>
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Net Profit</p>
              <p className="text-3xl font-black text-foreground">$107,000</p>
            </div>
          </CardContent>
        </Card>

        <Card variant="accent" className="p-0 border-none">
          <CardContent className="p-6 bg-card rounded-xl border border-border shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-600">
                <TrendingUp className="h-5 w-5" />
              </div>
              <Badge variant="info" appearance="light" className="gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +15.4%
              </Badge>
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Client Satisfaction %</p>
              <p className="text-3xl font-black text-foreground">98.2%</p>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="accent" className="p-0 border-none">
          <CardContent className="p-6 bg-card rounded-xl border border-border shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-600">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <Badge variant="destructive" appearance="light" className="gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +4.1%
              </Badge>
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Low Performing Clinics</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-black text-foreground">5</p>
                <span className="text-[10px] font-bold text-rose-500 uppercase tracking-tighter">Under 200 Mins</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Trends Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="shadow-sm border-border/60 overflow-hidden">
          <CardHeader className="border-0 pb-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Revenue Trends
                </CardTitle>
                <CardDescription>Monthly income growth analysis</CardDescription>
              </div>
              <CardToolbar>
                <Button variant="dim" size="sm" mode="icon" className="rounded-full h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardToolbar>
            </div>
          </CardHeader>
          <CardContent className="pt-6 px-2">
            <ChartContainer config={revenueConfig} className="h-[300px] w-full">
              <LineChart data={analyticsData} margin={{ top: 10, right: 20, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 700, fill: 'hsl(var(--foreground) / 0.6)' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 700, fill: 'hsl(var(--foreground) / 0.6)' }} 
                  tickFormatter={(v) => `$${v/1000}k`} 
                  dx={-10}
                />
                <ChartTooltip content={<FinanceTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1.5, strokeDasharray: '4 4' }} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={4} 
                  dot={{ r: 4, fill: 'hsl(var(--primary))', strokeWidth: 2, stroke: 'hsl(var(--background))' }} 
                  activeDot={{ r: 7, strokeWidth: 0, fill: 'hsl(var(--primary))' }} 
                  animationDuration={1500}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/60 overflow-hidden">
          <CardHeader className="border-0 pb-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                  Profit Margins
                </CardTitle>
                <CardDescription>Net profit post-expenses</CardDescription>
              </div>
              <CardToolbar>
                <Button variant="dim" size="sm" mode="icon" className="rounded-full h-8 w-8">
                  <Share2 className="h-4 w-4" />
                </Button>
              </CardToolbar>
            </div>
          </CardHeader>
          <CardContent className="pt-6 px-2">
            <ChartContainer config={profitConfig} className="h-[300px] w-full">
              <LineChart data={analyticsData} margin={{ top: 10, right: 20, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 700, fill: 'hsl(var(--foreground) / 0.6)' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 700, fill: 'hsl(var(--foreground) / 0.6)' }} 
                  tickFormatter={(v) => `${v/1000}k`} 
                  dx={-10}
                />
                <ChartTooltip content={<FinanceTooltip />} cursor={{ stroke: '#10b981', strokeWidth: 1.5, strokeDasharray: '4 4' }} />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#10b981" 
                  strokeWidth={4} 
                  dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: 'hsl(var(--background))' }} 
                  activeDot={{ r: 7, strokeWidth: 0, fill: '#10b981' }} 
                  animationDuration={1500}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Clinic Performance Table */}
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="border-border/60">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500" />
                Top Performing Clinics
              </CardTitle>
              <CardDescription>Facilities with highest revenue & usage</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary font-bold">View All</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {highPerformingClinics.map((clinic) => (
              <div 
                key={clinic.id} 
                onClick={() => router.push(`/dashboard/clinics/${clinic.id}`)}
                className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${clinic.name}`} />
                    <AvatarFallback>{clinic.name[0]}</AvatarFallback>
                    <AvatarStatus status={clinic.status} />
                  </Avatar>
                  <div>
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">{clinic.name}</p>
                    <p className="text-xs text-muted-foreground font-medium">{clinic.doctor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-foreground">{clinic.revenue}</p>
                  <p className="text-[10px] font-bold text-emerald-500">{clinic.growth}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-rose-500" />
                Low Performing Clinics
              </CardTitle>
              <CardDescription>Facilities with declining usage minutes</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: 4, name: "East Side Pediatrics", issue: "Usage down 40%", volume: "85 mins", color: "rose" },
              { id: 5, name: "North Dental Group", issue: "Usage down 15%", volume: "210 mins", color: "amber" },
            ].map((clinic) => (
              <div 
                key={clinic.id} 
                onClick={() => router.push(`/dashboard/clinics/${clinic.id}`)}
                className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center transition-colors", clinic.color === 'rose' ? 'bg-rose-500/10 text-rose-500 group-hover:bg-rose-500 group-hover:text-white' : 'bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white')}>
                    <TrendingDown className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{clinic.name}</p>
                    <p className="text-xs text-muted-foreground font-medium">{clinic.issue}</p>
                  </div>
                </div>
                <Badge variant={clinic.color === 'rose' ? 'destructive' : 'warning'} className="font-bold">
                  {clinic.volume}
                </Badge>
              </div>
            ))}
            <div 
              onClick={() => {
                toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
                  loading: 'Running comprehensive system audit...',
                  success: 'System Audit Complete: All systems operational.',
                  error: 'Audit failed to connect to some nodes.',
                });
              }}
              className="p-4 rounded-2xl border-2 border-dashed border-border flex items-center justify-center text-muted-foreground font-medium text-sm gap-2 hover:border-primary/50 hover:text-primary transition-all cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              Run New System Audit
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
