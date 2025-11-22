import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { DollarSign, Goal, TrendingUp, BarChart, X } from "lucide-react"; // Example icons

interface InfoCardProps {
  value: number; // Changed to number for proper formatting
  title: string;
  currencyCode: "USD" | "EUR" | "NONE"; // Use a code for formatting, or NONE for percentages/counts
  description: string;
  // Optional property to show if the number is positive/negative (for trends)
  trend?: "up" | "down" | "neutral";
}

function formatValue(value: number, currencyCode: InfoCardProps["currencyCode"]): string {
  if (currencyCode === "NONE") {
    return value.toLocaleString();
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0, // Keep amounts clean
    maximumFractionDigits: 2,
  }).format(value);
}

export function InfoCard({ value, title, currencyCode, description, trend }: InfoCardProps) {
  const formattedValue = formatValue(value, currencyCode);

  // Style for the trend indicator
  let trendClass = "text-gray-500";
  if (trend === "up") trendClass = "text-green-500";
  if (trend === "down") trendClass = "text-red-500";

  return (
    <Card className="flex w-full flex-col bg-background shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
        {/* Title and Icon */}
        <h3 className="text-base font-medium text-gray-500">{title}</h3>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        {/* Value */}
        <div className="text-3xl font-bold tabular-nums">{formattedValue}</div>

        {/* Description/Trend */}
        <p className={`mt-1 text-xs ${trendClass}`}>
          {trend === "up" && <TrendingUp className="mr-1 inline h-3 w-3" />}
          {trend === "down" && <TrendingUp className="mr-1 inline h-3 w-3 rotate-180" />}
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
