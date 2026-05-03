"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ButtonBorderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function ButtonBorder({ children, className, ...props }: ButtonBorderProps) {
  return (
    <Button variant={"outline"} className={cn("relative overflow-hidden group", className)} {...props}>
      <div
        className={cn(
          "-inset-px pointer-events-none absolute rounded-[inherit] border-2 border-transparent border-inset [mask-clip:padding-box,border-box]",
          "[mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
        )}
      >
        <motion.div
          className={cn(
            "absolute aspect-square bg-gradient-to-r from-transparent via-primary to-primary opacity-0 group-hover:opacity-100 transition-opacity"
          )}
          animate={{
            offsetDistance: ["0%", "100%"],
          }}
          style={{
            width: 40,
            offsetPath: `rect(0 auto auto 0 round 8px)`,
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
            ease: "linear",
          }}
        />
      </div>
      {children}
    </Button>
  );
}
