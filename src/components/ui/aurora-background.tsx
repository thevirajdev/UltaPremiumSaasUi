"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { FloatingPaths } from "./background-paths";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  showRadialGradient?: boolean;
  showPaths?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  showPaths = true,
  ...props
}: AuroraBackgroundProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      <div
        className={cn(
          "relative flex flex-col items-center bg-zinc-50 dark:bg-black text-foreground transition-bg min-h-screen",
          className
        )}
        {...props}
      >
        {/* Background Layer (Limited to top of page) */}
        <div className="absolute top-0 inset-x-0 h-[120vh] overflow-hidden pointer-events-none">
          {/* Aurora Effect */}
          <div
            className={cn(
              "absolute inset-0 dark:hidden opacity-50",
              `[--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
               [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
               [background-image:var(--white-gradient),var(--aurora)]
               [background-size:300%,_200%] [background-position:50%_50%,50%_50%]
               filter blur-[10px] invert
               after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
               after:[background-size:200%,_100%] after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}
          />
          
          {/* Floating Paths (Higher starting point) */}
          {showPaths && (
            <div className="absolute -top-20 inset-x-0 h-[140vh] z-0 opacity-40 dark:opacity-40">
              <FloatingPaths position={1} />
              <FloatingPaths position={-1} />
            </div>
          )}
        </div>

        {/* Content Layer */}
        <div className="relative z-10 w-full flex flex-col items-center">
          {children}
        </div>
      </div>
    </main>
  );
};
