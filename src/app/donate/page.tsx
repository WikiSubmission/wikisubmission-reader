import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { ChevronRight, Heart, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate | WikiSubmission",
  description: "Support WikiSubmission, a 501(c)(3) nonprofit organization providing free and open-source technology, educational resources, and creative media in the cause of God.",
  openGraph: {
    title: "Donate | WikiSubmission",
    description: "Support WikiSubmission, a 501(c)(3) nonprofit organization providing free and open-source technology, educational resources, and creative media in the cause of God.",
    url: "/donate",
    images: [
      {
        url: "/brand-assets/logo-black.png",
        width: 125,
        height: 125,
        alt: "WikiSubmission Logo",
      },
    ],
  },
}

export default function DonatePage() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center text-center space-y-4 md:p-24 p-8">
      <Image
        src="/brand-assets/logo-black.png"
        alt="WikiSubmission Logo"
        width={72}
        height={72}
        className="rounded-full"
      />

      <section className="max-w-sm flex gap-4 max-w-md items-center">
        <h1 className="text-3xl font-semibold">
          Support WikiSubmission
        </h1>
      </section>

      <section className="max-w-sm flex flex-col gap-4 w-full">
        <Item asChild variant="outline">
          <Link href="https://donate.stripe.com/dRmeV6bVIeic9Xt9KfeAg00" target="_blank" rel="noopener noreferrer">
            <ItemContent>
              <ItemTitle>
                One-Time Contribution
              </ItemTitle>
              <ItemDescription>
                Make a single contribution
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Heart className="size-5" />
              <ChevronRight className="size-4" />
            </ItemActions>
          </Link>
        </Item>

        <Item asChild variant="outline">
          <Link href="https://donate.stripe.com/4gMeV69NAde86Lhe0veAg03" target="_blank" rel="noopener noreferrer">
            <ItemContent>
              <ItemTitle>
                Monthly Contribution
              </ItemTitle>
              <ItemDescription>
                Choose an amount to contribute every month
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Calendar className="size-5" />
              <ChevronRight className="size-4" />
            </ItemActions>
          </Link>
        </Item>
      </section>

      <section className="max-w-sm text-center text-sm text-muted-foreground">
        <p>
          Your donations directly support our cause. All funds are used to maintain our infrastructure and operations and to fund new technical and creative initiatives in the cause of God. Donations do not purchase, unlock, or provide any in‑app features or content.
        </p>
      </section>

      <section className="max-w-sm text-center text-sm text-muted-foreground space-y-3 border-t border-muted-foreground/20 pt-4">
        <p>
          WikiSubmission is a registered 501(c)(3) public charity (EIN: 39-4876245). Contributions from U.S. donors may be tax-deductible to the extent permitted by law. Please consult your tax advisor and the IRS for guidance.
        </p>
        <p>
          For more information about tax rules and charitable giving, see the IRS{" "}
          <a
            href="https://www.irs.gov/charities"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            Tax Information for Charities
          </a>{" "}
          and this{" "}
          <a
            href="https://www.irs.gov/pub/irs-pdf/p4221pc.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            IRS Publication 4221-PC
          </a>.
        </p>
      </section>

      <section className="max-w-sm text-center italic text-sm text-muted-foreground border-t border-muted-foreground/20 pt-4">
        <p>
          <strong>[2:261]</strong> The example of those who spend their monies in the cause of GOD is that of a grain that produces seven spikes, with a hundred grains in each spike. GOD multiplies this manifold for whomever He wills. GOD is Bounteous, Knower.
        </p>
      </section>
    </main >
  );
}
