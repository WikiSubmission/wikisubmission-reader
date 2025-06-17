import { Suspense } from "react";
import { SearchIcon, AlertCircleIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WQuranAPIResponse } from "@/types/w-quran";
import { GlobalPageProps } from "@/types/global-page-props";
import { getUrlQuery } from "@/utils/get-url-query";
import { getUrlSearchParams } from "@/utils/get-url-search-params";
import { QuranSkeleton } from "@/components/skeletons/quran-skeleton";
import DefaultView from "./components/default-view";
import FooterSection from "./components/footer-section";
import HeaderSection from "./components/header-section";
import UtilitySection from "./components/utility-section";
import VerseCard from "./components/verse-card";
import AudioPlayer from "./components/audio-player";

export { generateMetadata } from "./metadata";

export default async function QuranPage({
  params,
  searchParams,
}: GlobalPageProps) {
  const { slug } = await params;
  return (
    <Suspense key={slug?.join("-")} fallback={<QuranSkeleton />}>
      <QuranContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

// Main content component wrapped in suspense
async function QuranContent({ params, searchParams }: GlobalPageProps) {
  // [Check if we have a valid query]
  // e.g. /quran/1 --> "1" or /quran/?q=3 --> "3" (undefined if no query)
  const detectedQuery = await getUrlQuery({ params, searchParams });

  // Default view if no query present
  if (!detectedQuery) return <DefaultView />;

  // [Get all search params, to append on top of the query]
  const resolvedSearchParams = await getUrlSearchParams(searchParams);

  // [Define base API url]
  const baseUrl = new URL(
    process.env.TEST_MODE === "true"
      ? `http://localhost:8080/${detectedQuery}`
      : `https://quran.wikisubmission.org/${detectedQuery}`,
  );

  // [Append all search params]
  resolvedSearchParams.forEach((value, key) => {
    baseUrl.searchParams.append(key, value);
  });

  // [Enforce certain search params]
  baseUrl.searchParams.append("include_word_by_word", "true");
  baseUrl.searchParams.append("search_apply_highlight", "true");

  // [Fetch data]
  let result: WQuranAPIResponse;

  try {
    const request = await fetch(baseUrl.toString(), { cache: "no-store" });
    if (!request.ok)
      throw new Error(`Error: ${request.status} ${request.statusText}`);
    // [Assign result]
    result = await request.json();
  } catch (err) {
    // [Internal Server Error]
    console.error(err);
    return (
      <main className="flex items-center justify-center min-h-[10vh] px-4">
        <div className="flex items-center space-x-2 bg-muted rounded-md border text-muted-foreground px-4 py-2">
          <AlertCircleIcon className="h-5 w-5 shrink-0" />
          <span className="text-sm leading-none">
            Invalid request: <span className="font-mono">{detectedQuery}</span>.
            Please try another query.
          </span>
        </div>
      </main>
    );
  }

  // [Render results]
  if (result.response.data.length > 0) {
    return (
      <>
        <main className="space-y-2">
          <section className="space-y-4">
            <UtilitySection result={result} />
            <HeaderSection data={result} />
          </section>
          <section className="space-y-4">
            {result.response.data.map((verse) => (
              <VerseCard key={verse.verse_id} verse={verse} />
            ))}
          </section>
          <section>
            <FooterSection data={result} />
          </section>
        </main>
        <AudioPlayer />
      </>
    );
  } else {
    // [No results found]
    return (
      <main className="space-y-2">
        {result.response.data.length === 0 && (
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <SearchIcon className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No results found</h3>
            <p className="text-muted-foreground">
              {decodeURIComponent(result.message) ||
                "Try adjusting your search terms."}
            </p>
            <div className="flex justify-center space-x-2">
              <Badge variant="outline">Try another query?</Badge>
            </div>
          </div>
        )}
      </main>
    );
  }
}
