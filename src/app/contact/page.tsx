import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Identity } from "@/constants/identity";
import { ChevronRight, Mail, Github, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center text-center space-y-8 md:p-24 p-4">
      <Image
        src="/brand-assets/logo-black.png"
        alt="WikiSubmission Logo"
        width={72}
        height={72}
        className="rounded-full"
      />

      <section className=" flex gap-4 max-w-md items-center">
        <h1 className="text-3xl font-semibold">
          Contact Us
        </h1>
      </section>

      <section className="max-w-sm text-center text-sm text-muted-foreground">
        <p>
          We&apos;d love to hear from you. Whether you have questions, suggestions, or need support, we&apos;re here to help.
        </p>
      </section>

      <hr className="w-xs" />

      <section className="max-w-sm flex flex-col gap-4">
        <Item asChild variant="outline">
          <a href={`mailto:${Identity.email}`}>
            <ItemContent>
              <ItemTitle>
                Email
              </ItemTitle>
              <ItemDescription>
                General inquiries and support
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Mail className="size-4" />
              <ChevronRight className="size-4" />
            </ItemActions>
          </a>
        </Item>

        <Item asChild variant="outline">
          <Link href={Identity.social.github} target="_blank" rel="noopener noreferrer">
            <ItemContent>
              <ItemTitle>
                GitHub
              </ItemTitle>
              <ItemDescription>
                Bug reports and contributions
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Github className="size-4" />
              <ChevronRight className="size-4" />
            </ItemActions>
          </Link>
        </Item>

        <Item asChild variant="outline">
          <Link href={Identity.social.discord} target="_blank" rel="noopener noreferrer">
            <ItemContent>
              <ItemTitle>
                Discord
              </ItemTitle>
              <ItemDescription>
                Connect with our community
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <MessageSquare className="size-4" />
              <ChevronRight className="size-4" />
            </ItemActions>
          </Link>
        </Item>
      </section>
    </main>
  );
}
