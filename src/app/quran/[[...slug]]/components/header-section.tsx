import { WQuranAPIResponse } from "@/types/w-quran";

export default function HeaderSection({ result }: { result: WQuranAPIResponse }) {
  // [Search request]
  if (result.request.type === "search") {
    return (
      <main>
        {result.request.type === "search" && !result.request.raw_query.includes("random") && (
          <section className="flex flex-wrap items-center justify-between gap-2">
            {/* Result count ("X verses found with <query>") */}
            <p className="text-sm tracking-widest text-muted-foreground">
              <strong className="text-red-500">{result.response.data.length}</strong> verse
              {result.response.data.length !== 1 ? "s" : ""} found with{" "}
              <span className="text-md font-bold text-primary">{result.request.raw_query}</span>
            </p>
          </section>
        )}
      </main>
    );
  }

  // [All other requests]
  return (
    <main>
      {/* Condition: all verses are from the same chapter */}
      {/* Displays chapter number + title (right: English, left: Arabic) */}
      {result.response.data.every(
        (v) => v.chapter_number === result.response.data?.[0]?.chapter_number
      ) && (
        <section className="flex flex-wrap items-center justify-between gap-2">
          {/* Left side */}
          <section>
            <p className="font-light tracking-widest text-muted-foreground">
              CHAPTER {result.response.data?.[0]?.chapter_number}
            </p>
            <h1 className="text-xl font-bold">
              {result.response.data?.[0]?.chapter_title_english}
            </h1>
          </section>
          {/* Right side */}
          <section className="hidden md:block">
            <p className="font-light uppercase tracking-widest text-muted-foreground">
              {result.response.data?.[0]?.chapter_title_transliterated}
            </p>
            <h1 className="text-right text-xl font-bold">
              {result.response.data?.[0]?.chapter_title_arabic}
            </h1>
          </section>
        </section>
      )}

      {/* Condition: all verses are NOT from the same chapter */}
      {/* Displays chapter number + title (right: English, left: Arabic) */}
      {!result.response.data.every(
        (v) => v.chapter_number === result.response.data?.[0]?.chapter_number
      ) && (
        <section className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-light tracking-widest text-muted-foreground">Multiple Chapters</p>
        </section>
      )}
    </main>
  );
}
