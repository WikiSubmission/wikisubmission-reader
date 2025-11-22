"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DataTable } from "./data-table";
import { columns, Transaction } from "./columns";
import { Documents } from "./documents";

const TITLES: Record<"table" | "pdf", string> = {
  table: "Transaction History",
  pdf: "Bank Statements",
};

function getData(): Transaction[] {
  return [
    // 1. Named Donation (Inbound) - Program Funding
    {
      publicRef: "PUB-A1B2C3D4",
      timestamp: new Date("2025-11-20T10:00:00Z"),
      status: "Success",
      type: "Inbound",
      description: "Online Donation via Stripe - Project Clean Water",
      amount: 500.0,
      currency: "USD",
      category: "Program Funding",
      donorInfo: {
        type: "person",
        fullName: "Jane Doe",
        message: "Keep up the amazing work! This is for the solar panel project.",
      },
    },

    // 2. Anonymous Donation (Inbound) - General
    {
      publicRef: "PUB-E5F6G7H8",
      timestamp: new Date("2025-11-19T15:30:00Z"),
      status: "Success",
      type: "Inbound",
      description: "Direct Bank Transfer - General Support",
      amount: 50.0,
      currency: "USD",
      category: "General Support",
      donorInfo: {
        type: "anonymous",
        message: "A small contribution to help your cause.",
      },
    },

    // 3. Outbound Spending - Program Expense
    {
      publicRef: "PUB-I9J0K1L2",
      timestamp: new Date("2025-11-18T09:15:00Z"),
      status: "Success",
      type: "Outbound",
      description: "Payment to WaterWell Inc. for pump installation.",
      amount: 1500.0,
      currency: "USD",
      category: "Program Expense",
      // Outbound transactions typically don't have donorInfo
    },

    // 4. Outbound Spending - Overhead/Administrative
    {
      publicRef: "PUB-M3N4O5P6",
      timestamp: new Date("2025-11-15T12:45:00Z"),
      status: "Success",
      type: "Outbound",
      description: "Monthly Office Rent for November 2025.",
      amount: 850.0,
      currency: "USD",
      category: "Administrative Overhead",
    },

    // 5. Donation in a different currency (EUR)
    {
      publicRef: "PUB-Q7R8S9T0",
      timestamp: new Date("2025-11-14T11:00:00Z"),
      status: "Success",
      type: "Inbound",
      description: "Online Donation via PayPal - European Supporter",
      amount: 120.5,
      currency: "EUR",
      category: "General Support",
      donorInfo: {
        type: "person",
        fullName: "Dirk Müller",
      },
    },

    // 6. Failed/Filtered Transaction (Should be removed from public view, but here for completeness)
    {
      publicRef: "PUB-U1V2W3X4",
      timestamp: new Date("2025-11-13T14:20:00Z"),
      status: "Failed", // Filtered out for public view!
      type: "Inbound",
      description: "Bounced Check from Donor X",
      amount: 75.0,
      currency: "USD",
      category: "Failed Transaction",
      donorInfo: {
        type: "anonymous",
      },
    },
  ];
}

export function TransactionSection() {
  const [selectedTab, setSelectedTab] = useState<"table" | "pdf">("table");
  const data = getData();
  return (
    <section className="flex w-full max-w-5xl flex-col items-start justify-start gap-5">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-row gap-3 opacity-0">
          <Button
            className={`border ${selectedTab === "table" ? "border-primary" : ""}`}
            variant={"special"}
            onClick={() => setSelectedTab("table")}
          >
            Table
          </Button>
          <Button
            className={`border ${selectedTab === "pdf" ? "border-primary" : ""}`}
            variant={"special"}
            onClick={() => setSelectedTab("pdf")}
          >
            PDF
          </Button>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">{TITLES[selectedTab]}</h1>
        <div className="flex flex-row gap-3">
          <Button
            className={`border ${selectedTab === "table" ? "border-primary" : ""}`}
            variant={"special"}
            onClick={() => setSelectedTab("table")}
          >
            Table
          </Button>
          <Button
            className={`border ${selectedTab === "pdf" ? "border-primary" : ""}`}
            variant={"special"}
            onClick={() => setSelectedTab("pdf")}
          >
            PDF
          </Button>
        </div>
      </div>

      {selectedTab === "table" && <DataTable columns={columns} data={data} />}
      {selectedTab === "pdf" && <Documents />}
    </section>
  );
}
