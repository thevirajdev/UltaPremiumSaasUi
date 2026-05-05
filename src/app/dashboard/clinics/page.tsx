"use client";

import React from "react";
import { ClinicsTable } from "@/components/dashboard/ClinicsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import ClinicRegistrationForm from "@/components/dashboard/ClinicRegistrationForm";
import { useState } from "react";

export default function ClinicsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Clinics</h1>
          <p className="text-muted-foreground font-medium">
            Manage your medical facilities, monitor balances, and track profit generation.
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary shadow-lg shadow-primary/20 py-6 px-6 font-bold">
              <Plus className="h-4 w-4" />
              Add New Clinic
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="pb-4 border-b border-border/60">
              <DialogTitle className="text-2xl font-black">Register New Clinic</DialogTitle>
              <DialogDescription className="font-medium">
                Complete the infrastructure setup for your new medical facility partner.
              </DialogDescription>
            </DialogHeader>
            <ClinicRegistrationForm 
              onCancel={() => setIsDialogOpen(false)} 
              onSuccess={() => {
                setIsDialogOpen(false);
                // In a real app, refresh data here
              }} 
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        <ClinicsTable />
      </div>
    </div>
  );
}
