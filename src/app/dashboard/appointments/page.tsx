"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-2";
import { Calendar, Search, Filter, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge-2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AppointmentsPage() {
  const appointments = [
    { id: "1", patient: "Alice Brown", service: "Checkup", doctor: "Dr. Sarah Johnson", time: "10:30 AM", status: "Confirmed" },
    { id: "2", patient: "Steve Ross", service: "Surgery", doctor: "Dr. James Wilson", time: "11:45 AM", status: "Confirmed" },
    { id: "3", patient: "Emma Wilson", service: "Consult", doctor: "Dr. Sarah Johnson", time: "01:15 PM", status: "Rescheduled" },
    { id: "4", patient: "George Miller", service: "Emergency Dental", doctor: "Dr. Emily Chen", time: "03:30 PM", status: "Pending" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground font-medium">Schedule and manage clinic bookings effectively.</p>
        </div>
        <Button className="gap-2 bg-primary shadow-lg shadow-primary/20">
          <Plus className="h-4 w-4" />
          Schedule New
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by patient or doctor..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter by Clinic
        </Button>
      </div>

      <Card className="border-border/60 overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="font-bold text-[10px] uppercase tracking-widest py-4">Patient</TableHead>
              <TableHead className="font-bold text-[10px] uppercase tracking-widest py-4">Service</TableHead>
              <TableHead className="font-bold text-[10px] uppercase tracking-widest py-4">Assigned Doctor</TableHead>
              <TableHead className="font-bold text-[10px] uppercase tracking-widest py-4 text-right">Time</TableHead>
              <TableHead className="font-bold text-[10px] uppercase tracking-widest py-4 text-center">Outcome</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((app) => (
              <TableRow key={app.id} className="hover:bg-muted/20 transition-colors border-border/40">
                <TableCell className="font-bold text-sm">{app.patient}</TableCell>
                <TableCell className="text-xs font-medium text-muted-foreground uppercase">{app.service}</TableCell>
                <TableCell className="text-xs text-muted-foreground font-medium">{app.doctor}</TableCell>
                <TableCell className="text-right font-mono text-xs font-bold">{app.time}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={app.status === 'Confirmed' ? 'success' : app.status === 'Rescheduled' ? 'warning' : 'info'} appearance="light" size="xs">
                    {app.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
