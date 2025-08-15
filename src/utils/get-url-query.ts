import { GlobalPageProps } from "@/types/global-page-props";

export async function getUrlQuery(props: GlobalPageProps): Promise<string | null> {
  // [Await the params]
  const resolvedParams = await props.params;
  const resolvedSearchParams = await props.searchParams;

  // e.g. /quran/1 --> "1" or /quran/?q=3 --> "3" (undefined if no query)
  const detectedQuery =
    resolvedParams.slug?.map((segment) => decodeURIComponent(segment)).join("/") ||
    resolvedSearchParams.q?.toString();
  return detectedQuery || null;
}
