'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Hospital, 
  BarChart3, 
  Activity, 
  CreditCard, 
  Settings, 
  User, 
  LogOut,
  Sun,
  Moon,
  Phone,
  Users,
  Calendar,
  FileText,
  Bot
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

export type NavItem = {
  icon: any;
  label: string;
  href: string;
};

interface SidebarProps {
  items?: NavItem[];
  baseHref?: string;
  userName?: string;
  userPlan?: string;
}

const defaultAgencyItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Bot, label: 'AI Assistant', href: '/dashboard/assistant' },
  { icon: Hospital, label: 'Clinics', href: '/dashboard/clinics' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Activity, label: 'Usage', href: '/dashboard/usage' },
  { icon: CreditCard, label: 'Billing', href: '/dashboard/billing' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export function Sidebar({ 
  items = defaultAgencyItems, 
  baseHref = '/dashboard',
  userName = 'Felix Agency',
  userPlan = 'Pro Plan'
}: SidebarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [brandName, setBrandName] = React.useState('AIVOICE OS');

  React.useEffect(() => {
    setMounted(true);
    const userRole = localStorage.getItem('userRole');
    
    if (userRole === 'agency') {
      const storedAgencies = localStorage.getItem('clinicai_agencies');
      const currentId = localStorage.getItem('currentAgencyId');
      if (storedAgencies && currentId) {
        const agencies = JSON.parse(storedAgencies);
        const current = agencies.find((a: any) => a.id === currentId);
        if (current) setBrandName(current.name);
      }
    } else if (userRole === 'clinic') {
      const storedClinics = localStorage.getItem('clinicai_clinics');
      const currentId = localStorage.getItem('currentClinicId');
      if (storedClinics && currentId) {
        const clinics = JSON.parse(storedClinics);
        const current = clinics.find((c: any) => c.id === currentId);
        if (current) setBrandName(current.name);
      }
    }
  }, []);

  return (
    <div className="flex flex-col h-screen w-64 bg-background border-r border-border/50 p-4 transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">A</span>
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground truncate">
          {brandName}
        </span>
      </div>

      <nav className="flex-1 space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== baseHref && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary/10 text-primary shadow-sm" 
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 space-y-1 border-t border-border/50">
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-200"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-4 w-4" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                Dark Mode
              </>
            )}
          </button>
        )}

        <button
          onClick={() => {
            localStorage.removeItem('isLoggedIn');
            window.location.href = '/';
          }}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-all duration-200"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
