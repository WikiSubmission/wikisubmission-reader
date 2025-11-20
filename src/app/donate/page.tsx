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

export default function DonatePage() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center text-center space-y-4">
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

      <section className="max-w-sm text-center text-sm text-muted-foreground">
        <p>
          Your contribution helps us provide free and open-source technology, educational resources, and creative media.
        </p>
      </section>

      <hr className="w-xs" />

      <section className="max-w-sm flex flex-col gap-4 w-full">
        <Item asChild variant="outline">
          <Link href="https://donate.stripe.com/dRmeV6bVIeic9Xt9KfeAg00" target="_blank" rel="noopener noreferrer">
            <ItemContent>
              <ItemTitle>
                One-Time Donation
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
                Monthly Donation
              </ItemTitle>
              <ItemDescription>
                Make recurring contributions
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Calendar className="size-5" />
              <ChevronRight className="size-4" />
            </ItemActions>
          </Link>
        </Item>
      </section>

      <section className="max-w-sm text-center text-xs text-muted-foreground space-y-3">
        <p>
          WikiSubmission is a 501(c)(3) public charity. Donations are tax-deductible under{" "}
          <a 
            href="https://www.irs.gov/charities-non-profits/charitable-organizations/exemption-requirements-501c3-organizations" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            IRC Section 170
          </a>.
        </p>
        <p>
          For more information, see the IRS{" "}
          <a 
            href="https://www.irs.gov/charities" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            Tax Information for Charities
          </a>{" "}
          and{" "}
          <a 
            href="https://www.irs.gov/pub/irs-pdf/p4221pc.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            Publication 4221-PC
          </a>.
        </p>
      </section>
    </main>
  );
}

