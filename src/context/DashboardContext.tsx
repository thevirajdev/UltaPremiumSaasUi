"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { RangeValue } from "@/components/ui/calendar";
import { startOfDay, subDays, endOfDay } from "date-fns";

interface DashboardContextType {
  dateRange: RangeValue | null;
  setDateRange: (range: RangeValue | null) => void;
  selectedClinicId: string | null;
  setSelectedClinicId: (id: string | null) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [dateRange, setDateRange] = useState<RangeValue | null>({
    start: startOfDay(subDays(new Date(), 7)),
    end: endOfDay(new Date())
  });
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>("all");

  return (
    <DashboardContext.Provider 
      value={{ 
        dateRange, 
        setDateRange, 
        selectedClinicId, 
        setSelectedClinicId 
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
