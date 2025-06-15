import { Suspense } from "react";
import { LoaderIcon, SearchIcon, AlertCircleIcon, ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WQuranAPIResponse } from "@/types/w-quran";
import { VerseCard } from "./_verse";
import { Button } from "@/components/ui/button";
import { GlobalPageProps } from "@/types/global-page-props";
import { Metadata, ResolvingMetadata } from "next";
import { parseQuranQuery } from "@/utils/parse-quran-query";
import BackButton from "@/components/ui/back-button";
import DefaultView from "./_defaultview";
import QuranSettings from "./_settings";
import Link from "next/link";
import { stringifyRequestType } from "@/utils/stringify-request-type";

export async function generateMetadata(
    { params, searchParams }: GlobalPageProps,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const { slug } = await params;

    if (!slug?.[0]) {
        return {
            title: `Quran: The Final Testament | WikiSubmission`,
            description: `Access The Final Testament`,
        };
    }

    const parsedQuranQuery = parseQuranQuery(slug?.[0], searchParams);

    var query = `${stringifyRequestType(decodeURIComponent(parsedQuranQuery.raw_query))}`

    if (parsedQuranQuery.type === "chapter") {
        query = `Chapter ${parsedQuranQuery.parsed_query.chapter}`;
    } else if (parsedQuranQuery.type === "verse") {
        query = `Verse ${parsedQuranQuery.parsed_query.verse}`;
    } else if (parsedQuranQuery.type === "verse_range") {
        query = `Verses ${parsedQuranQuery.parsed_query.verse} - ${parsedQuranQuery.parsed_query.verse_end}`;
    } else if (parsedQuranQuery.raw_query === "random-verse") {
        query = `Random Verse`;
    } else if (parsedQuranQuery.raw_query === "random-chapter") {
        query = `Random Chapter`;
    }

    return {
        title: `${query} | Quran: The Final Testament | WikiSubmission`,
        description: `Access The Final Testament`,
        openGraph: {
            title: `${query} | Quran: The Final Testament | WikiSubmission`,
            description: `Access The Final Testament`,
            url: `https://wikisubmission.org/quran/${parsedQuranQuery.raw_query}`,
            images: [
                {
                    url: `https://library.wikisubmission.org/file/logo.png`,
                    width: 250,
                    height: 250,
                    alt: `${parsedQuranQuery.raw_query}`,
                },
            ],
        },
    };
}


