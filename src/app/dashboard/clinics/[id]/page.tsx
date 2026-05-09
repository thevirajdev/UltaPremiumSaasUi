"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  Calendar as CalendarIcon, 
  DollarSign, 
  Activity, 
  Users, 
  Pencil, 
  Phone, 
  Mail, 
  CalendarDays, 
  Clock, 
  Settings, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  FileText, 
  Zap,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Plus,
  KeyRound,
  ExternalLink
} from "lucide-react";
import { Badge } from "@/components/ui/badge-2";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card-2";
import StatisticCard10 from "@/components/ui/statistic-card-10";
import { WeeklyKPIChart } from "@/components/ui/weekly-kpi-chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useClinics, useCalls } from "@/hooks/use-local-data";
import { storage } from "@/lib/storage";

export default function ClinicDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { data: clinics } = useClinics();
  const { data: calls } = useCalls();

  // Find the specific clinic
  const clinic = clinics.find(c => c.id === id);
  const clinicCalls = calls.filter(c => c.clinicId === id);

  if (!clinic) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Activity className="h-12 w-12 text-muted-foreground opacity-20" />
        <h2 className="text-xl font-bold">Clinic Not Found</h2>
        <Button onClick={() => router.push('/dashboard/clinics')}>Back to Clinics</Button>
      </div>
    );
  }

  const stats = {
    balance: `$${(clinic.balance || 0).toLocaleString()}`,
    totalUsage: `${(clinic.totalUsage || 0)} mins`,
    totalPaid: `$${(clinic.totalPaid || 0).toLocaleString()}`,
    profitGenerated: `$${(clinic.profitGenerated || 0).toLocaleString()}`,
  };

  const usageData = [
    { day: "S" as const, value: 0 },
    { day: "M" as const, value: 0 },
    { day: "T" as const, value: 0 },
    { day: "W" as const, value: clinic.totalUsage || 0 },
    { day: "T" as const, value: 0 },
    { day: "F" as const, value: 0 },
    { day: "S" as const, value: 0 },
  ];

  const transactions = [
    { id: "TX-101", date: new Date().toLocaleDateString(), type: "Top-up", amount: `+$${(clinic.totalPaid || 0).toLocaleString()}`, method: "Credit Card", status: "Success" },
    { id: "TX-102", date: new Date().toLocaleDateString(), type: "AI Credits", amount: `-${(clinic.creditsUsed || 0).toLocaleString()}`, method: "System Deduction", status: "Success" },
  ];

  return (
    <div className="space-y-8 pb-20 max-w-(--breakpoint-2xl) mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.back()}
            className="rounded-full hover:bg-accent h-10 w-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">{clinic.name}</h1>
              <Badge variant="success" appearance="light" className="px-3">
                {clinic.status}
              </Badge>
            </div>
            <p className="text-muted-foreground font-medium">{clinic.doctorName} • {clinic.email}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 border-border/60 hover:border-border">
            <Settings className="h-4 w-4" />
            Vapi Config
          </Button>
          <Button 
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
            onClick={() => {
              const currentAgencyId = localStorage.getItem('currentAgencyId') || 'demo-agency';
              router.push(`/${currentAgencyId}/${clinic.id}`);
            }}
          >
            <ExternalLink className="h-4 w-4" />
            Open Dashboard
          </Button>
          <Button className="gap-2 bg-foreground text-background hover:bg-foreground/90 shadow-lg shadow-foreground/10">
            <Plus className="h-4 w-4" />
            Add Funds
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card variant="accent" className="p-0 border-none shadow-none">
          <CardContent className="p-6 space-y-2 bg-card rounded-xl border border-border shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm font-medium">Outstanding Balance</span>
              </div>
              <Badge variant="destructive" appearance="ghost" className="p-0"><ArrowDownLeft className="h-3 w-3" /></Badge>
            </div>
            <p className="text-3xl font-bold tracking-tight text-destructive">{stats.balance}</p>
          </CardContent>
        </Card>
        
        <Card variant="accent" className="p-0 border-none shadow-none">
          <CardContent className="p-6 space-y-2 bg-card rounded-xl border border-border shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Activity className="h-4 w-4" />
                <span className="text-sm font-medium">Total Usage</span>
              </div>
              <Badge variant="info" appearance="ghost" className="p-0"><Zap className="h-3 w-3 text-brand" /></Badge>
            </div>
            <p className="text-3xl font-bold tracking-tight">{stats.totalUsage}</p>
          </CardContent>
        </Card>

        <Card variant="accent" className="p-0 border-none shadow-none">
          <CardContent className="p-6 space-y-2 bg-card rounded-xl border border-border shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                <span className="text-sm font-medium">Total Paid</span>
              </div>
              <Badge variant="primary" appearance="ghost" className="p-0"><ArrowUpRight className="h-3 w-3" /></Badge>
            </div>
            <p className="text-3xl font-bold tracking-tight text-primary">{stats.totalPaid}</p>
          </CardContent>
        </Card>

        <Card variant="accent" className="p-0 border-none shadow-none">
          <CardContent className="p-6 space-y-2 bg-card rounded-xl border border-border shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">Profit Generated</span>
              </div>
              <Badge variant="success" appearance="ghost" className="p-0"><ArrowUpRight className="h-3 w-3" /></Badge>
            </div>
            <p className="text-3xl font-bold tracking-tight text-green-600">{stats.profitGenerated}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Clinic Info */}
        <Card className="shadow-sm border-border/60">
          <CardHeader className="border-0 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Clinic Info
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-full">
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-0">
            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Clinic Name</p>
                <p className="font-semibold text-foreground">{clinic.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Primary Doctor</p>
                <p className="font-semibold text-foreground">{clinic.doctorName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Contact Channels</p>
                <div className="flex flex-col gap-2 mt-1">
                  <span className="flex items-center gap-2.5 text-sm font-medium text-foreground/80">
                    <div className="p-1.5 bg-accent/50 rounded-md"><Phone className="h-3.5 w-3.5 text-brand" /></div>
                    {clinic.phone}
                  </span>
                  <span className="flex items-center gap-2.5 text-sm font-medium text-foreground/80">
                    <div className="p-1.5 bg-accent/50 rounded-md"><Mail className="h-3.5 w-3.5 text-brand" /></div>
                    {clinic.email}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Onboarding Date</p>
                <p className="font-semibold text-foreground flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  {clinic.createdAt ? new Date(clinic.createdAt).toLocaleDateString() : 'Initial'}
                </p>
              </div>
            </div>
            
            <Separator className="bg-border/40 my-2" />
            
            <div className="pt-2">
              <Button 
                variant="outline" 
                className="w-full gap-2 border-primary/20 hover:bg-primary/5 text-primary hover:text-primary font-bold h-11"
                onClick={() => {
                  toast.success("Reset Link Sent", {
                    description: `A secure password reset email has been dispatched to ${clinic.email}.`
                  });
                }}
              >
                <KeyRound className="h-4 w-4" />
                Send Password Reset Link
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Configuration (Requested) */}
        <Card className="shadow-sm border-border/60">
          <CardHeader className="border-0 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Pricing Setup
              </CardTitle>
              <Badge variant="primary" appearance="light">Standard Plan</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-1 pt-0">
            <div className="p-3.5 bg-muted/40 flex items-center justify-between rounded-xl border border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg"><ShieldCheck className="h-4 w-4 text-blue-600" /></div>
                <span className="text-sm font-medium text-foreground">Setup Fee (One-time)</span>
              </div>
              <span className="text-base font-bold text-foreground">$1,500</span>
            </div>
            <div className="p-3.5 bg-muted/40 flex items-center justify-between rounded-xl border border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg"><Clock className="h-4 w-4 text-green-600" /></div>
                <span className="text-sm font-medium text-foreground">Cost Per Minute</span>
              </div>
              <span className="text-base font-bold text-foreground">$0.15</span>
            </div>
            <div className="p-3.5 bg-muted/40 flex items-center justify-between rounded-xl border border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-violet-500/10 rounded-lg"><Zap className="h-4 w-4 text-violet-600" /></div>
                <span className="text-sm font-medium text-foreground">Vapi Base Cost</span>
              </div>
              <span className="text-base font-bold text-foreground">$0.05</span>
            </div>
            <div className="p-4 bg-primary/5 border border-primary/20 flex items-center justify-between rounded-xl mt-4">
              <span className="text-sm font-bold text-primary uppercase tracking-tighter">Total Per Min</span>
              <div className="flex flex-col items-end">
                <span className="text-xl font-black text-primary">$0.20</span>
                <span className="text-[10px] text-muted-foreground font-medium italic">including system markup</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* StatisticCard10 Integration */}
        <StatisticCard10 
          title="Profit Analysis"
          value="$ 2,100.00"
          trend="+15.2%"
          trendText="growth from last month"
          items={[
            { label: "Gross Income:", value: stats.totalPaid },
            { label: "Vapi Expenses:", value: `$${((clinic.totalUsage || 0) * 0.05).toFixed(2)}` },
            { label: "Net Margin:", value: `${(((clinic.totalPaid || 1) - (clinic.totalUsage || 0) * 0.05) / (clinic.totalPaid || 1) * 100).toFixed(1)}%` }
          ]}
        />
      </div>

      {/* Usage Graph Section */}
      <Card className="shadow-sm border-border/60">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Activity className="h-6 w-6 text-primary" />
                Clinic Usage Trends
              </CardTitle>
              <CardDescription>Daily call volume and minute consumption analysis</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8">7 Days</Button>
              <Button variant="ghost" size="sm" className="h-8">30 Days</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full flex items-center justify-center bg-muted/20 rounded-2xl border border-dashed border-border/60 overflow-hidden">
            <WeeklyKPIChart 
              data={usageData} 
              width={1000} 
              height={280} 
            />
          </div>
        </CardContent>
      </Card>

      {/* Vapi Config Settings Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-sm border-border/60 overflow-hidden">
          <div className="bg-primary/5 p-4 border-b border-primary/10 flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2 text-primary">
              <ArrowUpRight className="h-5 w-5" />
              Outbound Settings
            </h3>
            <Badge variant="primary" appearance="light">Standard Assistant</Badge>
          </div>
          <CardContent className="p-6 grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">AI Model</span>
                <p className="font-semibold flex items-center gap-2 text-sm"><Cpu className="h-4 w-4" /> GPT-4o-Mini</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Voice Provider</span>
                <p className="font-semibold flex items-center gap-2 text-sm"><Globe className="h-4 w-4" /> ElevenLabs</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Language</span>
                <p className="font-semibold flex items-center gap-2 text-sm"><Globe className="h-4 w-4" /> English (US)</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Phone Provider</span>
                <p className="font-semibold flex items-center gap-2 text-sm"><Phone className="h-4 w-4" /> Twilio</p>
              </div>
            </div>
            <div className="p-4 border border-border rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold flex items-center gap-2"><FileText className="h-4 w-4 text-brand" /> System Prompt</span>
                <Button variant="ghost" size="sm" className="h-7 text-[10px] px-2 uppercase font-bold">Edit</Button>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed italic">
                "You are an AI assistant for Central Medical Center. Your goal is to schedule appointments and answer basic medical facility questions..."
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/60 overflow-hidden">
          <div className="bg-indigo-500/5 p-4 border-b border-indigo-500/10 flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2 text-indigo-600">
              <ArrowDownLeft className="h-5 w-5" />
              Inbound Settings
            </h3>
            <Badge variant="info" appearance="light" className="bg-indigo-500/10 text-indigo-600 border-indigo-500/20">IVR Active</Badge>
          </div>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center px-2">
                <span className="text-xs font-bold text-muted-foreground">LATENCY & PERFORMANCE</span>
                <span className="text-[10px] font-mono font-bold text-green-600">HEALTHY</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 border border-border rounded-xl text-center">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">First Byte</p>
                  <p className="text-sm font-bold">450ms</p>
                </div>
                <div className="p-3 border border-border rounded-xl text-center">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">E2E Delay</p>
                  <p className="text-sm font-bold">1.2s</p>
                </div>
                <div className="p-3 border border-border rounded-xl text-center">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Confidence</p>
                  <p className="text-sm font-bold">98%</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-muted/20 border border-border/50 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand" /> Compliance & Security</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">HIPAA Data Protection</span>
                  <Badge variant="success" size="xs" shape="circle" appearance="light">Enabled</Badge>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Recording Transcription</span>
                  <Badge variant="info" size="xs" shape="circle" appearance="light">Deepgram Nova-2</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History Section (Requested) */}
      <Card className="shadow-sm border-border/60 overflow-hidden">
        <CardHeader className="border-b border-border/60 bg-muted/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Transaction History</CardTitle>
              <CardDescription>Comprehensive log of all clinic financial activities</CardDescription>
            </div>
            <Button variant="outline" size="sm">Export CSV</Button>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-border/60">
                <TableHead className="font-bold text-xs uppercase tracking-wider py-4">Transaction ID</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider py-4">Date</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider py-4">Type</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider py-4 text-right">Amount</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider py-4">Method</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider py-4">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id} className="hover:bg-muted/20 border-border/40 transition-colors">
                  <TableCell className="font-mono text-xs text-muted-foreground">{tx.id}</TableCell>
                  <TableCell className="text-sm font-medium">{tx.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded-full ${tx.amount.startsWith('+') ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                        {tx.amount.startsWith('+') ? <ArrowUpRight className="h-3 w-3 text-green-600" /> : <ArrowDownLeft className="h-3 w-3 text-red-600" />}
                      </div>
                      <span className="text-sm font-semibold">{tx.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className={`text-right font-bold ${tx.amount.startsWith('+') ? 'text-green-600' : 'text-foreground'}`}>
                    {tx.amount}
                  </TableCell>
                  <TableCell className="text-xs font-medium text-muted-foreground">{tx.method}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={tx.status === 'Success' ? 'success' : 'warning'} 
                      appearance="light" 
                      size="xs"
                    >
                      {tx.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
