import { SectionHeader } from "@/components/admin-panel/section-header";

interface ContentLayoutProps {
  title: string;
  hideSidebar?: boolean;
  children: React.ReactNode;
}

export function ContentLayout({
  title,
  hideSidebar,
  children,
}: ContentLayoutProps) {
  return (
    <div>
      <SectionHeader title={title} hideSidebar={hideSidebar} />
      <div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
    </div>
  );
}
