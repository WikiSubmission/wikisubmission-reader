import { WQuranAPIResponse } from "@/types/w-quran";

export default function HeaderSection({ data }: { data: WQuranAPIResponse }) {
  // [Search request]
  if (data.request.type === "search") {
    return (
      <main>
        {data.request.type === "search" && (
          <section className="flex flex-wrap items-center gap-2 justify-between">
            {/* Result count ("X verses found with <query>") */}
            <p className="text-sm text-muted-foreground tracking-widest">
              <strong className="text-red-500">
                {data.response.data.length}
              </strong>{" "}
              verse{data.response.data.length !== 1 ? "s" : ""} found with{" "}
              <span className="text-primary text-md font-bold">
                {data.request.raw_query}
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
      {/* Condition: search request */}
      {/* Displays search query */}
      {data.request.type === "search" && (
        <div className="flex flex-wrap items-center gap-2 justify-between">
          <section>
            <p className="text-sm text-muted-foreground tracking-widest">
              <strong className="text-red-500">
                {data.response.data.length}
              </strong>{" "}
              verse{data.response.data.length !== 1 ? "s" : ""} found with{" "}
              <span className="text-primary text-md font-bold">
                {data.request.raw_query}
              </span>
            </p>
          </section>
        </div>
      )}

      {/* Condition: all verses are from the same chapter */}
      {/* Displays chapter number + title (right: English, left: Arabic) */}
      {data.response.data.every(
        (v) => v.chapter_number === data.response.data?.[0]?.chapter_number,
      ) && (
        <section className="flex flex-wrap items-center gap-2 justify-between">
          {/* Left side */}
          <section>
            <p className="text-muted-foreground font-light tracking-widest">
              CHAPTER {data.response.data?.[0]?.chapter_number}
            </p>
            <h1 className="text-xl font-bold">
              {data.response.data?.[0]?.chapter_title_english}
            </h1>
          </section>
          {/* Right side */}
          <section className="hidden md:block">
            <p className="text-muted-foreground font-light tracking-widest uppercase">
              {data.response.data?.[0]?.chapter_title_transliterated}
            </p>
            <h1 className="text-xl font-bold text-right">
              {data.response.data?.[0]?.chapter_title_arabic}
            </h1>
          </section>
        </section>
      )}

      {/* Condition: all verses are NOT from the same chapter */}
      {/* Displays chapter number + title (right: English, left: Arabic) */}
      {!data.response.data.every(
        (v) => v.chapter_number === data.response.data?.[0]?.chapter_number,
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
