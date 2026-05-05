"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-2";
import { HelpCircle, MessageSquare, BookOpen, ExternalLink, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HelpPage() {
  const categories = [
    { title: "Documentation", desc: "Detailed guides on Vapi integration and pricing.", icon: <BookOpen className="h-6 w-6" />, link: "#" },
    { title: "Live Chat", desc: "Speak with our technical support team in real-time.", icon: <MessageSquare className="h-6 w-6" />, link: "#" },
    { title: "API Status", desc: "Check current system and voice provider health.", icon: <LifeBuoy className="h-6 w-6" />, link: "#" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground font-medium">Get assistance with your agency infrastructure.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((cat) => (
          <Card key={cat.title} className="hover:border-primary/50 transition-all cursor-pointer group border-border/60">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                {cat.icon}
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">{cat.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{cat.desc}</p>
              </div>
              <Button variant="ghost" className="gap-2 text-primary font-bold">
                Access Now
                <ExternalLink className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/60 bg-muted/20">
        <CardContent className="p-10 flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-emerald-500/10 rounded-full text-emerald-600">
            <HelpCircle className="h-10 w-10" />
          </div>
          <div className="max-w-md">
            <h2 className="text-2xl font-black text-foreground tracking-tight">Need Urgent Assistance?</h2>
            <p className="text-muted-foreground font-medium mt-2">
              Our enterprise support engineers are available 24/7 for HIPAA-related queries and custom Vapi setups.
            </p>
          </div>
          <Button className="bg-foreground text-background hover:bg-foreground/90 font-bold px-8 py-6 rounded-xl">
            Open Support Ticket
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
