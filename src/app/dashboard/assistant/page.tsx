"use client";

import React from "react";
import { VercelV0Chat } from "@/components/ui/v0-ai-chat";
import { motion } from "framer-motion";
import { Bot, Sparkles, MessageSquare } from "lucide-react";

export default function AssistantPage() {
    return (
        <div className="flex flex-col h-[calc(100vh-100px)] -mt-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 min-h-0 py-4"
            >
                <VercelV0Chat />
            </motion.div>
        </div>
    );
}
