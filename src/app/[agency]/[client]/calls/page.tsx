"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card-2";
import { 
  Phone, 
  Search, 
  Filter, 
  Play, 
  FileText, 
  Calendar, 
  User, 
  Clock, 
  X,
  ChevronRight,
  MoreVertical,
  Download,
  AlertCircle,
  CheckCircle2,
  PhoneIncoming,
  PhoneOutgoing,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button-2";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge-2";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar-2";
import { toast } from "sonner";

// Mock Data for Calls
const mockCalls = [
  {
    id: "call-1",
    patient: { name: "John Doe", dob: "12/05/1985", mobile: "+1 234 567 8901", avatar: "" },
    duration: "4:32",
    status: "Completed",
    reason: "Appointment Booking",
    action: "Booked for 05/10 @ 10am",
    type: "Inbound",
    timestamp: "10:30 AM",
    exists: true,
    appointments: [
      { date: "05/10/2024", type: "Checkup", status: "Upcoming" },
      { date: "03/15/2024", type: "Cleaning", status: "Completed" }
    ],
    transcript: "Patient called to schedule a follow-up for dental scaling. He preferred morning slots next week. AI assistant checked the calendar and booked him for May 10th at 10:00 AM."
  },
  {
    id: "call-2",
    patient: { name: "Mary Smith", dob: "22/11/1992", mobile: "+1 987 654 3210", avatar: "" },
    duration: "1:15",
    status: "Failed",
    reason: "Inquiry",
    action: "Redirected to Reception",
    type: "Inbound",
    timestamp: "09:15 AM",
    exists: false,
    appointments: [],
    transcript: "Caller was asking about insurance coverage for orthodontics. Assistant was unable to confirm specific policy details and transferred the call to the front desk."
  },
  {
    id: "call-3",
    patient: { name: "Robert King", dob: "05/01/1970", mobile: "+1 555 019 9988", avatar: "" },
    duration: "2:45",
    status: "Completed",
    reason: "Rescheduling",
    action: "Moved to 05/12 @ 2pm",
    type: "Inbound",
    timestamp: "Yesterday",
    exists: true,
    appointments: [
      { date: "05/12/2024", type: "Consultation", status: "Upcoming" },
      { date: "04/01/2024", type: "Emergency", status: "Completed" }
    ],
    transcript: "Patient needed to move his Tuesday appointment due to a conflict. Assistant found an open slot on Thursday afternoon and updated the EMR."
  },
  {
    id: "call-4",
    patient: { name: "Sarah Connor", dob: "15/08/1982", mobile: "+1 444 222 1111", avatar: "" },
    duration: "3:10",
    status: "Completed",
    reason: "Outbound Follow-up",
    action: "Confirmed medication",
    type: "Outbound",
    timestamp: "2 hours ago",
    exists: true,
    appointments: [],
    transcript: "Assistant called to check if the patient has started their post-surgery medication. Patient confirmed and asked about side effects."
  },
  {
    id: "call-5",
    patient: { name: "James Bond", dob: "07/07/1965", mobile: "+1 007 007 0007", avatar: "" },
    duration: "1:50",
    status: "Completed",
    reason: "Outbound Reminder",
    action: "Confirmed 05/15",
    type: "Outbound",
    timestamp: "5 hours ago",
    exists: true,
    appointments: [{ date: "05/15/2024", type: "Mission", status: "Upcoming" }],
    transcript: "Reminder call for the upcoming mission appointment. Patient confirmed attendance."
  }
];

export default function ClientCallsPage() {
  const params = useParams();
  const [selectedCall, setSelectedCall] = useState<typeof mockCalls[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<'All' | 'Inbound' | 'Outbound'>('All');

  const filteredCalls = mockCalls.filter(call => {
    const matchesSearch = call.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         call.patient.mobile.includes(searchQuery);
    const matchesType = typeFilter === 'All' || call.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="relative flex h-[calc(100vh-140px)] overflow-hidden">
      {/* Main List Section */}
      <div className={`flex-1 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar transition-all duration-300 ${selectedCall ? 'mr-[400px]' : ''}`}>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Call Logs</h1>
          <p className="text-muted-foreground font-medium">
            Monitor and audit all AI-handled patient interactions.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex items-center justify-between gap-4 bg-muted/20 p-2 rounded-xl border border-border/40">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search patient, mobile, or DOB..." 
                className="pl-9 bg-background/50 border-none h-10 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10 shrink-0 border-border/60" onClick={() => toast.info('Advanced Filters', { description: 'Opening advanced filtering engine...' })}>
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant={typeFilter === 'All' ? 'default' : 'secondary'} 
              className={`h-10 px-4 rounded-lg font-bold cursor-pointer transition-all gap-2 ${typeFilter === 'All' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'opacity-70'}`}
              onClick={() => { console.log('Filtering All'); setTypeFilter('All'); }}
            >
              {typeFilter === 'All' && <CheckCircle2 className="h-3 w-3" />}
              All Calls
            </Badge>
            <Badge 
              variant={typeFilter === 'Inbound' ? 'default' : 'secondary'} 
              className={`h-10 px-4 rounded-lg font-bold cursor-pointer transition-all gap-2 ${typeFilter === 'Inbound' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'opacity-70'}`}
              onClick={() => { console.log('Filtering Inbound'); setTypeFilter('Inbound'); }}
            >
              {typeFilter === 'Inbound' && <CheckCircle2 className="h-3 w-3" />}
              Inbound Only
            </Badge>
            <Badge 
              variant={typeFilter === 'Outbound' ? 'default' : 'secondary'} 
              className={`h-10 px-4 rounded-lg font-bold cursor-pointer transition-all gap-2 ${typeFilter === 'Outbound' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'opacity-70'}`}
              onClick={() => { console.log('Filtering Outbound'); setTypeFilter('Outbound'); }}
            >
              {typeFilter === 'Outbound' && <CheckCircle2 className="h-3 w-3" />}
              Outbound Only
            </Badge>
            <Button className="h-10 gap-2 font-bold px-6 shadow-lg shadow-primary/10 ml-2" onClick={() => toast.success('Export Started', { description: 'Generating CSV for filtered call logs...' })}>
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Calls Table */}
        <Card className="shadow-none border-border/60 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest pl-6">Patient (Name/DOB/Mobile)</TableHead>
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest">Duration</TableHead>
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest text-center">Media</TableHead>
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest">Reason & Action</TableHead>
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCalls.map((call) => (
                <TableRow 
                  key={call.id} 
                  className={`border-border/40 hover:bg-primary/[0.03] transition-colors cursor-pointer select-none ${selectedCall?.id === call.id ? 'bg-primary/[0.05]' : ''}`}
                  onDoubleClick={() => setSelectedCall(call)}
                >
                  <TableCell className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-border/60">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${call.patient.name}`} />
                        <AvatarFallback>{call.patient.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-foreground">{call.patient.name}</span>
                        <span className="text-[10px] text-muted-foreground font-medium">{call.patient.mobile} • {call.patient.dob}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 font-mono text-xs font-bold">{call.duration}</TableCell>
                  <TableCell className="py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button variant="dim" size="icon" className="h-8 w-8 rounded-full" title="Play Recording" onClick={(e) => { e.stopPropagation(); setSelectedCall(call); }}>
                        <Play className="h-3 w-3 fill-primary text-primary" />
                      </Button>
                      <Button variant="dim" size="icon" className="h-8 w-8 rounded-full" title="View Transcript" onClick={(e) => { e.stopPropagation(); setSelectedCall(call); }}>
                        <FileText className="h-3 w-3 text-primary" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-col max-w-[200px]">
                      <span className="font-bold text-xs">{call.reason}</span>
                      <span className="text-[10px] text-muted-foreground font-medium truncate">{call.action}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <Badge variant={call.status === 'Completed' ? 'success' : 'destructive'} appearance="light" size="xs">
                      {call.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Side Detail Panel (Opens on Double Click) */}
      {selectedCall && (
        <div className="fixed top-[140px] right-8 bottom-8 w-[380px] bg-card border border-border/80 shadow-2xl rounded-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
          {/* Panel Header */}
          <div className="p-6 border-b border-border/60 flex items-center justify-between bg-muted/10 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><PhoneIncoming className="h-5 w-5 text-primary" /></div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-tighter">Call Details</h3>
                <p className="text-[10px] text-muted-foreground font-bold">{selectedCall.timestamp}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setSelectedCall(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            {/* Patient CRM Data */}
            <section className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary/20 shadow-lg">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedCall.patient.name}`} />
                  <AvatarFallback className="text-xl">{selectedCall.patient.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-black text-foreground">{selectedCall.patient.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={selectedCall.exists ? 'success' : 'warning'} appearance="light" size="xs" className="font-bold">
                      {selectedCall.exists ? 'Registered Patient' : 'New Lead'}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/30 rounded-xl border border-border/40">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Mobile</p>
                  <p className="text-xs font-bold">{selectedCall.patient.mobile}</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-xl border border-border/40">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">DOB</p>
                  <p className="text-xs font-bold">{selectedCall.patient.dob}</p>
                </div>
              </div>
            </section>

            {/* AI Summary */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-primary">
                <MessageSquare className="h-4 w-4" />
                <h4 className="font-black text-[10px] uppercase tracking-widest">Assistant Summary</h4>
              </div>
              <div className="p-4 bg-primary/[0.03] border border-primary/10 rounded-2xl italic text-sm text-foreground leading-relaxed">
                "{selectedCall.transcript}"
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border border-border/40 rounded-xl">
                   <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Sentiment</p>
                   <Badge variant="success" appearance="light" size="xs">Positive</Badge>
                </div>
                <div className="p-3 border border-border/40 rounded-xl">
                   <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Action</p>
                   <Badge variant="primary" appearance="light" size="xs">Ticket Created</Badge>
                </div>
              </div>
            </section>

            {/* Appointment History (Requested) */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-600">
                  <Calendar className="h-4 w-4" />
                  <h4 className="font-black text-[10px] uppercase tracking-widest">Appointment Timeline</h4>
                </div>
                <Badge variant="secondary" size="xs" className="text-[10px]">{selectedCall.appointments.length} Total</Badge>
              </div>
              <div className="space-y-3">
                {selectedCall.appointments.length > 0 ? (
                  selectedCall.appointments.map((app, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-border/60 rounded-xl hover:bg-muted/20 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`size-2 rounded-full ${app.status === 'Upcoming' ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`}></div>
                        <div>
                          <p className="text-xs font-bold">{app.type}</p>
                          <p className="text-[10px] text-muted-foreground font-medium">{app.date}</p>
                        </div>
                      </div>
                      <Badge variant={app.status === 'Upcoming' ? 'primary' : 'secondary'} appearance="light" size="xs">{app.status}</Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-6 border-2 border-dashed border-border rounded-2xl">
                     <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-20" />
                     <p className="text-xs text-muted-foreground font-medium">No appointment history found for this patient.</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Panel Footer */}
          <div className="p-6 border-t border-border/60 flex gap-3 bg-muted/5 rounded-b-2xl">
            <Button className="flex-1 gap-2 shadow-lg shadow-primary/20 font-bold" onClick={() => toast.info(`Accessing ${selectedCall.patient.name}'s records`, { description: 'Loading historical data from CRM...' })}>
              <User className="h-4 w-4" />
              Patient Profile
            </Button>
            <Button variant="outline" size="icon" className="shrink-0 rounded-xl border-border/60" onClick={() => toast.info('More Actions', { description: 'Opening extended action menu...' })}>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
