"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Hospital, 
  Phone, 
  Calendar, 
  Settings, 
  HelpCircle,
  ChevronDown,
  LogOut,
  CreditCard,
  User,
  Moon,
  Sun
} from "lucide-react";

type MenuItem = { 
  name: string; 
  href: string; 
  icon?: React.ReactNode;
  isActive?: boolean;
};

const Menu = ({ children, items, label }: { children: React.ReactNode; items: MenuItem[]; label: string }) => {
  const [isOpened, setIsOpened] = useState(false);
  const pathname = usePathname();

  return (
    <div>
      <button
        className="w-full flex items-center justify-between text-zinc-400 p-2 rounded-lg hover:bg-zinc-800/50 active:bg-zinc-800 duration-150 group"
        onClick={() => setIsOpened((v) => !v)}
        aria-expanded={isOpened}
      >
        <div className="flex items-center gap-x-3">
          {children}
          <span className="text-sm font-medium">{label}</span>
        </div>
        <ChevronDown 
          className={cn("w-4 h-4 duration-150 text-zinc-500", isOpened ? "rotate-180" : "")} 
        />
      </button>

      {isOpened && (
        <ul className="mt-1 ml-4 px-2 border-l border-zinc-800 space-y-1">
          {items.map((item, idx) => (
            <li key={idx}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-x-2 p-2 rounded-lg text-sm duration-150",
                  pathname === item.href 
                    ? "text-white bg-zinc-800" 
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/30"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function Sidebar() {
  const pathname = usePathname();
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [isProfileActive, setIsProfileActive] = useState(false);

  const navigation = [
    { href: "/dashboard", name: "Overview", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/dashboard/clinics", name: "Clinics", icon: <Hospital className="w-5 h-5" /> },
    { href: "/dashboard/calls", name: "Call Logs", icon: <Phone className="w-5 h-5" /> },
    { href: "/dashboard/appointments", name: "Appointments", icon: <Calendar className="w-5 h-5" /> },
  ];

  const navsFooter = [
    { href: "/dashboard/help", name: "Help", icon: <HelpCircle className="w-5 h-5" /> },
    { href: "/dashboard/settings", name: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  const billingNav: MenuItem[] = [
    { name: "Invoices", href: "/dashboard/settings?tab=billing", icon: <CreditCard className="w-4 h-4" /> },
    { name: "Usage", href: "/dashboard/settings?tab=usage", icon: <LayoutDashboard className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const handleProfile = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileActive(false);
      }
    };
    document.addEventListener("mousedown", handleProfile);
    return () => document.removeEventListener("mousedown", handleProfile);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-64 h-full border-r border-zinc-800 bg-[#07070d] flex flex-col z-40">
      <div className="flex flex-col h-full px-4">
        {/* Logo Section */}
        <div className="h-20 flex items-center px-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Phone className="text-white w-5 h-5" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">ClinicAI</span>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4 space-y-1 custom-scrollbar">
          <ul className="space-y-1">
            {navigation.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-x-3 p-2 rounded-lg duration-150 group",
                    pathname === item.href 
                      ? "text-white bg-zinc-800" 
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                  )}
                >
                  <div className={cn(
                    "duration-150",
                    pathname === item.href ? "text-primary" : "text-zinc-500 group-hover:text-zinc-300"
                  )}>
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              </li>
            ))}

            <li>
              <Menu label="Billing" items={billingNav}>
                <CreditCard className="w-5 h-5 text-zinc-500" />
              </Menu>
            </li>
          </ul>
        </div>

        {/* Footer Section */}
        <div className="py-4 border-t border-zinc-800">
          <ul className="space-y-1">
            {navsFooter.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-x-3 p-2 rounded-lg duration-150 group",
                    pathname === item.href 
                      ? "text-white bg-zinc-800" 
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                  )}
                >
                  <div className="text-zinc-500 group-hover:text-zinc-300">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* User Profile */}
          <div className="relative mt-4 pt-4 border-t border-zinc-800" ref={profileRef}>
            <button
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-zinc-800/50 duration-150 group"
              onClick={() => setIsProfileActive(!isProfileActive)}
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden">
                  <img src="https://api.api-ninjas.com/v1/randomimage?category=abstract" alt="User" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">Felix Agency</span>
                  <span className="text-xs text-zinc-500">Pro Plan</span>
                </div>
              </div>
              <ChevronDown className={cn("w-4 h-4 text-zinc-500 transition-transform", isProfileActive && "rotate-180")} />
            </button>

            {isProfileActive && (
              <div className="absolute bottom-full left-0 w-full mb-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="p-2 space-y-1">
                  <Link href="/dashboard/settings?tab=profile" className="flex items-center gap-2 p-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg duration-150">
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <button className="w-full flex items-center gap-2 p-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg duration-150">
                    <Moon className="w-4 h-4" />
                    Dark Mode
                  </button>
                  <div className="h-px bg-zinc-800 my-1 mx-2" />
                  <button className="w-full flex items-center gap-2 p-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg duration-150">
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
