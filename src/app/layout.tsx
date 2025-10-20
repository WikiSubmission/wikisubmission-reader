import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/header";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import { LoadingIcon } from "@/components/ui/loading-icon";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `https://wikisubmission.org`,
  ),
  title: "WikiSubmission",
  description:
    "Access The Final Testament. A free and open-source platform for Submission.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    title: "WikiSubmission",
    description:
      "Access The Final Testament. A free and open-source platform for Submission.",
    type: "website",
    images: [
      {
        url: "/book.png",
        width: 125,
        height: 125,
        alt: "WikiSubmission Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Suspense
            fallback={
              <div className="flex min-h-screen flex-col items-center justify-center text-center">
                <LoadingIcon />
              </div>
            }
          />
          <Navbar />
          <Toaster />
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
