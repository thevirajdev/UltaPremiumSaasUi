"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useClinics } from "@/hooks/use-local-data";
import { Building2, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const allColumns = [
  "Clinic Name",
  "Doctor Name",
  "Balance",
  "Total Usage",
  "Total Paid",
  "Profit Generated",
  "Created Date",
  "Status",
  "Actions",
] as const;

export function ClinicsTable() {
  const router = useRouter();
  const { data: clinics, remove: removeClinic, loading } = useClinics();
  const [visibleColumns, setVisibleColumns] = useState<string[]>([...allColumns]);
  const [searchFilter, setSearchFilter] = useState("");

  const filteredData = clinics.filter((clinic) => {
    return (
      clinic.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      clinic.doctorName.toLowerCase().includes(searchFilter.toLowerCase())
    );
  });

  const toggleColumn = (col: string) => {
    setVisibleColumns((prev) =>
      prev.includes(col)
        ? prev.filter((c) => c !== col)
        : [...prev, col]
    );
  };

  const handleDoubleClick = (clinic: any) => {
    router.push(`/dashboard/clinics/${clinic.id}`);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      removeClinic(id);
      toast.success("Clinic deleted successfully");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading clinics...</div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <Input
            placeholder="Search clinics or doctors..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-64"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            {allColumns.map((col) => (
              <DropdownMenuCheckboxItem
                key={col}
                checked={visibleColumns.includes(col)}
                onCheckedChange={() => toggleColumn(col)}
              >
                {col}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border border-border rounded-lg bg-background shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {visibleColumns.includes("Clinic Name") && <TableHead>Clinic Name</TableHead>}
              {visibleColumns.includes("Doctor Name") && <TableHead>Doctor Name</TableHead>}
              {visibleColumns.includes("Balance") && <TableHead>Balance</TableHead>}
              {visibleColumns.includes("Total Usage") && <TableHead>Total Usage</TableHead>}
              {visibleColumns.includes("Total Paid") && <TableHead>Total Paid</TableHead>}
              {visibleColumns.includes("Profit Generated") && <TableHead>Profit Generated</TableHead>}
              {visibleColumns.includes("Created Date") && <TableHead>Created Date</TableHead>}
              {visibleColumns.includes("Status") && <TableHead>Status</TableHead>}
              {visibleColumns.includes("Actions") && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length ? (
              filteredData.map((clinic) => (
                <TableRow 
                  key={clinic.id} 
                  className="transition-colors hover:bg-muted/50 cursor-pointer select-none"
                  onDoubleClick={() => handleDoubleClick(clinic)}
                >
                  {visibleColumns.includes("Clinic Name") && (
                    <TableCell className="font-medium">{clinic.name}</TableCell>
                  )}
                  {visibleColumns.includes("Doctor Name") && (
                    <TableCell>{clinic.doctorName}</TableCell>
                  )}
                  {visibleColumns.includes("Balance") && (
                    <TableCell className="text-destructive font-medium">${clinic.balance.toLocaleString()}</TableCell>
                  )}
                  {visibleColumns.includes("Total Usage") && (
                    <TableCell>{clinic.totalUsage} mins</TableCell>
                  )}
                  {visibleColumns.includes("Total Paid") && (
                    <TableCell className="text-primary font-medium">${clinic.totalPaid.toLocaleString()}</TableCell>
                  )}
                  {visibleColumns.includes("Profit Generated") && (
                    <TableCell className="text-green-600 dark:text-green-400 font-medium">${clinic.profitGenerated.toLocaleString()}</TableCell>
                  )}
                  {visibleColumns.includes("Created Date") && (
                    <TableCell>{new Date(clinic.createdAt).toLocaleDateString()}</TableCell>
                  )}
                  {visibleColumns.includes("Status") && (
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "whitespace-nowrap",
                          clinic.status === "Active" && "bg-green-500/10 text-green-500 border-green-500/20",
                          clinic.status === "Inactive" && "bg-gray-500/10 text-gray-500 border-gray-500/20",
                          clinic.status === "Pending" && "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
                        )}
                      >
                        {clinic.status}
                      </Badge>
                    </TableCell>
                  )}
                  {visibleColumns.includes("Actions") && (
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/dashboard/clinics/${clinic.id}`);
                          }}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(clinic.id, clinic.name);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={visibleColumns.length} className="text-center py-12 text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <Building2 className="h-8 w-8 opacity-20" />
                    <p>No clinics found. Add your first clinic to get started.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
