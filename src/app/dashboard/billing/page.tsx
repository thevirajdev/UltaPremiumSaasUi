"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button-2";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card-2";
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  DollarSign, 
  Zap, 
  ArrowUpRight, 
  Settings, 
  Plus, 
  CalendarDays,
  FileText,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge-2";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

export default function BillingPage() {
  const [autopay, setAutopay] = useState(true);

  const invoices = [
    { id: "INV-2024-001", date: "Apr 01, 2024", amount: "$499.00", status: "Paid" },
    { id: "INV-2024-002", date: "Mar 01, 2024", amount: "$499.00", status: "Paid" },
    { id: "SET-2024-001", date: "Feb 15, 2024", amount: "$1,500.00", status: "Paid", type: "Setup Fee" },
  ];

  return (
    <div className="space-y-8 pb-12 max-w-(--breakpoint-2xl) mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Billing & Subscriptions</h1>
          <p className="text-muted-foreground font-medium">
            Manage your agency plan, payment methods, and compliance assets.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Tax Info
          </Button>
          <Button className="gap-2 shadow-lg shadow-primary/20">
            <Plus className="h-4 w-4" />
            Add Payment Method
          </Button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Subscription Card */}
        <Card className="shadow-sm border-border/60">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                Active Plan
              </CardTitle>
              <Badge variant="primary" appearance="light">Agency Scale</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-bold text-foreground">$499.00 <span className="text-xs font-medium text-muted-foreground">/ month</span></p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                <Clock className="h-3 w-3" />
                Next renewal: May 01, 2024
              </div>
            </div>
            <div className="pt-4 border-t border-border/60 space-y-3">
               <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground font-medium">Start Date</span>
                  <span className="font-bold">April 01, 2024</span>
               </div>
               <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground font-medium">End Date</span>
                  <span className="font-bold">May 01, 2024</span>
               </div>
            </div>
          </CardContent>
        </Card>

        {/* HIPAA & Setup Fee Card */}
        <Card className="shadow-sm border-border/60">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-600" />
              Compliance & Assets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Setup Fee (Requested as paid by default) */}
            <div className="p-3.5 bg-green-500/5 border border-green-500/20 rounded-xl flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg"><CheckCircle2 className="h-4 w-4 text-green-600" /></div>
                  <span className="text-sm font-bold text-foreground">One-time Setup Fee</span>
               </div>
               <Badge variant="success" appearance="ghost" className="font-black">PAID</Badge>
            </div>

            {/* HIPAA Countdown (Requested) */}
            <div className="p-3.5 bg-muted/40 border border-border/60 rounded-xl space-y-2">
               <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">HIPAA Compliance</span>
                  <span className="text-xs font-bold text-amber-600">24 Days Left</span>
               </div>
               <Progress value={80} className="h-1.5 bg-amber-500/10" />
            </div>
          </CardContent>
        </Card>

        {/* Vapi Credits Card */}
        <Card className="shadow-sm border-border/60 bg-primary/5 border-primary/20">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Vapi Credits
              </CardTitle>
              <Button variant="dim" size="sm" className="h-7 text-[10px] uppercase font-bold px-2">Top Up</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">Available Balance</p>
              <p className="text-3xl font-black text-foreground">$840.50</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl flex items-center gap-3">
               <div className="p-2 bg-primary/10 rounded-lg"><AlertCircle className="h-4 w-4 text-primary" /></div>
               <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">
                  Low balance alerts enabled for $50. Credits are deducted per voice minute used.
               </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Settings Section (Requested) */}
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="shadow-sm border-border/60">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Payment Methods
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-xs font-bold text-primary px-2">Manage All</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="p-4 border border-border/60 rounded-2xl flex items-center justify-between bg-card hover:border-primary/40 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                   <div className="h-10 w-14 bg-muted rounded-md flex items-center justify-center border border-border/40">
                      <CreditCard className="h-6 w-6 text-muted-foreground" />
                   </div>
                   <div>
                      <p className="font-bold text-sm">Visa ending in 4242</p>
                      <p className="text-xs text-muted-foreground font-medium italic">Expires 12/26 • Primary</p>
                   </div>
                </div>
                <Badge variant="primary" appearance="light" size="xs">ACTIVE</Badge>
             </div>

             <div className="p-5 bg-muted/30 border border-dashed border-border rounded-2xl flex items-center justify-between">
                <div className="flex flex-col gap-1">
                   <p className="text-sm font-bold flex items-center gap-2">
                      Enable Autopay
                      <Badge variant="info" size="xs" shape="circle" appearance="light">Recommended</Badge>
                   </p>
                   <p className="text-xs text-muted-foreground font-medium">Automatically renew subscription and top-up credits.</p>
                </div>
                <Switch 
                  checked={autopay} 
                  onCheckedChange={setAutopay} 
                  className="data-[state=checked]:bg-primary"
                />
             </div>
          </CardContent>
        </Card>

        {/* Invoice History */}
        <Card className="shadow-sm border-border/60 overflow-hidden">
          <CardHeader className="bg-muted/10 border-b border-border/60">
            <div className="flex items-center justify-between">
               <CardTitle className="text-lg">Recent Invoices</CardTitle>
               <Button variant="outline" size="sm" className="h-8 gap-2">
                  <ArrowUpRight className="h-3 w-3" />
                  All Invoices
               </Button>
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-border/60">
                  <TableHead className="py-4 font-bold text-[10px] uppercase tracking-widest">ID</TableHead>
                  <TableHead className="py-4 font-bold text-[10px] uppercase tracking-widest">Date</TableHead>
                  <TableHead className="py-4 font-bold text-[10px] uppercase tracking-widest text-right">Amount</TableHead>
                  <TableHead className="py-4 font-bold text-[10px] uppercase tracking-widest text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv) => (
                  <TableRow key={inv.id} className="hover:bg-muted/20 border-border/40 transition-colors">
                    <TableCell className="font-mono text-xs font-medium text-muted-foreground">{inv.id}</TableCell>
                    <TableCell className="text-sm font-bold">{inv.date}</TableCell>
                    <TableCell className="text-right font-black text-foreground">{inv.amount}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="success" appearance="light" size="xs">{inv.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}
