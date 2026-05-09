"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardProvider } from "@/context/DashboardContext";
import { FloatingChatWidget } from "@/components/ui/floating-chat-widget";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
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
    } else if (userRole === 'clinic') {
      // Access Denied: Clinic users cannot access the Agency management console
      router.push('/'); 
    } else if (userRole === 'agency' || userRole === 'superadmin') {
      setIsAuthorized(true);
    } else {
      router.push('/');
    }
  }, [router]);

  if (!isAuthorized) {
    return null; // Or a loading spinner
  }
  return (
    <DashboardProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-7xl mx-auto h-full space-y-6">
            <DashboardHeader />
            {children}
          </div>
        </main>
        <FloatingChatWidget />
      </div>
    </DashboardProvider>
  );
}
