"use client";

import { Badge } from "@/components/ui/badge-2";
import { Button } from "@/components/ui/button-2";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card-2";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck,
  DollarSign,
  Mic2,
  Zap,
  Globe,
  Database,
  CheckCircle2,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function ClinicRegistrationForm({ onCancel, onSuccess }: { onCancel?: () => void, onSuccess?: () => void }) {
  const [formData, setFormData] = useState({
    clinicName: "",
    doctorName: "",
    email: "",
    phone: "",
    region: "us-east",
    voiceProvider: "deepgram",
    callRate: "0.15",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registering Clinic:', formData);
    toast.success('Clinic Registered Successfully', {
      description: `${formData.clinicName} has been onboarded with a $150 setup fee.`,
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />
    });
    if (onSuccess) onSuccess();
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex items-center justify-center py-2 px-1">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Clinic Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Clinic Name</Label>
                  <Input 
                    placeholder="Central Medical Center" 
                    required 
                    value={formData.clinicName}
                    onChange={(e) => updateField('clinicName', e.target.value)}
                    className="h-11 font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Primary Doctor</Label>
                  <Input 
                    placeholder="Dr. Sarah Johnson" 
                    required 
                    value={formData.doctorName}
                    onChange={(e) => updateField('doctorName', e.target.value)}
                    className="h-11 font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Business Email</Label>
                <Input 
                  type="email" 
                  placeholder="contact@clinic.com" 
                  required 
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="h-11 font-bold"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Phone Number</Label>
                  <Input 
                    placeholder="+1 (555) 000-0000" 
                    required 
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="h-11 font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Region</Label>
                  <Select value={formData.region} onValueChange={(val) => updateField('region', val)}>
                    <SelectTrigger className="h-11 font-bold">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us-east">US East (N. Virginia)</SelectItem>
                      <SelectItem value="us-west">US West (Oregon)</SelectItem>
                      <SelectItem value="eu-west">Europe (London)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Voice Provider</Label>
                  <Select value={formData.voiceProvider} onValueChange={(val) => updateField('voiceProvider', val)}>
                    <SelectTrigger className="h-11 font-bold">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deepgram">Deepgram</SelectItem>
                      <SelectItem value="elevenlabs">ElevenLabs</SelectItem>
                      <SelectItem value="openai">OpenAI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Default Call Rate ($/min)</Label>
                  <Input 
                    type="number"
                    step="0.01"
                    value={formData.callRate}
                    onChange={(e) => updateField('callRate', e.target.value)}
                    className="h-11 font-black text-primary"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
              <h4 className="font-bold flex items-center gap-2 text-primary mb-2">
                <DollarSign className="h-5 w-5" />
                Flat Rate Implementation
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We've simplified our onboarding. All medical facilities now benefit from a flat <strong>$150 setup fee</strong>, including full HIPAA-compliant voice integration and 24/7 support.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <Card className="bg-muted/10 border-dashed border-2 border-border shadow-none overflow-hidden">
              <CardContent className="p-6">
                <h4 className="text-[10px] font-black text-foreground uppercase tracking-widest flex items-center gap-2 mb-6">
                  <Zap className="h-4 w-4 text-amber-500" />
                  Implementation Summary
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-background rounded-xl border border-border/40">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-600">
                        <DollarSign className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-muted-foreground">Markup Rate</span>
                    </div>
                    <span className="font-black text-sm text-foreground">${formData.callRate}/min</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-background rounded-xl border border-indigo-500/20">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-600">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-muted-foreground">Compliance Fee</span>
                    </div>
                    <span className="font-black text-sm text-foreground">$300.00/mo</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-background rounded-xl border border-border/40">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600">
                        <Mic2 className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-muted-foreground">Voice Engine</span>
                    </div>
                    <span className="font-black text-sm text-primary uppercase">{formData.voiceProvider}</span>
                  </div>
                </div>
              </CardContent>
              <Separator className="bg-border/40" />
              <CardContent className="p-5 bg-primary/5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Total Setup Cost</span>
                  <span className="text-2xl font-black text-primary">$150.00</span>
                </div>
              </CardContent>
            </Card>

            <div className="p-6 rounded-2xl border border-border/40 bg-muted/5">
              <h5 className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Legal Notice</h5>
              <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
                By registering, you agree to the HIPAA Business Associate Agreement (BAA). Provisioning of Vapi and Twilio assets is immediate.
              </p>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex items-center justify-end space-x-4 pb-4">
          <Button type="button" variant="ghost" className="font-bold" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-primary text-primary-foreground shadow-lg shadow-primary/20 px-10 h-14 font-black uppercase tracking-widest text-xs">
            Confirm & Register
          </Button>
        </div>
      </form>
    </div>
  );
}
