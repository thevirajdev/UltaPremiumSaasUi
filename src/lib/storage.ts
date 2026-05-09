"use client";

/**
 * Simple local storage based data management for ClinicAI.
 * This acts as a mock backend until the real backend is integrated.
 */

export type EntityType = "agencies" | "clinics" | "patients" | "appointments" | "systemStats" | "calls";

export interface Agency {
  id: string;
  name: string;
  email: string;
  credits: number;
  revenue: number;
  password?: string;
  status: "Active" | "Inactive";
  createdAt: string;
}

export interface Clinic {
  id: string;
  agencyId: string;
  name: string;
  doctorName: string;
  email: string;
  balance: number;
  totalUsage: number;
  totalPaid: number;
  profitGenerated: number;
  creditsUsed: number;
  margin: number;
  password?: string;
  status: "Active" | "Inactive" | "Pending";
  createdAt: string;
}

export interface Patient {
  id: string;
  clinicId: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  clinicId: string;
  patientName: string;
  patientPhone?: string;
  service: string;
  time: string;
  status: "Upcoming" | "Completed" | "Cancelled" | "Rescheduled";
  outcome?: string;
  createdAt: string;
}

export interface Call {
  id: string;
  clinicId: string;
  patientName: string;
  patientPhone?: string;
  type: "Inbound" | "Outbound";
  duration: string;
  reason: string;
  action: string;
  status: "Completed" | "Failed" | "Redirected";
  transcript?: string;
  timestamp: string;
  credits: number;
  createdAt: string;
}

const STORAGE_PREFIX = "clinicai_";

export const storage = {
  get: <T>(key: EntityType): T[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_PREFIX + key);
    return data ? JSON.parse(data) : [];
  },

  set: <T>(key: EntityType, data: T[]): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  },

  add: <T extends { id: string }>(key: EntityType, item: T): void => {
    const current = storage.get<T>(key);
    storage.set(key, [...current, item]);
  },

  update: <T extends { id: string }>(key: EntityType, id: string, updates: Partial<T>): void => {
    const current = storage.get<T>(key);
    const updated = current.map((item) => (item.id === id ? { ...item, ...updates } : item));
    storage.set(key, updated);
  },

  delete: (key: EntityType, id: string): void => {
    const current = storage.get<{ id: string }>(key);
    const updated = current.filter((item) => item.id !== id);
    storage.set(key, updated);
  },

  clear: (key: EntityType): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_PREFIX + key);
  },

  simulateDemoData: (): void => {
    if (typeof window === "undefined") return;
    
    // Create Default Agency if missing
    const existingAgencies = storage.get<Agency>("agencies");
    let agencyId = localStorage.getItem('currentAgencyId');
    
    if (existingAgencies.length === 0) {
      const newAgency: Agency = {
        id: "agency-os-default",
        name: "AIVOICE OS Premium",
        email: "demo@aivoiceos.com",
        credits: 15000,
        revenue: 4250,
        status: "Active",
        createdAt: new Date().toISOString()
      };
      storage.set("agencies", [newAgency]);
      localStorage.setItem('currentAgencyId', newAgency.id);
      agencyId = newAgency.id;
    }

    // Create Default Clinic if missing
    const existingClinics = storage.get<Clinic>("clinics");
    let clinicId = localStorage.getItem('currentClinicId');
    
    if (existingClinics.length === 0) {
      const newClinic: Clinic = {
        id: "clinic-default",
        agencyId: agencyId || "agency-os-default",
        name: "Central Medical Center",
        doctorName: "Dr. Sarah Smith",
        email: "sarah@centralmedical.com",
        balance: 1250,
        totalUsage: 450,
        totalPaid: 3200,
        profitGenerated: 1450,
        creditsUsed: 850,
        margin: 0.15,
        status: "Active",
        createdAt: new Date().toISOString()
      };
      storage.set("clinics", [newClinic]);
      localStorage.setItem('currentClinicId', newClinic.id);
      clinicId = newClinic.id;
    }

    // Generate Mock Calls
    const names = ["George Miller", "Susan Lee", "Tom Hardy", "Alice Brown", "Steve Ross", "Emma Wilson"];
    const goals = ["BOOKING", "FOLLOW-UP", "URGENT", "INQUIRY", "EMERGENCY"];
    const durations = ["2:45", "3:12", "1:50", "4:20", "5:10"];
    
    const mockCalls: Call[] = Array.from({ length: 15 }).map(() => {
      const goal = goals[Math.floor(Math.random() * goals.length)];
      return {
        id: Math.random().toString(36).substring(7),
        clinicId: clinicId || "clinic-default",
        patientName: names[Math.floor(Math.random() * names.length)],
        patientPhone: `+1 ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        type: (goal === "BOOKING" ? "Inbound" : "Outbound") as any,
        duration: durations[Math.floor(Math.random() * durations.length)],
        reason: goal,
        action: "Resolved",
        status: "Completed",
        timestamp: "2 hours ago",
        credits: Math.floor(Math.random() * 800) + 100,
        createdAt: new Date().toISOString()
      };
    });
    
    storage.set("calls", mockCalls);

    // Update Agency/Clinic Stats based on simulated data
    const totalRevenue = 4250;
    const totalCredits = mockCalls.reduce((acc, c) => acc + c.credits, 0);
    
    storage.update("agencies", agencyId || "agency-os-default", { revenue: totalRevenue, credits: 15000 - totalCredits });
    storage.update("clinics", clinicId || "clinic-default", { totalUsage: mockCalls.length, creditsUsed: totalCredits, totalPaid: 3200 });

    // Dispatch custom event for reactive components
    window.dispatchEvent(new CustomEvent('clinicai_data_updated'));
    
    // Slight delay to allow event propagation before reload
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
};
