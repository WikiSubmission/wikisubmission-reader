"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpDown, ArrowUpIcon, MoreHorizontal } from "lucide-react";

type DonorPerson = {
  type: "person";
  fullName: string;
  message?: string;
};
type DonorAnonymous = {
  type: "anonymous";
  message?: string;
};
type DonorInfo = DonorPerson | DonorAnonymous;

// Note: Removed 'id', 'endingBalance', 'transactionCode', and simplified 'status'
export type Transaction = {
  // Use a Public ID/Reference, not the internal database ID
  publicRef: string;
  timestamp: Date;
  // Status should typically be filtered to only 'Success' for public view
  status: "Success" | "Failed";
  type: "Inbound" | "Outbound";
  description: string;
  amount: number;
  currency: "USD" | "EUR";

  // New/Revised fields for clarity:
  category: string; // e.g., 'Donation', 'Salary', 'Program Expense', 'Overhead'
  donorInfo?: DonorInfo; // Only for 'Inbound' transactions
};

interface SortableHeaderProps<TData> {
  column: Column<TData, any>;
  title: string;
}

// Function to render the sortable header content, showing current sort direction
const SortableHeader = <TData,>({ column, title }: SortableHeaderProps<TData>) => {
  const isSorted = column.getIsSorted();

  // Determine the icon based on the current sort state
  let Icon = ArrowUpDown; // Default icon when unsorted or not fully sorted
  if (isSorted === "asc") {
    Icon = ArrowUpIcon;
  } else if (isSorted === "desc") {
    Icon = ArrowDownIcon;
  }

  return (
    <Button variant="ghost" onClick={() => column.toggleSorting(isSorted === "asc")}>
      {title}
      <Icon className="ml-2 h-4 w-4" />
    </Button>
  );
};

export const columns: ColumnDef<Transaction>[] = [
  // Actions Column (Cannot be sorted)
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(transaction.amount.toString())}
            >
              Copy payment amount
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },

  // 1. Transaction Date (Sortable)
  {
    accessorKey: "timestamp",
    header: ({ column }) => <SortableHeader column={column} title="Date" />, // Applied SortableHeader
    cell: ({ row }) => {
      const date = row.getValue("timestamp") as Date;
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    size: 120,
  },

  // 2. Transaction Type (Sortable)
  {
    accessorKey: "type",
    header: ({ column }) => <SortableHeader column={column} title="Direction" />, // Applied SortableHeader
    cell: ({ row }) => {
      const type = row.getValue("type") as Transaction["type"];
      const display = type === "Inbound" ? "Donation" : "Spending";
      const colorClass = type === "Inbound" ? "text-green-600" : "text-red-600";
      return <div className={`font-semibold ${colorClass}`}>{display}</div>;
    },
    size: 100,
  },

  // 3. Donor/Source (Not easily sortable as it is a computed field 'id: "source"')
  {
    id: "source",
    header: "Source", // Not sortable by default accessorKey
    enableSorting: false, // Explicitly disable sorting for computed fields without a backing key
    cell: ({ row }) => {
      const { type, donorInfo, description } = row.original;

      if (type === "Inbound" && donorInfo) {
        if (donorInfo.type === "person") {
          return <div className="font-medium">{donorInfo.fullName}</div>;
        }
        return <div className="font-medium italic text-muted-foreground">Anonymous Donor</div>;
      }
      return (
        <div className="font-medium text-gray-700">
          {description.split(" - ")[0] || "Organization Expense"}
        </div>
      );
    },
  },

  // 4. Description/Purpose (Sortable)
  {
    accessorKey: "description",
    header: ({ column }) => <SortableHeader column={column} title="Purpose/Details" />, // Applied SortableHeader
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      const { donorInfo, type } = row.original;
      let purpose = description;

      if (type === "Inbound" && donorInfo && donorInfo.message) {
        purpose = donorInfo.message;
      }

      return <div className="max-w-[300px] truncate text-sm">{purpose}</div>;
    },
  },

  // 5. Category (Sortable)
  {
    accessorKey: "category",
    header: ({ column }) => <SortableHeader column={column} title="Category" />, // Applied SortableHeader
    cell: ({ row }) => <div className="text-sm text-muted-foreground">{row.original.category}</div>,
  },

  // 6. Transaction Amount (Sortable)
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="flex justify-end">
        <SortableHeader column={column} title="Amount" />
      </div>
    ), // Applied SortableHeader (wrapped for right alignment)
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount") as string);
      const currency = row.original.currency;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      }).format(amount);

      const type = row.original.type;
      const colorClass = type === "Inbound" ? "text-green-600" : "text-red-600";

      return <div className={`text-right font-bold ${colorClass}`}>{formatted}</div>;
    },
    size: 120,
  },

  // 7. View Details (Not sortable)
  {
    id: "details",
    enableHiding: false,
    enableSorting: false,
    header: () => <div className="text-center">Reference</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center text-xs text-muted-foreground">
          {row.original.publicRef.slice(0, 8)}...
        </div>
      );
    },
  },
];
