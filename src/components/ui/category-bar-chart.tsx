"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { addDays, addMonths, format, startOfToday } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type DateRange = {
  from: Date;
  to: Date;
};

const salesData = [
  { width: 55, color: "bg-blue-500", label: "Vapi Cost Revenue" },
  { width: 35, color: "bg-cyan-500", label: "HIPAA Compliance Revenue" },
  { width: 10, color: "bg-amber-500", label: "Setup Cost Revenue" },
];

export const CategoryBarChart = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const today = startOfToday();
  const period = {
    from: today,
    to: addMonths(today, 1),
  };
  const totalSales = 115000;

  return (
    <Card
      className={cn(
        "flex h-full w-full flex-col gap-0 p-6 shadow-none",
        className,
      )}
      {...props}
    >
      <CardHeader className="flex flex-row items-center justify-between p-0 mb-4">
        <div className="flex flex-row items-center gap-1">
          <CardTitle className="text-base font-medium text-muted-foreground">
            Revenue Sources
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="outline-none">
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 16.25a6.25 6.25 0 100-12.5 6.25 6.25 0 000 12.5zm1.116-3.041l.1-.408a1.709 1.709 0 01-.25.083 1.176 1.176 0 01-.308.048c-.193 0-.329-.032-.407-.095-.079-.064-.118-.184-.118-.359a3.514 3.514 0 01.118-.672l.373-1.318c.037-.121.062-.255.075-.4a3.73 3.73 0 00.02-.304.866.866 0 00-.292-.678c-.195-.174-.473-.26-.833-.26-.2 0-.412.035-.636.106-.224.07-.459.156-.704.256l-.1.409c.073-.028.16-.057.262-.087.101-.03.2-.045.297-.045.198 0 .331.034.4.1.07.066.105.185.105.354 0 .093-.01.197-.034.31a6.216 6.216 0 01-.084.36l-.374 1.325c-.033.14-.058.264-.073.374-.015.11-.022.22-.022.325 0 .272.1.496.301.673.201.177.483.265.846.265.236 0 .443-.03.621-.092s.417-.152.717-.27zM11.05 7.85a.772.772 0 00.26-.587.78.78 0 00-.26-.59.885.885 0 00-.628-.244.893.893 0 00-.63.244.778.778 0 00-.264.59c0 .23.088.426.263.587a.897.897 0 00.63.243.888.888 0 00.629-.243z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-[280px]">
                <p className="text-xs">
                  Overview of primary revenue sources for the agency.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 p-0">
        <div className="flex items-center gap-3">
          <span className="text-4xl font-black leading-none tracking-tighter tabular-nums">
            ${totalSales.toLocaleString()}
          </span>
          <p className="text-sm text-emerald-500 font-bold">
            +5.4% <span className="text-foreground/50 font-medium">from last month</span>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-normal text-muted-foreground">
              {period?.from && format(period.from, "MMM dd, yyyy")}
            </p>
            <p className="text-sm font-normal text-muted-foreground">
              {period?.to && format(period.to, "MMM dd, yyyy")}
            </p>
          </div>

          <TooltipProvider>
            <div className="flex gap-1">
              {salesData.map((item, index) => (
                <Tooltip key={index} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <div
                      className="h-[42px] rounded-sm transition-all"
                      style={{ width: `${item.width}%` }}
                    >
                      <div className={cn("h-full rounded-sm", item.color)} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={1}>
                    <p className="text-muted-foreground text-xs">
                      {item.label} -{" "}
                      <span className="font-medium tracking-[-0.006em] text-foreground">
                        {item.width}%
                      </span>
                    </p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </div>

      </CardContent>
    </Card>
  );
};
