import { SheetMenu } from "@/components/admin-panel/sheet-menu";

interface SectionHeaderProps {
  title: string;
  hideSidebar?: boolean;
}

export function SectionHeader({ title, hideSidebar }: SectionHeaderProps) {
  return (
    <header className="sticky z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex justify-between items-center">
          <section className="flex items-center gap-2">
            {hideSidebar !== true && <SheetMenu />}
            <h1 className="font-bold">{title}</h1>
          </section>
        </div>
      </div>
    </header>
  );
}
