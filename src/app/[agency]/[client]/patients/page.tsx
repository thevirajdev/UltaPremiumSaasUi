"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card-2";
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  History, 
  Stethoscope, 
  CheckCircle2, 
  Clock, 
  X,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  FileText,
  Activity,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button-2";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge-2";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar-2";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

// Mock Data for Patients
const mockPatients = [
  {
    id: "pat-1",
    name: "John Doe",
    dob: "12/05/1985",
    mobile: "+1 234 567 8901",
    email: "john.doe@email.com",
    address: "789 Pine St, San Francisco, CA",
    status: "Active",
    lastVisit: "03/15/2024",
    nextAppointment: "05/10/2024 @ 10:00 AM",
    problems: [
      { disease: "Dental Scaling", status: "Completed", date: "03/15/2024", action: "Deep cleaning done" },
      { disease: "Cavity (Lower Left)", status: "Active", date: "04/20/2024", action: "Pending Filling" }
    ],
    callHistory: [
      { type: "Inbound", date: "04/20/2024", duration: "4:32", reason: "Booking follow-up" },
      { type: "Outbound", date: "03/10/2024", duration: "2:15", reason: "Reminded for scaling" }
    ],
    appointmentHistory: [
      { date: "03/15/2024", service: "Scaling", outcome: "Success", action: "Revisit in 6 months" },
      { date: "01/10/2024", service: "Initial Consultation", outcome: "Referred", action: "X-ray required" }
    ]
  },
  {
    id: "pat-2",
    name: "Mary Smith",
    dob: "22/11/1992",
    mobile: "+1 987 654 3210",
    email: "mary.s@email.com",
    address: "456 Oak Ave, Los Angeles, CA",
    status: "New",
    lastVisit: "N/A",
    nextAppointment: "None Scheduled",
    problems: [
      { disease: "Wisdom Tooth Inquiry", status: "Active", date: "04/25/2024", action: "Consultation Scheduled" }
    ],
    callHistory: [
      { type: "Inbound", date: "04/25/2024", duration: "1:15", reason: "Asking for pricing" }
    ],
    appointmentHistory: []
  }
];

