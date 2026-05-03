"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressStep {
  label: string;
  duration: number;
}

const defaultSteps: ProgressStep[] = [
  { label: "Creating clinic profile…", duration: 800 },
  { label: "Configuring AI voice agent…", duration: 1200 },
  { label: "Deploying to Vapi infrastructure…", duration: 1500 },
  { label: "Running HIPAA compliance checks…", duration: 900 },
  { label: "Going live!", duration: 600 },
];

interface SetupProgressProps {
  steps?: ProgressStep[];
  onComplete?: () => void;
}

export function SetupProgress({ steps = defaultSteps, onComplete }: SetupProgressProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let stepIdx = 0;
    let overall = 0;
    const totalDuration = steps.reduce((s, st) => s + st.duration, 0);

    const runStep = () => {
      if (stepIdx >= steps.length) {
        setProgress(100);
        setDone(true);
        onComplete?.();
        return;
      }
      setCurrentStep(stepIdx);
      const elapsed = steps.slice(0, stepIdx).reduce((s, st) => s + st.duration, 0);
      const stepDur = steps[stepIdx].duration;

      const startTime = Date.now();
      const tick = () => {
        const delta = Date.now() - startTime;
        const pct = Math.min((elapsed + delta) / totalDuration, 1) * 100;
        setProgress(pct);
        if (delta < stepDur) {
          animRef.current = setTimeout(tick, 16);
        } else {
          stepIdx++;
          runStep();
        }
      };
      tick();
    };

    runStep();
    return () => { if (animRef.current) clearTimeout(animRef.current); };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto py-8">
      {!done ? (
        <>
          {/* Animated ring */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                <circle
                  cx="48" cy="48" r="40" fill="none"
                  stroke="url(#progressGrad)" strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                  style={{ transition: "stroke-dashoffset 0.1s linear" }}
                />
                <defs>
                  <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-2.5 mb-6">
            {steps.map((s, i) => (
              <div key={i} className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300",
                i === currentStep ? "bg-violet-500/10 border border-violet-500/20" :
                i < currentStep ? "opacity-50" : "opacity-20"
              )}>
                <div className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                  i < currentStep ? "bg-emerald-500" : i === currentStep ? "bg-violet-500" : "bg-white/10"
                )}>
                  {i < currentStep
                    ? <CheckCircle2 className="w-3 h-3 text-white" />
                    : i === currentStep
                    ? <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    : <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  }
                </div>
                <span className={cn("text-sm", i === currentStep ? "text-white font-medium" : "text-white/50")}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Bar */}
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500"
              style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
            />
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center py-4"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4 shadow-xl shadow-emerald-500/25">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Setup Complete!</h3>
          <p className="text-sm text-white/40">Your AI agent is live and ready to take calls.</p>
        </motion.div>
      )}
    </div>
  );
}
