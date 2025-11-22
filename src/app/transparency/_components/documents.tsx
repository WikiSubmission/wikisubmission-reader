// Assuming you have imported these components
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Calendar,
  Banknote,
  Download,
  ArrowDownIcon,
  ArrowUpIcon,
} from "lucide-react";

export type BankStatement = {
  // Direct link to the PDF file
  link: string;
  // Name of the bank/financial institution
  bank: string;
  // Date the statement was generated/posted (e.g., last day of the month)
  statementDate: string;
  // The actual period the statement covers
  dateRange: {
    start: string;
    end: string;
  };
  // Unique reference (e.g., month/year) for easy identification
  referenceId: string;
  summary: {
    // Total debits for the period
    withdrawals: number;
    // Total credits for the period
    deposits: number;
    // The account balance at the end of the statement period
    endingBalance: number;
    currency: "USD" | "EUR" | "GBP";
  };
};

function formatCurrency(amount: number, currency: BankStatement["summary"]["currency"]): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

function getBankStatements(): BankStatement[] {
  return [
    {
      link: "/statements/bank-a-2025-10.pdf",
      bank: "Global Trust Bank (Checking)",
      statementDate: "October 31, 2025",
      dateRange: { start: "October 1, 2025", end: "October 31, 2025" },
      referenceId: "GTB-2025-10",
      summary: {
        withdrawals: 4500.25,
        deposits: 12500.5,
        endingBalance: 28950.75,
        currency: "USD",
      },
    },
    {
      link: "/statements/bank-b-2025-Q3.pdf",
      bank: "Continental Savings (Savings)",
      statementDate: "September 30, 2025",
      dateRange: { start: "July 1, 2025", end: "September 30, 2025" },
      referenceId: "CS-2025-Q3",
      summary: {
        withdrawals: 0.0,
        deposits: 5000.0,
        endingBalance: 75000.0,
        currency: "EUR",
      },
    },
    {
      link: "/statements/bank-c-2025-09.pdf",
      bank: "Local Community Credit Union",
      statementDate: "September 15, 2025",
      dateRange: { start: "August 15, 2025", end: "September 14, 2025" },
      referenceId: "LCCU-2025-09",
      summary: {
        withdrawals: 800.0,
        deposits: 1500.0,
        endingBalance: 4200.5,
        currency: "USD",
      },
    },
  ];
}

export function Documents() {
  const data = getBankStatements();

  // Helper for displaying a single data point
  const DataPoint = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: any;
    label: string;
    value: string | JSX.Element;
  }) => (
    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
      <Icon className="h-4 w-4 shrink-0 text-blue-500" />
      <div>
        <span className="font-semibold">{label}:</span> {value}
      </div>
    </div>
  );

  return (
    <section className="flex w-full flex-col gap-5">
      {data.length === 0 && (
        <p className="text-center text-muted-foreground">
          No bank statements are currently available.
        </p>
      )}
      {data.map((statement, index) => {
        const { bank, dateRange, referenceId, summary, link, statementDate } = statement;
        const currency = summary.currency;

        return (
          <Card
            key={referenceId || index}
            className="border border-muted shadow-md transition-shadow duration-300 hover:shadow-lg"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 sm:p-6">
              <div className="flex flex-col space-y-1">
                <h3 className="text-xl font-semibold leading-none">{bank}</h3>
                <p className="text-sm text-muted-foreground">
                  Statement Period: {dateRange.start} - {dateRange.end}
                </p>
              </div>

              <div className="flex gap-3">
                <Button asChild variant="outline" size="icon" title="Download Statement">
                  {/* Using a regular <a> tag with download attribute for PDF files */}
                  <a href={link} download={`${referenceId}-${bank.replace(/\s/g, "_")}.pdf`}>
                    <Download className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild title="Open Statement PDF" variant={"secondary"}>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    Open File <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-4 p-4 pt-0 sm:px-6 md:grid-cols-4">
              <DataPoint icon={Calendar} label="Statement Date" value={statementDate} />

              <DataPoint
                icon={Banknote}
                label="Ending Balance"
                value={
                  <span className="text-lg font-bold text-green-600">
                    {formatCurrency(summary.endingBalance, currency)}
                  </span>
                }
              />

              <DataPoint
                icon={ArrowUpIcon} // Assuming ArrowUp is imported for Deposits
                label="Total Deposits"
                value={
                  <span className="text-green-500">
                    {formatCurrency(summary.deposits, currency)}
                  </span>
                }
              />

              <DataPoint
                icon={ArrowDownIcon} // Assuming ArrowDown is imported for Withdrawals
                label="Total Withdrawals"
                value={
                  <span className="text-red-500">
                    {formatCurrency(summary.withdrawals, currency)}
                  </span>
                }
              />
            </CardContent>

            <CardFooter className="p-4 pt-0 sm:px-6">
              <p className="text-xs text-muted-foreground">Reference ID: {referenceId}</p>
            </CardFooter>
          </Card>
        );
      })}
    </section>
  );
}
