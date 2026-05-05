"use client";

import React, { useEffect, useState } from "react";
import { StatsCard } from "@/components/ui/activity-stats-card";
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  Users, 
  Clock, 
  Percent,
  ArrowUp,
  ArrowDown,
  Calendar,
  Download,
  Filter,
  MoreHorizontal,
  RefreshCw,
  Share2,
  PieChart as PieChartIcon,
  BarChart3,
  TrendingDown,
  Activity,
  Stethoscope,
  HeartPulse,
  Microscope,
  Pill
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardToolbar,
  CardHeading,
  CardDescription
} from "@/components/ui/card";
import { 
  ChartConfig, 
  ChartContainer, 
  ChartTooltip 
} from "@/components/ui/line-charts-1";
import { 
  WeeklyKPIChart, 
  DayPoint 
} from "@/components/ui/weekly-kpi-chart";
import { DonutChart, DonutChartSegment } from "@/components/ui/donut-chart";
import { CategoryBarChart } from "@/components/ui/category-bar-chart";
import { Button } from "@/components/ui/button-1";
import { Badge } from "@/components/ui/badge-2";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Area, 
  CartesianGrid, 
  ComposedChart, 
  Line, 
  ReferenceLine, 
  XAxis, 
  YAxis,
  ResponsiveContainer 
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useDashboard } from "@/context/DashboardContext";

// Sales vs Expense data
const salesvsExpenseData = [
  { month: 'Jan', expense: 120000, sales: 280000, salesArea: 280000 },
  { month: 'Feb', expense: 150000, sales: 350000, salesArea: 350000 },
  { month: 'Mar', expense: 180000, sales: 480000, salesArea: 480000 },
  { month: 'Apr', expense: 160000, sales: 390000, salesArea: 390000 },
  { month: 'May', expense: 210000, sales: 520000, salesArea: 520000 },
  { month: 'Jun', expense: 195000, sales: 465000, salesArea: 465000 },
];

const chartConfig = {
  expense: {
    label: 'Expenses',
    color: 'var(--color-pink-500)',
  },
  sales: {
    label: 'Sales',
    color: 'var(--color-teal-500)',
  },
} satisfies ChartConfig;

// Call time data
const callTimeData: DayPoint[] = [
  { day: "S", value: 450 },
  { day: "M", value: 1200 },
  { day: "T", value: 1567 },
  { day: "W", value: 1100 },
  { day: "T", value: 1400 },
  { day: "F", value: 1300 },
  { day: "S", value: 800 },
];

const expenseBreakdownData: DonutChartSegment[] = [
  { value: 15400, color: "hsl(var(--primary))", label: "Vapi Cost" },
  { value: 2000, color: "hsl(var(--rose-500))", label: "HIPAA Compliance" },
  { value: 1000, color: "hsl(var(--amber-500))", label: "Setup Fee" },
];

const incomeBreakdownData = [
  { value: 45000, color: "bg-blue-500", label: "Vapi Cost", icon: <Activity className="h-3 w-3" /> },
  { value: 52000, color: "bg-cyan-500", label: "HIPAA Compliance", icon: <Stethoscope className="h-3 w-3" /> },
  { value: 18000, color: "bg-amber-500", label: "Setup Cost", icon: <DollarSign className="h-3 w-3" /> },
];

const totalExpenseValue = expenseBreakdownData.reduce((sum, d) => sum + d.value, 0);
const totalIncomeValue = incomeBreakdownData.reduce((sum, d) => sum + d.value, 0);

