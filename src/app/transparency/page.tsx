import { Metadata } from "next";
import Image from "next/image";
import { InfoCard } from "./_components/data-card";
import { TransactionSection } from "./_components/transaction";
import {
  BarChartIcon,
  DollarSignIcon,
  GoalIcon,
  TrendingUpIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Transparency | WikiSubmission",
  description:
    "Transparency page for WikiSubmission, a 501(c)(3) nonprofit organization providing free and open-source technology, educational resources, and creative media in the cause of God. Balance and historic donations will be displayed here.",
  openGraph: {
    title: "Transparency | WikiSubmission",
    description:
      "Transparency page for WikiSubmission, a 501(c)(3) nonprofit organization providing free and open-source technology, educational resources, and creative media in the cause of God. Balance and historic donations will be displayed here.",
    url: "/transparency",
    images: [
      {
        url: "/brand-assets/logo-black.png",
        width: 125,
        height: 125,
        alt: "WikiSubmission Logo",
      },
    ],
  },
};

export default function TransparencyPage() {
  const currentBalance = 10000.5;
  const monthlyGoal = 15000.0;
  const totalYTDDonations = 85000.0;
  const monthlyDeficit = currentBalance - monthlyGoal;
  return (
    <main className="flex h-full flex-col items-center justify-center gap-5 space-y-8 p-4 text-center md:pt-10">
      {/*Header section */}
      <section className="flex max-w-2xl flex-col gap-10">
        {/*Title and overview section */}
        <div className="flex w-full flex-row items-center justify-center gap-10">
          <Image
            src="/brand-assets/logo-black.png"
            alt="WikiSubmission Logo"
            width={72}
            height={72}
            className="rounded-full"
          />

          <h1 className="text-3xl font-semibold">Transparency page</h1>
        </div>
        {/*Description of the page */}
        <p className="text-start text-sm text-muted-foreground">
          Transparency page for WikiSubmission, a 501(c)(3) nonprofit organization providing free
          and open-source technology, educational resources, and creative media in the cause of God.
          Current balance, transaction history as well as spending will be displayed here.
        </p>
      </section>
      {/*Balance section */}
      <section className="grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
        <InfoCard
          value={currentBalance}
          title={"Current Funds"}
          currencyCode={"USD"}
          description="Total funds available across all accounts"
        />

        <InfoCard
          value={monthlyGoal}
          title={"Monthly Bill Goal"}
          currencyCode={"USD"}
          description="Needed by month-end for core operational bills"
        />

        <InfoCard
          value={Math.abs(monthlyDeficit)}
          title={monthlyDeficit >= 0 ? "Current Excess" : "Current Deficit"}
          currencyCode={"USD"}
          description={
            monthlyDeficit >= 0
              ? "Available after known monthly expenses"
              : "Shortfall to meet monthly obligations"
          }
        />

        <InfoCard
          value={totalYTDDonations}
          title={"Total Donations (YTD)"}
          currencyCode={"USD"}
          description="Cumulative funds received this calendar year"
        />
      </section>
      {/*Transaction history section*/}
      <TransactionSection />
    </main>
  );
}
