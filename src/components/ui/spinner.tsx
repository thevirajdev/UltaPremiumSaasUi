"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: number;
  className?: string;
}

export const Spinner = ({ size = 20, className }: SpinnerProps) => {
  return (
    <div 
      className={cn("relative inline-block", className)} 
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="spinner-blade" />
        ))}
      </div>
    </div>
  );
};
