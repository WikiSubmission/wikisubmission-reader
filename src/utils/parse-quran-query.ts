import { WResult } from "../types/w-result";

export function parseQuranQuery(
  query: string,
  queryParams: any,
): WResult["request"] {
  query = query?.toLowerCase().trim();

  const baseOptions = {
    sort_results: queryParams.sort_results === "true",
    normalize_god_casing: queryParams.normalize_god_casing === "true",
    include_word_by_word: queryParams.include_word_by_word === "true",
  };

  if (
    !query &&
    (queryParams.chapter ||
      queryParams.verse ||
      queryParams.verse_end ||
      queryParams.multiple_verses ||
      queryParams.q)
  ) {
    if (queryParams.q) {
      query = queryParams.q;
    } else if (queryParams.multiple_verses) {
      query = queryParams.multiple_verses;
    } else if (queryParams.chapter) {
      const chapter = queryParams.chapter;
      const verse = queryParams.verse;
      const verseEnd = queryParams.verse_end;

      if (verseEnd) {
        query = `${chapter}:${verse}-${verseEnd}`;
      } else if (verse) {
        query = `${chapter}:${verse}`;
      } else {
        query = chapter;
      }
    }
    query = query.toLowerCase().trim();
  }

  const chapterOnlyMatch = query.match(/^(\d+)$/);
  if (chapterOnlyMatch) {
    const chapter = parseInt(chapterOnlyMatch[1], 10);
    return {
      type: "chapter",
      raw_query: query,
      parsed_query: { chapter },
      parsed_options: baseOptions,
    };
  }

  const verseMatch = query.match(/^(\d+)[:\s]+(\d+)$/);
  if (verseMatch) {
    const chapter = parseInt(verseMatch[1], 10);
    const verse = parseInt(verseMatch[2], 10);
    return {
      type: "verse",
      raw_query: query,
      parsed_query: { chapter, verse },
      parsed_options: baseOptions,
    };
  }

  const verseRangeMatch = query.match(/^(\d+)[:\s]+(\d+)[-\s]+(\d+)$/);
  if (verseRangeMatch) {
    const chapter = parseInt(verseRangeMatch[1], 10);
    const verse = parseInt(verseRangeMatch[2], 10);
    const verseEnd = parseInt(verseRangeMatch[3], 10);
    return {
      type: "verse_range",
      raw_query: query,
      parsed_query: { chapter, verse, verse_end: verseEnd },
      parsed_options: baseOptions,
    };
  }

  const multipleVersesMatch = query.match(
    /^(?:\d+:\d+(?:-\d+)?\s*,\s*)*\d+:\d+(?:-\d+)?$/,
  );
  if (multipleVersesMatch) {
    const verses = query.split(",").map((v) => v.trim());
    const parsedVerses = verses.map((v) => {
      const parts = v.split(":");
      if (parts.length !== 2) throw new Error(`Invalid verse format: ${v}`);

      const chapter = parseInt(parts[0], 10);
      const versePart = parts[1];

      if (isNaN(chapter))
        throw new Error(`Invalid chapter number: ${parts[0]}`);

      if (versePart.includes("-")) {
        const [verse, verseEnd] = versePart
          .split("-")
          .map((n) => parseInt(n, 10));
        if (isNaN(verse) || isNaN(verseEnd))
          throw new Error(`Invalid verse range: ${versePart}`);
        return { chapter, verse, verse_end: verseEnd };
      } else {
        const verse = parseInt(versePart, 10);
        if (isNaN(verse)) throw new Error(`Invalid verse number: ${versePart}`);
        return { chapter, verse };
      }
    });

    return {
      type: "multiple_verses",
      raw_query: query,
      parsed_query: parsedVerses,
      parsed_options: baseOptions,
    };
  }

  const validSearchType: "exact" | "fuzzy" =
    queryParams.search_strategy === "exact" ||
    queryParams.search_strategy === "fuzzy"
      ? (queryParams.search_strategy as "exact" | "fuzzy")
      : "fuzzy";

  const searchOptions = {
    ...baseOptions,
    search_strategy: validSearchType,
    search_language: queryParams.search_language || "en",
    search_case_sensitive: queryParams.search_case_sensitive === "true",
    search_ignore_commentary: queryParams.search_ignore_commentary === "true",
    search_apply_highlight: queryParams.search_apply_highlight === "true",
  };

  return {
    type: "search",
    raw_query: query,
    parsed_query: query,
    parsed_options: searchOptions,
  };
}
