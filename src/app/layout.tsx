import type { Metadata } from "next";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { Identity } from "@/constants/identity";
import { Navbar } from "@/components/layout/navbar";
import { Fonts } from "@/constants/fonts";

export const runtime = "edge";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `http://localhost:${process.env.PORT || 3000}`,
  ),
  title: Identity.name,
  description: Identity.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    title: Identity.name,
    description: Identity.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: Identity.name,
    description: Identity.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={Fonts.default.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
