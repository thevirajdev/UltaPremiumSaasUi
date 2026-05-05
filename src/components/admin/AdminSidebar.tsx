'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Building2, 
  Database, 
  CreditCard, 
  Settings, 
  LogOut,
  Sun,
  Moon,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

export type NavItem = {
  icon: any;
  label: string;
  href: string;
};

const adminItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Building2, label: 'Agencies', href: '/admin/agencies' },
  { icon: Database, label: 'Usages', href: '/admin/usage' },
  { icon: CreditCard, label: 'Payments', href: '/admin/payments' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col h-screen w-64 bg-background border-r border-border/50 p-4 transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <ShieldCheck className="text-primary-foreground h-5 w-5" />
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground">
          ClinicAI<span className="text-primary"> Admin</span>
        </span>
      </div>

      <nav className="flex-1 space-y-1">
        {adminItems.map((item) => {
          const isActive = pathname === item.href;
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
        <div className="px-3 py-4 mb-2 rounded-xl bg-muted/30 border border-border/50">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Current User</p>
          <p className="text-sm font-semibold text-foreground truncate">Super Admin</p>
          <p className="text-[10px] text-muted-foreground">superadmin@gmail.com</p>
        </div>

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
            localStorage.removeItem('userRole');
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
