import { Identity } from "@/constants/identity";

export function Footer() {
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center">
        <span className="text-slate-600 dark:text-slate-300 font-light text-sm">
          {Identity.name} &copy; {new Date().getFullYear()}
        </span>
      </div>
    </div>
  );
}
