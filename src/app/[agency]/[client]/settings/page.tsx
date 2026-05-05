"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card-2";
import { 
  Settings, 
  User, 
  Users, 
  Bot, 
  Bell, 
  CreditCard, 
  Phone, 
  Mic, 
  Languages, 
  FileCode, 
  Database, 
  BrainCircuit, 
  MessageSquare, 
  Save,
  Plus,
  Trash2,
  Lock,
  Globe,
  Smartphone,
  ShieldCheck,
  FileUp,
  History,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button-2";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge-2";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ClientSettingsPage() {
  const params = useParams();
  const client = params.client as string;
  const [activeTab, setActiveTab] = useState("clinic");

  return (
    <div className="space-y-8 pb-12 max-w-6xl">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground lowercase first-letter:uppercase">
            {client} Console Settings
          </h1>
          <p className="text-muted-foreground font-medium">
            Configure clinic profile, team access, and advanced AI behavior.
          </p>
        </div>
        <Button className="h-11 px-8 gap-2 font-bold shadow-lg shadow-primary/20" onClick={() => { console.log('Saving global settings...'); toast.success('Settings Updated', { description: 'All global configurations have been synchronized.' }); }}>
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="clinic" className="flex flex-col md:flex-row gap-8" onValueChange={setActiveTab}>
        <TabsList className="flex md:flex-col items-start justify-start bg-transparent h-auto p-0 gap-2 min-w-[240px]">
          <TabsTrigger value="clinic" className="w-full justify-start gap-3 px-4 py-3 rounded-xl data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20">
            <Settings className="h-4 w-4" />
            Clinic Profile
          </TabsTrigger>
          <TabsTrigger value="team" className="w-full justify-start gap-3 px-4 py-3 rounded-xl data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20">
            <Users className="h-4 w-4" />
            Staff Management
          </TabsTrigger>
          <TabsTrigger value="vapi" className="w-full justify-start gap-3 px-4 py-3 rounded-xl data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20">
            <Bot className="h-4 w-4" />
            AI Configuration
          </TabsTrigger>
          <TabsTrigger value="notifications" className="w-full justify-start gap-3 px-4 py-3 rounded-xl data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20">
            <Bell className="h-4 w-4" />
            Alerts & Reminders
          </TabsTrigger>
          <TabsTrigger value="billing" className="w-full justify-start gap-3 px-4 py-3 rounded-xl data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20">
            <CreditCard className="h-4 w-4" />
            Payment Logic
          </TabsTrigger>
          <TabsTrigger value="security" className="w-full justify-start gap-3 px-4 py-3 rounded-xl data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20">
            <Lock className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <div className="flex-1">
          {/* Clinic Profile Tab */}
          <TabsContent value="clinic" className="mt-0 space-y-6">
            <Card className="shadow-none border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">Clinic Information</CardTitle>
                <CardDescription>Basic contact and business details for this facility.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Clinic Display Name</Label>
                    <Input defaultValue={client} className="font-bold h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Contact Email</Label>
                    <Input defaultValue={`reception@${client}.com`} className="h-11" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Clinic Address</Label>
                  <Textarea placeholder="Enter full business address..." className="min-h-[100px] resize-none" />
                </div>
                <Button onClick={() => { console.log('Saving profile...'); toast.success('Profile Saved', { description: 'Clinic profile information updated successfully.' }); }}>Save Clinic Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Management Tab */}
          <TabsContent value="team" className="mt-0 space-y-6">
            <Card className="shadow-none border-border/60">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-indigo-600">
                    <Users className="h-5 w-5" />
                    <CardTitle className="text-lg">Staff & Permissions</CardTitle>
                  </div>
                  <CardDescription>Invite and manage access levels for your clinic staff.</CardDescription>
                </div>
                <Button className="gap-2 font-bold" onClick={() => toast.info('Invite System', { description: 'Loading team member invitation workflow...' })}>
                  <Plus className="h-4 w-4" />
                  Add Member
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y border-t border-border/40">
                  {[
                    { name: "Dr. Sarah Chen", role: "Owner", email: "sarah@clinic.com" },
                    { name: "Jessica Smith", role: "Manager", email: "jess@clinic.com" },
                  ].map((member, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/5">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                          {member.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{member.name}</p>
                          <p className="text-[10px] text-muted-foreground font-medium">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary" size="xs" className="font-bold">{member.role}</Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-600" onClick={() => toast.error('Access Revoked', { description: `Revoking system access for ${member.name}.` })}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* VAPI / AI Config Tab (Deep Details) */}
          <TabsContent value="vapi" className="mt-0 space-y-8">
            <Card className="shadow-none border-border/60">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary">
                   <BrainCircuit className="h-5 w-5" />
                   <CardTitle className="text-lg">AI Brain & Voice Engine</CardTitle>
                </div>
                <CardDescription>Select the underlying model and synthetic voice personality.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">AI Model Selection</Label>
                    <select className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors font-bold outline-none">
                      <option>GPT-4o (Most Intelligent)</option>
                      <option>Claude 3.5 Sonnet</option>
                      <option>GPT-4 Turbo</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Voice Persona</Label>
                    <select className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors font-bold outline-none">
                      <option>Allison (Warm, Professional)</option>
                      <option>Mark (Authoritative, Clear)</option>
                      <option>Sarah (Friendly, Medical Assistant)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Primary Language</Label>
                    <div className="flex items-center gap-3">
                       <Globe className="h-4 w-4 text-muted-foreground" />
                       <select className="flex-1 h-11 bg-transparent border-none font-bold text-sm outline-none">
                         <option>English (US)</option>
                         <option>Spanish (ES)</option>
                         <option>Hindi (IN)</option>
                       </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Transcriber Provider</Label>
                    <Badge variant="primary" appearance="light" className="h-11 w-full justify-start px-4 font-bold border-none">Deepgram Nova-2 (Optimized)</Badge>
                  </div>
                </div>
                <Button onClick={() => { console.log('Saving AI config...'); toast.success('AI Config Active', { description: 'Neural model and voice settings have been updated.' }); }}>Save AI Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-0 space-y-6">
            <Card className="shadow-none border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">Communication Settings</CardTitle>
                <CardDescription>Automated reminders and facility-level alert configurations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-border/60 rounded-xl">
                   <div className="space-y-1">
                      <p className="text-sm font-bold text-foreground">Appointment Reminders (SMS)</p>
                      <p className="text-[10px] text-muted-foreground">Send auto-SMS to patients 24h before booking.</p>
                   </div>
                   <div className="size-6 bg-primary rounded-full ring-4 ring-primary/10"></div>
                </div>
                <div className="flex items-center justify-between p-4 border border-border/60 rounded-xl">
                   <div className="space-y-1">
                      <p className="text-sm font-bold text-foreground">Critical Lead Alerts (Email)</p>
                      <p className="text-[10px] text-muted-foreground">Notify owner when a new high-intent lead is captured.</p>
                   </div>
                   <div className="size-6 bg-primary rounded-full ring-4 ring-primary/10"></div>
                </div>
                <Button onClick={() => { console.log('Saving notifications...'); toast.success('Notifications Configured', { description: 'Communication triggers have been updated.' }); }}>Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing / Payment Settings Tab */}
          <TabsContent value="billing" className="mt-0 space-y-6">
            <Card className="shadow-none border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">Payment Methods & Logic</CardTitle>
                <CardDescription>Configure how usage credits are replenished.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="p-6 border-2 border-primary/20 bg-primary/[0.02] rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-white border border-border/60 rounded-xl shadow-sm">
                          <CreditCard className="h-6 w-6 text-primary" />
                       </div>
                       <div>
                          <p className="text-sm font-bold">Visa Ending in 4242</p>
                          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Expires 12/28 • Default Payment</p>
                       </div>
                    </div>
                    <Button variant="outline" size="sm" className="font-bold border-border/60" onClick={() => toast.info('Payment Portal', { description: 'Redirecting to secure billing dashboard...' })}>Manage Billing</Button>
                 </div>
                 <Button variant="secondary" onClick={() => toast.success('Generating History', { description: 'Preparing PDF of all historical invoices...' })}>Download Invoice History</Button>
               </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="mt-0 space-y-6">
            <Card className="shadow-none border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">Security & Privacy</CardTitle>
                <CardDescription>Manage your clinic dashboard credentials and access logs.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current Password</Label>
                    <Input type="password" placeholder="••••••••" className="h-11" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">New Password</Label>
                      <Input type="password" placeholder="••••••••" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Confirm Password</Label>
                      <Input type="password" placeholder="••••••••" className="h-11" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-border/40">
                  <Button className="bg-foreground text-background hover:bg-foreground/90 font-bold px-6" onClick={() => { console.log('Updating password...'); toast.success('Security Updated', { description: 'Account password changed successfully.' }); }}>
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-none border-border/60">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                  <CardTitle className="text-lg">HIPAA Compliance & Privacy</CardTitle>
                </div>
                <CardDescription>Manage your Business Associate Agreement (BAA) and data integrity settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-emerald-500/20 bg-emerald-500/5 rounded-2xl">
                   <div className="space-y-1">
                      <p className="text-sm font-bold text-foreground flex items-center gap-2">
                        BAA Status: Active
                        <Badge variant="success" appearance="light" size="xs" className="bg-emerald-500 text-white border-none">Protected</Badge>
                      </p>
                      <p className="text-[10px] text-muted-foreground font-medium">Your data is being handled according to HIPAA guidelines. Monthly Fee: $300.00</p>
                   </div>
                   <Button variant="outline" size="sm" className="font-bold border-emerald-500/20 text-emerald-600 hover:bg-emerald-500/10" onClick={() => toast.info('Accessing BAA', { description: 'Opening HIPAA legal documents viewer...' })}>View BAA</Button>
                </div>
                <div className="flex items-center justify-between p-4 border border-border/60 rounded-xl">
                   <div className="space-y-1">
                      <p className="text-sm font-bold text-foreground">Data Encryption (AES-256)</p>
                      <p className="text-[10px] text-muted-foreground">All patient recordings and transcripts are encrypted at rest.</p>
                   </div>
                   <div className="size-6 bg-emerald-500 rounded-full ring-4 ring-emerald-500/10"></div>
                </div>
                <Button className="w-full h-11 font-bold shadow-lg shadow-primary/10" onClick={() => { console.log('Saving compliance settings...'); toast.success('Compliance Sync', { description: 'Data integrity settings updated in line with HIPAA.' }); }}>Save Compliance Configuration</Button>
              </CardContent>
            </Card>

            <Card className="shadow-none border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">Access Recovery</CardTitle>
                <CardDescription>Request a secure password reset link for your account administrator.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between p-4 border border-border/40 rounded-2xl bg-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground">Password Recovery</p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">Admin: admin@clinic.com</p>
                    </div>
                  </div>
                  <Button variant="outline" className="font-bold border-primary/20 text-primary hover:bg-primary/10" onClick={() => toast.success('Recovery Sent', { description: 'Password reset link dispatched to admin@clinic.com.' })}>
                    Send Reset Link
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-none border-border/60 bg-muted/20">
               <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-sm font-bold uppercase tracking-tight">Security Audit Log</CardTitle>
                    <CardDescription className="text-xs">Recent login attempts and configuration changes.</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 gap-2 text-[10px] uppercase font-bold tracking-widest">
                    <History className="h-3 w-3" />
                    View All
                  </Button>
               </CardHeader>
               <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-xs p-2.5 bg-background rounded-lg border border-border/40">
                     <span className="text-muted-foreground font-medium">Successful Login • Chrome (Windows)</span>
                     <span className="font-mono text-muted-foreground/60 text-[10px]">Today, 10:45 AM</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2.5 bg-background rounded-lg border border-border/40">
                     <span className="text-muted-foreground font-medium">Prompt Modified • sarah@clinic.com</span>
                     <span className="font-mono text-muted-foreground/60 text-[10px]">Yesterday, 02:20 PM</span>
                  </div>
               </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
