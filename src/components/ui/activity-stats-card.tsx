// components/ui/activity-stats-card.tsx

import * as React from "react";
import { animate } from "framer-motion";
import { cn } from "@/lib/utils";

// Define the props for the component
interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The icon to display. Accepts any React node, recommended: lucide-react icon. */
  icon: React.ReactNode;
  /** The main title of the card. */
  title: string;
  /** The primary numerical value to display. The animation will count up to this number. */
  metric: number;
  /** A unit or suffix for the metric (e.g., "K", "M", "%"). */
  metricUnit?: string;
  /** A short description or secondary stat displayed below the metric. */
  subtext: string;
  /** Optional custom class for the icon's background container. */
  iconContainerClassName?: string;
}

const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  (
    {
      className,
      icon,
      title,
      metric,
      metricUnit,
      subtext,
      iconContainerClassName,
      ...props
    },
    ref
  ) => {
    const metricRef = React.useRef<HTMLHeadingElement>(null);

    // Effect to animate the number when the `metric` prop changes
    React.useEffect(() => {
      const node = metricRef.current;
      if (!node) return;

      const controls = animate(0, metric, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate(value) {
          // Format to have a maximum of 2 decimal places
          // Use Intl.NumberFormat for better localization and comma separation
          node.textContent = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: value % 1 === 0 ? 0 : 2,
            maximumFractionDigits: 2
          }).format(value);
        },
      });

      // Cleanup function to stop animation on unmount
      return () => controls.stop();
    }, [metric]);

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full flex-col gap-2 rounded-xl border bg-card p-4 text-card-foreground shadow-sm hover:shadow-md transition-shadow",
          className
        )}
        {...props}
      >
        {/* Header section with Icon and Title */}
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary",
              iconContainerClassName
            )}
          >
            {React.cloneElement(icon as React.ReactElement, { className: cn("h-4 w-4", (icon as React.ReactElement).props.className) })}
          </div>
          <p className="text-xs font-black text-foreground/70 uppercase tracking-widest">{title}</p>
        </div>

        {/* Main metric section */}
        <div className="flex items-baseline gap-1">
          <h2
            ref={metricRef}
            className="text-2xl font-black tracking-tight"
            aria-live="polite"
            aria-atomic="true"
          >
            0
          </h2>
          {metricUnit && (
            <span className="text-sm font-black text-foreground/60">
              {metricUnit}
            </span>
          )}
        </div>

        {/* Subtext section */}
        <p className="text-[10px] text-foreground/50 font-bold flex items-center gap-1 uppercase tracking-tight">
          {subtext}
        </p>
      </div>
    );
  }
);
StatsCard.displayName = "StatsCard";

export { StatsCard };
