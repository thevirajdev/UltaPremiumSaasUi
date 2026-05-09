"use client";

import { useState, useEffect, useCallback } from "react";
import { storage, EntityType, Agency, Clinic, Patient, Appointment, Call } from "@/lib/storage";

export function useLocalData<T extends { id: string }>(key: EntityType) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    const stored = storage.get<T>(key);
    setData(stored);
    setLoading(false);
  }, [key]);

  useEffect(() => {
    refresh();
    
    // Simple way to sync across tabs/components
    const handleStorage = (e: StorageEvent) => {
      if (e.key === `clinicai_${key}`) {
        refresh();
      }
    };

    window.addEventListener("storage", handleStorage);
    // Custom event for same-window updates
    window.addEventListener(`clinicai_update_${key}`, refresh as any);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(`clinicai_update_${key}`, refresh as any);
    };
  }, [key, refresh]);

  const add = (item: T) => {
    storage.add(key, item);
    refresh();
    window.dispatchEvent(new CustomEvent(`clinicai_update_${key}`));
  };

  const update = (id: string, updates: Partial<T>) => {
    storage.update(key, id, updates);
    refresh();
    window.dispatchEvent(new CustomEvent(`clinicai_update_${key}`));
  };

  const remove = (id: string) => {
    storage.delete(key, id);
    refresh();
    window.dispatchEvent(new CustomEvent(`clinicai_update_${key}`));
  };

  return { data, loading, add, update, remove, refresh };
}

// Specialized hooks
export const useAgencies = () => useLocalData<Agency>("agencies");
export const useClinics = () => useLocalData<Clinic>("clinics");
export const usePatients = () => useLocalData<Patient>("patients");
export const useAppointments = () => useLocalData<Appointment>("appointments");
export const useCalls = () => useLocalData<Call>("calls");
