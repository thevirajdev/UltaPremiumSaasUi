import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#07070d] overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        {children}
      </main>
    </div>
  );
}
