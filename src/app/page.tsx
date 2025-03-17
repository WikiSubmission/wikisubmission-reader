import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Identity } from "@/constants/identity";
import { StylingClasses } from "@/constants/styling";
import { Fonts } from "@/constants/fonts";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="min-h-[calc(100vh-57px-97px)] flex-1">
        <div className="container relative pb-10">
          <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-6">
            <h1
              className={`text-center font-bold text-5xl md:text-7xl leading-tight tracking-tighter lg:leading-[1.1] ${StylingClasses.Chromatic} ${Fonts.title.className}`}
            >
              {Identity.name}
            </h1>
            <span className="max-w-[750px] text-center text-lg font-light text-foreground text-slate-700 dark:text-slate-200">
              {Identity.description}
            </span>
            <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
              <Button variant="default" asChild>
                <Link href="/dashboard">
                  Dashboard
                  <ArrowRightIcon className="ml-2" />
                </Link>
              </Button>

              {/* Add more buttons here... */}
            </div>
          </section>
          <div className="w-full flex justify-center relative">
            <Image
              src="/media/godalone.gif"
              width={500}
              height={500}
              alt="demo"
              priority
              className="border rounded-xl shadow-sm"
            />
          </div>
        </div>
      </main>
      <footer className="py-6 md:py-0 border-t border-border/40">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
            {new Date().getFullYear()} © {Identity.name}
          </p>
        </div>
      </footer>
    </div>
  );
}
