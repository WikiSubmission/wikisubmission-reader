import Link from "next/link";
import { MenuIcon, PanelsTopLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Menu } from "@/components/admin-panel/menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Identity } from "@/constants/identity";
import Image from "next/image";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-5 rounded-lg" variant="outline" size="icon">
          <MenuIcon size={14} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <Button
            className="flex justify-center items-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link href="/quran" className="flex items-center gap-2">
              <Image
                src="https://library.wikisubmission.org/logo.png"
                alt="WikiSubmission Logo"
                className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                width={25}
                height={25}
              />
              <SheetTitle className="text-center font-light text-xl text-muted-foreground">
                {Identity.name}
              </SheetTitle>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
