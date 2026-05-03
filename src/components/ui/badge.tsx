import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20",
        warning: "border-transparent bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
        info: "border-transparent bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export function GlowBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <Badge className={cn("shadow-[0_0_15px_rgba(var(--primary),0.3)]", className)} variant={variant} {...props} />
  )
}

export function StatusBadge({ status, className, ...props }: { status: string } & BadgeProps) {
  let v = "default" as BadgeProps["variant"];
  const s = status?.toLowerCase() || "";
  if (s === "active" || s === "completed" || s === "success" || s === "online") v = "success";
  if (s === "pending" || s === "warning" || s === "in progress") v = "warning";
  if (s === "failed" || s === "cancelled" || s === "error" || s === "offline") v = "destructive";
  
  return (
    <Badge variant={v} className={className} {...props}>
      {status}
    </Badge>
  );
}

export { Badge, badgeVariants }
