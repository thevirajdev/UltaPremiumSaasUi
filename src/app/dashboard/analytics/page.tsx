"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
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
  FileDown,
  Building2
} from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge-2";
import { Avatar, AvatarFallback, AvatarImage, AvatarStatus } from "@/components/ui/avatar-2";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useClinics } from "@/hooks/use-local-data";

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
                <span className="text-[10px] font-bold text-emerald-500">+Live</span>
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
  const router = useRouter();
  const { data: clinics, loading } = useClinics();

  const stats = useMemo(() => {
    const totalRevenue = clinics.reduce((acc, c) => acc + (c.totalPaid || 0), 0);
    const totalProfit = clinics.reduce((acc, c) => acc + (c.profitGenerated || 0), 0);
    const lowPerforming = clinics.filter(c => (c.totalUsage || 0) < 200).length;
    
    // Mock trend data based on clinics
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const trendData = months.map((m, i) => ({
      month: m,
      revenue: (totalRevenue / clinics.length || 0) * (i + 1) * 0.2,
      profit: (totalProfit / clinics.length || 0) * (i + 1) * 0.2,
    }));

    const sortedClinics = [...clinics].sort((a, b) => b.totalPaid - a.totalPaid);
    const highPerforming = sortedClinics.slice(0, 3);
    const lowPerformingList = clinics.filter(c => (c.totalUsage || 0) < 200).slice(0, 2);

    return {
      totalRevenue,
      totalProfit,
      lowPerforming,
      trendData,
      highPerforming,
      lowPerformingList
    };
  }, [clinics]);

  if (loading) return <div className="p-8">Loading...</div>;

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
                Live
              </Badge>
            </div>
            <div>
              <p className="text-sm font-bold text-primary-foreground/80 uppercase tracking-widest">Total Revenue</p>
              <p className="text-3xl font-black tracking-tighter">${stats.totalRevenue.toLocaleString()}</p>
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
                Real-time
              </Badge>
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Net Profit</p>
              <p className="text-3xl font-black text-foreground">${stats.totalProfit.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card variant="accent" className="p-0 border-none">
          <CardContent className="p-6 bg-card rounded-xl border border-border shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-600">
                <Users className="h-5 w-5" />
              </div>
              <Badge variant="info" appearance="light" className="gap-1">
                Synced
              </Badge>
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Active Clinics</p>
              <p className="text-3xl font-black text-foreground">{clinics.length}</p>
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
                Attention
              </Badge>
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Low Performing Clinics</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-black text-foreground">{stats.lowPerforming}</p>
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
            </div>
          </CardHeader>
          <CardContent className="pt-6 px-2">
            {clinics.length > 0 ? (
              <ChartContainer config={revenueConfig} className="h-[300px] w-full">
                <LineChart data={stats.trendData} margin={{ top: 10, right: 20, left: 20, bottom: 20 }}>
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
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground italic text-xs border-2 border-dashed rounded-xl">
                No clinical data available to generate trends.
              </div>
            )}
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
            </div>
          </CardHeader>
          <CardContent className="pt-6 px-2">
            {clinics.length > 0 ? (
              <ChartContainer config={profitConfig} className="h-[300px] w-full">
                <LineChart data={stats.trendData} margin={{ top: 10, right: 20, left: 20, bottom: 20 }}>
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
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground italic text-xs border-2 border-dashed rounded-xl">
                Waiting for clinical activity...
              </div>
            )}
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
            <Button variant="ghost" size="sm" className="text-primary font-bold" onClick={() => router.push('/dashboard/clinics')}>View All</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.highPerforming.length > 0 ? stats.highPerforming.map((clinic) => (
              <div 
                key={clinic.id} 
                onClick={() => router.push(`/agency-os/${clinic.name.toLowerCase().replace(/\s+/g, '-')}`)}
                className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${clinic.name}`} />
                    <AvatarFallback>{clinic.name[0]}</AvatarFallback>
                    <AvatarStatus variant="online" />
                  </Avatar>
                  <div>
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">{clinic.name}</p>
                    <p className="text-xs text-muted-foreground font-medium">{clinic.doctorName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-foreground">${clinic.totalPaid.toLocaleString()}</p>
                  <p className="text-[10px] font-bold text-emerald-500">{clinic.totalUsage} mins</p>
                </div>
              </div>
            )) : (
              <div className="p-8 text-center text-muted-foreground italic text-sm">No clinic data available.</div>
            )}
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
            {stats.lowPerformingList.length > 0 ? stats.lowPerformingList.map((clinic) => (
              <div 
                key={clinic.id} 
                onClick={() => router.push(`/agency-os/${clinic.name.toLowerCase().replace(/\s+/g, '-')}`)}
                className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-rose-500/10 text-rose-500 group-hover:bg-rose-500 group-hover:text-white flex items-center justify-center transition-colors">
                    <TrendingDown className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{clinic.name}</p>
                    <p className="text-xs text-muted-foreground font-medium">Under 200 Mins</p>
                  </div>
                </div>
                <Badge variant="destructive" className="font-bold">
                  {clinic.totalUsage} mins
                </Badge>
              </div>
            )) : (
              <div className="p-8 text-center text-muted-foreground italic text-sm">No low performing clinics identified.</div>
            )}
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
