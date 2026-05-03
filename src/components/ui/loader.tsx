"use client";

import { Spinner } from "./spinner";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  text?: string;
  size?: number;
  fullPage?: boolean;
}

export function Loader({ 
  className, 
  text = "Loading...", 
  size = 24,
  fullPage = false 
}: LoaderProps) {
  const content = (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <Spinner size={size} />
      {text && <p className="text-zinc-500 text-sm font-medium animate-pulse">{text}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07070d]/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
}
