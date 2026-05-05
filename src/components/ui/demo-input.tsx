"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { useId } from "react";

function Component() {
  const id = useId();
  return (
    <div className="space-y-2 w-full">
      <Label htmlFor={id}>Stay Informed</Label>
      <div className="relative">
        <Input id={id} className="pe-9" placeholder="Enter your agency email" type="email" />
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Subscribe"
        >
          <Send size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export { Component as DemoInput };
