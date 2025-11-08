import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"
import { Identity } from "@/constants/identity";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaApple, FaAppStore, FaGithub } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center text-center space-y-8 md:p-24 p-4">

      <section className="max-w-sm flex flex-col gap-4 max-w-md items-center">
        <Image
          src="/brand-assets/logo-black.png"
          alt="WikiSubmission Logo"
          width={72}
          height={72}
          className="rounded-full"
        />

        <h1 className="text-3xl font-semibold">
          WikiSubmission
        </h1>
      </section>

      <section className="space-y-2">
        <section className="flex flex-col">
          <Item asChild variant="outline">
            <Link href="/quran">
              <ItemContent>
                <ItemTitle>
                  Quran
                </ItemTitle>
                <ItemDescription>
                  The Final Testament
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Image src="/book.png" className="size-8 rounded-full" alt="Quran" width={500} height={500} />
                <ChevronRight className="size-4" />
              </ItemActions>
            </Link>
          </Item>
        </section>

        <section className="flex flex-col">
          <Item asChild variant="outline">
            <Link href="https://apps.apple.com/us/app/submission-religion-of-god/id6444260632" target="_blank" rel="noopener noreferrer">
              <ItemContent>
                <ItemTitle>
                  iOS App
                </ItemTitle>
                <ItemDescription>
                  iPhone, iPad and Mac
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <FaApple className="size-8" />
                <ChevronRight className="size-4" />
              </ItemActions>
            </Link>
          </Item>
        </section>

        <p className="text-sm text-violet-600 tracking-widest" >
          More coming soon.
        </p>
      </section>

      <section className="max-w-md flex flex-wrap gap-4">
        <Link href={Identity.social.github}>
          <FaGithub className="size-4" />
        </Link>
        <Link href={Identity.social.twitter}>
          <FaTwitter className="size-4" />
        </Link>
        <Link href={Identity.social.youtube}>
          <FaYoutube className="size-4" />
        </Link>
        <Link href={Identity.social.discord}>
          <FaDiscord className="size-4" />
        </Link>
      </section>

      <section className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        <Link href="/contact">
          Contact
        </Link>
        <Link href="/terms-of-use">
          Terms of Use
        </Link>
        <Link href="/privacy-policy">
          Privacy Policy
        </Link>
      </section>

      <section className="max-w-sm text-center text-xs text-muted-foreground space-y-2">
        <p>
          WikiSubmission is a 501(c)(3) nonprofit organization.  We provide free and open-source technology, educational resources, and creative media.
        </p>
      </section>
    </main>
  );
}

