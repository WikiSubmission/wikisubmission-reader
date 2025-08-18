"use client";
import { BookmarkPreview } from "@/app/quran/[[...slug]]/components/bookmark-preview";
import { Footer } from "@/components/admin-panel/footer";
import { Sidebar } from "@/components/admin-panel/sidebar";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const sidebar = useStore(useSidebar, (x) => x);

  if (!sidebar) return null;

  const { getOpenState, settings } = sidebar;
  const isOpen = getOpenState();
  const sidebarDisabled = settings.disabled;

  // Calculate margin based on sidebar state
  const getMarginClass = () => {
    if (sidebarDisabled) return "";
    return isOpen ? "lg:ml-72" : "lg:ml-[90px]";
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Sidebar />
      <BookmarkPreview />

      <main
        className={cn(
          "min-h-[calc(100vh-4rem)] transition-[margin-left] duration-300 ease-in-out",
          getMarginClass()
        )}
      >
        {children}
      </main>

      <footer
        className={cn(
          "h-[4rem] transition-[margin-left] duration-300 ease-in-out",
          getMarginClass()
        )}
      >
        <Footer />
      </footer>
    </div>
  );
}
