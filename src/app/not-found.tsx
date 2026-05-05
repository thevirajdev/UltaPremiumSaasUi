"use client";

import { Header } from "@/components/ui/header-2";
import { DemoFooter7 } from "@/components/ui/demo-footer-7";
import { DemoAnimatedFooter } from "@/components/ui/demo-animated-footer";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { NotFound } from "@/components/ui/ghost-404-page";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoginCard from "@/components/ui/login-card";
import { cn } from "@/lib/utils";

export default function NotFoundPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <main className="relative min-h-screen w-full flex flex-col">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <AuroraBackground 
          className="h-full w-full opacity-100 dark:opacity-0" 
          showPaths={false}
        />
        <div 
          className={cn(
            'absolute inset-0 size-full opacity-0 dark:opacity-100',
            'bg-[linear-gradient(to_right,hsl(var(--foreground)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.05)_1px,transparent_1px)]',
            'bg-[size:32px_32px]',
            '[mask-image:radial-gradient(ellipse_at_center,transparent_0%,var(--background)_100%)]',
          )}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header onOpenLogin={() => setIsLoginOpen(true)} />
        
        <div className="flex-1 flex items-center justify-center">
          <NotFound />
        </div>

        {/* Footer Section with Grid */}
        <div className="relative w-full">
          <div 
            className={cn(
              'z-0 pointer-events-none absolute inset-0 size-full opacity-0 dark:opacity-100',
              'bg-[linear-gradient(to_right,hsl(var(--foreground)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.05)_1px,transparent_1px)]',
              'bg-[size:32px_32px]',
              '[mask-image:radial-gradient(ellipse_at_center,transparent_0%,var(--background)_100%)]',
            )}
          />
          <DemoFooter7 />
          <DemoAnimatedFooter />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isLoginOpen && (
          <LoginCard onClose={() => setIsLoginOpen(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}
