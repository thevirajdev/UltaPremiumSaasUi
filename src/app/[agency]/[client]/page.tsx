"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card-2";
import { 
  Users, 
  Calendar, 
  Activity, 
  ArrowUpRight, 
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Zap,
  Database,
  HardDrive,
  Download,
  Filter,
  Play,
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge-2";
import { ChartConfig } from "@/components/ui/line-charts-4";
import { 
  CartesianGrid, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  Legend,
  Area,
  AreaChart,
  Bar,
  BarChart
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button-2";
import { toast } from "sonner";

// Mock Data for Graphs
const consumptionTrendData = [
  { day: 'Mon', credits: 450, storage: 1.2 },
  { day: 'Tue', credits: 520, storage: 1.25 },
  { day: 'Wed', credits: 480, storage: 1.3 },
  { day: 'Thu', credits: 610, storage: 1.45 },
  { day: 'Fri', credits: 580, storage: 1.5 },
  { day: 'Sat', credits: 320, storage: 1.52 },
  { day: 'Sun', credits: 280, storage: 1.55 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-popover p-3 shadow-lg shadow-black/5 min-w-[120px]">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <span className="text-xs font-medium text-muted-foreground">{entry.name}:</span>
              <span className="text-xs font-black text-foreground">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function ClientDashboardPage() {
  const params = useParams();
  const agency = params.agency as string;
  const client = params.client as string;

  const router = useRouter();
  const [selectedApp, setSelectedApp] = React.useState<any>(null);

  const baseHref = `/${agency}/${client}`;

  const handleRowClick = (path: string) => {
    router.push(`${baseHref}${path}`);
  };

  return (
    <div className="space-y-8 pb-12">
      {selectedApp && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedApp(null)} />
          <Card className="w-full max-w-2xl relative z-10 shadow-2xl rounded-3xl overflow-hidden border-none animate-in zoom-in-95 duration-200">
            <CardHeader className="bg-primary/5 border-b border-primary/10 p-6 flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary"><Calendar className="h-6 w-6" /></div>
                <div>
                  <CardTitle className="text-xl font-black uppercase tracking-tighter">Appointment: {selectedApp.name}</CardTitle>
                  <CardDescription className="font-bold text-[10px] uppercase">Ref: APPT-{Math.random().toString(36).substr(2, 9).toUpperCase()}</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setSelectedApp(null)}>
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-muted/30 rounded-2xl border border-border/40">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Service</p>
                  <p className="text-sm font-black">{selectedApp.service}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-2xl border border-border/40">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Time</p>
                  <p className="text-sm font-black font-mono">{selectedApp.time || selectedApp.requestedTime}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Clock className="h-4 w-4" />
                  <h4 className="font-black text-[10px] uppercase tracking-widest">Medical History & Notes</h4>
                </div>
                <div className="p-6 bg-primary/[0.03] border border-primary/10 rounded-2xl">
                   <p className="text-sm text-foreground leading-relaxed">
                     Patient has a history of routine cleanings every 6 months. This appointment is for a regular scaling and checkup. Assistant noted that the patient was very satisfied with the previous doctor.
                   </p>
                </div>
              </div>

              <div className="flex gap-4">
                 <Button className="flex-1 h-12 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-primary/20" onClick={() => { toast.success("Appointment Confirmed"); setSelectedApp(null); }}>Confirm</Button>
                 <Button variant="outline" className="flex-1 h-12 rounded-xl font-black uppercase tracking-widest border-border/60" onClick={() => { toast.info("Reschedule Flow Initiated"); setSelectedApp(null); }}>Reschedule</Button>
                 <Button variant="destructive" appearance="light" className="flex-1 h-12 rounded-xl font-black uppercase tracking-widest" onClick={() => { toast.error("Appointment Cancelled"); setSelectedApp(null); }}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground lowercase first-letter:uppercase">
          {client} Operational Analytics
        </h1>
        <p className="text-muted-foreground font-medium">
          Monitor your agency's AI Assistant resource consumption and throughput.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm border-border/60 hover:border-primary/30 transition-all cursor-pointer" onClick={() => toast.info("View Call Logs")}>
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Activity className="h-5 w-5" />
              </div>
              <Badge variant="success" appearance="light" size="xs">+15%</Badge>
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Total Calls Handled</p>
              <p className="text-3xl font-black text-foreground">64</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/60 hover:border-green-500/30 transition-all cursor-pointer" onClick={() => toast.info("View Appointments")}>
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-green-500/10 rounded-lg text-green-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <Badge variant="info" appearance="light" size="xs">92% rate</Badge>
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Appointments Secured</p>
              <p className="text-3xl font-black text-foreground">18</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/60 hover:border-amber-500/30 transition-all cursor-pointer" onClick={() => toast.info("View Credits")}>
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-600">
                <Zap className="h-5 w-5" />
              </div>
              <Badge variant="primary" appearance="light" size="xs">Top-up</Badge>
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">AI Assistant Credits</p>
              <p className="text-3xl font-black text-foreground">142,500</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/60 hover:border-blue-500/30 transition-all cursor-pointer" onClick={() => toast.info("View Storage")}>
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600">
                <HardDrive className="h-5 w-5" />
              </div>
              <Badge variant="warning" appearance="light" size="xs">71% Full</Badge>
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Storage Used</p>
              <p className="text-3xl font-black text-foreground">1.42 TB</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphs Section */}
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="shadow-sm border-border/60">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2 italic">
                <Zap className="h-5 w-5 text-amber-500" />
                Credit Consumption Trend
              </CardTitle>
              <CardDescription>AI Credits consumed by assistants for patient interactions.</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => toast.info("Downloading Credit Report")}>
               <Download className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={consumptionTrendData}>
                <defs>
                  <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: 'hsl(var(--foreground) / 0.6)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: 'hsl(var(--foreground) / 0.6)' }} dx={-10} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="credits" stroke="#F59E0B" fillOpacity={1} fill="url(#colorCredits)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/60">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2 italic">
                <Database className="h-5 w-5 text-blue-500" />
                Storage Accumulation
              </CardTitle>
              <CardDescription>Knowledge base and recording data growth (TB).</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => toast.info("Downloading Storage Audit")}>
               <Download className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={consumptionTrendData}>
                <defs>
                  <linearGradient id="colorStorage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: 'hsl(var(--foreground) / 0.6)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: 'hsl(var(--foreground) / 0.6)' }} dx={-10} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="storage" stroke="#3B82F6" fillOpacity={1} fill="url(#colorStorage)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/60 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2 italic">
                <TrendingUp className="h-5 w-5 text-indigo-500" />
                Conversion Efficiency
              </CardTitle>
              <CardDescription>Comparison of total calls vs appointments secured across the network.</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl border-border/50" onClick={() => toast.info("Filtering analytics...")}>
              <Filter className="h-3 w-3 mr-2" /> All Time
            </Button>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={consumptionTrendData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: 'hsl(var(--foreground) / 0.6)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: 'hsl(var(--foreground) / 0.6)' }} dx={-10} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--muted)', opacity: 0.1 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 10, fontWeight: 'bold', paddingTop: 20 }} />
                <Bar name="Total Interactions" dataKey="credits" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar name="Successful Bookings" dataKey="storage" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tables Section */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Interactions */}
        <Card className="shadow-sm border-border/60 overflow-hidden">
          <CardHeader className="pb-4 bg-muted/20">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent AI Interactions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-border/60">
                  <TableHead className="py-3 font-bold text-[10px] uppercase tracking-widest">Patient</TableHead>
                  <TableHead className="py-3 font-bold text-[10px] uppercase tracking-widest">Goal</TableHead>
                  <TableHead className="py-3 font-bold text-[10px] uppercase tracking-widest text-right">Credits</TableHead>
                  <TableHead className="py-3 font-bold text-[10px] uppercase tracking-widest text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { name: "John Doe", type: "Booking", credits: "450", status: "Success" },
                  { name: "Mary Smith", type: "Follow-up", credits: "120", status: "Neutral" },
                  { name: "Robert King", type: "Urgent", credits: "850", status: "Success" },
                ].map((call, i) => (
                  <TableRow 
                    key={i} 
                    className="border-border/40 hover:bg-muted/10 transition-colors cursor-pointer select-none"
                    onClick={() => toast.info(`Viewing interaction details for ${call.name}`)}
                  >
                    <TableCell className="text-xs font-bold">{call.name}</TableCell>
                    <TableCell className="text-[10px] font-medium text-muted-foreground uppercase">{call.type}</TableCell>
                    <TableCell className="text-right text-xs font-mono font-black">{call.credits}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={call.status === 'Success' ? 'success' : 'info'} appearance="light" size="xs">
                        {call.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Appointments */}
        <Card className="shadow-sm border-border/60 overflow-hidden">
          <CardHeader className="pb-4 bg-muted/20">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              Secured Appointments
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-border/60">
                  <TableHead className="py-3 font-bold text-[10px] uppercase tracking-widest">Patient</TableHead>
                  <TableHead className="py-3 font-bold text-[10px] uppercase tracking-widest">Service</TableHead>
                  <TableHead className="py-3 font-bold text-[10px] uppercase tracking-widest text-right">Time</TableHead>
                  <TableHead className="py-3 font-bold text-[10px] uppercase tracking-widest text-center">Outcome</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { name: "Alice Brown", service: "Checkup", time: "10:30 AM", outcome: "Confirmed" },
                  { name: "Steve Ross", service: "Surgery", time: "11:45 AM", outcome: "Confirmed" },
                  { name: "Emma Wilson", service: "Consult", time: "01:15 PM", outcome: "Rescheduled" },
                ].map((app, i) => (
                  <TableRow 
                    key={i} 
                    className="border-border/40 hover:bg-muted/10 transition-colors cursor-pointer select-none"
                    onClick={() => setSelectedApp(app)}
                  >
                    <TableCell className="text-xs font-bold">{app.name}</TableCell>
                    <TableCell className="text-[10px] font-medium text-muted-foreground uppercase">{app.service}</TableCell>
                    <TableCell className="text-right text-xs font-mono">{app.time}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={app.outcome === 'Confirmed' ? 'primary' : 'warning'} appearance="light" size="xs">
                        {app.outcome}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pending Actions */}
        <Card className="shadow-sm border-border/60 lg:col-span-2 overflow-hidden">
          <CardHeader className="pb-4 flex flex-row items-center justify-between bg-amber-500/5">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Resource Exceptions & Pending Actions
              </CardTitle>
              <CardDescription>Waitlist and high-consumption interaction follow-ups.</CardDescription>
            </div>
            <Badge variant="warning" appearance="light" className="font-black">5 ACTION ITEMS</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-border/60">
                  <TableHead className="py-4 font-bold text-[10px] uppercase tracking-widest">Patient Name</TableHead>
                  <TableHead className="py-4 font-bold text-[10px] uppercase tracking-widest">Requirement</TableHead>
                  <TableHead className="py-4 font-bold text-[10px] uppercase tracking-widest text-right">Requested Time</TableHead>
                  <TableHead className="py-4 font-bold text-[10px] uppercase tracking-widest text-center">Priority</TableHead>
                  <TableHead className="py-4 font-bold text-[10px] uppercase tracking-widest text-right px-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { name: "George Miller", service: "Emergency Dental", time: "3:30 PM", urgency: "High" },
                  { name: "Susan Lee", service: "Regular Scaling", time: "4:00 PM", urgency: "Low" },
                  { name: "Tom Hardy", service: "Ortho Consult", time: "4:30 PM", urgency: "Medium" },
                ].map((app, i) => (
                  <TableRow 
                    key={i} 
                    className="border-border/40 hover:bg-muted/10 transition-colors cursor-pointer select-none"
                    onClick={() => setSelectedApp(app)}
                  >
                    <TableCell className="font-bold text-sm text-foreground">{app.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground font-medium">{app.service}</TableCell>
                    <TableCell className="text-right text-xs font-mono font-bold">{app.time}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={app.urgency === 'High' ? 'destructive' : app.urgency === 'Medium' ? 'warning' : 'primary'} appearance="light" size="xs">
                        {app.urgency}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-6">
                       <div className="flex justify-end gap-2">
                          <Badge 
                            variant="success" 
                            appearance="light" 
                            className="cursor-pointer hover:opacity-80"
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.success("Action: Confirmed");
                            }}
                          >Confirm</Badge>
                          <Badge 
                            variant="secondary" 
                            appearance="light" 
                            className="cursor-pointer hover:opacity-80"
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.info("Action: Reschedule Flow");
                            }}
                          >Reschedule</Badge>
                          <Badge 
                            variant="destructive" 
                            appearance="light" 
                            className="cursor-pointer hover:opacity-80"
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.error("Action: Cancelled");
                            }}
                          >Cancel</Badge>
                       </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
