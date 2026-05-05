"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card-2";
import { 
  CreditCard, 
  Plus, 
  History, 
  ShieldCheck, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  Download,
  AlertCircle,
  TrendingUp,
  Wallet,
  Calendar,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button-2";
import { Badge } from "@/components/ui/badge-2";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export default function ClientBillingPage() {
  const params = useParams();
  const client = params.client as string;

  // Mock data for countdown
  const hippaDaysLeft = 18;
  const hippaProgress = (hippaDaysLeft / 30) * 100;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground lowercase first-letter:uppercase">
          {client} Billing & Subscriptions
        </h1>
        <p className="text-muted-foreground font-medium">
          Manage your account balance, compliance subscriptions, and usage fees.
        </p>
      </div>

      {/* Main Financial Hub */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 shadow-lg border-primary/20 bg-primary/[0.02]">
          <CardContent className="p-8 flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary">
                 <Wallet className="h-5 w-5" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Available Credit Balance</span>
              </div>
              <p className="text-5xl font-black text-foreground">$420.50</p>
              <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                Next auto-refill at $50 threshold
              </p>
            </div>
            <Button className="h-14 px-8 gap-2 text-md font-bold shadow-xl shadow-primary/20" onClick={() => toast.info('Balance Recharge', { description: 'Opening secure payment gateway for credit top-up...' })}>
              <Plus className="h-5 w-5" />
              Add Balance
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/60">
           <CardHeader className="pb-2">
              <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-indigo-600">
                 <ShieldCheck className="h-4 w-4" />
                 HIPAA Compliance
              </CardTitle>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="flex justify-between items-end">
                 <div>
                    <p className="text-2xl font-black text-foreground">{hippaDaysLeft} Days</p>
                    <p className="text-[10px] text-muted-foreground font-bold">Remaining in cycle</p>
                 </div>
                 <Badge variant="primary" appearance="light" size="xs">ACTIVE</Badge>
              </div>
              <Progress value={hippaProgress} className="h-2" />
              <p className="text-[10px] text-muted-foreground italic font-medium">Auto-renews on May 22nd for $300.00</p>
           </CardContent>
        </Card>
      </div>

      {/* Fee Breakdown (Requested) */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-sm border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Setup Fee (One-Time)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
               <p className="text-2xl font-black text-foreground">$499.00</p>
               <Badge variant="success" appearance="light" className="font-bold gap-1">
                 <CheckCircle2 className="h-3 w-3" />
                 PAID
               </Badge>
            </div>
            <p className="text-[10px] text-muted-foreground font-medium">Initial environment configuration and training.</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Usage Rate (AI Minute)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
               <p className="text-2xl font-black text-foreground">$0.20<span className="text-xs text-muted-foreground ml-1">/min</span></p>
               <Badge variant="secondary" appearance="light" className="font-bold">Standard</Badge>
            </div>
            <p className="text-[10px] text-muted-foreground font-medium">Includes AI Voice, STT, and EMR integration.</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">HIPAA Subscription</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
               <p className="text-2xl font-black text-foreground">$300.00<span className="text-xs text-muted-foreground ml-1">/mo</span></p>
               <Badge variant="primary" appearance="light" className="font-bold">Managed</Badge>
            </div>
            <p className="text-[10px] text-muted-foreground font-medium">Encrypted storage and BAA compliance guarantee.</p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History (Requested) */}
      <Card className="shadow-sm border-border/60 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 pb-6 mb-0">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Financial Audit Log
            </CardTitle>
            <CardDescription>Line-item breakdown of subscriptions, usage, and setup fees.</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-2 font-bold border-border/60">
            <Download className="h-4 w-4" />
            Export History
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-border/60">
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest pl-6">Date & Category</TableHead>
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest">Description</TableHead>
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest text-right">Amount</TableHead>
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest text-right pr-6">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { date: "May 01, 2024", cat: "Subscription", desc: "HIPAA Compliance Monthly (30 Days)", amt: "-$300.00", status: "Completed" },
                { date: "May 01, 2024", cat: "Usage", desc: "Daily Minutes Consolidation (Apr 30)", amt: "-$13.60", status: "Completed" },
                { date: "Apr 28, 2024", cat: "Payment", desc: "Balance Recharge (Credit Card ...4242)", amt: "+$500.00", status: "Completed" },
                { date: "Apr 15, 2024", cat: "Setup", desc: "One-Time Facility Configuration Fee", amt: "-$499.00", status: "Paid" },
                { date: "Apr 15, 2024", cat: "Usage", desc: "Daily Minutes Consolidation (Apr 14)", amt: "-$8.42", status: "Completed" },
              ].map((tx, i) => (
                <TableRow key={i} className="border-border/40 hover:bg-muted/10 transition-colors">
                  <TableCell className="py-5 pl-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-foreground">{tx.date}</span>
                      <Badge variant="secondary" size="xs" className="w-fit text-[9px] px-1.5">{tx.cat}</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="py-5">
                    <span className="text-xs font-medium text-muted-foreground">{tx.desc}</span>
                  </TableCell>
                  <TableCell className="py-5 text-right">
                    <span className={`text-sm font-black font-mono ${tx.amt.startsWith('+') ? 'text-green-600' : 'text-foreground'}`}>
                      {tx.amt}
                    </span>
                  </TableCell>
                  <TableCell className="py-5 text-right pr-6">
                    <Badge 
                      variant={tx.status === 'Completed' || tx.status === 'Paid' ? 'success' : 'warning'} 
                      appearance="light" 
                      size="xs"
                      className="font-bold"
                    >
                      {tx.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
