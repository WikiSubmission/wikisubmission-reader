import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Downloads | WikiSubmission",
    description: "Access free books and useful resources for Submission",
}

export default function QuranLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminPanelLayout>
            <ContentLayout title="Downloads">
                <main className="space-y-4">
                    {children}
                </main>
            </ContentLayout>
        </AdminPanelLayout>
    );
}