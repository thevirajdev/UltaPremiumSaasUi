"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Building2, 
  Users, 
  DollarSign, 
  CreditCard, 
  Bell, 
  Mail, 
  Shield, 
  Globe, 
  Trash2, 
  Plus, 
  Save, 
  Key,
  Webhook,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Lock
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const initialTeam: any[] = [];

export default function SettingsPage() {
  const [team, setTeam] = useState(initialTeam);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");

  const handleSave = (section: string) => {
    toast.success(`${section} updated successfully`, {
      description: "Changes have been synchronized across all nodes.",
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />
    });
  };

  const deleteMember = (id: number) => {
    setTeam(team.filter(m => m.id !== id));
    toast.error("Member removed", {
      description: "Access permissions have been revoked."
    });
  };

  const addMember = () => {
    if (!newMemberEmail) return;
    const newM = {
      id: Date.now(),
      name: newMemberEmail.split('@')[0],
      email: newMemberEmail,
      role: "Manager",
      status: "online"
    };
    setTeam([...team, newM]);
    setNewMemberEmail("");
    setIsAddingMember(false);
    toast.success("Invitation sent", {
      description: `An invite has been sent to ${newMemberEmail}`
    });
  };

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black tracking-tighter text-foreground">Agency Settings</h1>
        <p className="text-muted-foreground font-medium">
          Manage your agency configuration, team members, and global platform defaults.
        </p>
      </div>

      <Tabs defaultValue="info" className="flex flex-col md:flex-row gap-8">
        <TabsList className="flex md:flex-col items-start justify-start bg-transparent h-auto p-0 gap-2 min-w-[240px]">
          <TabsTrigger value="info" className="w-full justify-start gap-3 px-4 py-3 rounded-xl data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20">
            <Building2 className="h-4 w-4" />
            Agency Info
          </TabsTrigger>
          <TabsTrigger value="team" className="w-full justify-start gap-3 px-4 py-3 rounded-xl data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20">
            <Users className="h-4 w-4" />
            Team Management
          </TabsTrigger>
          <TabsTrigger value="pricing" className="w-full justify-start gap-3 px-4 py-3 rounded-xl data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20">
            <DollarSign className="h-4 w-4" />
            Pricing Defaults
          </TabsTrigger>
          <TabsTrigger value="payment" className="w-full justify-start gap-3 px-4 py-3 rounded-xl data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20">
            <CreditCard className="h-4 w-4" />
            Billing & Payouts
          </TabsTrigger>
          <TabsTrigger value="security" className="w-full justify-start gap-3 px-4 py-3 rounded-xl data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20">
            <Lock className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <div className="flex-1">
          <TabsContent value="info" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Card className="border-border/60 shadow-none">
              <CardHeader>
                <CardTitle className="text-lg">Business Identity</CardTitle>
                <CardDescription>Update your agency's core information and public profile.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">Agency Name</Label>
                    <Input defaultValue="AIVoice OS" className="bg-muted/30 border-none h-12 focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">Business Email</Label>
                    <Input defaultValue="admin@aivoiceos.com" className="bg-muted/30 border-none h-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">Website URL</Label>
                  <Input defaultValue="https://aivoiceos.com" className="bg-muted/30 border-none h-12" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">HQ Address</Label>
                  <Input placeholder="123 AI Lane, Silicon Valley, CA" className="bg-muted/30 border-none h-12" />
                </div>
                <div className="flex justify-end pt-4 border-t border-border">
                  <Button onClick={() => handleSave("Agency information")} className="bg-primary text-primary-foreground shadow-lg shadow-primary/20 h-11 px-8 font-bold">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Card className="border-border/40 shadow-none overflow-hidden rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between bg-muted/20 pb-4">
                <div>
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-foreground/70">Active Members</CardTitle>
                  <CardDescription>Invite team members to help manage your medical agencies.</CardDescription>
                </div>
                <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-2 bg-foreground text-background hover:bg-foreground/90 h-9 font-bold">
                      <Plus className="h-4 w-4" />
                      Add Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Invite Team Member</DialogTitle>
                      <DialogDescription>
                        Send an invitation to join your agency dashboard.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Label>Email Address</Label>
                      <Input 
                        placeholder="colleague@agency.com" 
                        value={newMemberEmail}
                        onChange={(e) => setNewMemberEmail(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="ghost" onClick={() => setIsAddingMember(false)}>Cancel</Button>
                      <Button onClick={addMember}>Send Invite</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/40">
                  {team.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-5 hover:bg-muted/10 transition-colors group">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 border border-border/60">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-sm text-foreground">{member.name}</p>
                          <p className="text-xs text-muted-foreground font-medium">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary" className="bg-primary/5 text-primary border-none font-bold text-[10px]">
                          {member.role}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => deleteMember(member.id)}
                          className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Card className="border-border/60 shadow-none">
              <CardHeader>
                <CardTitle className="text-lg">Pricing Defaults</CardTitle>
                <CardDescription>Set global cost baselines for all new clinic accounts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-muted/20 p-6 space-y-4 rounded-2xl border border-border/40">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary"><DollarSign className="h-5 w-5" /></div>
                      <h4 className="font-black text-xs uppercase tracking-widest text-foreground/60">Call Rate ($/min)</h4>
                    </div>
                    <Input type="number" defaultValue="0.20" step="0.01" className="bg-background text-2xl font-black h-16 border-none shadow-sm" />
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed italic">Minimum suggested: $0.15/min for profitability.</p>
                  </div>

                  <div className="bg-muted/20 p-6 space-y-4 rounded-2xl border border-border/40">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-600"><Building2 className="h-5 w-5" /></div>
                      <h4 className="font-black text-xs uppercase tracking-widest text-foreground/60">Default Setup Fee</h4>
                    </div>
                    <Input type="number" defaultValue="1500" className="bg-background text-2xl font-black h-16 border-none shadow-sm" />
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed italic">One-time payment for infrastructure setup.</p>
                  </div>

                  <div className="bg-muted/20 p-6 space-y-4 rounded-2xl border border-indigo-500/30 bg-indigo-500/[0.03]">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-600"><Lock className="h-5 w-5" /></div>
                      <h4 className="font-black text-xs uppercase tracking-widest text-foreground/60">HIPAA Compliance ($/mo)</h4>
                    </div>
                    <Input type="number" defaultValue="300" className="bg-background text-2xl font-black h-16 border-none shadow-sm" />
                    <p className="text-xs text-indigo-600/70 font-bold leading-relaxed italic">Mandatory monthly fee for healthcare data protection.</p>
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-border">
                  <Button onClick={() => handleSave("Global pricing")} className="bg-primary text-primary-foreground shadow-lg shadow-primary/20 h-11 px-8 font-bold">
                    <Save className="h-4 w-4 mr-2" />
                    Update Defaults
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Card className="border-none shadow-xl shadow-primary/5 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden rounded-3xl p-8 transition-all hover:shadow-primary/10">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black tracking-tight text-primary-foreground">Payout Account</h3>
                  <p className="text-primary-foreground/70 font-bold uppercase tracking-widest text-[10px]">Stripe Connected • Verified</p>
                </div>
                <CreditCard className="h-10 w-10 text-primary-foreground/40" />
              </div>
              <div className="mt-8 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary-foreground/50 mb-1">Next Payout</p>
                  <p className="text-3xl font-black text-primary-foreground">$4,250.00</p>
                </div>
                <Button 
                  onClick={() => toast.info("Opening Stripe Dashboard...")}
                  className="bg-white text-primary hover:bg-white/90 font-bold px-6"
                >
                  Manage Account
                </Button>
              </div>
            </Card>

            <div className="p-6 bg-muted/20 border border-dashed border-border rounded-2xl flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="h-10 w-10 rounded-xl bg-background flex items-center justify-center text-primary border border-border/50">
                  <Plus className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">Add Backup Payment Method</p>
                  <p className="text-xs text-muted-foreground font-medium">For system fees and voice usage overflows.</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => toast.success("Stripe Checkout initialized", { description: "You will be redirected to the secure payment portal." })}
                className="font-bold border-2 hover:bg-primary/5"
              >
                Add Method
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="security" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Card className="border-border/40 shadow-none rounded-2xl overflow-hidden">
              <CardHeader className="bg-muted/10 border-b border-border/40">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-foreground/70">Change Password</CardTitle>
                <CardDescription>Update your account password and manage two-factor authentication.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">Current Password</Label>
                    <Input type="password" placeholder="••••••••" className="bg-muted/30 border-none h-12" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">New Password</Label>
                      <Input type="password" placeholder="••••••••" className="bg-muted/30 border-none h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">Confirm New Password</Label>
                      <Input type="password" placeholder="••••••••" className="bg-muted/30 border-none h-12" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-border mt-4">
                  <Button 
                    onClick={() => handleSave("Password")} 
                    className="bg-foreground text-background hover:bg-foreground/90 h-11 px-8 font-bold"
                  >
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 shadow-none rounded-2xl overflow-hidden">
              <CardHeader className="bg-muted/10 border-b border-border/40">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-foreground/70">Reset Account Access</CardTitle>
                <CardDescription>Request a secure password reset link for your account.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground">Password Recovery</p>
                      <p className="text-xs text-muted-foreground font-medium">Send a reset link to admin@aivoiceos.com</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="font-bold border-primary/20 text-primary hover:bg-primary/5"
                    onClick={() => toast.success("Reset link sent", { description: "Please check your inbox." })}
                  >
                    Send Reset Link
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 shadow-none rounded-2xl overflow-hidden">
              <CardHeader className="bg-muted/10 border-b border-border/40 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-foreground/70">Two-Factor Authentication</CardTitle>
                  <CardDescription className="text-[10px] uppercase font-bold mt-1">Enterprise Security</CardDescription>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-600 border-none">Beta Available</Badge>
              </CardHeader>
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">Protect your account</p>
                    <p className="text-xs text-muted-foreground font-medium">Add an extra layer of security with TOTP.</p>
                  </div>
                </div>
                <Switch defaultChecked onCheckedChange={(val) => toast.success(`MFA ${val ? 'Enabled' : 'Disabled'}`)} />
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
