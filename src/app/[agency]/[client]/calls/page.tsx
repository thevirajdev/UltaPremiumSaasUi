"use client";

import React, { useState, useMemo } from "react";
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
import { useCalls, useClinics } from "@/hooks/use-local-data";
import { Call } from "@/lib/storage";

export default function ClientCallsPage() {
  const params = useParams();
  const clientSlug = params.client as string;
  
  const { data: clinics } = useClinics();
  const currentClinic = useMemo(() => 
    clinics.find(c => c.name.toLowerCase().replace(/\s+/g, '-') === clientSlug),
    [clinics, clientSlug]
  );

  const { data: allCalls, loading } = useCalls();
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<'All' | 'Inbound' | 'Outbound'>('All');

  const filteredCalls = useMemo(() => {
    if (!currentClinic) return [];
    return allCalls.filter(call => {
      if (call.clinicId !== currentClinic.id) return false;
      const matchesSearch = call.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           call.patientPhone?.includes(searchQuery);
      const matchesType = typeFilter === 'All' || call.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [allCalls, currentClinic, searchQuery, typeFilter]);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="relative flex h-[calc(100vh-140px)] overflow-hidden">
      {/* Main List Section */}
      <div className={`flex-1 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar transition-all duration-300 ${selectedCall ? 'mr-[400px]' : ''}`}>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Call Logs</h1>
          <p className="text-muted-foreground font-medium">
            Monitor and audit all AI-handled interactions for <span className="text-primary font-bold">{currentClinic?.name || "this clinic"}</span>.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex items-center justify-between gap-4 bg-muted/20 p-2 rounded-xl border border-border/40">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search patient or phone..." 
                className="pl-9 bg-background/50 border-none h-10 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant={typeFilter === 'All' ? 'primary' : 'secondary'} 
              className={`h-10 px-4 rounded-lg font-bold cursor-pointer transition-all gap-2 ${typeFilter === 'All' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'opacity-70'}`}
              onClick={() => setTypeFilter('All')}
            >
              {typeFilter === 'All' && <CheckCircle2 className="h-3 w-3" />}
              All Calls
            </Badge>
            <Badge 
              variant={typeFilter === 'Inbound' ? 'primary' : 'secondary'} 
              className={`h-10 px-4 rounded-lg font-bold cursor-pointer transition-all gap-2 ${typeFilter === 'Inbound' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'opacity-70'}`}
              onClick={() => setTypeFilter('Inbound')}
            >
              {typeFilter === 'Inbound' && <CheckCircle2 className="h-3 w-3" />}
              Inbound
            </Badge>
            <Badge 
              variant={typeFilter === 'Outbound' ? 'primary' : 'secondary'} 
              className={`h-10 px-4 rounded-lg font-bold cursor-pointer transition-all gap-2 ${typeFilter === 'Outbound' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'opacity-70'}`}
              onClick={() => setTypeFilter('Outbound')}
            >
              {typeFilter === 'Outbound' && <CheckCircle2 className="h-3 w-3" />}
              Outbound
            </Badge>
            <Button className="h-10 gap-2 font-bold px-6 shadow-lg shadow-primary/10 ml-2" onClick={() => toast.success('Export Started')}>
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
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest pl-6">Patient</TableHead>
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
                  onClick={() => setSelectedCall(call)}
                >
                  <TableCell className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-border/60">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${call.patientName}`} />
                        <AvatarFallback>{call.patientName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-foreground">{call.patientName}</span>
                        <span className="text-[10px] text-muted-foreground font-medium">{call.patientPhone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 font-mono text-xs font-bold">{call.duration}</TableCell>
                  <TableCell className="py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button variant="dim" size="icon" className="h-8 w-8 rounded-full" onClick={(e) => { e.stopPropagation(); setSelectedCall(call); }}>
                        <Play className="h-3 w-3 fill-primary text-primary" />
                      </Button>
                      <Button variant="dim" size="icon" className="h-8 w-8 rounded-full" onClick={(e) => { e.stopPropagation(); setSelectedCall(call); }}>
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
              {filteredCalls.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-12 text-center text-muted-foreground italic text-xs">No call logs found for this clinic.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Side Detail Panel */}
      {selectedCall && (
        <div className="fixed top-[140px] right-8 bottom-8 w-[380px] bg-card border border-border/80 shadow-2xl rounded-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
          <div className="p-6 border-b border-border/60 flex items-center justify-between bg-muted/10 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                {selectedCall.type === 'Inbound' ? <PhoneIncoming className="h-5 w-5 text-primary" /> : <PhoneOutgoing className="h-5 w-5 text-primary" />}
              </div>
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
            <section className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary/20 shadow-lg">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedCall.patientName}`} />
                  <AvatarFallback className="text-xl">{selectedCall.patientName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-black text-foreground">{selectedCall.patientName}</h2>
                  <Badge variant="success" appearance="light" size="xs" className="font-bold mt-1">
                    Verified Record
                  </Badge>
                </div>
              </div>
              <div className="p-3 bg-muted/30 rounded-xl border border-border/40">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Mobile</p>
                <p className="text-xs font-bold">{selectedCall.patientPhone || "N/A"}</p>
              </div>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-2 text-primary">
                <MessageSquare className="h-4 w-4" />
                <h4 className="font-black text-[10px] uppercase tracking-widest">Assistant Transcript</h4>
              </div>
              <div className="p-4 bg-primary/[0.03] border border-primary/10 rounded-2xl italic text-sm text-foreground leading-relaxed">
                "{selectedCall.transcript || "No transcript available."}"
              </div>
            </section>

            <section className="space-y-4">
               <div className="p-3 border border-border/40 rounded-xl bg-muted/10">
                  <p className="text-[10px] font-black text-muted-foreground uppercase mb-1 tracking-widest">System Outcome</p>
                  <p className="text-xs font-bold text-foreground">{selectedCall.action}</p>
               </div>
            </section>
          </div>

          <div className="p-6 border-t border-border/60 flex gap-3 bg-muted/5 rounded-b-2xl">
            <Button className="flex-1 gap-2 shadow-lg shadow-primary/20 font-bold" onClick={() => toast.info(`Viewing ${selectedCall.patientName}'s profile`)}>
              <User className="h-4 w-4" />
              Patient Profile
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
