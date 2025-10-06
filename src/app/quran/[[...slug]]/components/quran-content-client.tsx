"use client";
import { QuranPageStore } from "@/hooks/use-quran-page";
import QuranContent from "./quran-content-server";
import { GlobalPageProps } from "@/types/global-page-props";

export default function QuranContentClient({ params, searchParams }: GlobalPageProps) {
  const language = QuranPageStore((s) => s.language);
  return <QuranContent params={params} searchParams={searchParams} includeLanguage={language} />;
}
