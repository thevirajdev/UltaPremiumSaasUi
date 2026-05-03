"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Stethoscope, Mail, Lock, User, Building2, Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: "", clinic: "", email: "", password: "" });
  const u = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div className="min-h-screen bg-[#07070d] flex items-center justify-center px-4 relative overflow-hidden py-12">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-600/8 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-xl shadow-violet-500/25 mb-4">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">Start your free trial</h1>
          <p className="text-sm text-white/35 mt-1">No credit card required · 14 days free</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-4">
          <Input label="Full Name" placeholder="Dr. Jane Smith" leftIcon={User} value={form.name} onChange={u("name")} />
          <Input label="Agency / Clinic Name" placeholder="HealthFirst Agency" leftIcon={Building2} value={form.clinic} onChange={u("clinic")} />
          <Input label="Work Email" type="email" placeholder="jane@healthfirst.com" leftIcon={Mail} value={form.email} onChange={u("email")} />
          <Input
            label="Password"
            type={showPass ? "text" : "password"}
            placeholder="Min. 8 characters"
            leftIcon={Lock}
            rightIcon={showPass ? EyeOff : Eye}
            onRightIconClick={() => setShowPass(s => !s)}
            value={form.password}
            onChange={u("password")}
          />

          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-violet-500/20 transition-all duration-300 mt-2">
            Create Account →
          </button>

          <p className="text-[11px] text-white/20 text-center leading-relaxed">
            By signing up you agree to our{" "}
            <Link href="#" className="text-white/40 underline">Terms</Link> and{" "}
            <Link href="#" className="text-white/40 underline">Privacy Policy</Link>
          </p>
        </div>

        <p className="text-center text-sm text-white/25 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
