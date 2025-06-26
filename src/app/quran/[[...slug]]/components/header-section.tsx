import { WQuranAPIResponse } from "@/types/w-quran";

export default function HeaderSection({
  result,
}: {
  result: WQuranAPIResponse;
}) {
  // [Search request]
  if (result.request.type === "search") {
    return (
      <main>
        {result.request.type === "search" && (
          <section className="flex flex-wrap items-center gap-2 justify-between">
            {/* Result count ("X verses found with <query>") */}
            <p className="text-sm text-muted-foreground tracking-widest">
              <strong className="text-red-500">
                {result.response.data.length}
              </strong>{" "}
              verse{result.response.data.length !== 1 ? "s" : ""} found with{" "}
              <span className="text-primary text-md font-bold">
                {result.request.raw_query}
              </span>
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
        (v) => v.chapter_number === result.response.data?.[0]?.chapter_number,
      ) && (
        <section className="flex flex-wrap items-center gap-2 justify-between">
          {/* Left side */}
          <section>
            <p className="text-muted-foreground font-light tracking-widest">
              CHAPTER {result.response.data?.[0]?.chapter_number}
            </p>
            <h1 className="text-xl font-bold">
              {result.response.data?.[0]?.chapter_title_english}
            </h1>
          </section>
          {/* Right side */}
          <section className="hidden md:block">
            <p className="text-muted-foreground font-light tracking-widest uppercase">
              {result.response.data?.[0]?.chapter_title_transliterated}
            </p>
            <h1 className="text-xl font-bold text-right">
              {result.response.data?.[0]?.chapter_title_arabic}
            </h1>
          </section>
        </section>
      )}

      {/* Condition: all verses are NOT from the same chapter */}
      {/* Displays chapter number + title (right: English, left: Arabic) */}
      {!result.response.data.every(
        (v) => v.chapter_number === result.response.data?.[0]?.chapter_number,
      ) && (
        <section className="flex flex-wrap items-center gap-2 justify-between">
          <p className="text-muted-foreground font-light tracking-widest">
            Multiple Chapters
          </p>
        </section>
      )}
    </main>
  );
}
