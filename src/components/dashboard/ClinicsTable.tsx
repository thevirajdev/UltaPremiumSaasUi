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

type Clinic = {
  id: string;
  clinicName: string;
  doctorName: string;
  balance: string;
  totalUsage: string;
  totalPaid: string;
  profitGenerated: string;
  createdDate: string;
  status: "Active" | "Inactive" | "Pending";
};

const data: Clinic[] = [
  {
    id: "1",
    clinicName: "Central Medical Center",
    doctorName: "Dr. Sarah Johnson",
    balance: "$1,250.00",
    totalUsage: "450 mins",
    totalPaid: "$5,400.00",
    profitGenerated: "$2,100.00",
    createdDate: "2024-01-15",
    status: "Active",
  },
  {
    id: "2",
    clinicName: "Northside Health Clinic",
    doctorName: "Dr. Michael Chen",
    balance: "$0.00",
    totalUsage: "1,200 mins",
    totalPaid: "$12,800.00",
    profitGenerated: "$5,600.00",
    createdDate: "2023-11-20",
    status: "Active",
  },
  {
    id: "3",
    clinicName: "West End Specialist",
    doctorName: "Dr. Emily Brown",
    balance: "$450.00",
    totalUsage: "120 mins",
    totalPaid: "$1,500.00",
    profitGenerated: "$600.00",
    createdDate: "2024-02-05",
    status: "Inactive",
  },
  {
    id: "4",
    clinicName: "Eastside Pediatrics",
    doctorName: "Dr. David Wilson",
    balance: "$2,100.00",
    totalUsage: "890 mins",
    totalPaid: "$9,200.00",
    profitGenerated: "$3,800.00",
    createdDate: "2023-12-10",
    status: "Active",
  },
  {
    id: "5",
    clinicName: "City Heart Institute",
    doctorName: "Dr. Robert Miller",
    balance: "$150.00",
    totalUsage: "50 mins",
    totalPaid: "$500.00",
    profitGenerated: "$200.00",
    createdDate: "2024-03-01",
    status: "Pending",
  },
];

const allColumns = [
  "Clinic Name",
  "Doctor Name",
  "Balance",
  "Total Usage",
  "Total Paid",
  "Profit Generated",
  "Created Date",
  "Status",
] as const;

export function ClinicsTable() {
  const router = useRouter();
  const [visibleColumns, setVisibleColumns] = useState<string[]>([...allColumns]);
  const [searchFilter, setSearchFilter] = useState("");

  const filteredData = data.filter((clinic) => {
    return (
      clinic.clinicName.toLowerCase().includes(searchFilter.toLowerCase()) ||
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

  const handleRowClick = (id: string) => {
    router.push(`/dashboard/clinics/${id}`);
  };

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
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length ? (
              filteredData.map((clinic) => (
                <TableRow 
                  key={clinic.id} 
                  className="cursor-pointer transition-colors"
                  onClick={() => handleRowClick(clinic.id)}
                >
                  {visibleColumns.includes("Clinic Name") && (
                    <TableCell className="font-medium">{clinic.clinicName}</TableCell>
                  )}
                  {visibleColumns.includes("Doctor Name") && (
                    <TableCell>{clinic.doctorName}</TableCell>
                  )}
                  {visibleColumns.includes("Balance") && (
                    <TableCell className="text-destructive font-medium">{clinic.balance}</TableCell>
                  )}
                  {visibleColumns.includes("Total Usage") && (
                    <TableCell>{clinic.totalUsage}</TableCell>
                  )}
                  {visibleColumns.includes("Total Paid") && (
                    <TableCell className="text-primary font-medium">{clinic.totalPaid}</TableCell>
                  )}
                  {visibleColumns.includes("Profit Generated") && (
                    <TableCell className="text-green-600 dark:text-green-400 font-medium">{clinic.profitGenerated}</TableCell>
                  )}
                  {visibleColumns.includes("Created Date") && (
                    <TableCell>{clinic.createdDate}</TableCell>
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
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={visibleColumns.length} className="text-center py-6 text-muted-foreground">
                  No clinics found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
