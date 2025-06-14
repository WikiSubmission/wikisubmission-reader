import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/80">
      <main className="flex-1 flex flex-col items-center justify-start pt-16 sm:justify-center sm:pt-0 gap-8 p-4">
        <section className="space-y-1">
          <p className="font-bold text-center text-xs tracking-widest font-ultralight text-muted-foreground">
            WIKISUBMISSION.ORG
          </p>
          <p className="text-center text-xs tracking-widest font-ultralight text-muted-foreground">
            ACCESS THE FINAL TESTAMENT
          </p>
        </section>
        <div className="animate-fade-in animation-delay-400">
          <Image
            src="https://library.wikisubmission.org/file/godalone.gif"
            alt="WikiSubmission"
            className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            width={200}
            height={200}
          />
        </div>

        <div className="animate-fade-in animation-delay-600">
          <Link href="/quran">
            <Button
              variant="special"
              className="px-8 py-6 text-lg hover:scale-103 transition-transform duration-300"
            >
              Enter
            </Button>
          </Link>
        </div>
      </main>

      <footer className="text-center text-sm text-muted-foreground p-4">
        <p>&copy; 2025 WikiSubmission. An <a href="https://github.com/WikiSubmission/wikisubmission-web" target="_blank" className="text-primary">open-source</a> project.</p>
      </footer>
    </div>
  );
}