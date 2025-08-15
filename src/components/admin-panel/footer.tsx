import { Identity } from "@/constants/identity";

export function Footer() {
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 flex h-14 items-center md:mx-8">
        <span className="text-sm font-light text-slate-600 dark:text-slate-300">
          {Identity.name} &copy; {new Date().getFullYear()}
        </span>
      </div>
    </div>
  );
}
