"use client";

import React, { useState, useMemo } from "react";
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
import { useAppointments, useClinics } from "@/hooks/use-local-data";
import { Appointment } from "@/lib/storage";

export default function ClientAppointmentsPage() {
  const params = useParams();
  const clientSlug = params.client as string;

  const { data: clinics } = useClinics();
  const currentClinic = useMemo(() => 
    clinics.find(c => c.name.toLowerCase().replace(/\s+/g, '-') === clientSlug),
    [clinics, clientSlug]
  );

  const { data: allAppointments, add, loading } = useAppointments();
  const [selectedApp, setSelectedApp] = useState<Appointment | null>(null);
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredAppointments = useMemo(() => {
    if (!currentClinic) return [];
    return allAppointments.filter(app => 
      app.clinicId === currentClinic.id && app.status === activeTab
    );
  }, [allAppointments, currentClinic, activeTab]);

  const handleAddAppointment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentClinic) return;
    
    const formData = new FormData(e.currentTarget);
    const newApp: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      clinicId: currentClinic.id,
      patientName: formData.get("patientName") as string,
      patientPhone: formData.get("patientPhone") as string,
      service: formData.get("service") as string,
      time: formData.get("time") as string,
      status: "Upcoming",
      createdAt: new Date().toISOString()
    };

    add(newApp);
    toast.success("Appointment Scheduled", {
      description: `Successfully booked ${newApp.service} for ${newApp.patientName}.`
    });
    setShowAddModal(false);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="relative flex h-[calc(100vh-140px)] overflow-hidden">
      {/* Main Appointment Section */}
      <div className={`flex-1 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar transition-all duration-300 ${selectedApp ? 'mr-[450px]' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground font-sans">Appointments</h1>
            <p className="text-muted-foreground font-medium">
              Schedule and track all patient bookings for <span className="text-primary font-bold">{currentClinic?.name || "this clinic"}</span>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="h-10 gap-2 font-bold px-6 shadow-lg shadow-primary/20" onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4" />
              New Appointment
            </Button>
          </div>
        </div>

        <Tabs defaultValue="Upcoming" className="w-full flex flex-col gap-6" onValueChange={setActiveTab}>
          <TabsList className="bg-muted/30 p-1 w-fit h-11 border border-border/40 rounded-xl">
            <TabsTrigger value="Upcoming" className="px-6 h-9 rounded-lg font-bold data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="Completed" className="px-6 h-9 rounded-lg font-bold data-[state=active]:bg-background data-[state=active]:text-green-600 data-[state=active]:shadow-sm">
              Completed
            </TabsTrigger>
            <TabsTrigger value="Rescheduled" className="px-6 h-9 rounded-lg font-bold data-[state=active]:bg-background data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm">
              Rescheduled
            </TabsTrigger>
            <TabsTrigger value="Cancelled" className="px-6 h-9 rounded-lg font-bold data-[state=active]:bg-background data-[state=active]:text-red-600 data-[state=active]:shadow-sm">
              Cancelled
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <Card className="shadow-none border-border/60 overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow className="border-border/60 hover:bg-transparent">
                    <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest pl-6">Patient</TableHead>
                    <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest">Service</TableHead>
                    <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest">Scheduled Time</TableHead>
                    <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((app) => (
                    <TableRow 
                      key={app.id} 
                      className={`border-border/40 hover:bg-primary/[0.03] transition-colors cursor-pointer select-none ${selectedApp?.id === app.id ? 'bg-primary/[0.05]' : ''}`}
                      onClick={() => setSelectedApp(app)}
                    >
                      <TableCell className="py-4 pl-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 border border-border/60">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${app.patientName}`} />
                            <AvatarFallback>{app.patientName[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-bold text-sm text-foreground">{app.patientName}</span>
                            <span className="text-[10px] text-muted-foreground font-medium">{app.patientPhone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-xs">{app.service}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold">{app.time}</span>
                        </div>
                      </TableCell>
                      
                      <TableCell className="py-4 text-center">
                        <Badge 
                          variant={
                            app.status === 'Upcoming' ? 'primary' : 
                            app.status === 'Completed' ? 'success' : 
                            app.status === 'Cancelled' ? 'destructive' : 'secondary'
                          } 
                          appearance="light" 
                          size="xs"
                        >
                          {app.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredAppointments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="py-12 text-center text-muted-foreground italic text-xs">No {activeTab.toLowerCase()} appointments found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Appointment Detail Drawer */}
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
            <section className="p-4 bg-muted/30 border border-border/40 rounded-2xl flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedApp.patientName}`} />
                <AvatarFallback>{selectedApp.patientName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-black text-sm text-foreground">{selectedApp.patientName}</h4>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold mt-1">
                  <Phone className="h-3 w-3" />
                  {selectedApp.patientPhone || "N/A"}
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Stethoscope className="h-4 w-4" />
                <h4 className="font-black text-[10px] uppercase tracking-widest">Medical Context</h4>
              </div>
              <div className="p-4 border border-border/60 rounded-2xl">
                 <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Service Type</p>
                 <p className="text-xs font-black">{selectedApp.service}</p>
              </div>
            </section>
          </div>

          <div className="p-6 border-t border-border/60 flex gap-3 bg-muted/5 rounded-b-2xl">
            <Button variant="outline" className="flex-1 gap-2 border-border/60 font-bold" onClick={() => toast.info('Rescheduling feature coming soon.')}>
              <RefreshCcw className="h-4 w-4" />
              Reschedule
            </Button>
          </div>
        </div>
      )}

      {/* New Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <Card className="w-full max-w-lg shadow-2xl border-border/60 animate-in zoom-in-95 duration-200">
            <form onSubmit={handleAddAppointment}>
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 pb-4">
                <div>
                  <CardTitle className="text-xl font-black">Schedule Appointment</CardTitle>
                  <CardDescription>Enter patient and service details.</CardDescription>
                </div>
                <Button type="button" variant="ghost" size="icon" className="rounded-full" onClick={() => setShowAddModal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Patient Name</label>
                    <Input name="patientName" required placeholder="John Doe" className="h-11 bg-muted/20 border-none font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Mobile Number</label>
                    <Input name="patientPhone" required placeholder="+1 234 567 890" className="h-11 bg-muted/20 border-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Service</label>
                    <Input name="service" required placeholder="Dental Cleaning" className="h-11 bg-muted/20 border-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Preferred Time</label>
                    <Input name="time" required placeholder="Today @ 2:00 PM" className="h-11 bg-muted/20 border-none" />
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <Button type="button" variant="outline" className="flex-1 h-11 font-bold border-border/60" onClick={() => setShowAddModal(false)}>Cancel</Button>
                  <Button type="submit" className="flex-1 h-11 font-bold shadow-lg shadow-primary/20">Create Booking</Button>
                </div>
              </CardContent>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
