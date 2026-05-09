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
  }
};
