"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
    ImageIcon,
    MonitorIcon,
    Bot,
    User,
    Sparkles,
    Search,
    BrainCircuit,
    History,
    MoreHorizontal,
    Smile,
    Send,
    Paperclip,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface UseAutoResizeTextareaProps {
    minHeight: number;
    maxHeight?: number;
}

function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            // Temporarily shrink to get the right scrollHeight
            textarea.style.height = `${minHeight}px`;

            // Calculate new height
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );

            textarea.style.height = `${newHeight}px`;
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        // Set initial height
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    // Adjust height on window resize
    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}

type Message = {
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
};

export function VercelV0Chat() {
    const [value, setValue] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hello! I'm your AIVoice OS assistant. I have access to your clinic data, analytics, and billing information. How can I help you today?",
            timestamp: new Date(Date.now() - 1000 * 60 * 5)
        }
    ]);
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    });
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (!value.trim()) return;

        const userMsg: Message = {
            role: "user",
            content: value.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setValue("");
        adjustHeight(true);

        // Simulate AI Response
        setTimeout(() => {
            const aiMsg: Message = {
                role: "assistant",
                content: generateMockResponse(userMsg.content),
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 1000);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const generateMockResponse = (input: string) => {
        const query = input.toLowerCase();
        if (query.includes("revenue")) return "Your total revenue this week is $12,450, showing a 12% increase compared to last week. The main drivers are HIPAA compliance fees and Vapi cost margins.";
        if (query.includes("clinic")) return "You currently have 4 active clinics. Central Medical Center is your top performer with 156 total calls today.";
        if (query.includes("bill") || query.includes("cost")) return "Your current billing cycle ends in 5 days. Your estimated next invoice is $1,240, primarily consisting of Vapi platform usage and HIPAA assets.";
        if (query.includes("hippa")) return "Your HIPAA compliance status is 100% active across all clinics. All necessary assets and BAAs are signed and stored in the settings tab.";
        return "I can help with that. Based on your dashboard data, I see that everything is running smoothly. Would you like me to generate a detailed report for a specific section?";
    };

    const botIconUrl = "https://img.utdstc.com/icon/9e6/108/9e6108c92600f7fcaad0323efaf34b07cd639b033d4911cd26663cfa4ba9672d:100";

    return (
        <div className="flex flex-col h-full w-full max-w-7xl mx-auto rounded-3xl border border-border/40 bg-background/40 backdrop-blur-3xl shadow-2xl overflow-hidden ring-1 ring-white/5">
            {/* Header */}
            <div className="p-5 border-b border-border/40 flex items-center justify-between bg-muted/10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden shadow-inner">
                        <img src={botIconUrl} alt="AI Bot" className="w-full h-full object-cover scale-110" />
                    </div>
                    <div>
                        <h2 className="text-base font-black flex items-center gap-2 tracking-tight">
                            Intelligence Core
                            <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-black tracking-widest uppercase">Active</span>
                        </h2>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                            <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider opacity-70">Neural Link Established</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => toast.info("Chat History", { description: "Loading previous neural conversations..." })}
                        className="p-2.5 hover:bg-primary/10 hover:text-primary rounded-xl transition-all text-muted-foreground"
                    >
                        <History className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => toast.success("Neural Search Active", { description: "You can now search through your clinic's database." })}
                        className="p-2.5 hover:bg-primary/10 hover:text-primary rounded-xl transition-all text-muted-foreground"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                    <button className="p-2.5 hover:bg-primary/10 rounded-xl transition-all text-muted-foreground">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-gradient-to-b from-transparent via-muted/5 to-muted/10">
                <AnimatePresence initial={false}>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={cn(
                                "flex items-start gap-5 max-w-[80%]",
                                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                            )}
                        >
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border shadow-lg overflow-hidden",
                                msg.role === "user" 
                                    ? "bg-zinc-900 border-zinc-800 text-white" 
                                    : "bg-background border-border/50"
                            )}>
                                {msg.role === "user" ? (
                                    <User className="w-5 h-5" />
                                ) : (
                                    <img src={botIconUrl} alt="Bot" className="w-full h-full object-cover" />
                                )}
                            </div>
                            <div className={cn(
                                "space-y-2",
                                msg.role === "user" ? "text-right" : "text-left"
                            )}>
                                <div className={cn(
                                    "px-5 py-4 rounded-3xl text-sm font-medium leading-relaxed shadow-xl border transition-all",
                                    msg.role === "user"
                                        ? "bg-primary text-primary-foreground border-primary/20 rounded-tr-none"
                                        : "bg-background/90 backdrop-blur-md border-border/40 text-foreground rounded-tl-none hover:border-primary/40"
                                )}>
                                    {msg.content}
                                </div>
                                <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest px-2 opacity-50">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border/50 bg-background/50">
                <div className="relative group max-w-4xl mx-auto">
                    <div className="relative bg-muted/30 border border-border/50 rounded-2xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30 transition-all focus-within:bg-background overflow-hidden">
                        <div className="overflow-y-auto">
                            <Textarea
                                ref={textareaRef}
                                value={value}
                                onChange={(e) => {
                                    setValue(e.target.value);
                                    adjustHeight();
                                }}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask about your clinics, revenue, or analytics..."
                                className={cn(
                                    "w-full px-4 pt-4 pb-2",
                                    "resize-none",
                                    "bg-transparent",
                                    "border-none shadow-none",
                                    "text-foreground text-sm",
                                    "focus-visible:ring-0 focus-visible:ring-offset-0",
                                    "placeholder:text-muted-foreground/50",
                                    "min-h-[60px]"
                                )}
                            />
                        </div>

                        <div className="flex items-center justify-between px-3 py-2 border-t border-border/10">
                            <div className="flex items-center gap-1">
                                <button className="p-2 hover:bg-muted rounded-xl transition-colors group/btn">
                                    <Paperclip className="w-4 h-4 text-muted-foreground group-hover/btn:text-foreground" />
                                </button>
                                <button className="p-2 hover:bg-muted rounded-xl transition-colors group/btn">
                                    <ImageIcon className="w-4 h-4 text-muted-foreground group-hover/btn:text-foreground" />
                                </button>
                                <button className="p-2 hover:bg-muted rounded-xl transition-colors group/btn">
                                    <Smile className="w-4 h-4 text-muted-foreground group-hover/btn:text-foreground" />
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!value.trim()}
                                    className={cn(
                                        "flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300",
                                        value.trim()
                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                            : "bg-muted text-muted-foreground cursor-not-allowed"
                                    )}
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center justify-center gap-2 mt-4 pb-2 overflow-x-auto custom-scrollbar no-scrollbar">
                        <ActionButton icon={<MonitorIcon className="w-3.5 h-3.5" />} label="Analyze Revenue" onClick={() => setValue("Analyze my revenue for this week")} />
                        <ActionButton icon={<History className="w-3.5 h-3.5" />} label="Recent Calls" onClick={() => setValue("Show me recent call logs from Central Medical Center")} />
                        <ActionButton icon={<BrainCircuit className="w-3.5 h-3.5" />} label="Compliance Check" onClick={() => setValue("Is my HIPAA compliance active for all clinics?")} />
                        <ActionButton icon={<Sparkles className="w-3.5 h-3.5" />} label="Marketing ROI" onClick={() => setValue("What is my current ROI for social media ads?")} />
                    </div>
                </div>
            </div>
        </div>
    );
}

interface ActionButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
}

function ActionButton({ icon, label, onClick }: ActionButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex flex-shrink-0 items-center gap-2 px-3 py-1.5 bg-muted/40 hover:bg-muted rounded-full border border-border/50 text-muted-foreground hover:text-foreground transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
        >
            {icon}
            <span className="text-[11px] font-medium">{label}</span>
        </button>
    );
}
