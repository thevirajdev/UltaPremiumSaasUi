"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Building2, 
  Users, 
  Activity, 
  Zap, 
  CreditCard,
  ArrowUpRight,
  HardDrive,
  Plus
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { toast } from "sonner";
import { useAgencies } from "@/hooks/use-local-data";
import { Button } from "@/components/ui/button-2";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminDashboard() {
  const { data: agencies, add: addAgency, loading } = useAgencies();
  
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [newAgency, setNewAgency] = React.useState({ 
    name: "", 
    email: "",
    credits: "0",
    revenue: "0"
  });

  const stats = useMemo(() => {
    const totalAgencies = agencies.length;
    const totalCredits = agencies.reduce((acc, a) => acc + (a.credits || 0), 0);
    const totalRevenue = agencies.reduce((acc, a) => acc + (a.revenue || 0), 0);
    
    return [
      { label: "Total Agencies", value: totalAgencies.toString(), icon: Building2, trend: totalAgencies > 0 ? "Live" : "No data", color: "text-blue-500" },
      { label: "System Health", value: "Optimal", icon: Activity, trend: "99.9% Uptime", color: "text-green-500" },
      { label: "Total AI Credits", value: totalCredits >= 1000 ? `${(totalCredits / 1000).toFixed(1)}k` : totalCredits.toString(), icon: Zap, trend: totalAgencies > 0 ? "Synced" : "0 consumption", color: "text-amber-500" },
      { label: "Platform Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: CreditCard, trend: totalAgencies > 0 ? "Active" : "$0 Growth", color: "text-primary" },
    ];
  }, [agencies]);

  const chartData = useMemo(() => {
    if (agencies.length === 0) return [];
    
    // Create a simple growth chart based on actual agencies
    // For a real app, this would be historical monthly data. 
    // Here we'll show actual total revenue as the latest point.
    return [
      { name: 'Start', revenue: 0 },
      { name: 'Current', revenue: agencies.reduce((acc, a) => acc + (a.revenue || 0), 0) },
    ];
  }, [agencies]);

  const handleAddAgency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgency.name || !newAgency.email) return;
    
    addAgency({
      id: Math.random().toString(36).substring(7),
      name: newAgency.name,
      email: newAgency.email,
      credits: parseInt(newAgency.credits) || 0,
      revenue: parseInt(newAgency.revenue) || 0,
      status: "Active",
      createdAt: new Date().toISOString()
    });
    
    setNewAgency({ name: "", email: "", credits: "0", revenue: "0" });
    setIsAddModalOpen(false);
    toast.success("Agency added successfully!");
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Super Admin Overview</h1>
          <p className="text-muted-foreground mt-1 text-lg font-medium">Platform-wide storage allocation and AI Credit analytics.</p>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary shadow-lg shadow-primary/20">
              <Plus className="h-4 w-4" />
              Add Agency
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Agency</DialogTitle>
              <DialogDescription>Enter details to onboard a new agency to the platform.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddAgency} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Agency Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g. Nexus Health" 
                  value={newAgency.name}
                  onChange={(e) => setNewAgency({ ...newAgency, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Admin Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@nexus.com" 
                  value={newAgency.email}
                  onChange={(e) => setNewAgency({ ...newAgency, email: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="credits">Initial Credits</Label>
                  <Input 
                    id="credits" 
                    type="number"
                    placeholder="0" 
                    value={newAgency.credits}
                    onChange={(e) => setNewAgency({ ...newAgency, credits: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="revenue">Initial Revenue ($)</Label>
                  <Input 
                    id="revenue" 
                    type="number"
                    placeholder="0" 
                    value={newAgency.revenue}
                    onChange={(e) => setNewAgency({ ...newAgency, revenue: e.target.value })}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">Create Agency</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="cursor-pointer"
            onClick={() => toast.info(`${stat.label} Breakdown`)}
          >
            <Card className="p-6 bg-background/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 group">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl bg-muted/50 ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                {agencies.length > 0 && (
                  <div className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.trend}
                  </div>
                )}
              </div>
              <div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-2xl font-black text-foreground mt-1 tracking-tighter">{stat.value}</h3>
                <p className="text-[10px] font-bold text-muted-foreground mt-2 opacity-70 tracking-tight">{stat.trend}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {agencies.length === 0 ? (
        <Card className="p-12 flex flex-col items-center justify-center text-center bg-muted/20 border-dashed border-2">
          <div className="p-4 bg-muted rounded-full mb-4">
            <Building2 className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold">No Agencies Yet</h3>
          <p className="text-muted-foreground max-w-sm mt-2">
            Get started by adding your first medical agency to manage clinics and AI assistants.
          </p>
          <Button onClick={() => setIsAddModalOpen(true)} className="mt-6" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add First Agency
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2 p-8 bg-background/50 backdrop-blur-sm border-border/50">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold text-foreground tracking-tight italic">Financial Performance</h3>
                <p className="text-sm text-muted-foreground mt-1 font-medium">Growth overview across setup fees and maintenance tiers.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Revenue</span>
                </div>
              </div>
            </div>
            
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 700 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 700 }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: 700,
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Resource Consumption */}
          <Card className="p-8 bg-background/50 backdrop-blur-sm border-border/50">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-foreground tracking-tight italic">Top Resource Consumers</h3>
              <p className="text-sm text-muted-foreground mt-1 font-medium">Aggregated AI Credits used by agency assistants.</p>
            </div>
            
            <div className="space-y-8">
              {agencies.slice(0, 5).map((agency, i) => (
                <div key={agency.id} className="space-y-2 cursor-pointer group" onClick={() => toast.info(`${agency.name} Usage Profile`)}>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-foreground">{agency.name}</span>
                    <span className="text-[10px] font-black text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full">{agency.credits >= 1000 ? `${(agency.credits / 1000).toFixed(0)}k` : agency.credits} Credits</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((agency.credits / 100000) * 100, 100)}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                      className="h-full bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.4)]"
                    />
                  </div>
                </div>
              ))}
              {agencies.length === 0 && (
                <p className="text-center text-muted-foreground text-xs italic py-8">No agency data to display</p>
              )}
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10">
              <div className="flex items-center gap-3 mb-2">
                <HardDrive className="w-5 h-5 text-blue-500" />
                <span className="text-xs font-black text-foreground uppercase tracking-widest">Storage Status</span>
              </div>
              <p className="text-[10px] text-muted-foreground font-medium leading-relaxed mb-4">Total data across all patient records and knowledge bases.</p>
              <div className="text-2xl font-black text-foreground tracking-tighter">
                {(agencies.length * 0.01).toFixed(2)} / 2.0 TB
              </div>
              <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(agencies.length * 0.01 / 2) * 100}%` }} />
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
