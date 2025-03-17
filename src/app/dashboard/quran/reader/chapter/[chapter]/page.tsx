import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Database } from "@/types/generated/database.types";
import QuranChapterTitle from "../../../_title";
import VerseComponent from "../../../_verse";
import BackButton from "@/components/ui/back-button";

export default async function ReaderPage({ params, searchParams }: {
    params: { chapter: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const request = await fetch(`https://api.wikisubmission.org/quran/${params.chapter}`);

    const data = (await request.json())?.results as Database["public"]["Tables"]["DataQuran"]["Row"][];

    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center space-y-2">
                <h1 className="text-4xl font-bold">Chapter not found</h1>
                <p className="text-xl">The chapter you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <ContentLayout title="Quran: The Final Testament • Reader">
            <div className="flex flex-col space-y-6">
                <section>
                    <BackButton />
                </section>
                <section>
                    <QuranChapterTitle data={data} />
                    <hr className="mt-4" />
                </section>
                <section>
                    {data.map(v => (
                        <VerseComponent key={`${v.verse_index}`} verse={v} />
                    ))}
                </section>
            </div>
        </ContentLayout>
    );
}