import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { ChevronRight, FileText, DollarSign, Users, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Transparency | WikiSubmission",
  description:
    "WikiSubmission is committed to transparency in all aspects of our operations. Learn about our finances, governance, operations, and open-source initiatives.",
  openGraph: {
    title: "Transparency | WikiSubmission",
    description:
      "WikiSubmission is committed to transparency in all aspects of our operations. Learn about our finances, governance, operations, and open-source initiatives.",
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
  return (
    <main className="flex flex-col min-h-screen items-center justify-center text-center space-y-8 md:p-24 p-4">
      <Image
        src="/brand-assets/logo-black.png"
        alt="WikiSubmission Logo"
        width={72}
        height={72}
        className="rounded-full"
      />

      <section className="flex gap-4 max-w-md items-center">
        <h1 className="text-3xl font-semibold">
          Transparency
        </h1>
      </section>

      <section className="max-w-2xl text-center text-sm text-muted-foreground">
        <p>
          WikiSubmission is committed to full transparency in all aspects of our operations. We believe in open communication with our community about how we operate, how we use donations, and how we make decisions.
        </p>
      </section>

      <section className="max-w-sm flex flex-col gap-4 w-full">
        <Item asChild variant="outline">
          <Link href="https://github.com/WikiSubmission" target="_blank" rel="noopener noreferrer">
            <ItemContent>
              <ItemTitle>
                Open Source Projects
              </ItemTitle>
              <ItemDescription>
                All our code is publicly available on GitHub
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <FileText className="size-5" />
              <ChevronRight className="size-4" />
            </ItemActions>
          </Link>
        </Item>

        <Item variant="outline" className="opacity-50 cursor-not-allowed">
          <ItemContent>
            <ItemTitle>
              Financial Reports
            </ItemTitle>
            <ItemDescription>
              Annual budgets, expenses, and donor information (coming soon)
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <DollarSign className="size-5" />
          </ItemActions>
        </Item>

        <Item variant="outline" className="opacity-50 cursor-not-allowed">
          <ItemContent>
            <ItemTitle>
              Governance Documents
            </ItemTitle>
            <ItemDescription>
              Bylaws, policies, and organizational structure (coming soon)
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Shield className="size-5" />
          </ItemActions>
        </Item>

        <Item variant="outline" className="opacity-50 cursor-not-allowed">
          <ItemContent>
            <ItemTitle>
              Team & Contributors
            </ItemTitle>
            <ItemDescription>
              Meet the people behind WikiSubmission (coming soon)
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Users className="size-5" />
          </ItemActions>
        </Item>
      </section>

      <section className="max-w-2xl text-center text-sm text-muted-foreground">
        <p>
          We are continuously working to improve our transparency practices. If you have questions or would like to see additional information, please <Link href="/contact" className="underline hover:text-foreground">contact us</Link>.
        </p>
      </section>
    </main>
  );
}
