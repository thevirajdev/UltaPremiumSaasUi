"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card-2";
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  MoreVertical, 
  Download, 
  Trash2, 
  File, 
  Music, 
  FileJson, 
  Database,
  Plus,
  Clock,
  HardDrive,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button-2";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge-2";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

// Mock Data for Files
const mockFiles = [
  { id: "f-1", name: "clinic-faqs.pdf", type: "PDF", category: "Knowledge", size: "2.4 MB", date: "May 02, 2024", owner: "AI Assistant" },
  { id: "f-2", name: "call_recording_9821.mp3", type: "Audio", category: "Recordings", size: "12.1 MB", date: "May 04, 2024", owner: "System" },
  { id: "f-3", name: "insurance_list.csv", type: "CSV", category: "Knowledge", size: "1.2 MB", date: "Apr 28, 2024", owner: "Jessica Smith" },
  { id: "f-4", name: "training_dataset_v2.json", type: "JSON", category: "AI Training", size: "5.6 MB", date: "May 01, 2024", owner: "Dr. Sarah Chen" },
  { id: "f-5", name: "patient_onboarding_form.docx", type: "DOCX", category: "Knowledge", size: "850 KB", date: "May 03, 2024", owner: "System" },
];

export default function ClientFilesPage() {
  const params = useParams();
  const client = params.client as string;
  const [activeTab, setActiveTab] = useState("all");
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filteredFiles = activeTab === "all" 
    ? mockFiles 
    : mockFiles.filter(f => f.category.toLowerCase().includes(activeTab.toLowerCase()));

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="h-5 w-5 text-red-500" />;
      case 'Audio': return <Music className="h-5 w-5 text-blue-500" />;
      case 'CSV': return <Database className="h-5 w-5 text-green-500" />;
      case 'JSON': return <FileJson className="h-5 w-5 text-amber-500" />;
      default: return <File className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground lowercase first-letter:uppercase">
            {client} File Repository
          </h1>
          <p className="text-muted-foreground font-medium">
            Centralized hub for knowledge base assets, call recordings, and AI training data.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Button className="h-12 px-8 gap-2 shadow-lg shadow-primary/20 font-black uppercase tracking-widest text-[10px]" onClick={() => setShowUploadModal(true)}>
              <Upload className="h-4 w-4" />
              Upload New Resource
           </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4 bg-muted/20 p-2 rounded-xl border border-border/40">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search files by name, type or owner..." 
                className="pl-9 bg-background/50 border-none h-10"
              />
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10 shrink-0" onClick={() => toast.info('Advanced Search', { description: 'Opening granular file metadata and content filters...' })}>
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="h-10" onValueChange={setActiveTab}>
            <TabsList className="bg-background/50 p-1 border border-border/40">
              <TabsTrigger value="all" className="text-[10px] font-bold px-4">All Files</TabsTrigger>
              <TabsTrigger value="knowledge" className="text-[10px] font-bold px-4">Knowledge</TabsTrigger>
              <TabsTrigger value="recordings" className="text-[10px] font-bold px-4">Recordings</TabsTrigger>
              <TabsTrigger value="training" className="text-[10px] font-bold px-4">AI Training</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Card className="shadow-none border-border/60 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest pl-6">Filename</TableHead>
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest">Category</TableHead>
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest">Size</TableHead>
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest">Uploaded On</TableHead>
                <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFiles.map((file) => (
                <TableRow key={file.id} className="border-border/40 hover:bg-primary/[0.02] transition-colors">
                  <TableCell className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.type)}
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-foreground">{file.name}</span>
                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">{file.type} • By {file.owner}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge variant="secondary" appearance="light" size="xs" className="font-bold">{file.category}</Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="text-xs font-mono font-bold text-muted-foreground">{file.size}</span>
                  </TableCell>
                  <TableCell className="py-4">
                     <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        {file.date}
                     </div>
                  </TableCell>
                  <TableCell className="py-4 text-right pr-6">
                    <div className="flex items-center justify-end gap-2">
                       <Button variant="dim" size="icon" className="h-8 w-8 rounded-full" onClick={() => toast.success('Download Started', { description: `Preparing ${file.name} for secure local transfer.` })}>
                          <Download className="h-4 w-4" />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive" onClick={() => toast.error('Confirm Deletion', { description: `Are you sure you want to permanently remove ${file.name}?` })}>
                          <Trash2 className="h-4 w-4" />
                       </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Upload Info Card */}
      <div className="grid gap-6 md:grid-cols-2">
         <Card className="bg-primary/5 border-primary/20 shadow-none">
            <CardHeader>
               <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-primary">
                  <FileText className="h-4 w-4" />
                  Knowledge Base Sync
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <p className="text-xs text-muted-foreground leading-relaxed">
                  Files uploaded to the <strong>Knowledge</strong> category are automatically processed by the AI. Ensure your documents are up-to-date to provide the best receptionist experience.
               </p>
               <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase">
                  <Plus className="h-3 w-3" />
                  Syncing with VAPI in real-time
               </div>
            </CardContent>
         </Card>

         <Card className="bg-muted/10 border-border/40 shadow-none">
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-indigo-500">
                  <Database className="h-4 w-4" />
                  Training Dataset Status
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <p className="text-xs text-muted-foreground leading-relaxed">
                  Your AI model is currently trained on <strong>3 datasets</strong>. Large JSON/CSV files in the <strong>AI Training</strong> category improve the assistant's nuance and accuracy.
               </p>
               <Badge variant="secondary" className="font-bold bg-indigo-500/10 text-indigo-500 border-none">MODELS OPTIMIZED</Badge>
            </CardContent>
         </Card>
      </div>
      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Card className="w-full max-w-lg shadow-2xl border-border/60 animate-in zoom-in-95 duration-200">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 pb-4">
              <div>
                <CardTitle className="text-xl font-black">Upload Resource</CardTitle>
                <CardDescription>Select a file to add to your clinic's repository.</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowUploadModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="border-2 border-dashed border-border/60 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 hover:bg-muted/10 transition-colors cursor-pointer group">
                 <div className="p-4 bg-primary/10 rounded-full text-primary group-hover:scale-110 transition-transform">
                    <Upload className="h-8 w-8" />
                 </div>
                 <div className="text-center">
                    <p className="text-sm font-bold">Click to browse or drag and drop</p>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase mt-1">PDF, MP3, JSON, CSV (Max 50MB)</p>
                 </div>
              </div>
              
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Select Category</label>
                 <select className="w-full h-11 bg-muted/20 border border-border/40 rounded-xl px-4 text-sm font-bold text-foreground focus:ring-2 focus:ring-primary outline-none appearance-none cursor-pointer">
                    <option className="bg-background text-foreground">Knowledge Base</option>
                    <option className="bg-background text-foreground">Call Recording</option>
                    <option className="bg-background text-foreground">AI Training Data</option>
                 </select>
              </div>

              <div className="pt-4 flex gap-3">
                <Button variant="outline" className="flex-1 h-11 font-bold border-border/60" onClick={() => setShowUploadModal(false)}>Cancel</Button>
                 <Button className="flex-1 h-11 font-bold shadow-lg shadow-primary/20" onClick={() => { toast.success('Upload Successful', { description: 'New resource has been indexed and added to the clinic repository.' }); setShowUploadModal(false); }}>Start Upload</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