export default async function QuranPage({
    params,
    searchParams
}: {
    params: Promise<{ slug?: string[] }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    // Get query from slug first (/{query}), then fall back to search params (?q=)
    const slugQuery = resolvedParams.slug?.map(segment => decodeURIComponent(segment)).join('/');
    const searchQuery = resolvedSearchParams.q;
    const mainQuery = slugQuery || searchQuery;

    // Default view if no query present
    if (!mainQuery) return <DefaultView />;

    // Build API URL
    const url = new URL(`https://quran.wikisubmission.org/`);

    // Set main query parameter
    url.searchParams.set("q", Array.isArray(mainQuery) ? mainQuery[0] : mainQuery);

    // Forward other search params (excluding 'q' since we already set it)
    Object.entries(resolvedSearchParams).forEach(([key, val]) => {
        if (key !== 'q') {
            if (Array.isArray(val)) {
                val.forEach(v => url.searchParams.append(key, v));
            } else if (val !== undefined) {
                url.searchParams.append(key, val);
            }
        }
    });

    // Add internal options
    url.searchParams.set("include_word_by_word", "true");
    url.searchParams.set("search_apply_highlight", "true");

    let result: WQuranAPIResponse;

    try {
        const request = await fetch(url, { cache: "no-store" });
        if (!request.ok) throw new Error(`HTTP ${request.status}`);
        result = await request.json();
    } catch (err) {
        console.error(err);
        return (
            <main className="flex items-center justify-center min-h-[40vh] px-4">
                <div className="flex items-center space-x-2 bg-muted rounded-md border text-muted-foreground px-4 py-2">
                    <AlertCircleIcon className="h-5 w-5 shrink-0" />
                    <span className="text-sm leading-none">Invalid request. Please try another query.</span>
                </div>
            </main>
        );
    }

    const results = result.response.data || [];

    return (
        <main className="space-y-2">
            {result.response.data.length > 0 &&
                // Top row.
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <section className="flex gap-1 items-center">
                                <BackButton />
                                <Badge>
                                    {stringifyRequestType(result.request.type)}
                                </Badge>
                            </section>

                            {result.request.type === "chapter" && (
                                <section>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className="text-xs">
                                            {(result.response.data.map(v => v.verse_number >= 1)).length - 1} verse{result.response.data.length !== 1 ? "s" : ""}
                                        </Badge>
                                    </div>
                                </section>
                            )}
                        </div>
                        <QuranSettings />
                    </div>

                    <hr />


                    {(result.request.type === "chapter" || result.request.type === "verse" || result.request.type === "verse_range") && (
                        <div className="flex flex-wrap items-center gap-2 justify-between">
                            <section className="space-y-1">
                                <p className="text-muted-foreground tracking-widest">
                                    SURA {result.response.data?.[0]?.chapter_number}
                                </p>
                                <h1 className="text-4xl font-bold">
                                    {result.response.data?.[0]?.chapter_title_english}
                                </h1>
                            </section>
                            <section className="space-y-1 hidden md:block">
                                <p className="text-muted-foreground tracking-widest uppercase">
                                    {result.response.data?.[0]?.chapter_title_transliterated}
                                </p>
                                <h1 className="text-4xl font-bold text-right">
                                    {result.response.data?.[0]?.chapter_title_arabic}
                                </h1>
                            </section>
                        </div>
                    )}

                    {/* Check if every chapter_number in result.response.data is the same */}
                    {result.request.type === "multiple_verses" && (
                        result.response.data.every(v => v.chapter_number === result.response.data[0].chapter_number) ? (
                            <div className="flex flex-wrap items-center gap-2 justify-between">
                                <section className="space-y-1">
                                    <p className="text-muted-foreground tracking-widest">
                                        Chapter {result.response.data?.[0]?.chapter_number} (verses {result.response.data.map(v => v.verse_number).join(", ")})
                                    </p>
                                    <h1 className="text-4xl font-bold">
                                        {result.response.data?.[0]?.chapter_title_english}
                                    </h1>
                                </section>
                                <section className="space-y-1 hidden md:block">
                                    <p className="text-muted-foreground tracking-widest uppercase">
                                        {result.response.data?.[0]?.chapter_title_transliterated}
                                    </p>
                                    <h1 className="text-4xl font-bold text-right">
                                        {result.response.data?.[0]?.chapter_title_arabic}
                                    </h1>
                                </section>
                            </div>
                        ) : (
                            <div className="flex flex-wrap items-center gap-2 justify-between">
                                <section>
                                    <p className="text-muted-foreground tracking-widest">
                                        Multiple Chapters
                                    </p>
                                </section>
                            </div>
                        )
                    )}

                    {result.request.type === "search" && (
                        <div className="flex flex-wrap items-center gap-2 justify-between">
                            <section>
                                <p className="text-sm text-muted-foreground tracking-widest">
                                    <strong className="text-red-500">{result.response.data.length}</strong> verse{result.response.data.length !== 1 ? "s" : ""} found with <span className="text-primary text-md font-bold">
                                        {result.request.raw_query}
                                    </span>
                                </p>

                            </section>
                        </div>
                    )}

                </div>
            }

            <Suspense fallback={<LoaderIcon className="animate-spin w-6 h-6" />}>
                <div className="space-y-6">
                    {results.map((verse, index) => (
                        <VerseCard
                            key={verse.verse_id}
                            verse={verse}
                            requestType={result.request.type as "chapter" | "verse" | "verse_range" | "search" | "multiple_verses"}
                        />
                    ))}
                </div>
            </Suspense>

            {/* Bottom Row */}

            {/* Single verses: go to chapter or context */}
            {result.response.data.length === 1 && (
                <section className="flex justify-center gap-2">
                    <Link href={`/quran/${result.response.data[0].chapter_number}`}>
                        <Button variant="secondary" className="gap-1 rounded-full">
                            Chapter {result.response.data[0].chapter_number}
                            <ArrowRightIcon className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href={`/quran/${result.response.data[0].chapter_number}?verse=${result.response.data[0].verse_number}`}>
                        <Button variant="secondary" className="gap-1 rounded-full">
                            {result.response.data[0].verse_id} context
                            <ArrowRightIcon className="h-4 w-4" />
                        </Button>
                    </Link>
                </section>
            )}

            {/* Chapter: previous or next chapter */}
            {result.response.data.length > 0 && result.request.type === "chapter" && (
                <section className="flex justify-between gap-2">
                    {result.response.data[0].chapter_number > 1 && (
                        <Link href={`/quran/${result.response.data[0].chapter_number - 1}`}>
                            <Button variant="secondary" className="gap-1 rounded-full">
                                <ArrowLeftIcon className="h-4 w-4" />
                                Previous chapter
                            </Button>
                        </Link>
                    )}

                    {result.response.data[0].chapter_number < 114 && (
                        <Link href={`/quran/${result.response.data[0].chapter_number + 1}`}>
                            <Button variant="secondary" className="gap-1 rounded-full">
                                Next chapter
                                <ArrowRightIcon className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}

                </section>
            )}

            {result.response.data.length > 0 && result.response?.copyright && (
                <div className="pt-6 text-center text-xs text-muted-foreground">
                    {result.response.copyright.text}
                </div>
            )}

            {results.length === 0 && (
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
    );
}