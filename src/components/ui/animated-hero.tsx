"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

import { FloatingPaths } from "./background-paths";
import MotionButton from "./motion-button";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["human-like", "efficient", "automated", "HIPAA-safe", "intelligent"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="flex gap-8 pt-24 pb-0 lg:pt-32 lg:pb-0 items-center justify-center flex-col">
          <div>
            <Button variant="secondary" size="sm" className="gap-4">
              Explore the ClinicAI Platform <MoveRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-4xl tracking-tighter text-center font-regular">
              <span className="text-foreground">Medical Voice AI that is</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-foreground"
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              The Operating System for Medical Voice AI. Automate your clinic's front desk with 
              24/7 human-like voice receptionists that book appointments and sync 
              directly with your EMR.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-4 border-foreground/20 text-foreground hover:bg-foreground/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10 transition-all rounded-full h-14"
              onClick={() => window.location.href = '/#contact'}
            >
              Jump on a call <PhoneCall className="w-4 h-4" />
            </Button>
            <MotionButton label="Sign up here" onClick={() => window.location.href = '/felix/city-dental/appointments'} />
          </div>

          <div className="flex items-center rounded-full border border-border bg-background/50 backdrop-blur-sm p-1 shadow shadow-black/5 mt-4">
            <div className="flex -space-x-1.5">
              <img
                className="rounded-full ring-1 ring-background object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&q=80"
                width={24}
                height={24}
                alt="Avatar 01"
              />
              <img
                className="rounded-full ring-1 ring-background object-cover"
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&q=80"
                width={24}
                height={24}
                alt="Avatar 02"
              />
              <img
                className="rounded-full ring-1 ring-background object-cover"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&q=80"
                width={24}
                height={24}
                alt="Avatar 03"
              />
              <img
                className="rounded-full ring-1 ring-background object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&q=80"
                width={24}
                height={24}
                alt="Avatar 04"
              />
            </div>
            <p className="px-2 text-xs text-muted-foreground">
              Trusted by <strong className="font-medium text-foreground">60K+</strong> users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
