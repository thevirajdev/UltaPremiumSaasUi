"use client";

import React from "react";
import { Button } from "@/components/ui/button-2";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card-2";
import { 
  Activity, 
  Database, 
  Cpu, 
  Zap, 
  Clock, 
  DollarSign, 
  Download, 
  ChevronRight,
  Search,
  Filter,
  ArrowUpRight,
  HardDrive,
  CheckCircle2
} from "lucide-react";
import { Badge } from "@/components/ui/badge-2";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

// Mock data for heatmap (intensity 0-4)
const heatmapData = Array.from({ length: 84 }, (_, i) => Math.floor(Math.random() * 5));
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const clinicUsage = [
  { id: 1, name: "Central Medical Center", minutes: "4,250", cost: "$637.50", storage: "12.4 GB", credits: "850" },
  { id: 2, name: "City Dental Clinic", minutes: "2,100", cost: "$315.00", storage: "5.8 GB", credits: "420" },
  { id: 3, name: "Wellness Family Clinic", minutes: "1,850", cost: "$277.50", storage: "4.2 GB", credits: "370" },
  { id: 4, name: "East Side Pediatrics", minutes: "950", cost: "$142.50", storage: "2.1 GB", credits: "190" },
  { id: 5, name: "Sunrise Eye Care", minutes: "420", cost: "$63.00", storage: "0.8 GB", credits: "84" },
];

