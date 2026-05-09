"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  HardDrive,
  Database,
  Download,
  Filter,
  Plus,
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge-2";
import { storage } from "@/lib/storage";
import { useState, useEffect } from "react";
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
import { usePatients, useAppointments, useCalls, useClinics } from "@/hooks/use-local-data";

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

  const { data: clinics } = useClinics();
  const currentClinic = useMemo(() => 
    clinics.find(c => c.name.toLowerCase().replace(/\s+/g, '-') === client),
    [clinics, client]
  );

  const { data: allPatients, add: addPatient } = usePatients();
  const { data: allAppointments, add: addAppointment } = useAppointments();
  const { data: allCalls, add: addCall } = useCalls();

  const [selectedApp, setSelectedApp] = React.useState<any>(null);

  const appointments = useMemo(() => 
    allAppointments.filter(a => a.clinicId === currentClinic?.id),
    [allAppointments, currentClinic]
  );
  
  const calls = useMemo(() => 
    allCalls.filter(c => c.clinicId === currentClinic?.id),
    [allCalls, currentClinic]
  );

  const stats = useMemo(() => {
    const totalCalls = calls.length;
    const securedAppts = appointments.filter(a => a.status === "Completed" || a.status === "Upcoming").length;
    const totalCredits = calls.reduce((acc, c) => acc + (c.credits || 0), 0);
    const storageUsed = (calls.length * 0.01).toFixed(2); 

    return {
      totalCalls,
      securedAppts,
      totalCredits,
      storageUsed,
      conversionRate: totalCalls > 0 ? ((securedAppts / totalCalls) * 100).toFixed(0) : 0
    };
  }, [calls, appointments]);

  const consumptionTrendData = useMemo(() => {
    if (calls.length === 0) return [];
    return [
      { day: 'Start', credits: 0, storage: 0 },
      { day: 'Now', credits: stats.totalCredits, storage: parseFloat(stats.storageUsed) },
    ];
  }, [calls, stats]);

  const handleSimulateCall = () => {
    if (!currentClinic) {
      storage.simulateDemoData();
      return;
    }
    const names = ["George Miller", "Susan Lee", "Tom Hardy", "Alice Brown", "Steve Ross", "Emma Wilson"];
    const goals = ["BOOKING", "FOLLOW-UP", "URGENT", "INQUIRY", "EMERGENCY"];
    const durations = ["2:45", "3:12", "1:50", "4:20", "5:10"];
    
    const name = names[Math.floor(Math.random() * names.length)];
    const goal = goals[Math.floor(Math.random() * goals.length)];
    const duration = durations[Math.floor(Math.random() * durations.length)];
    
    addCall({
      id: Math.random().toString(36).substring(7),
      clinicId: currentClinic.id,
      patientName: name,
      patientPhone: `+1 ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      type: goal as any,
      duration: duration,
      reason: goal,
      action: "Resolved",
      credits: Math.floor(Math.random() * 800) + 100,
      status: "Completed",
      timestamp: "Just now",
      createdAt: new Date().toISOString()
    });
    toast.success(`AI Interaction simulated for ${name}`);
  };

  const handleSimulateAppointment = () => {
    if (!currentClinic) {
      storage.simulateDemoData();
      return;
    }
    const services = ["Dental Checkup", "General Consultation", "Follow-up", "Urgent Care"];
    const service = services[Math.floor(Math.random() * services.length)];
    addAppointment({
      id: Math.random().toString(36).substring(7),
      clinicId: currentClinic.id,
      patientName: "New Patient",
      patientPhone: "+1 987 654 321",
      service: service,
      time: "10:30 AM",
      status: "Upcoming",
      createdAt: new Date().toISOString()
    });
    toast.success("Appointment secured!");
  };

  return (
    <div className="space-y-8 pb-12">
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
              onClick={() => setSelectedApp(null)} 
            />
            <Card className="w-full max-w-2xl relative z-10 shadow-2xl rounded-3xl overflow-hidden border-none animate-in zoom-in-95 duration-200">
              <CardHeader className="bg-primary/5 border-b border-primary/10 p-6 flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-2xl text-primary"><Calendar className="h-6 w-6" /></div>
                  <div>
                    <CardTitle className="text-xl font-black uppercase tracking-tighter">Appointment: {selectedApp.patientName}</CardTitle>
                    <CardDescription className="font-bold text-[10px] uppercase">Ref: APPT-{selectedApp.id.toUpperCase()}</CardDescription>
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
                    <p className="text-sm font-black font-mono">{selectedApp.time}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Clock className="h-4 w-4" />
                    <h4 className="font-black text-[10px] uppercase tracking-widest">Medical History & Notes</h4>
                  </div>
                  <div className="p-6 bg-primary/[0.03] border border-primary/10 rounded-2xl">
                     <p className="text-sm text-foreground leading-relaxed">
                       Patient has a history of routine cleanings every 6 months. This appointment is for a regular scaling and checkup. Assistant noted that the patient was very satisfied with the previous interaction.
                     </p>
                  </div>
                </div>

                <div className="flex gap-4">
                   <Button className="flex-1 h-12 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-primary/20" onClick={() => { toast.success("Appointment Confirmed"); setSelectedApp(null); }}>Confirm</Button>
                   <Button variant="outline" className="flex-1 h-12 rounded-xl font-black uppercase tracking-widest border-border/60" onClick={() => { toast.info("Reschedule Flow Initiated"); setSelectedApp(null); }}>Reschedule</Button>
                   <Button variant="destructive" className="flex-1 h-12 rounded-xl font-black uppercase tracking-widest" onClick={() => { toast.error("Appointment Cancelled"); setSelectedApp(null); }}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground lowercase first-letter:uppercase">
            {client.replace(/-/g, ' ')} Operational Analytics
          </h1>
          <p className="text-muted-foreground font-medium">
            Monitor your clinic's AI Assistant resource consumption and throughput.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSimulateCall} className="gap-2 h-11 px-6 rounded-xl font-bold border-primary/20 hover:bg-primary/5 text-primary">
            <Zap className="h-4 w-4" /> Simulate AI Interaction
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm border-border/60 hover:border-primary/30 transition-all cursor-pointer" onClick={() => toast.info("View Call Logs")}>
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Activity className="h-5 w-5" />
              </div>
              <Badge variant="success" appearance="light" size="xs">Live</Badge>
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Total Calls Handled</p>
              <p className="text-3xl font-black text-foreground">{stats.totalCalls}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/60 hover:border-green-500/30 transition-all cursor-pointer" onClick={() => toast.info("View Appointments")}>
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-green-500/10 rounded-lg text-green-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <Badge variant="info" appearance="light" size="xs">{stats.conversionRate}% rate</Badge>
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Appointments Secured</p>
              <p className="text-3xl font-black text-foreground">{stats.securedAppts}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/60 hover:border-amber-500/30 transition-all cursor-pointer" onClick={() => toast.info("View Credits")}>
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-600">
                <Zap className="h-5 w-5" />
              </div>
              <Badge variant="warning" appearance="light" size="xs">Actual</Badge>
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">AI Credits Used</p>
              <p className="text-3xl font-black text-foreground">{stats.totalCredits.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/60 hover:border-blue-500/30 transition-all cursor-pointer" onClick={() => toast.info("View Storage")}>
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600">
                <HardDrive className="h-5 w-5" />
              </div>
              <Badge variant="secondary" appearance="light" size="xs">Synced</Badge>
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Storage Consumption</p>
              <p className="text-3xl font-black text-foreground">{stats.storageUsed} <span className="text-sm text-muted-foreground">GB</span></p>
            </div>
          </CardContent>
        </Card>
      </div>

      {calls.length === 0 && appointments.length === 0 ? (
        <Card className="p-20 flex flex-col items-center justify-center text-center bg-muted/10 border-dashed border-2">
           <Zap className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
           <h3 className="text-xl font-bold">Waiting for AI Activity</h3>
           <p className="text-muted-foreground max-w-sm mt-2 mb-8">
             Once your AI Assistant starts handling calls and booking appointments, real-time analytics will appear here.
           </p>
           <Button 
             onClick={() => storage.simulateDemoData()}
             className="h-12 px-8 rounded-xl font-bold shadow-lg shadow-primary/20 gap-2"
           >
             <RefreshCw className="h-4 w-4" /> Simulate Initial Activity
           </Button>
        </Card>
      ) : (
        <>
          {/* Main Analytics Graph */}
          <Card className="shadow-sm border-border/60 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2 italic">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Conversion Efficiency
                </CardTitle>
                <CardDescription>Comparison of total calls vs appointments secured across the network.</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                 <Button variant="outline" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest rounded-lg">
                   <Filter className="h-3 w-3 mr-2" /> All Time
                 </Button>
              </div>
            </CardHeader>
            <CardContent className="h-[350px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { day: "Mon", calls: 450, appts: 120 },
                  { day: "Tue", calls: 520, appts: 150 },
                  { day: "Wed", calls: 480, appts: 130 },
                  { day: "Thu", calls: 610, appts: 190 },
                  { day: "Fri", calls: 580, appts: 170 },
                  { day: "Sat", calls: 320, appts: 90 },
                  { day: "Sun", calls: 280, appts: 70 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: 'hsl(var(--foreground) / 0.6)' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: 'hsl(var(--foreground) / 0.6)' }} dx={-10} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--primary) / 0.05)' }} />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }} />
                  <Bar dataKey="appts" name="Successful Bookings" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="calls" name="Total Interactions" fill="hsl(var(--foreground) / 0.1)" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

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
                <Button variant="ghost" size="icon">
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
                <Button variant="ghost" size="icon">
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
                    {calls.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground text-xs italic">No recent interactions</TableCell>
                      </TableRow>
                    ) : (
                      calls.slice(0, 5).map((call, i) => (
                        <TableRow 
                          key={call.id} 
                          className="border-border/40 hover:bg-muted/10 transition-colors cursor-pointer select-none"
                          onClick={() => toast.info(`Viewing interaction details for ${call.patientName}`)}
                        >
                          <TableCell className="text-xs font-bold">{call.patientName}</TableCell>
                          <TableCell className="text-[10px] font-medium text-muted-foreground uppercase">{call.type}</TableCell>
                          <TableCell className="text-right text-xs font-mono font-black">{call.credits}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant={call.status === 'Completed' ? 'success' : 'info'} appearance="light" size="xs">
                              {call.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
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
                    {appointments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground text-xs italic">No secured appointments</TableCell>
                      </TableRow>
                    ) : (
                      appointments.slice(0, 5).map((app, i) => (
                        <TableRow 
                          key={app.id} 
                          className="border-border/40 hover:bg-muted/10 transition-colors cursor-pointer select-none"
                          onClick={() => setSelectedApp(app)}
                        >
                          <TableCell className="text-xs font-bold">{app.patientName}</TableCell>
                          <TableCell className="text-[10px] font-medium text-muted-foreground uppercase">{app.service}</TableCell>
                          <TableCell className="text-right text-xs font-mono">{app.time}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant={app.status === 'Completed' || app.status === 'Upcoming' ? 'primary' : 'warning'} appearance="light" size="xs">
                              {app.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Pending Actions Section */}
          <Card className="shadow-sm border-border/60 overflow-hidden">
            <CardHeader className="pb-4 bg-amber-500/[0.03] border-b border-amber-500/10 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  Resource Exceptions & Pending Actions
                </CardTitle>
                <CardDescription className="text-xs">Waitlist and high-consumption interaction follow-ups.</CardDescription>
              </div>
              <Badge variant="warning" appearance="light" size="sm" className="font-black">5 ACTION ITEMS</Badge>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/20">
                  <TableRow className="border-border/40">
                    <TableHead className="py-3 font-bold text-[10px] uppercase tracking-widest px-6">Patient Name</TableHead>
                    <TableHead className="py-3 font-bold text-[10px] uppercase tracking-widest">Requirement</TableHead>
                    <TableHead className="py-3 font-bold text-[10px] uppercase tracking-widest">Requested Time</TableHead>
                    <TableHead className="py-3 font-bold text-[10px] uppercase tracking-widest">Priority</TableHead>
                    <TableHead className="py-3 font-bold text-[10px] uppercase tracking-widest text-right px-6">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "George Miller", req: "Emergency Dental", time: "3:30 PM", priority: "High" },
                    { name: "Susan Lee", req: "Regular Scaling", time: "4:00 PM", priority: "Low" },
                    { name: "Tom Hardy", req: "Ortho Consult", time: "4:30 PM", priority: "Medium" }
                  ].map((row, i) => (
                    <TableRow key={i} className="border-border/40 hover:bg-muted/5 transition-colors">
                      <TableCell className="text-xs font-black px-6">{row.name}</TableCell>
                      <TableCell className="text-xs text-muted-foreground font-medium">{row.req}</TableCell>
                      <TableCell className="text-xs font-black font-mono">{row.time}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={row.priority === 'High' ? 'destructive' : row.priority === 'Medium' ? 'warning' : 'info'} 
                          appearance="light" 
                          size="xs"
                          className="font-bold min-w-[60px] flex justify-center"
                        >
                          {row.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-6">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost" className="h-8 text-[10px] font-black uppercase text-emerald-600 hover:bg-emerald-50">Confirm</Button>
                          <Button size="sm" variant="ghost" className="h-8 text-[10px] font-black uppercase text-muted-foreground">Reschedule</Button>
                          <Button size="sm" variant="ghost" className="h-8 text-[10px] font-black uppercase text-red-600 hover:bg-red-50">Cancel</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
