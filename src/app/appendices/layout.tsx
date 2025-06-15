import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Appendices | WikiSubmission",
    description: "Access appendices 1 - 38 from Quran: The Final Testament",
}


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