export default function UsagePage() {
  return (
    <div className="space-y-8 pb-12 max-w-(--breakpoint-2xl) mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Usage & Resource Audit</h1>
          <p className="text-muted-foreground font-medium">
            Real-time monitoring of voice minutes, AI credits, and multi-tenant storage.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => {
              toast.success("Usage Report Generated", {
                description: "The audit file has been sent to your business email.",
              });
            }}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Usage Report
          </Button>
          <Button 
            onClick={() => {
              toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
                loading: 'Initializing checkout...',
                success: 'Credits added successfully!',
                error: 'Checkout failed.',
              });
            }}
            className="gap-2 shadow-lg shadow-primary/20"
          >
            <Zap className="h-4 w-4" />
            Buy Credits
          </Button>
        </div>
      </div>

      {/* Primary Usage KPIs */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card variant="accent" className="p-0 border-none shadow-none">
          <CardContent className="p-6 bg-card rounded-xl border border-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <Badge variant="primary" appearance="light">Total</Badge>
            </div>
            <div>
              <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Minutes Consumed</p>
              <p className="text-3xl font-black text-foreground">33,560</p>
              <p className="text-[10px] text-muted-foreground font-medium mt-1">+12% from last period</p>
            </div>
          </CardContent>
        </Card>

        <Card variant="accent" className="p-0 border-none shadow-none">
          <CardContent className="p-6 bg-card rounded-xl border border-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-600">
                <Cpu className="h-5 w-5" />
              </div>
              <Badge variant="warning" appearance="light">AI Credits</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Used / Total</p>
                  <p className="text-3xl font-black text-foreground">8.4k <span className="text-sm font-bold text-muted-foreground">/ 12k</span></p>
                </div>
                <span className="text-xs font-bold text-yellow-600">70%</span>
              </div>
              <Progress value={70} className="h-1.5 bg-yellow-500/10" />
            </div>
          </CardContent>
        </Card>

        <Card variant="accent" className="p-0 border-none shadow-none">
          <CardContent className="p-6 bg-card rounded-xl border border-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-600">
                <Activity className="h-5 w-5" />
              </div>
              <Badge variant="info" appearance="light">Vapi Cost</Badge>
            </div>
            <div>
              <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Infrastructure Expense</p>
              <p className="text-3xl font-black text-foreground">$1,678.20</p>
              <p className="text-[10px] text-muted-foreground font-medium mt-1">Avg: $0.05 / min</p>
            </div>
          </CardContent>
        </Card>

        <Card variant="accent" className="p-0 border-none shadow-none">
          <CardContent className="p-6 bg-card rounded-xl border border-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-green-500/10 rounded-lg text-green-600">
                <HardDrive className="h-5 w-5" />
              </div>
              <Badge variant="success" appearance="light">Storage</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Transcripts & Audio</p>
                  <p className="text-3xl font-black text-foreground">25.4 GB</p>
                </div>
                <span className="text-xs font-bold text-green-600">25%</span>
              </div>
              <Progress value={25} className="h-1.5 bg-green-500/10" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Heatmap Section (Requested) */}
      <Card className="shadow-sm border-border/60">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Daily Usage Heatmap
              </CardTitle>
              <CardDescription>Activity intensity over the last 12 weeks</CardDescription>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="size-3 rounded-sm bg-muted/20"></div>
                <div className="size-3 rounded-sm bg-primary/20"></div>
                <div className="size-3 rounded-sm bg-primary/40"></div>
                <div className="size-3 rounded-sm bg-primary/70"></div>
                <div className="size-3 rounded-sm bg-primary"></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            <div className="grid grid-rows-7 gap-1.5 pt-6">
              {days.map(day => (
                <span key={day} className="text-[10px] font-bold text-muted-foreground h-3 flex items-center">{day}</span>
              ))}
            </div>
            <div className="grid grid-flow-col grid-rows-7 gap-1.5">
              {heatmapData.map((intensity, i) => (
                <div 
                  key={i} 
                  className={`size-3 rounded-sm transition-colors duration-500 ${
                    intensity === 0 ? 'bg-muted/20' : 
                    intensity === 1 ? 'bg-primary/20' : 
                    intensity === 2 ? 'bg-primary/40' : 
                    intensity === 3 ? 'bg-primary/70' : 'bg-primary'
                  }`}
                  title={`Level ${intensity} activity`}
                ></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Per Clinic Usage Table (Requested) */}
      <Card className="shadow-sm border-border/60 overflow-hidden">
        <CardHeader className="bg-muted/10 border-b border-border/60 flex flex-row items-center justify-between py-4">
          <div>
            <CardTitle className="text-lg">Facility Consumption Breakdown</CardTitle>
            <CardDescription>Granular resource usage per clinic</CardDescription>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              placeholder="Search clinics..." 
              className="pl-9 pr-4 py-2 bg-background border border-border/60 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 w-64"
            />
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-border/60">
                <TableHead className="py-4 font-bold text-[10px] uppercase tracking-widest">Clinic Name</TableHead>
                <TableHead className="py-4 font-bold text-[10px] uppercase tracking-widest text-right">Minutes</TableHead>
                <TableHead className="py-4 font-bold text-[10px] uppercase tracking-widest text-right">Credits Used</TableHead>
                <TableHead className="py-4 font-bold text-[10px] uppercase tracking-widest text-right">Storage</TableHead>
                <TableHead className="py-4 font-bold text-[10px] uppercase tracking-widest text-right">Est. Cost</TableHead>
                <TableHead className="py-4 font-bold text-[10px] uppercase tracking-widest text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clinicUsage.map((clinic) => (
                <TableRow key={clinic.id} className="hover:bg-muted/20 border-border/40 transition-colors">
                  <TableCell className="font-bold text-foreground">{clinic.name}</TableCell>
                  <TableCell className="text-right font-mono font-medium">{clinic.minutes}</TableCell>
                  <TableCell className="text-right font-mono font-medium text-yellow-600">{clinic.credits}</TableCell>
                  <TableCell className="text-right font-mono font-medium text-muted-foreground">{clinic.storage}</TableCell>
                  <TableCell className="text-right font-black text-foreground">{clinic.cost}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="sm" mode="icon" className="h-8 w-8 rounded-full">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Expense & Income Summary (Requested) */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-sm border-border/60">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-destructive" />
              Expense Breakdown
            </CardTitle>
            <CardDescription>Primary infrastructure and AI costs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Vapi API Usage</span>
                <span className="font-bold">$1,240.50</span>
              </div>
              <Progress value={75} className="h-1.5 bg-destructive/10" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">ElevenLabs Voice</span>
                <span className="font-bold">$280.20</span>
              </div>
              <Progress value={15} className="h-1.5 bg-destructive/10" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Supabase Storage</span>
                <span className="font-bold">$157.50</span>
              </div>
              <Progress value={10} className="h-1.5 bg-destructive/10" />
            </div>
            <div className="pt-4 border-t border-border mt-6 flex justify-between items-center">
              <span className="text-sm font-black uppercase tracking-tighter">Total Incurred Expense</span>
              <span className="text-xl font-black text-destructive">$1,678.20</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/60 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <DollarSign className="h-32 w-32" />
          </div>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ArrowUpRight className="h-5 w-5 text-green-600" />
              Profitability Audit
            </CardTitle>
            <CardDescription>Net gain after client billing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 rounded-xl">
                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Total Billed</p>
                 <p className="text-2xl font-black text-foreground">$5,400.00</p>
              </div>
              <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
                 <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Net Margin</p>
                 <p className="text-2xl font-black text-green-600">$3,721.80</p>
              </div>
            </div>
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-3">
               <div className="flex justify-between items-center">
                  <span className="text-sm font-bold flex items-center gap-2"><Zap className="h-4 w-4 text-brand" /> ROI Indicator</span>
                  <Badge variant="success" appearance="light">+221%</Badge>
               </div>
               <p className="text-xs text-muted-foreground leading-relaxed">
                  Your current profit margin is optimized. For every $1 spent on infrastructure, you are generating ~$2.21 in net profit.
               </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
