"use client";

import Link from "next/link";
import { Identity } from "@/constants/identity";
import { Fonts } from "@/constants/fonts";
import Image from "next/image";
import { ThemeToggle } from "../ui/theme-toggle";

export function Navbar() {
  return (
    <header className="z-[50] sticky w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40">
      <div className="container h-14 flex items-center">
        <Link
          href="/"
          className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
        >
          <span
            className={`flex gap-1 items-center font-light tracking-widest ${Fonts.wiki.className}`}
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