export default function ClientPatientsPage() {
  const [selectedPatient, setSelectedPatient] = useState<typeof mockPatients[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredPatients = mockPatients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.mobile.includes(searchQuery)
  );

  return (
    <div className="relative flex h-[calc(100vh-140px)] overflow-hidden">
      {/* Patient List Section */}
      <div className={`flex-1 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar transition-all duration-300 ${selectedPatient ? 'mr-[500px]' : ''}`}>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-sans">Patient Directory</h1>
          <p className="text-muted-foreground font-medium">
            Manage medical records, call histories, and appointment outcomes.
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-6">
           <Card className="shadow-sm border-border/60">
              <CardContent className="p-5 flex items-center justify-between">
                 <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Total Patients</p>
                    <p className="text-2xl font-black text-foreground">1,240</p>
                 </div>
                 <Users className="h-8 w-8 text-primary opacity-20" />
              </CardContent>
           </Card>
           <Card className="shadow-sm border-border/60">
              <CardContent className="p-5 flex items-center justify-between">
                 <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Active Cases</p>
                    <p className="text-2xl font-black text-foreground">84</p>
                 </div>
                 <Activity className="h-8 w-8 text-green-600 opacity-20" />
              </CardContent>
           </Card>
           <Card className="shadow-sm border-border/60">
              <CardContent className="p-5 flex items-center justify-between">
                 <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Retention Rate</p>
                    <p className="text-2xl font-black text-foreground">92%</p>
                 </div>
                 <TrendingUp className="h-8 w-8 text-indigo-600 opacity-20" />
              </CardContent>
           </Card>
        </div>

        {/* Table Toolbar */}
        <div className="flex items-center justify-between gap-4 bg-muted/20 p-2 rounded-xl border border-border/40">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, mobile, or ID..." 
                className="pl-9 bg-background/50 border-none h-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-10 w-10 shrink-0 border-border/60" onClick={() => toast.info('Advanced Filters', { description: 'Opening demographic and history filtering engine...' })}>
              <Filter className="h-4 w-4" />
            </Button>
            <Button className="h-10 gap-2 font-bold px-6 shadow-lg shadow-primary/20" onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4" />
              Add Patient
            </Button>
          </div>
        </div>

        {/* Patient Table */}
        <Card className="shadow-none border-border/60 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest pl-6">Patient Details</TableHead>
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest">Last Visit</TableHead>
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest">Next Appointment</TableHead>
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((p) => (
                <TableRow 
                  key={p.id} 
                  className={`border-border/40 hover:bg-primary/[0.03] transition-colors cursor-pointer select-none ${selectedPatient?.id === p.id ? 'bg-primary/[0.05]' : ''}`}
                  onDoubleClick={() => setSelectedPatient(p)}
                >
                  <TableCell className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-border/60">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}`} />
                        <AvatarFallback>{p.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-foreground">{p.name}</span>
                        <span className="text-[10px] text-muted-foreground font-medium">{p.mobile} • {p.dob}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-xs font-bold text-muted-foreground">{p.lastVisit}</TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-primary" />
                      <span className="text-xs font-bold">{p.nextAppointment}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <Badge variant={p.status === 'Active' ? 'success' : 'primary'} appearance="light" size="xs">
                      {p.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Patient Deep-Dive Drawer (Double Click) */}
      {selectedPatient && (
        <div className="fixed top-[140px] right-8 bottom-8 w-[480px] bg-card border border-border/80 shadow-2xl rounded-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-border/60 flex items-center justify-between bg-muted/10 rounded-t-2xl">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border border-primary/20 shadow-md">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedPatient.name}`} />
                <AvatarFallback>{selectedPatient.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-black text-lg uppercase tracking-tighter">{selectedPatient.name}</h3>
                <p className="text-[10px] text-muted-foreground font-bold italic">Patient ID: {selectedPatient.id}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setSelectedPatient(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="overview" className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="bg-muted/50 p-1 mx-6 mt-4 h-10">
              <TabsTrigger value="overview" className="flex-1 text-xs">Overview</TabsTrigger>
              <TabsTrigger value="history" className="flex-1 text-xs">Medical Hub</TabsTrigger>
              <TabsTrigger value="calls" className="flex-1 text-xs">Communications</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {/* Tab: Overview */}
              <TabsContent value="overview" className="space-y-6 mt-0">
                <section className="space-y-4">
                  <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/40 pb-2">Contact Intelligence</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-sm font-bold">{selectedPatient.mobile}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="text-sm font-bold">{selectedPatient.email}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm font-bold">{selectedPatient.address}</span>
                    </div>
                  </div>
                </section>

                <section className="p-4 bg-primary/5 border border-primary/20 rounded-2xl space-y-2">
                   <div className="flex items-center gap-2 text-primary">
                      <Calendar className="h-4 w-4" />
                      <span className="text-xs font-black uppercase">Upcoming Engagement</span>
                   </div>
                   <p className="text-sm font-black text-foreground">{selectedPatient.nextAppointment}</p>
                   <Button mode="link" className="p-0 h-auto text-xs font-bold text-primary" onClick={() => toast.info('Rescheduling', { description: `Loading calendar for ${selectedPatient.name}...` })}>Reschedule Appointment</Button>
                </section>
              </TabsContent>

              {/* Tab: Medical Hub */}
              <TabsContent value="history" className="space-y-6 mt-0">
                 {/* Problems List */}
                 <section className="space-y-4">
                    <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                       <Stethoscope className="h-4 w-4 text-red-500" />
                       Active Conditions & History
                    </h4>
                    <div className="space-y-3">
                       {selectedPatient.problems.map((prob, i) => (
                         <div key={i} className="p-4 border border-border/60 rounded-2xl space-y-2 hover:border-primary/40 transition-colors">
                            <div className="flex items-center justify-between">
                               <span className="font-black text-sm">{prob.disease}</span>
                               <Badge variant={prob.status === 'Active' ? 'warning' : 'success'} appearance="light" size="xs">
                                  {prob.status}
                               </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground italic">Registered on {prob.date}</p>
                            <p className="text-xs font-bold text-foreground bg-muted/30 p-2 rounded-lg mt-2">Action: {prob.action}</p>
                         </div>
                       ))}
                    </div>
                 </section>

                 {/* Appointment Outcomes */}
                 <section className="space-y-4">
                    <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                       <CheckCircle2 className="h-4 w-4 text-green-600" />
                       Visit Outcomes
                    </h4>
                    <div className="space-y-3">
                       {selectedPatient.appointmentHistory.map((app, i) => (
                         <div key={i} className="p-3 bg-muted/20 border border-border/40 rounded-xl flex items-center justify-between">
                            <div>
                               <p className="text-xs font-black">{app.service}</p>
                               <p className="text-[10px] text-muted-foreground">{app.date}</p>
                            </div>
                            <div className="text-right">
                               <Badge appearance="ghost" size="xs" className="font-bold">{app.outcome}</Badge>
                               <p className="text-[10px] font-bold text-primary mt-1">{app.action}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </section>
              </TabsContent>

              {/* Tab: Communications */}
              <TabsContent value="calls" className="space-y-6 mt-0">
                 <section className="space-y-4">
                    <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                       <History className="h-4 w-4 text-indigo-500" />
                       Call Audit Logs (Inbound/Outbound)
                    </h4>
                    <div className="space-y-3">
                       {selectedPatient.callHistory.map((call, i) => (
                         <div key={i} className="flex items-center justify-between p-4 border border-border/40 rounded-2xl hover:bg-muted/10 transition-colors">
                            <div className="flex items-center gap-3">
                               <div className={`p-2 rounded-lg ${call.type === 'Inbound' ? 'bg-green-500/10 text-green-600' : 'bg-indigo-500/10 text-indigo-600'}`}>
                                  {call.type === 'Inbound' ? <ArrowDownRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                               </div>
                               <div>
                                  <p className="text-xs font-black">{call.reason}</p>
                                  <p className="text-[10px] text-muted-foreground">{call.date} • {call.duration}</p>
                               </div>
                            </div>
                            <Badge variant="secondary" appearance="light" size="xs">{call.type}</Badge>
                         </div>
                       ))}
                    </div>
                 </section>

                 <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl space-y-2">
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Automation Note</p>
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                       Patient preferred outbound follow-ups on weekends. Assistant configured to call for revisit confirmation.
                    </p>
                 </div>
              </TabsContent>
            </div>
          </Tabs>

          {/* Footer Actions */}
          <div className="p-6 border-t border-border/60 flex gap-3 bg-muted/5 rounded-b-2xl">
            <Button className="flex-1 gap-2 shadow-lg shadow-primary/20 font-bold" onClick={() => toast.info('Booking System', { description: `Selecting time slot for ${selectedPatient.name}...` })}>
              <Calendar className="h-4 w-4" />
              Book Appointment
            </Button>
            <Button variant="outline" className="flex-1 gap-2 border-border/60 font-bold" onClick={() => toast.success('Report Generated', { description: `Exporting HIPAA-secure medical file for ${selectedPatient.name}.` })}>
              <FileText className="h-4 w-4" />
              Full Medical File
            </Button>
          </div>
        </div>
      )}
      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Card className="w-full max-w-lg shadow-2xl border-border/60 animate-in zoom-in-95 duration-200">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 pb-4">
              <div>
                <CardTitle className="text-xl font-black">Register New Patient</CardTitle>
                <CardDescription>Enter patient demographics to create a new record.</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowAddModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Full Name</label>
                  <Input placeholder="John Doe..." className="h-11 bg-muted/20 border-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Date of Birth</label>
                  <Input type="date" className="h-11 bg-muted/20 border-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Mobile Number</label>
                  <Input placeholder="+1..." className="h-11 bg-muted/20 border-none" />
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Home Address</label>
                  <Input placeholder="123 Street Name..." className="h-11 bg-muted/20 border-none" />
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email Address</label>
                  <Input type="email" placeholder="patient@email.com" className="h-11 bg-muted/20 border-none" />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <Button variant="outline" className="flex-1 h-11 font-bold border-border/60" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button className="flex-1 h-11 font-bold shadow-lg shadow-primary/20" onClick={() => { toast.success('Patient Registered', { description: 'New medical record created successfully.' }); setShowAddModal(false); }}>Register Patient</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
