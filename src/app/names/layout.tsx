import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default function NamesOfGodLayout({ children }: Props) {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Names of God!">
        <main className="space-y-4">{children}</main>
      </ContentLayout>
    </AdminPanelLayout>
  );
}
