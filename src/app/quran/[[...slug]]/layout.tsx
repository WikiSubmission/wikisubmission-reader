import { ContentLayout } from "@/components/admin-panel/content-layout";
import SearchBar from "./components/search-bar";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

export default function QuranLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Quran: The Final Testament">
        <main className="space-y-4">
          <SearchBar />
          {children}
        </main>
      </ContentLayout>
    </AdminPanelLayout>
  );
}