const ChartLabel = ({ label, color }: { label: string; color: string }) => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="size-2.5 border-2 rounded-full bg-background" style={{ borderColor: color }}></div>
      <span className="text-muted-foreground text-xs">{label}</span>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const filteredPayload = payload.filter((entry: any) => entry.dataKey !== 'salesArea');

    return (
      <div className="rounded-lg border bg-popover p-3 shadow-sm shadow-black/5 min-w-[150px]">
        <div className="text-[10px] font-medium text-muted-foreground tracking-wide mb-2">{label}</div>
        <div className="space-y-1.5">
          {filteredPayload.map((entry: any, index: number) => {
            const config = chartConfig[entry.dataKey as keyof typeof chartConfig];
            return (
              <div key={index} className="flex items-center justify-between gap-4 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <div className="size-2 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-muted-foreground">{config?.label}:</span>
                </div>
                <span className="font-semibold text-popover-foreground">${(entry.value / 1000).toFixed(0)}K</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const { dateRange } = useDashboard();
  const [loading, setLoading] = useState(true);
  const [hoveredExpenseSegment, setHoveredExpenseSegment] = useState<string | null>(null);

  // Find the currently hovered segment data
  const activeExpenseSegment = expenseBreakdownData.find(
    (segment) => segment.label === hoveredExpenseSegment
  );
  
  // Determine display values for donut center
  const displayValue = activeExpenseSegment?.value ?? totalExpenseValue;
  const displayLabel = activeExpenseSegment?.label ?? "Total Expenses";

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [dateRange]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground text-sm">
          Real-time performance metrics across all your clinics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-4 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm animate-pulse">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-9 w-9 rounded-full bg-muted" />
                <div className="h-3 w-16 bg-muted rounded" />
              </div>
              <div className="h-8 w-40 bg-foreground/10 rounded mb-2" />
              <div className="h-3 w-28 bg-muted rounded" />
            </div>
          ))
        ) : (
          <>
            <StatsCard
              title="Total Revenue"
              metric={124500.25}
              metricUnit="$"
              subtext="+12.5% from last month"
              icon={<DollarSign className="h-6 w-6" />}
              iconContainerClassName="bg-emerald-500/10 text-emerald-500"
            />
            <StatsCard
              title="Total Expenses"
              metric={totalExpenseValue}
              metricUnit="$"
              subtext="Vapi + HIPAA + Setup Fee"
              icon={<CreditCard className="h-6 w-6" />}
              iconContainerClassName="bg-rose-500/10 text-rose-500"
            />
            <StatsCard
              title="Net Profit"
              metric={124500.25 - totalExpenseValue}
              metricUnit="$"
              subtext="Calculated earnings"
              icon={<TrendingUp className="h-6 w-6" />}
              iconContainerClassName="bg-blue-500/10 text-blue-500"
            />
            <StatsCard
              title="Total Users"
              metric={1250}
              subtext="Active across clinics"
              icon={<Users className="h-6 w-6" />}
              iconContainerClassName="bg-indigo-500/10 text-indigo-500"
            />
            <StatsCard
              title="Total Usage"
              metric={45200}
              metricUnit="min"
              subtext="Voice AI processing time"
              icon={<Clock className="h-6 w-6" />}
              iconContainerClassName="bg-amber-500/10 text-amber-500"
            />
            <StatsCard
              title="Profit Margin"
              metric={((124500.25 - totalExpenseValue) / 124500.25) * 100}
              metricUnit="%"
              subtext="Efficiency ratio"
              icon={<Percent className="h-6 w-6" />}
              iconContainerClassName="bg-violet-500/10 text-violet-500"
            />
          </>
        )}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Sales vs Expense Chart */}
        <Card className="col-span-4 overflow-hidden">
          <CardHeader className="border-0 pb-2">
            <div className="flex items-center justify-between w-full">
              <CardHeading>
                <CardTitle className="text-sm font-semibold">Sales vs Expenses</CardTitle>
                <CardDescription className="text-[10px]">Monthly financial performance overview</CardDescription>
              </CardHeading>
              <CardToolbar>
                <div className="flex items-center gap-3 mr-2">
                  <ChartLabel label="Sales" color={chartConfig.sales.color} />
                  <ChartLabel label="Expenses" color={chartConfig.expense.color} />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem><Download className="mr-2 h-4 w-4" /> Export</DropdownMenuItem>
                    <DropdownMenuItem><RefreshCw className="mr-2 h-4 w-4" /> Refresh</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardToolbar>
            </div>
          </CardHeader>
          <CardContent className="p-0 pb-4">
            <ChartContainer config={chartConfig} className="h-[280px] w-full px-4">
              <ComposedChart data={salesvsExpenseData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chartConfig.sales.color} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={chartConfig.sales.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10 }} 
                  tickMargin={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10 }} 
                  tickFormatter={(value) => `$${value/1000}K`}
                  tickMargin={10}
                />
                <ChartTooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area type="monotone" dataKey="salesArea" fill="url(#salesGradient)" stroke="none" />
                <Line type="monotone" dataKey="sales" stroke={chartConfig.sales.color} strokeWidth={2} dot={{ r: 3, fill: chartConfig.sales.color }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="expense" stroke={chartConfig.expense.color} strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3, fill: chartConfig.expense.color }} />
              </ComposedChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Weekly Call Time Chart */}
        <Card className="col-span-3">
          <CardHeader className="border-0 pb-0">
            <CardHeading className="flex flex-col gap-1">
              <CardTitle className="text-sm font-bold tracking-tight">Total Call Time</CardTitle>
              <CardDescription className="text-[10px] text-muted-foreground/80">Minutes processed per day this week</CardDescription>
            </CardHeading>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-0">
            <WeeklyKPIChart
              data={callTimeData}
              width={320}
              height={280}
              className="mt-0"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Expense Breakdown */}
        <Card className="col-span-4">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4 text-rose-500" />
              <CardTitle className="text-base font-semibold tracking-tight">Expense Breakdown</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 pt-0 pb-4">
            <div className="relative flex items-center justify-center">
              <DonutChart
                data={expenseBreakdownData}
                size={160}
                strokeWidth={18}
                onSegmentHover={(segment) => setHoveredExpenseSegment(segment?.label ?? null)}
                centerContent={
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={displayLabel}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center justify-center text-center"
                    >
                      <p className="text-[9px] text-foreground/70 font-bold uppercase tracking-widest mb-0.5">
                        {displayLabel}
                      </p>
                      <p className="text-xl font-black text-foreground leading-none tracking-tight">
                        ${displayValue.toLocaleString()}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                }
              />
            </div>

            <div className="flex-1 w-full space-y-3">
              <div>
                <span className="text-[10px] font-black text-foreground/80 uppercase tracking-widest">Expense Summary</span>
                <div className="grid grid-cols-1 gap-y-1.5 mt-2">
                  {expenseBreakdownData.map((segment) => (
                    <motion.div 
                      key={segment.label}
                      className={cn(
                        "flex items-center justify-between px-2 py-1.5 rounded-lg transition-all border border-transparent",
                        hoveredExpenseSegment === segment.label && "bg-muted border-border"
                      )}
                      onMouseEnter={() => setHoveredExpenseSegment(segment.label)}
                      onMouseLeave={() => setHoveredExpenseSegment(null)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: segment.color }} />
                        <span className="text-xs font-medium">{segment.label}</span>
                      </div>
                      <span className="text-xs font-bold">${segment.value.toLocaleString()}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between px-2 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">Total Burn</span>
                <span className="text-base font-black text-rose-500">${totalExpenseValue.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Income Breakdown */}
        <Card className="col-span-3 overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-emerald-500" />
              <CardTitle className="text-base font-semibold tracking-tight">Income Breakdown</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-0 pb-4">
            <CategoryBarChart className="border-0 p-0 shadow-none h-auto" />
            <Separator />
            <div className="space-y-3">
              <span className="text-[10px] font-black text-foreground/80 uppercase tracking-widest">Revenue Sources</span>
              <div className="grid grid-cols-1 gap-y-1.5 mt-2">
                {incomeBreakdownData.map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-xs px-2 py-1.5 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className={cn("flex items-center justify-center h-5 w-5 rounded-full bg-muted text-foreground/70", item.color.replace('bg-', 'text-'))}>
                        {item.icon}
                      </div>
                      <span className="text-foreground/80 font-bold tracking-tight">{item.label}</span>
                    </div>
                    <span className="font-bold">${item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <Separator className="mt-2 mb-1" />
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">Total Income</span>
                <span className="text-base font-black text-emerald-500">${totalIncomeValue.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
