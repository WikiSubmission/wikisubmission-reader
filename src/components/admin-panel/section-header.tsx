"use client";

import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";

interface SectionHeaderProps {
  title: string;
  hideSidebar?: boolean;
}

export function SectionHeader({ title, hideSidebar }: SectionHeaderProps) {
  const pathname = usePathname();

  // Break down the pathname into segments
  const pathSegments = pathname.split("/").filter(Boolean); // remove empty strings

  // Reconstruct URLs for each segment
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const words = decodeURIComponent(segment.replace(/-/g, " ")).split(" ");
    const capitalizedName = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    return {
      name: capitalizedName,
      href,
    };
  });

  return (
    <header className="sticky z-10 w-full pt-4">
      <div className="mx-4 sm:mx-8 flex items-center gap-2">
        {hideSidebar !== true && <SheetMenu />}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumbs.length > 0 && <BreadcrumbSeparator />}
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.href}>
                <BreadcrumbItem>
                  {index < breadcrumbs.length - 1 ? (
                    <BreadcrumbLink href={crumb.href}>
                      {crumb.name.charAt(0).toUpperCase() + crumb.name.slice(1)}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbLink href={crumb.href}>
                      {crumb.name.charAt(0).toUpperCase() + crumb.name.slice(1)}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
