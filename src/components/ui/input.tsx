import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'> {
  size?: "default" | "small" | "large";
  wrapperClassName?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, wrapperClassName, prefix, suffix, error, size, ...props }, ref) => {
    return (
      <div className={cn("relative flex items-center", wrapperClassName)}>
        {prefix && (
          <div className={cn("absolute left-0 pl-3 flex items-center pointer-events-none text-muted-foreground")}>
            {prefix}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            prefix && "pl-10",
            suffix && "pr-10",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          ref={ref}
          {...props}
        />
        {suffix && (
          <div className={cn("absolute right-0 pr-3 flex items-center text-muted-foreground")}>
            {suffix}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
