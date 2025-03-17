"use client";

import Link from "next/link";
import { Globe } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Identity } from "@/constants/identity";
import { Fonts } from "@/constants/fonts";

export function Navbar() {
  return (
    <header className="z-[50] sticky top-0 w-full bg-background/95 border-b border-b-2 backdrop-blur-sm dark:bg-black/[0.6] border-border/40">
      <div className="container h-14 flex items-center">
        <Link
          href="/"
          className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
        >
          <Globe className="w-5 h-5 mr-2 text-blue-500" />
          <span className={`${Fonts.title.className} text-2xl font-light`}>{Identity.name}</span>
          <span className="sr-only">{Identity.name}</span>
        </Link>
        <hr />
        <nav className="ml-auto flex items-center gap-2">
          <header className="flex justify-end items-center gap-2 h-16">

          </header>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
