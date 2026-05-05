"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-2";
import { Phone, Search, Filter, Download } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge-2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CallLogsPage() {
  const calls = [
    { id: "1", patient: "Alice Brown", doctor: "Dr. Sarah Johnson", duration: "4:12", status: "Completed", type: "Inbound", time: "10:30 AM" },
    { id: "2", patient: "Steve Ross", doctor: "Dr. James Wilson", duration: "1:20", status: "Missed", type: "Outbound", time: "11:45 AM" },
    { id: "3", patient: "Emma Wilson", doctor: "Dr. Sarah Johnson", duration: "2:45", status: "Completed", type: "Inbound", time: "01:15 PM" },
    { id: "4", patient: "George Miller", doctor: "Dr. Emily Chen", duration: "5:30", status: "Completed", type: "Outbound", time: "02:45 PM" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Call Logs</h1>
        <p className="text-muted-foreground font-medium">Detailed history of all AI voice interactions.</p>
      </div>

      <div className="flex items-center justify-between gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by patient, doctor or clinic..." className="pl-10" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card className="border-border/60 overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="font-bold text-[10px] uppercase tracking-widest py-4">Patient</TableHead>
              <TableHead className="font-bold text-[10px] uppercase tracking-widest py-4">Assigned Doctor</TableHead>
              <TableHead className="font-bold text-[10px] uppercase tracking-widest py-4">Type</TableHead>
              <TableHead className="font-bold text-[10px] uppercase tracking-widest py-4 text-right">Duration</TableHead>
              <TableHead className="font-bold text-[10px] uppercase tracking-widest py-4">Time</TableHead>
              <TableHead className="font-bold text-[10px] uppercase tracking-widest py-4 text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {calls.map((call) => (
              <TableRow key={call.id} className="hover:bg-muted/20 transition-colors border-border/40">
                <TableCell className="font-bold text-sm">{call.patient}</TableCell>
                <TableCell className="text-xs text-muted-foreground font-medium">{call.doctor}</TableCell>
                <TableCell>
                  <Badge variant={call.type === 'Inbound' ? 'info' : 'primary'} appearance="light" size="xs">
                    {call.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-xs">{call.duration}</TableCell>
                <TableCell className="text-xs font-medium text-muted-foreground">{call.time}</TableCell>
                <TableCell className="text-center">
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
  );
}
