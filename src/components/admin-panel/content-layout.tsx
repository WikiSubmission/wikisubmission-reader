import { SectionHeader } from "@/components/admin-panel/section-header";

interface ContentLayoutProps {
  title: string;
  hideSidebar?: boolean;
  noHorizontalPadding?: boolean;
  children: React.ReactNode;
}

export function ContentLayout({
  title,
  hideSidebar,
  noHorizontalPadding,
  children,
}: ContentLayoutProps) {
  return (
    <div>
      <SectionHeader title={title} hideSidebar={hideSidebar} />
      <div className={`pt-4 pb-8${noHorizontalPadding ? "" : " px-4 sm:px-8"}`}>
        {children}
      </div>
    </div>
  );
}
