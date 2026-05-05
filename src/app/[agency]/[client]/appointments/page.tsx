"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card-2";
import { 
  Calendar, 
  Search, 
  Filter, 
  Plus, 
  Clock, 
  User, 
  CheckCircle2, 
  XCircle, 
  RefreshCcw, 
  MoreVertical,
  X,
  FileText,
  Phone,
  Video,
  MapPin,
  Stethoscope,
  Info,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button-2";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge-2";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar-2";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

// Mock Data for Appointments
const mockAppointments = [
  {
    id: "app-1",
    patient: { name: "Alice Brown", dob: "15/08/1990", mobile: "+1 444 555 6666" },
    service: "Dental Cleaning",
    provider: "Dr. Sarah Chen",
    time: "10:30 AM",
    date: "05/10/2024",
    status: "Upcoming",
    cost: "$120",
    notes: "Patient requested morning slot. No known allergies.",
    history: [
       { event: "Booked via AI", time: "05/04 09:15 AM" }
    ]
  },
  {
    id: "app-2",
    patient: { name: "Steve Ross", dob: "02/02/1975", mobile: "+1 222 333 4444" },
    service: "Root Canal",
    provider: "Dr. James Wilson",
    time: "02:00 PM",
    date: "05/10/2024",
    status: "Upcoming",
    cost: "$850",
    notes: "Emergency pain management. Urgent case.",
    history: [
       { event: "Booked via AI", time: "05/04 10:30 AM" }
    ]
  },
  {
    id: "app-3",
    patient: { name: "John Doe", dob: "12/05/1985", mobile: "+1 234 567 8901" },
    service: "Consultation",
    provider: "Dr. Sarah Chen",
    time: "11:45 AM",
    date: "05/03/2024",
    status: "Completed",
    outcome: "Success",
    result: "Follow-up required in 2 weeks for scaling.",
    cost: "$50",
    history: [
       { event: "Completed", time: "05/03 12:30 PM" }
    ]
  },
  {
    id: "app-4",
    patient: { name: "Mary Smith", dob: "22/11/1992", mobile: "+1 987 654 3210" },
    service: "Extraction",
    provider: "Dr. James Wilson",
    time: "03:15 PM",
    date: "05/02/2024",
    status: "Canceled",
    reason: "Patient illness",
    cost: "$0",
    history: [
       { event: "Canceled by Patient", time: "05/02 09:00 AM" }
    ]
  },
  {
    id: "app-5",
    patient: { name: "Robert King", dob: "05/01/1970", mobile: "+1 555 019 9988" },
    service: "Checkup",
    provider: "Dr. Sarah Chen",
    time: "09:00 AM",
    date: "05/05/2024",
    status: "Rescheduled",
    originalTime: "05/01 @ 10:00 AM",
    reason: "Work conflict",
    cost: "$45",
    history: [
       { event: "Rescheduled via AI", time: "04/30 04:00 PM" }
    ]
  }
];

export default function ClientAppointmentsPage() {
  const [selectedApp, setSelectedApp] = useState<typeof mockAppointments[0] | null>(null);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showAddModal, setShowAddModal] = useState(false);

  const filterByStatus = (status: string) => mockAppointments.filter(app => app.status === status);

  return (
    <div className="relative flex h-[calc(100vh-140px)] overflow-hidden">
      {/* Main Appointment Section */}
      <div className={`flex-1 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar transition-all duration-300 ${selectedApp ? 'mr-[450px]' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground font-sans">Appointments</h1>
            <p className="text-muted-foreground font-medium">
              Schedule, track, and manage all patient bookings.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="h-10 w-10 border-border/60">
              <Filter className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button className="h-10 gap-2 font-bold px-6 shadow-lg shadow-primary/20" onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4" />
              New Appointment
            </Button>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="w-full flex flex-col gap-6" onValueChange={setActiveTab}>
          <TabsList className="bg-muted/30 p-1 w-fit h-11 border border-border/40 rounded-xl">
            <TabsTrigger value="upcoming" className="px-6 h-9 rounded-lg font-bold data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="Completed" className="px-6 h-9 rounded-lg font-bold data-[state=active]:bg-background data-[state=active]:text-green-600 data-[state=active]:shadow-sm">
              Completed
            </TabsTrigger>
            <TabsTrigger value="Rescheduled" className="px-6 h-9 rounded-lg font-bold data-[state=active]:bg-background data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm">
              Rescheduled
            </TabsTrigger>
            <TabsTrigger value="Canceled" className="px-6 h-9 rounded-lg font-bold data-[state=active]:bg-background data-[state=active]:text-red-600 data-[state=active]:shadow-sm">
              Canceled
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <Card className="shadow-none border-border/60 overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow className="border-border/60 hover:bg-transparent">
                    <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest pl-6">Patient</TableHead>
                    <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest">Service & Provider</TableHead>
                    <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest">Scheduled Time</TableHead>
                    {activeTab === 'Completed' && <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest">Outcome</TableHead>}
                    {(activeTab === 'Canceled' || activeTab === 'Rescheduled') && <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest">Reason</TableHead>}
                    <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filterByStatus(activeTab).map((app) => (
                    <TableRow 
                      key={app.id} 
                      className={`border-border/40 hover:bg-primary/[0.03] transition-colors cursor-pointer select-none ${selectedApp?.id === app.id ? 'bg-primary/[0.05]' : ''}`}
                      onDoubleClick={() => setSelectedApp(app)}
                    >
                      <TableCell className="py-4 pl-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 border border-border/60">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${app.patient.name}`} />
                            <AvatarFallback>{app.patient.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-bold text-sm text-foreground">{app.patient.name}</span>
                            <span className="text-[10px] text-muted-foreground font-medium">{app.patient.mobile}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-xs">{app.service}</span>
                          <span className="text-[10px] text-muted-foreground font-medium italic">{app.provider}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold">{app.date}</span>
                          <span className="text-[10px] text-muted-foreground font-mono">{app.time}</span>
                        </div>
                      </TableCell>
                      
                      {activeTab === 'Completed' && (
                        <TableCell className="py-4">
                          <Badge variant="success" appearance="light" size="xs" className="font-bold">{app.outcome}</Badge>
                        </TableCell>
                      )}

                      {(activeTab === 'Canceled' || activeTab === 'Rescheduled') && (
                        <TableCell className="py-4">
                          <span className="text-xs font-medium text-muted-foreground">{app.reason || 'N/A'}</span>
                        </TableCell>
                      )}

                      <TableCell className="py-4 text-center">
                        <Badge 
                          variant={
                            app.status === 'Upcoming' ? 'primary' : 
                            app.status === 'Completed' ? 'success' : 
                            app.status === 'Canceled' ? 'destructive' : 'secondary'
                          } 
                          appearance="light" 
                          size="xs"
                        >
                          {app.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Appointment Detail Drawer (Double Click) */}
      {selectedApp && (
        <div className="fixed top-[140px] right-8 bottom-8 w-[420px] bg-card border border-border/80 shadow-2xl rounded-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
          <div className="p-6 border-b border-border/60 flex items-center justify-between bg-muted/10 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><Calendar className="h-5 w-5 text-primary" /></div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-tighter">Booking Details</h3>
                <p className="text-[10px] text-muted-foreground font-bold">Ref: {selectedApp.id}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setSelectedApp(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            {/* Patient Quick Card */}
            <section className="p-4 bg-muted/30 border border-border/40 rounded-2xl flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedApp.patient.name}`} />
                <AvatarFallback>{selectedApp.patient.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-black text-sm text-foreground">{selectedApp.patient.name}</h4>
                <div className="flex items-center gap-3 mt-1">
                   <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold">
                      <Phone className="h-3 w-3" />
                      {selectedApp.patient.mobile}
                   </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-background border border-border/40" onClick={() => toast.info('Profile Link', { description: `Navigating to ${selectedApp.patient.name}'s medical records...` })}>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </section>

            {/* Service Intelligence */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Stethoscope className="h-4 w-4" />
                <h4 className="font-black text-[10px] uppercase tracking-widest">Medical Context</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-border/60 rounded-2xl">
                   <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Service Type</p>
                   <p className="text-xs font-black">{selectedApp.service}</p>
                </div>
                <div className="p-4 border border-border/60 rounded-2xl">
                   <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Fee Billed</p>
                   <p className="text-xs font-black text-green-600 font-mono">{selectedApp.cost}</p>
                </div>
              </div>
              <div className="p-4 bg-primary/[0.03] border border-primary/10 rounded-2xl">
                 <div className="flex items-center gap-2 mb-2 text-[10px] font-black text-primary uppercase">
                    <Info className="h-3 w-3" />
                    Assistant Notes
                 </div>
                 <p className="text-xs text-foreground italic leading-relaxed">
                   "{selectedApp.notes}"
                 </p>
              </div>
            </section>

            {/* Audit Timeline */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-600">
                <RefreshCcw className="h-4 w-4" />
                <h4 className="font-black text-[10px] uppercase tracking-widest">Audit History</h4>
              </div>
              <div className="space-y-4 relative pl-4 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-border/60">
                 {selectedApp.history.map((item, idx) => (
                   <div key={idx} className="relative flex items-center gap-4">
                      <div className="absolute left-[-21px] size-3 rounded-full bg-background border-2 border-indigo-500 z-10"></div>
                      <div className="flex-1 p-3 bg-muted/20 border border-border/40 rounded-xl">
                         <p className="text-xs font-bold text-foreground">{item.event}</p>
                         <p className="text-[10px] text-muted-foreground">{item.time}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </section>

            {/* Status Specific Info */}
            {selectedApp.status === 'Completed' && (
              <section className="p-4 bg-green-500/5 border border-green-500/20 rounded-2xl space-y-2">
                 <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Outcome Summary</p>
                 <p className="text-xs font-bold text-foreground leading-relaxed">{selectedApp.result}</p>
              </section>
            )}

            {selectedApp.status === 'Rescheduled' && (
              <section className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl space-y-2">
                 <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Reschedule Data</p>
                 <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-muted-foreground">Original:</span>
                    <span className="line-through">{selectedApp.originalTime}</span>
                 </div>
              </section>
            )}
          </div>

          <div className="p-6 border-t border-border/60 flex gap-3 bg-muted/5 rounded-b-2xl">
            <Button variant="outline" className="flex-1 gap-2 border-border/60 font-bold" onClick={() => toast.info('Rescheduling', { description: 'Opening calendar to select a new appointment slot...' })}>
              <RefreshCcw className="h-4 w-4" />
              Reschedule
            </Button>
            <Button variant="destructive" appearance="light" className="flex-1 gap-2 font-bold" onClick={() => toast.error('Confirm Cancellation', { description: 'Are you sure you want to remove this booking from the schedule?' })}>
              <XCircle className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      )}
      {/* New Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Card className="w-full max-w-lg shadow-2xl border-border/60 animate-in zoom-in-95 duration-200">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 pb-4">
              <div>
                <CardTitle className="text-xl font-black">Schedule Appointment</CardTitle>
                <CardDescription>Fill in the details to book a new slot.</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowAddModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Patient Name</label>
                  <Input placeholder="Search or enter patient name..." className="h-11 bg-muted/20 border-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Mobile Number</label>
                  <Input placeholder="+1..." className="h-11 bg-muted/20 border-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Date of Birth</label>
                  <Input type="date" className="h-11 bg-muted/20 border-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Service</label>
                  <select className="w-full h-11 bg-muted/20 border-none rounded-md px-3 text-sm font-medium focus:ring-2 focus:ring-primary outline-none">
                    <option>Consultation</option>
                    <option>Dental Cleaning</option>
                    <option>Root Canal</option>
                    <option>Extraction</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Provider</label>
                  <select className="w-full h-11 bg-muted/20 border-none rounded-md px-3 text-sm font-medium focus:ring-2 focus:ring-primary outline-none">
                    <option>Dr. Sarah Chen</option>
                    <option>Dr. James Wilson</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Appt. Date</label>
                  <Input type="date" className="h-11 bg-muted/20 border-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Appt. Time</label>
                  <Input type="time" className="h-11 bg-muted/20 border-none" />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <Button variant="outline" className="flex-1 h-11 font-bold border-border/60" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button className="flex-1 h-11 font-bold shadow-lg shadow-primary/20" onClick={() => { toast.success('Booking Confirmed', { description: 'Appointment has been successfully scheduled.' }); setShowAddModal(false); }}>Create Booking</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
