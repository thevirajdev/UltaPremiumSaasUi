"use client";

import * as React from "react";
import { 
  Bell, 
  MessageCircle, 
  AlertTriangle, 
  CheckCircle, 
  X, 
  Check, 
  Trash2,
  Clock
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface Notification {
  id: string;
  type: "message" | "alert" | "success" | "system";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

const defaultNotifications: Notification[] = [
  { 
    id: "1", 
    type: "message", 
    title: "New Message", 
    description: "You have a new message from Dr. Sarah Smith regarding the patient report.", 
    timestamp: "2 mins ago",
    read: false
  },
  { 
    id: "2", 
    type: "success", 
    title: "Analysis Complete", 
    description: "The AI analysis for Clinic A's monthly data has been successfully generated.", 
    timestamp: "10 mins ago",
    read: false
  },
  { 
    id: "3", 
    type: "alert", 
    title: "System Update", 
    description: "Maintenance scheduled for tonight at 2:00 AM UTC. Expect brief downtime.", 
    timestamp: "1 hour ago",
    read: true
  },
  { 
    id: "4", 
    type: "system", 
    title: "Welcome to AIVoice OS", 
    description: "Start exploring your dashboard and agency insights now.", 
    timestamp: "1 day ago",
    read: true
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = React.useState<Notification[]>(defaultNotifications);
  const [showPanel, setShowPanel] = React.useState(false);
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "message":
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case "alert":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case "success":
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      default:
        return <Bell className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <button className="relative p-2 rounded-full border border-border bg-background hover:bg-accent transition-all duration-200 outline-none group">
            <Bell className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            {unreadCount > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 px-1 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] bg-primary text-primary-foreground border-2 border-background"
              >
                {unreadCount}
              </Badge>
            )}
          </button>
        </PopoverTrigger>

        <PopoverContent align="end" className="w-[380px] p-0 overflow-hidden shadow-2xl border-border bg-background/95 backdrop-blur-sm">
          <div className="flex items-center justify-between p-4 border-b bg-muted/30">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm">Notifications</h3>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="text-[10px] py-0 px-1.5 h-4">
                  {unreadCount} New
                </Badge>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-8 text-primary hover:text-primary/80 hover:bg-primary/10"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <Check className="w-3 h-3 mr-1" />
              Mark all as read
            </Button>
          </div>

          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <Bell className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium">All caught up!</p>
                <p className="text-xs text-muted-foreground mt-1">No new notifications at the moment.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notifications.slice(0, 5).map((n) => (
                  <div 
                    key={n.id}
                    className={cn(
                      "flex gap-3 p-4 transition-all duration-200 hover:bg-accent/50 group relative",
                      !n.read && "bg-primary/5"
                    )}
                  >
                    <div className={cn(
                      "mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                      !n.read ? "bg-background border-primary/20 shadow-sm" : "bg-muted/50 border-transparent"
                    )}>
                      {getIcon(n.type)}
                    </div>
                    
                    <div className="flex-1 space-y-1 pr-6">
                      <div className="flex items-center justify-between gap-2">
                        <span className={cn(
                          "text-sm font-medium leading-none",
                          !n.read ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {n.title}
                        </span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1 shrink-0">
                          <Clock className="w-3 h-3" />
                          {n.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {n.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 border-t bg-muted/10">
            <Button 
              variant="outline" 
              className="w-full text-xs h-9 font-medium" 
              onClick={() => {
                setShowPanel(true);
                setPopoverOpen(false);
              }}
            >
              View all notifications
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Side Panel */}
      <AnimatePresence>
        {showPanel && (
          <>
            {/* Backdrop Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPanel(false)}
              className="fixed inset-0 z-[150] bg-zinc-950/40 backdrop-blur-[8px]"
            />
            
            {/* Panel */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-screen w-[500px] bg-background border-l border-border shadow-2xl z-[160] flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-8 border-b bg-muted/5">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Notification History</h2>
                  <p className="text-sm text-muted-foreground mt-1">Review and manage all system activity</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowPanel(false)} className="rounded-full h-10 w-10 hover:bg-muted transition-colors">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                     <Bell className="h-12 w-12 mb-4 text-muted-foreground" />
                     <p className="text-lg font-semibold">No notifications</p>
                     <p className="text-sm">We'll let you know when something happens.</p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <motion.div 
                      layout
                      key={n.id}
                      className={cn(
                        "p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group",
                        !n.read 
                          ? "bg-primary/[0.04] border-primary/20 shadow-sm" 
                          : "bg-card border-border hover:border-primary/20 hover:shadow-md"
                      )}
                    >
                      {!n.read && (
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
                      )}
                      <div className="flex gap-5">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border shadow-sm transition-transform group-hover:scale-105",
                          !n.read ? "bg-background border-primary/20" : "bg-muted/30 border-transparent"
                        )}>
                          {getIcon(n.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1.5">
                            <h3 className={cn("text-sm font-bold tracking-tight", !n.read ? "text-foreground" : "text-muted-foreground")}>
                              {n.title}
                            </h3>
                            <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1.5 bg-muted/40 px-2 py-0.5 rounded-full">
                              <Clock className="w-3 h-3" />
                              {n.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            {n.description}
                          </p>
                          <div className="flex items-center gap-3">
                            {!n.read && (
                              <Button size="sm" variant="secondary" className="h-8 text-xs px-4 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 border-none" onClick={() => markAsRead(n.id)}>
                                <Check className="w-3 h-3 mr-1.5" />
                                Mark as read
                              </Button>
                            )}
                            <Button size="sm" variant="ghost" className="h-8 text-xs px-4 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5" onClick={() => deleteNotification(n.id)}>
                              <Trash2 className="w-3 h-3 mr-1.5" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="p-8 border-t bg-muted/10 flex items-center justify-between backdrop-blur-md">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 mb-0.5">Summary</span>
                  <span className="text-sm font-semibold">{notifications.length} Total Logs</span>
                </div>
                <Button variant="outline" size="sm" className="text-xs font-bold px-6 h-10 rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm" onClick={markAllAsRead}>
                  Clear Unread
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
