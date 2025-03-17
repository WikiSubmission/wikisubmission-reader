import { ContentLayout } from "@/components/admin-panel/content-layout";
import QuranSearchbar from "../../_searchbar";
import { Database } from "@/types/generated/database.types";
import VerseComponent from "../../_verse";

export default async function QuranSearchPage({ params, searchParams }: {
    params: { query: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const request = await fetch(`https://api.wikisubmission.org/quran/search/${params.query}?highlight=true`);
    const response = await request.json();
    const result: Database["public"]["Tables"]["DataQuran"]["Row"][] = response.results || [];

    return (
        <ContentLayout title="Quran Search">
            <div className="flex flex-col space-y-8">
                <section>
                    <QuranSearchbar defaultValue={decodeURIComponent(params.query)} />
                </section>
                <section className="space-y-2 mx-2 text-slate-800 dark:text-slate-300">
                    Found {result.length} results with &apos{decodeURIComponent(params.query)}&apos
                </section>
                <section className="space-y-1">
                    {result.map((r) => (
                        <VerseComponent key={r.verse_id} verse={r} isLink />
                    ))}
                </section>
            </div>
        </ContentLayout>
    )
}