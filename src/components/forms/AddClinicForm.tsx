"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Building2, Mic, CheckCircle2, ChevronRight, ChevronLeft, MapPin, Phone, User } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Clinic Info", description: "Basic clinic details", icon: Building2 },
  { id: 2, title: "Contact", description: "Address & phone", icon: MapPin },
  { id: 3, title: "AI Agent", description: "Configure voice agent", icon: Mic },
  { id: 4, title: "Admin", description: "Owner account", icon: User },
];

export function AddClinicForm({ onComplete }: { onComplete?: () => void }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    clinicName: "", clinicType: "", specialty: "",
    address: "", city: "", phone: "",
    agentName: "", agentVoice: "female", greetingMessage: "",
    adminName: "", adminEmail: "", adminPassword: "",
  });

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const next = () => setStep(s => Math.min(s + 1, steps.length + 1));
  const prev = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Step indicators */}
      <div className="flex items-center gap-0 mb-8">
        {steps.map((s, i) => {
          const done = step > s.id;
          const active = step === s.id;
          return (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 text-xs font-bold",
                  done ? "border-violet-500 bg-violet-500 text-white" :
                  active ? "border-violet-500 bg-violet-500/20 text-violet-400" :
                  "border-white/10 bg-white/5 text-white/25"
                )}>
                  {done ? <CheckCircle2 className="w-4 h-4" /> : s.id}
                </div>
                <span className={cn("text-[10px] font-medium hidden sm:block", active ? "text-violet-400" : done ? "text-white/50" : "text-white/20")}>
                  {s.title}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn("flex-1 h-px mx-2 transition-colors duration-500", done ? "bg-violet-500/60" : "bg-white/10")} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        {step <= steps.length && (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <div className="mb-6">
              <h3 className="text-base font-semibold text-white">{steps[step - 1]?.title}</h3>
              <p className="text-xs text-white/35 mt-0.5">{steps[step - 1]?.description}</p>
            </div>

            {step === 1 && (
              <>
                <Input label="Clinic Name" placeholder="HealthFirst Clinic" value={form.clinicName} onChange={e => update("clinicName", e.target.value)} />
                <Input label="Clinic Type" placeholder="Primary Care / Dental / Ortho…" value={form.clinicType} onChange={e => update("clinicType", e.target.value)} />
                <Input label="Specialty" placeholder="Family Medicine" value={form.specialty} onChange={e => update("specialty", e.target.value)} />
              </>
            )}

            {step === 2 && (
              <>
                <Input label="Street Address" placeholder="123 Medical Drive" leftIcon={MapPin} value={form.address} onChange={e => update("address", e.target.value)} />
                <Input label="City / State" placeholder="Austin, TX" value={form.city} onChange={e => update("city", e.target.value)} />
                <Input label="Clinic Phone" placeholder="+1 (555) 000-0000" leftIcon={Phone} type="tel" value={form.phone} onChange={e => update("phone", e.target.value)} />
              </>
            )}

            {step === 3 && (
              <>
                <Input label="Agent Name" placeholder="Alex" value={form.agentName} onChange={e => update("agentName", e.target.value)} hint="The name your AI agent introduces itself as" />
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-white/60">Agent Voice</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["female", "male"].map(v => (
                      <button key={v} onClick={() => update("agentVoice", v)}
                        className={cn("py-2.5 rounded-xl border text-sm font-medium capitalize transition-all",
                          form.agentVoice === v ? "border-violet-500/60 bg-violet-500/15 text-violet-300" : "border-white/10 bg-white/5 text-white/40 hover:text-white/60")}
                      >{v}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-white/60">Greeting Message</label>
                  <textarea
                    placeholder="Good morning! You've reached {Clinic Name}. I'm {Agent Name}, your AI assistant…"
                    value={form.greetingMessage} onChange={e => update("greetingMessage", e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-white/10 bg-white/5 text-white/70 text-sm px-3 py-2.5 placeholder:text-white/25 focus:outline-none focus:border-violet-500/60 resize-none"
                  />
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <Input label="Admin Name" placeholder="Dr. John Smith" leftIcon={User} value={form.adminName} onChange={e => update("adminName", e.target.value)} />
                <Input label="Admin Email" placeholder="admin@healthfirst.com" type="email" value={form.adminEmail} onChange={e => update("adminEmail", e.target.value)} />
                <Input label="Password" placeholder="••••••••" type="password" value={form.adminPassword} onChange={e => update("adminPassword", e.target.value)} />
              </>
            )}
          </motion.div>
        )}

        {step > steps.length && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-10 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4 shadow-xl shadow-emerald-500/25">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Clinic Added!</h3>
            <p className="text-sm text-white/40 mb-6">Your AI agent is being deployed. It'll be live within 2 minutes.</p>
            <button onClick={onComplete} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm">
              Go to Dashboard →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      {step <= steps.length && (
        <div className="flex items-center justify-between mt-8">
          <button onClick={prev} disabled={step === 1}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/10 text-white/40 hover:text-white/70 hover:bg-white/5 text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <button onClick={next}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-lg shadow-violet-500/20 transition-all"
          >
            {step === steps.length ? "Finish Setup" : "Continue"} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
