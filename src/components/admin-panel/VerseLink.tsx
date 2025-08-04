"use client";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import { scrollManager } from "@/utils/scroll-manager"; // Adjust path as needed

type VerseLinkProps = {
  chapterNumber: number;
  verseNumber: number;
  children: React.ReactNode;
};

export function VerseLink({
  chapterNumber,
  verseNumber,
  children,
}: VerseLinkProps) {
  const href = `/quran/${chapterNumber}#${chapterNumber}:${verseNumber}`;
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const [url, hash] = href.split("#");

    // Set up pending scroll before navigation
    scrollManager.setPendingScroll(hash);

    if (pathname === url) {
      // Same page - the scroll manager will handle it
      window.history.replaceState(null, "", href);
    } else {
      // Different page - navigate and let scroll manager handle the rest
      router.push(url);
    }
  };

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
}
