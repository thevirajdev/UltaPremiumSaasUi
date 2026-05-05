"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card-2";
import { 
  Activity, 
  Clock, 
  PhoneIncoming, 
  PhoneOutgoing, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Zap,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge-2";
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  Legend,
  Bar,
  BarChart
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock Data for Usage Trends
const usageTrendData = [
  { date: '04/28', inbound: 45, outbound: 12, total: 57 },
  { date: '04/29', inbound: 52, outbound: 18, total: 70 },
  { date: '04/30', inbound: 48, outbound: 20, total: 68 },
  { date: '05/01', inbound: 61, outbound: 25, total: 86 },
  { date: '05/02', inbound: 55, outbound: 22, total: 77 },
  { date: '05/03', inbound: 40, outbound: 15, total: 55 },
  { date: '05/04', inbound: 64, outbound: 28, total: 92 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-popover p-3 shadow-lg shadow-black/5 min-w-[140px]">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">{label}</p>
        <div className="space-y-1.5">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5">
                <div className="size-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-xs font-medium text-muted-foreground">{entry.name}:</span>
              </div>
              <span className="text-xs font-black text-foreground">{entry.value}m</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function ClientUsagePage() {
  const params = useParams();
  const client = params.client as string;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground lowercase first-letter:uppercase">
          {client} Resource Usage
        </h1>
        <p className="text-muted-foreground font-medium">
          Detailed audit of AI minutes, call volume, and infrastructure consumption.
        </p>
      </div>

      {/* Top Level Metrics (Requested) */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm border-border/60 bg-primary/[0.02]">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <DollarSign className="h-5 w-5" />
              </div>
              <Badge variant="success" appearance="light" size="xs">Live</Badge>
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Remaining Balance</p>
              <p className="text-3xl font-black text-foreground">$420.50</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/60">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-600">
                <Zap className="h-5 w-5" />
              </div>
              <Badge variant="primary" appearance="light" size="xs">Month to Date</Badge>
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Total Monthly Usage</p>
              <p className="text-3xl font-black text-foreground">1,420<span className="text-sm font-bold text-muted-foreground ml-1">min</span></p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/60">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-600">
                <Clock className="h-5 w-5" />
              </div>
              <Badge variant="warning" appearance="light" size="xs">High Efficiency</Badge>
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Avg. Min Per Call</p>
              <p className="text-3xl font-black text-foreground">3.2<span className="text-sm font-bold text-muted-foreground ml-1">min</span></p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/60">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-green-500/10 rounded-lg text-green-600">
                <Activity className="h-5 w-5" />
              </div>
              <Badge variant="success" appearance="light" size="xs">+12% vs prev</Badge>
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Daily Usage Today</p>
              <p className="text-3xl font-black text-foreground">92<span className="text-sm font-bold text-muted-foreground ml-1">min</span></p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Trends Graph (Requested) */}
      <Card className="shadow-sm border-border/60">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 pb-6 mb-6">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Usage Intelligence (Inbound vs Outbound)
            </CardTitle>
            <CardDescription>Daily minute consumption trends over the last 7 days.</CardDescription>
          </div>
          <div className="flex gap-2">
             <Badge variant="secondary" appearance="light" className="h-8 px-4 cursor-pointer">Daily</Badge>
             <Badge variant="outline" className="h-8 px-4 cursor-pointer">Weekly</Badge>
          </div>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={usageTrendData}>
              <defs>
                <linearGradient id="colorInbound" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorOutbound" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-border/20" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: 'currentColor' }} 
                className="text-muted-foreground"
                dy={10} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: 'currentColor' }}
                className="text-muted-foreground"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 10, fontWeight: 'black', paddingTop: 30 }} />
              <Area 
                name="Inbound Minutes"
                type="monotone" 
                dataKey="inbound" 
                stroke="#10B981" 
                fillOpacity={1} 
                fill="url(#colorInbound)" 
                strokeWidth={4}
              />
              <Area 
                name="Outbound Minutes"
                type="monotone" 
                dataKey="outbound" 
                stroke="#6366F1" 
                fillOpacity={1} 
                fill="url(#colorOutbound)" 
                strokeWidth={4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Usage History Table (Requested) */}
      <Card className="shadow-sm border-border/60 overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-600" />
            Consumption Audit Log
          </CardTitle>
          <CardDescription>Detailed transaction history for all AI-automated calls.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-border/60">
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest pl-6">Date & Time</TableHead>
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest text-center">Call Type</TableHead>
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest text-center">Duration</TableHead>
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest text-right">Cost Applied</TableHead>
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest text-right pr-6">Remaining Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { date: "05/04 10:30 AM", type: "Inbound", duration: "4.5m", cost: "$0.67", balance: "$420.50" },
                { date: "05/04 09:15 AM", type: "Outbound", duration: "2.1m", cost: "$0.32", balance: "$421.17" },
                { date: "05/03 04:45 PM", type: "Inbound", duration: "8.2m", cost: "$1.23", balance: "$421.49" },
                { date: "05/03 02:20 PM", type: "Inbound", duration: "3.5m", cost: "$0.52", balance: "$422.72" },
                { date: "05/03 11:00 AM", type: "Outbound", duration: "1.8m", cost: "$0.27", balance: "$423.24" },
              ].map((log, i) => (
                <TableRow key={i} className="border-border/40 hover:bg-muted/10 transition-colors">
                  <TableCell className="py-4 pl-6">
                    <span className="text-xs font-bold text-foreground">{log.date}</span>
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                       {log.type === 'Inbound' ? <ArrowDownRight className="h-3 w-3 text-green-600" /> : <ArrowUpRight className="h-3 w-3 text-indigo-600" />}
                       <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{log.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <Badge variant="secondary" appearance="light" size="xs" className="font-mono font-bold">{log.duration}</Badge>
                  </TableCell>
                  <TableCell className="py-4 text-right">
                    <span className="text-xs font-black text-red-500 font-mono">-{log.cost}</span>
                  </TableCell>
                  <TableCell className="py-4 text-right pr-6">
                    <span className="text-xs font-black text-foreground font-mono">{log.balance}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
