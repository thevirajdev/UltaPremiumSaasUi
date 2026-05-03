import { create } from "zustand";

interface User {
  id: string;
  email: string;
  name: string;
  role: "super_admin" | "agency_admin" | "clinic_user";
  agencyId?: string;
  clinicId?: string;
}

interface AppState {
  user: User | null;
  sidebarOpen: boolean;
  theme: "light" | "dark";
  setUser: (u: User | null) => void;
  setSidebarOpen: (o: boolean) => void;
  setTheme: (t: "light" | "dark") => void;
}

export const useAppStore = create<AppState>((set) => ({
  user:        null,
  sidebarOpen: true,
  theme:       "dark", // Set to dark by default for premium look
  setUser:        (user)  => set({ user }),
  setSidebarOpen: (open)  => set({ sidebarOpen: open }),
  setTheme:       (theme) => set({ theme }),
}));
