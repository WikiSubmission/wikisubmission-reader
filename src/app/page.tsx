import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/80">
      <main className="flex flex-1 flex-col items-center justify-start gap-8 p-4 pt-16 sm:justify-center sm:pt-0">
        <section className="space-y-1">
          <p className="font-ultralight text-center text-xs font-bold tracking-widest text-muted-foreground">
            WIKISUBMISSION.ORG
          </p>
          <p className="font-ultralight text-center text-xs tracking-widest text-muted-foreground">
            ACCESS THE FINAL TESTAMENT
          </p>
        </section>
        <div className="animate-fade-in animation-delay-400">
          <Image
            src="/god-alone.gif"
            alt="WikiSubmission"
            className="rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl"
            width={200}
            height={200}
            priority
            unoptimized
          />
        </div>

        <div className="animate-fade-in animation-delay-600">
          <Link href="/quran">
            <Button
              variant="special"
              className="hover:scale-103 px-8 py-6 text-lg transition-transform duration-300"
            >
              Enter
            </Button>
          </Link>
        </div>
      </main>

      <footer className="p-4 text-center text-sm text-muted-foreground">
        <p>
          &copy; 2025 WikiSubmission. An{" "}
          <a
            href="https://github.com/WikiSubmission/wikisubmission-reader"
            target="_blank"
            className="text-primary"
          >
            open-source
          </a>{" "}
          project.
        </p>
      </footer>
    </div>
  );
}
