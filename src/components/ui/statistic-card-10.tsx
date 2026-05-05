"use client";

import { Badge } from '@/components/ui/badge-2';
import { Button } from '@/components/ui/button-2';
import { Card, CardContent, CardHeader, CardTitle, CardToolbar } from '@/components/ui/card-2';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu-2';
import { BarChart2, MoreHorizontal } from 'lucide-react';

export default function StatisticCard10({ 
  title = "Total Revenue", 
  value = "$ 1,120,500", 
  trend = "-12.7%", 
  trendText = "decreased from last quarter",
  items = [
    { label: "Avg. Subscription Value:", value: "$320" },
    { label: "Enterprise Clients:", value: "42" }
  ]
}) {
  return (
    <Card className="w-full">
      <CardHeader className="border-0 py-6 min-h-auto">
        <CardTitle className="inline-flex items-center gap-2">
          <BarChart2 className="size-8 text-primary" />
          {title}
        </CardTitle>
        <CardToolbar>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="dim" size="sm" mode="icon">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="bottom">
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Export Data</DropdownMenuItem>
              <DropdownMenuItem>Pin to Dashboard</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardToolbar>
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-3.5">
        <div className="space-y-3.5">
          {/* Revenue */}
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="text-3xl font-bold text-foreground tracking-tight">{value}</span>
            <span className="text-xs text-muted-foreground font-medium leading-none">USD</span>
          </div>

          {/* Revenue trend */}
          <div className="flex items-center gap-2 mb-4">
            <Badge variant={trend.startsWith('+') ? "success" : "destructive"} appearance="light">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={trend.startsWith('+') ? "rotate-180" : ""}>
                <path
                  d="M3 5.5L7 9.5L11 5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {trend}
            </Badge>
            <span className="text-sm text-muted-foreground">{trendText}</span>
          </div>
        </div>

        <div className="space-y-1">
          {items.map((item, idx) => (
            <div key={idx} className="p-2.5 bg-muted/60 flex items-center justify-between rounded-lg">
              <span className="text-sm text-accent-foreground">{item.label}</span>
              <span className="text-base font-semibold text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
