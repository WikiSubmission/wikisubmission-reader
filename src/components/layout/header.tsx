"use client";

import Link from "next/link";
import { Identity } from "@/constants/identity";
import { Fonts } from "@/constants/fonts";
import Image from "next/image";
import { ThemeToggle } from "../ui/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky z-[50] w-full border-b border-border/40 bg-background/95 backdrop-blur-sm dark:bg-black/[0.6]">
      <div className="container flex h-14 items-center">
        <Link
          href="/"
          className="flex items-center justify-start transition-opacity duration-300 hover:opacity-85"
        >
          <span
            className={`flex items-center gap-1 font-light tracking-widest ${Fonts.wiki.className}`}
          >
            <Image
              src="https://library.wikisubmission.org/logo.png"
              alt="WikiSubmission Logo"
              className="rounded-full"
              width={25}
              height={25}
              priority
            />
            {Identity.name.toUpperCase()}
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
