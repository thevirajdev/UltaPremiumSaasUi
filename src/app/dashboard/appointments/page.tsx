"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Building2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { StatusBadge } from "@/components/ui/badge";
import { Tabs, TabPanel } from "@/components/ui/tabs";

const appointments = [
  { id: "1", patient: "Sarah Mitchell", clinic: "HealthFirst", doctor: "Dr. Johnson", type: "Check-up", time: "10:00 AM", date: "Today", status: "confirmed" },
  { id: "2", patient: "James Cooper", clinic: "SmileBright", doctor: "Dr. Lee", type: "Cleaning", time: "11:30 AM", date: "Today", status: "confirmed" },
  { id: "3", patient: "Emily Rodriguez", clinic: "OrthoPlus", doctor: "Dr. Patel", type: "Follow-up", time: "2:00 PM", date: "Today", status: "pending" },
  { id: "4", patient: "Michael Chen", clinic: "ClearView", doctor: "Dr. Williams", type: "Eye Exam", time: "3:30 PM", date: "Today", status: "confirmed" },
  { id: "5", patient: "Aisha Okonkwo", clinic: "HealthFirst", doctor: "Dr. Johnson", type: "Consultation", time: "9:00 AM", date: "Tomorrow", status: "pending" },
  { id: "6", patient: "Daniel Park", clinic: "SmileBright", doctor: "Dr. Lee", type: "Filling", time: "1:00 PM", date: "Tomorrow", status: "cancelled" },
];

const statusVariant = (s: string) =>
  s === "confirmed" ? "success" : s === "pending" ? "warning" : "error";

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const tabs = [
    { id: "upcoming", label: "Upcoming", count: appointments.filter(a => a.status !== "cancelled").length },
    { id: "pending", label: "Pending", count: appointments.filter(a => a.status === "pending").length },
    { id: "cancelled", label: "Cancelled" },
  ];

  const filtered = appointments.filter(a =>
    activeTab === "cancelled" ? a.status === "cancelled" :
    activeTab === "pending" ? a.status === "pending" :
    a.status !== "cancelled"
  );

  const grouped = filtered.reduce((acc, a) => {
    if (!acc[a.date]) acc[a.date] = [];
    acc[a.date].push(a);
    return acc;
  }, {} as Record<string, typeof appointments>);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Appointments</h1>
          <p className="text-sm text-white/35 mt-0.5">AI-booked appointments across all clinics</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/20 transition-all hover:from-violet-500 hover:to-indigo-500">
          <Plus className="w-4 h-4" /> New Appointment
        </button>
      </div>

      {/* Mini calendar nav */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] w-fit">
        <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60 transition-all"><ChevronLeft className="w-4 h-4" /></button>
        <span className="text-sm font-semibold text-white px-2">May 2026</span>
        <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60 transition-all"><ChevronRight className="w-4 h-4" /></button>
      </div>

      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
        <div className="px-5 pt-4">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <TabPanel className="p-5 space-y-6">
          {Object.entries(grouped).map(([date, appts]) => (
            <div key={date}>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">{date}</span>
              </div>
              <div className="space-y-2">
                {appts.map((appt, i) => (
                  <motion.div key={appt.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-white/10 hover:bg-white/[0.05] transition-all group cursor-pointer">
                    <div className="text-center w-14 shrink-0">
                      <div className="flex items-center gap-1 text-xs text-white/40">
                        <Clock className="w-3 h-3" />
                        {appt.time}
                      </div>
                    </div>
                    <div className="w-px h-8 bg-white/10 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-white/30" />
                        <span className="text-sm font-medium text-white/70">{appt.patient}</span>
                        <span className="text-xs text-white/25">·</span>
                        <span className="text-xs text-white/35">{appt.type}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Building2 className="w-3 h-3 text-white/20" />
                        <span className="text-xs text-white/25">{appt.clinic} · {appt.doctor}</span>
                      </div>
                    </div>
                    <StatusBadge variant={statusVariant(appt.status) as Parameters<typeof StatusBadge>[0]["variant"]} pulse={appt.status === "confirmed"}>
                      {appt.status}
                    </StatusBadge>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="py-16 text-center text-white/20 text-sm">No appointments in this view.</div>
          )}
        </TabPanel>
      </div>
    </div>
  );
}
