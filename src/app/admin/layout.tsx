"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardProvider } from "@/context/DashboardContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
    
    if (isLoggedIn !== 'true' || !userRole) {
      router.push('/');
    } else if (userRole !== 'superadmin') {
      // Access Denied: Redirect non-admins to their respective entry points
      if (userRole === 'agency') {
        router.push('/dashboard');
      } else if (userRole === 'clinic') {
        // Redirect clinic users to a default or their specific dashboard
        router.push('/'); 
      } else {
        router.push('/');
      }
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-foreground font-medium">
        Verifying Admin Access...
      </div>
    );
  }

  return (
    <DashboardProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-7xl mx-auto h-full space-y-6">
            <DashboardHeader />
            {children}
          </div>
        </main>
      </div>
    </DashboardProvider>
  );
}
