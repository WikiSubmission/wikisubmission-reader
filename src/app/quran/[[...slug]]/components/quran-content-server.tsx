// app/quran/QuranContent.server.tsx
import { getUrlQuery } from "@/utils/get-url-query";
import { getUrlSearchParams } from "@/utils/get-url-search-params";
import DefaultView from "./default-view";
import { GlobalPageProps } from "@/types/global-page-props";
import { AlertCircleIcon, SearchIcon } from "lucide-react";
import { WQuranAPIResponse } from "@/types/w-quran";
import UtilitySection from "./utility-section";
import HeaderSection from "./header-section";
import VerseCard from "./verse-card";
import FooterSection from "./footer-section";
import AudioPlayer from "./audio-player";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Badge } from "@/components/ui/badge";
import { Languages } from "@/hooks/use-quran-page";
// ... other imports

export default async function QuranContent({
  params,
  searchParams,
  includeLanguage,
}: GlobalPageProps & { includeLanguage: Languages }) {
  console.log("we have this language: ", includeLanguage);
  const detectedQuery = await getUrlQuery({ params, searchParams });
  if (!detectedQuery) return <DefaultView />;

  const resolvedSearchParams = await getUrlSearchParams(searchParams);
  const baseUrl = new URL(
    process.env.TEST_MODE === "true"
      ? `http://localhost:8080/${detectedQuery}`
      : `https://quran.wikisubmission.org/${detectedQuery}`
  );

  resolvedSearchParams.forEach((value, key) => {
    baseUrl.searchParams.append(key, value);
  });

  baseUrl.searchParams.append("include_word_by_word", "true");
  baseUrl.searchParams.append("search_apply_highlight", "true");

  // 🔥 This now comes from the client store
  baseUrl.searchParams.append("include_language", includeLanguage);

  let result: WQuranAPIResponse;
  try {
    const request = await fetch(baseUrl.toString(), { cache: "no-store" });
    if (!request.ok) throw new Error(`Error: ${request.status} ${request.statusText}`);
    // [Assign result]
    result = await request.json();
  } catch (err) {
    // [Internal Server Error]
    console.error(err);
    return (
      <main className="flex min-h-[10vh] items-center justify-center px-4">
        <div className="flex items-center space-x-2 rounded-md border bg-muted px-4 py-2 text-muted-foreground">
          <AlertCircleIcon className="h-5 w-5 shrink-0" />
          <span className="text-sm leading-none">
            Invalid request: <span className="font-mono">{detectedQuery}</span>. Please try another
            query.
          </span>
        </div>
      </main>
    );
  }

  // [Render results]
  if (result.response.data.length > 0) {
    console.log("data: ", result.response.data);
    return (
      <>
        <UtilitySection result={result} />
        <main className="space-y-2">
          <section className="space-y-4">
            <HeaderSection result={result} />
          </section>
          <section className="space-y-4">
            {result.response.data.map((verse) => (
              <VerseCard
                key={verse.verse_id}
                verse={verse}
                type={result.request.type}
                language={includeLanguage}
              />
            ))}
          </section>
          <section>
            <FooterSection result={result} />
          </section>
        </main>
        <AudioPlayer />
        <ScrollToTop />
      </>
    );
  } else {
    // [No results found]
    return (
      <>
        <main className="space-y-2">
          {result.response.data.length === 0 && (
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <SearchIcon className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No results found</h3>
              <p className="text-muted-foreground">
                {decodeURIComponent(result.message) || "Try adjusting your search terms."}
              </p>
              <div className="flex justify-center space-x-2">
                <Badge variant="outline">Try another query?</Badge>
              </div>
            </div>
          )}
        </main>
        <ScrollToTop />
      </>
    );
  }
}
