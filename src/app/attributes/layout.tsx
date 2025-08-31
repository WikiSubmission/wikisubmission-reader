import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { ReactNode } from "react";
import { Header } from "./components/header";

interface Props {
  children: ReactNode;
}
export default function NamesOfGodLayout({ children }: Props) {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Names of God!">
        <main className="h-full w-full overflow-clip">
          <Header />
          {children}
        </main>
      </ContentLayout>
    </AdminPanelLayout>
  );
}
