"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Simple utility for joining class names
function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export type SmartComboboxOption = {
  id: string;
  label: string;
  group?: string;
  meta?: string;
  icon?: React.ReactNode;
};

interface SmartComboboxProps {
  options: SmartComboboxOption[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  multiple?: boolean;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  clearable?: boolean;
  maxHeight?: number;
  itemHeight?: number;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  emptyState?: React.ReactNode;
  renderOption?: (
    option: SmartComboboxOption,
    state: { active: boolean; selected: boolean }
  ) => React.ReactNode;
  getCreateLabel?: (query: string) => React.ReactNode;
  onCreate?: (query: string) => void;
  useVirtual?: boolean;
}

export function SmartCombobox({
  options,
  value,
  onValueChange,
  multiple = false,
  placeholder = "Search...",
  disabled = false,
  clearable = true,
  maxHeight = 300,
  itemHeight = 36,
  header,
  footer,
  emptyState,
  renderOption,
  getCreateLabel = (q) => `Create "${q}"`,
  onCreate,
  useVirtual = false,
}: SmartComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  const isMultiple = multiple;
  const internalValue = Array.isArray(value) ? value : value ? [value] : [];
  const singleValue = options.find((o) => o.id === internalValue[0]);

  // Handle outside clicks
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const filteredOptions = React.useMemo(() => {
    if (!query) return options;
    return options.filter((o) =>
      o.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [options, query]);

  const toggleOption = (opt: SmartComboboxOption) => {
    if (isMultiple) {
      const newValue = internalValue.includes(opt.id)
        ? internalValue.filter((id) => id !== opt.id)
        : [...internalValue, opt.id];
      onValueChange?.(newValue);
    } else {
      onValueChange?.(opt.id);
      setOpen(false);
    }
    setQuery("");
  };

  const removeChip = (id: string) => {
    onValueChange?.(internalValue.filter((v) => v !== id));
  };

  const clearAll = () => {
    onValueChange?.(isMultiple ? [] : "");
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={cn(
          "flex min-h-[40px] w-full flex-wrap gap-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          disabled && "cursor-not-allowed opacity-50"
        )}
        onClick={() => !disabled && setOpen(true)}
      >
        {isMultiple && internalValue.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {internalValue.map((id) => {
              const opt = options.find((o) => o.id === id);
              if (!opt) return null;
              return (
                <span
                  key={id}
                  className="inline-flex items-center gap-1 rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                >
                  {opt.label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeChip(id);
                    }}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        )}
        <input
          ref={inputRef}
          className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
          placeholder={internalValue.length === 0 ? placeholder : ""}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={disabled}
        />
        <div className="flex items-center gap-1">
          {clearable && internalValue.length > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearAll();
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          )}
          <span className="text-muted-foreground">▼</span>
        </div>
      </div>

      {open && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
          {header && <div className="border-b p-2 text-xs text-muted-foreground">{header}</div>}
          <div className="max-h-[300px] overflow-auto py-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-muted-foreground">{emptyState || "No results found."}</div>
            ) : (
              filteredOptions.map((opt, idx) => {
                const selected = internalValue.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    className={cn(
                      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                      selected && "bg-accent/50"
                    )}
                    onClick={() => toggleOption(opt)}
                  >
                    {opt.label}
                    {selected && <span className="ml-auto">✓</span>}
                  </div>
                );
              })
            )}
          </div>
          {footer && <div className="border-t p-2 text-xs text-muted-foreground">{footer}</div>}
        </div>
      )}
    </div>
  );
}
