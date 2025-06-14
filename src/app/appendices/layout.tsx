import { ContentLayout } from "@/components/admin-panel/content-layout";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

export default function QuranLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminPanelLayout>
            <ContentLayout title="Appendices from Quran: The Final Testament">
                <main className="space-y-4">
                    {children}
                </main>
            </ContentLayout>
        </AdminPanelLayout>
    );
}