"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Building2, 
  Calendar,
  CreditCard,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Plus,
  Zap
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button-2";
import { Badge } from "@/components/ui/badge-2";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useAgencies } from "@/hooks/use-local-data";
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

export default function AgencyListPage() {
  const { data: agencies, add: addAgency, update: updateAgency, loading } = useAgencies();
  const [searchFilter, setSearchFilter] = React.useState("");
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  
  const [newAgency, setNewAgency] = React.useState({ 
    name: "", 
    email: "",
    password: "",
    credits: "0",
    revenue: "0"
  });

  const [editingAgency, setEditingAgency] = React.useState<any>(null);

  const filteredAgencies = useMemo(() => {
    return agencies.filter(a => 
      a.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      a.email.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [agencies, searchFilter]);

  const handleAddAgency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgency.name || !newAgency.email) return;
    
    addAgency({
      id: Math.random().toString(36).substring(7),
      name: newAgency.name,
      email: newAgency.email,
      password: newAgency.password,
      credits: parseInt(newAgency.credits) || 0,
      revenue: parseInt(newAgency.revenue) || 0,
      status: "Active",
      createdAt: new Date().toISOString()
    });
    
    setNewAgency({ name: "", email: "", password: "", credits: "0", revenue: "0" });
    setIsAddModalOpen(false);
    toast.success("Agency added successfully!");
  };

  const handleEditClick = (agency: any) => {
    setEditingAgency({
      ...agency,
      credits: agency.credits.toString(),
      revenue: agency.revenue.toString(),
      password: agency.password || ""
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateAgency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAgency) return;

    const updates: any = {
      name: editingAgency.name,
      email: editingAgency.email,
      credits: parseInt(editingAgency.credits) || 0,
      revenue: parseInt(editingAgency.revenue) || 0,
      status: editingAgency.status
    };

    if (editingAgency.password) {
      updates.password = editingAgency.password;
    }

    updateAgency(editingAgency.id, updates);

    setIsEditModalOpen(false);
    setEditingAgency(null);
    toast.success("Agency updated successfully!");
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Agency Management</h1>
          <p className="text-muted-foreground mt-1 text-lg">Monitor and manage all onboarded medical agencies.</p>
        </div>

        <div className="flex gap-2">
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-full px-6 shadow-lg shadow-primary/20 gap-2">
                <Plus className="h-4 w-4" /> Add New Agency
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
                <div className="grid grid-cols-2 gap-4">
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
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      value={newAgency.password}
                      onChange={(e) => setNewAgency({ ...newAgency, password: e.target.value })}
                      required
                    />
                  </div>
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
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Agency</DialogTitle>
            <DialogDescription>Modify the configuration for {editingAgency?.name}.</DialogDescription>
          </DialogHeader>
          {editingAgency && (
            <form onSubmit={handleUpdateAgency} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Agency Name</Label>
                <Input 
                  id="edit-name" 
                  value={editingAgency.name}
                  onChange={(e) => setEditingAgency({ ...editingAgency, name: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Admin Email</Label>
                  <Input 
                    id="edit-email" 
                    type="email" 
                    value={editingAgency.email}
                    onChange={(e) => setEditingAgency({ ...editingAgency, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-password">Password</Label>
                  <Input 
                    id="edit-password" 
                    type="password" 
                    placeholder="Leave blank to keep current" 
                    value={editingAgency.password}
                    onChange={(e) => setEditingAgency({ ...editingAgency, password: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-credits">AI Credits</Label>
                  <Input 
                    id="edit-credits" 
                    type="number"
                    value={editingAgency.credits}
                    onChange={(e) => setEditingAgency({ ...editingAgency, credits: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-revenue">Revenue ($)</Label>
                  <Input 
                    id="edit-revenue" 
                    type="number"
                    value={editingAgency.revenue}
                    onChange={(e) => setEditingAgency({ ...editingAgency, revenue: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <select 
                  id="edit-status"
                  className="w-full bg-background border border-border rounded-lg p-2 text-sm"
                  value={editingAgency.status}
                  onChange={(e) => setEditingAgency({ ...editingAgency, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <Button type="submit" className="w-full">Save Changes</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Pricing Banner */}
      <Card className="p-6 bg-primary/5 border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground tracking-tight italic">Standard Pricing Model</h3>
            <p className="text-muted-foreground text-sm font-medium">Applied to all new agencies by default</p>
          </div>
        </div>
        <div className="flex gap-8 relative z-10">
          <div className="text-center">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Setup Cost</p>
            <p className="text-2xl font-black text-primary tracking-tighter">$1,000</p>
            <p className="text-[10px] text-muted-foreground font-medium">One-time payment</p>
          </div>
          <div className="w-px h-12 bg-primary/20" />
          <div className="text-center">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Maintenance</p>
            <p className="text-2xl font-black text-primary tracking-tighter">$100/mo</p>
            <p className="text-[10px] text-muted-foreground font-medium">Platform fee</p>
          </div>
        </div>
      </Card>

      {/* Filter Bar */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            placeholder="Search agencies by name or email..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full bg-background/50 border border-border/50 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
          />
        </div>
        <Button variant="outline" className="rounded-2xl gap-2 border-border/50 px-6 font-semibold" onClick={() => toast.info("Filter functionality coming soon")}>
          <Filter className="w-4 h-4" /> Filters
        </Button>
      </div>

      {/* Agency Table/Cards */}
      <div className="grid gap-6">
        {filteredAgencies.map((agency, i) => (
          <motion.div
            key={agency.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="p-6 bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 group">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Agency Info */}
                <div className="flex items-center gap-4 lg:w-1/4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl shadow-inner uppercase">
                    {agency.name[0]}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-foreground truncate tracking-tight">{agency.name}</h3>
                    <p className="text-xs text-muted-foreground truncate font-medium">{agency.email}</p>
                  </div>
                </div>

                {/* Status & Plan */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Status</p>
                    <Badge className={cn(
                      "rounded-full px-3 py-0.5 text-[10px] font-bold uppercase",
                      agency.status === 'Active' 
                        ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" 
                        : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                    )}>
                      {agency.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Joined Date</p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      {new Date(agency.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">AI Credits</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                      <Zap className="w-3 h-3 text-amber-500" />
                      {agency.credits >= 1000 ? `${(agency.credits / 1000).toFixed(1)}k` : agency.credits}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Platform Revenue</p>
                    <div className="text-xs font-bold text-foreground">
                       <span className="text-primary font-black">${agency.revenue?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 lg:ml-auto">
                  <Button variant="ghost" size="sm" className="rounded-xl font-bold text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground" onClick={() => handleEditClick(agency)}>
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-xl border-border/50 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300" onClick={() => toast.success("Accessing Portal", { description: `Redirecting to ${agency.name} dashboard.` })}>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-xl h-9 w-9" onClick={() => toast.info("More Actions")}>
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
        {filteredAgencies.length === 0 && (
          <div className="p-20 text-center border-2 border-dashed rounded-3xl bg-muted/20">
             <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
             <p className="font-bold text-muted-foreground">No agencies found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
