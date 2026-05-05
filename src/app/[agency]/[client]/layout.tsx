"use client";

import React from "react";
import { Sidebar, NavItem } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardProvider } from "@/context/DashboardContext";
import { 
  LayoutDashboard, 
  Phone, 
  Users, 
  Stethoscope,
  Calendar, 
  Activity, 
  CreditCard, 
  FileText, 
  Settings 
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
    
    if (isLoggedIn !== 'true') {
      router.push('/');
    } else if (userRole === 'agency') {
      // Agency users can access clinic dashboards
      setIsAuthorized(true);
    } else if (userRole === 'clinic') {
      // Clinic users can access clinic dashboards
      setIsAuthorized(true);
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  const params = useParams();

  if (!isAuthorized) {
    return null;
  }
  const agency = params.agency as string;
  const client = params.client as string;

  const baseHref = `/${agency}/${client}`;

  const clientNavItems: NavItem[] = [
    { icon: LayoutDashboard, label: 'Dashboard', href: baseHref },
    { icon: Phone, label: 'Calls', href: `${baseHref}/calls` },
    { icon: Users, label: 'Patients', href: `${baseHref}/patients` },
    { icon: Stethoscope, label: 'Doctors', href: `${baseHref}/doctors` },
    { icon: Calendar, label: 'Appointments', href: `${baseHref}/appointments` },
    { icon: Activity, label: 'Usage', href: `${baseHref}/usage` },
    { icon: CreditCard, label: 'Billing', href: `${baseHref}/billing` },
    { icon: FileText, label: 'Files', href: `${baseHref}/files` },
    { icon: Settings, label: 'Settings', href: `${baseHref}/settings` },
  ];

  return (
    <DashboardProvider>
      <div className="flex h-screen overflow-hidden bg-background text-foreground">
        <Sidebar 
          items={clientNavItems} 
          baseHref={baseHref} 
          userName={client.charAt(0).toUpperCase() + client.slice(1)} 
          userPlan="Clinic Client"
        />
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
