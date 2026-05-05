"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card-2";
import { 
  Stethoscope, 
  Search, 
  Filter, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  History, 
  CheckCircle2, 
  Clock, 
  X,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  FileText,
  Activity,
  TrendingUp,
  Award,
  BookOpen,
  Briefcase,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button-2";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge-2";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar-2";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

// Mock Data for Doctors
const mockDoctors = [
  {
    id: "doc-1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    experience: "12 years",
    mobile: "+1 234 567 8901",
    email: "sarah.johnson@clinic.com",
    address: "123 Heart St, Medical City",
    status: "Active",
    rating: "4.9",
    totalPatients: "1,240",
    education: [
      { degree: "MD in Cardiology", institution: "Harvard Medical School", year: "2012" },
      { degree: "BS in Biology", institution: "Stanford University", year: "2008" }
    ],
    schedule: [
      { day: "Monday", hours: "09:00 AM - 05:00 PM" },
      { day: "Wednesday", hours: "09:00 AM - 05:00 PM" },
      { day: "Friday", hours: "09:00 AM - 01:00 PM" }
    ],
    recentActivity: [
      { type: "Surgery", date: "Yesterday", patient: "John Doe", outcome: "Success" },
      { type: "Consultation", date: "04/28/2024", patient: "Mary Smith", outcome: "Follow-up required" }
    ]
  },
  {
    id: "doc-2",
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    experience: "8 years",
    mobile: "+1 987 654 3210",
    email: "michael.chen@clinic.com",
    address: "456 Brain Ave, Neuro District",
    status: "Active",
    rating: "4.7",
    totalPatients: "850",
    education: [
      { degree: "MD in Neurology", institution: "Johns Hopkins University", year: "2016" }
    ],
    schedule: [
      { day: "Tuesday", hours: "10:00 AM - 06:00 PM" },
      { day: "Thursday", hours: "10:00 AM - 06:00 PM" }
    ],
    recentActivity: [
      { type: "MRI Review", date: "Today", patient: "Alice Brown", outcome: "Normal" }
    ]
  }
];

export default function ClientDoctorsPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<typeof mockDoctors[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredDoctors = mockDoctors.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative flex h-[calc(100vh-140px)] overflow-hidden">
      {/* Doctor List Section */}
      <div className={`flex-1 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar transition-all duration-300 ${selectedDoctor ? 'mr-[500px]' : ''}`}>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-sans">Medical Staff</h1>
          <p className="text-muted-foreground font-medium">
            Manage your clinic's doctors, their schedules, and specialties.
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-6">
           <Card className="shadow-sm border-border/60">
              <CardContent className="p-5 flex items-center justify-between">
                 <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Total Doctors</p>
                    <p className="text-2xl font-black text-foreground">{mockDoctors.length}</p>
                 </div>
                 <Stethoscope className="h-8 w-8 text-primary opacity-20" />
              </CardContent>
           </Card>
           <Card className="shadow-sm border-border/60">
              <CardContent className="p-5 flex items-center justify-between">
                 <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">On Duty</p>
                    <p className="text-2xl font-black text-foreground">12</p>
                 </div>
                 <Activity className="h-8 w-8 text-green-600 opacity-20" />
              </CardContent>
           </Card>
           <Card className="shadow-sm border-border/60">
              <CardContent className="p-5 flex items-center justify-between">
                 <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Average Rating</p>
                    <p className="text-2xl font-black text-foreground">4.8</p>
                 </div>
                 <Award className="h-8 w-8 text-indigo-600 opacity-20" />
              </CardContent>
           </Card>
        </div>

        {/* Table Toolbar */}
        <div className="flex items-center justify-between gap-4 bg-muted/20 p-2 rounded-xl border border-border/40">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name or specialty..." 
                className="pl-9 bg-background/50 border-none h-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-10 w-10 shrink-0 border-border/60" onClick={() => toast.info('Advanced Filters', { description: 'Opening staff specialty and availability filtering...' })}>
              <Filter className="h-4 w-4" />
            </Button>
            <Button className="h-10 gap-2 font-bold px-6 shadow-lg shadow-primary/20" onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4" />
              Add Doctor
            </Button>
          </div>
        </div>

        {/* Doctor Table */}
        <Card className="shadow-none border-border/60 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest pl-6">Doctor Details</TableHead>
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest">Specialty</TableHead>
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest">Experience</TableHead>
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDoctors.map((d) => (
                <TableRow 
                  key={d.id} 
                  className={`border-border/40 hover:bg-primary/[0.03] transition-colors cursor-pointer select-none ${selectedDoctor?.id === d.id ? 'bg-primary/[0.05]' : ''}`}
                  onDoubleClick={() => setSelectedDoctor(d)}
                >
                  <TableCell className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-border/60">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${d.name}`} />
                        <AvatarFallback>{d.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-foreground">{d.name}</span>
                        <span className="text-[10px] text-muted-foreground font-medium">{d.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-xs font-bold text-muted-foreground">
                    <Badge variant="outline" className="border-primary/20 text-primary">{d.specialty}</Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-3 w-3 text-primary" />
                      <span className="text-xs font-bold">{d.experience}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <Badge variant={d.status === 'Active' ? 'success' : 'primary'} appearance="light" size="xs">
                      {d.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Doctor Deep-Dive Drawer (Double Click) */}
      {selectedDoctor && (
        <div className="fixed top-[140px] right-8 bottom-8 w-[480px] bg-card border border-border/80 shadow-2xl rounded-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-border/60 flex items-center justify-between bg-muted/10 rounded-t-2xl">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border border-primary/20 shadow-md">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedDoctor.name}`} />
                <AvatarFallback>{selectedDoctor.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-black text-lg uppercase tracking-tighter">{selectedDoctor.name}</h3>
                <p className="text-[10px] text-muted-foreground font-bold italic">Staff ID: {selectedDoctor.id}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setSelectedDoctor(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="overview" className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="bg-muted/50 p-1 mx-6 mt-4 h-10">
              <TabsTrigger value="overview" className="flex-1 text-xs">Overview</TabsTrigger>
              <TabsTrigger value="education" className="flex-1 text-xs">Education</TabsTrigger>
              <TabsTrigger value="schedule" className="flex-1 text-xs">Schedule</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {/* Tab: Overview */}
              <TabsContent value="overview" className="space-y-6 mt-0">
                <section className="space-y-4">
                  <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/40 pb-2">Professional Profile</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/30 rounded-xl">
                      <p className="text-[10px] font-black text-muted-foreground uppercase">Specialty</p>
                      <p className="text-sm font-bold">{selectedDoctor.specialty}</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-xl">
                      <p className="text-[10px] font-black text-muted-foreground uppercase">Experience</p>
                      <p className="text-sm font-bold">{selectedDoctor.experience}</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-xl">
                      <p className="text-[10px] font-black text-muted-foreground uppercase">Rating</p>
                      <p className="text-sm font-bold text-yellow-600">★ {selectedDoctor.rating}</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-xl">
                      <p className="text-[10px] font-black text-muted-foreground uppercase">Patients</p>
                      <p className="text-sm font-bold">{selectedDoctor.totalPatients}</p>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/40 pb-2">Contact Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-sm font-bold">{selectedDoctor.mobile}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="text-sm font-bold">{selectedDoctor.email}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm font-bold">{selectedDoctor.address}</span>
                    </div>
                  </div>
                </section>
              </TabsContent>

              {/* Tab: Education */}
              <TabsContent value="education" className="space-y-6 mt-0">
                <section className="space-y-4">
                  <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    Academic Background
                  </h4>
                  <div className="space-y-4">
                    {selectedDoctor.education.map((edu, i) => (
                      <div key={i} className="relative pl-6 border-l-2 border-primary/20 pb-4 last:pb-0">
                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-sm" />
                        <p className="text-sm font-black text-foreground">{edu.degree}</p>
                        <p className="text-xs font-bold text-muted-foreground">{edu.institution}</p>
                        <p className="text-[10px] font-bold text-primary/60 mt-1 uppercase tracking-widest">Graduated {edu.year}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </TabsContent>

              {/* Tab: Schedule */}
              <TabsContent value="schedule" className="space-y-6 mt-0">
                <section className="space-y-4">
                  <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <Clock className="h-4 w-4 text-indigo-500" />
                    Weekly Availability
                  </h4>
                  <div className="space-y-2">
                    {selectedDoctor.schedule.map((slot, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border border-border/40 rounded-2xl hover:bg-muted/10 transition-colors">
                        <span className="text-sm font-black">{slot.day}</span>
                        <Badge variant="secondary" appearance="light" size="xs" className="font-bold">{slot.hours}</Badge>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                  <p className="text-xs text-muted-foreground italic text-center">
                    "Available for emergency calls on weekends with prior notice."
                  </p>
                </div>
              </TabsContent>
            </div>
          </Tabs>

          {/* Footer Actions */}
          <div className="p-6 border-t border-border/60 flex gap-3 bg-muted/5 rounded-b-2xl">
            <Button className="flex-1 gap-2 shadow-lg shadow-primary/20 font-bold" onClick={() => toast.info('Schedule Manager', { description: `Accessing availability calendar for ${selectedDoctor.name}...` })}>
              <Calendar className="h-4 w-4" />
              Manage Schedule
            </Button>
            <Button variant="outline" className="flex-1 gap-2 border-border/60 font-bold" onClick={() => toast.success('Analytics Loaded', { description: `Opening performance dashboard for ${selectedDoctor.name}.` })}>
              <History className="h-4 w-4" />
              View Performance
            </Button>
          </div>
        </div>
      )}
      {/* Add Doctor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Card className="w-full max-w-lg shadow-2xl border-border/60 animate-in zoom-in-95 duration-200">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 pb-4">
              <div>
                <CardTitle className="text-xl font-black">Register New Doctor</CardTitle>
                <CardDescription>Onboard a new medical professional to your clinic.</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowAddModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Full Name</label>
                  <Input placeholder="Dr. Enter Name..." className="h-11 bg-muted/20 border-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Specialty</label>
                  <Input placeholder="e.g. Cardiology" className="h-11 bg-muted/20 border-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Experience (Years)</label>
                  <Input type="number" placeholder="10" className="h-11 bg-muted/20 border-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Mobile</label>
                  <Input placeholder="+1..." className="h-11 bg-muted/20 border-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email</label>
                  <Input type="email" placeholder="name@clinic.com" className="h-11 bg-muted/20 border-none" />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <Button variant="outline" className="flex-1 h-11 font-bold border-border/60" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button className="flex-1 h-11 font-bold shadow-lg shadow-primary/20" onClick={() => { toast.success('Doctor Onboarded', { description: 'New medical professional added to staff registry.' }); setShowAddModal(false); }}>Add Staff</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
