/**
 * All primary routes should return this interface.
 */

export interface WResult {
  // [A summary / status message]
  message: string;
  // [The request, parsed from the query]
  request: QuranRequestTypes;
  // [The actual response]
  response: {
    data: any[];
    copyright?: {
      text: string;
      url: string;
    };
  };
}

export type QuranRequestTypes =
  | ChapterRequest // e.g. /1
  | VerseRequest // e.g. /1:1
  | VerseRangeRequest // e.g. /1:1-1:3
  | SearchRequest // e.g. /angels
  | MultipleVersesRequest; // e.g. /1:1,1:3,2:1-5
// (?q={query} is also acceptable)

export interface ChapterRequest {
  type: "chapter";
  raw_query: string;
  parsed_options: ParsedOptions;
  parsed_query: {
    chapter: number;
  };
}

export interface VerseRequest {
  type: "verse";
  raw_query: string;
  parsed_query: {
    chapter: number;
    verse: number;
  };
  parsed_options: ParsedOptions;
}

export interface VerseRangeRequest {
  type: "verse_range";
  raw_query: string;
  parsed_query: {
    chapter: number;
    verse: number;
    verse_end: number;
  };
  parsed_options: ParsedOptions;
}

export interface SearchRequest {
  type: "search";
  raw_query: string;
  parsed_query: string;
  parsed_options: ParsedOptions;
}

export interface MultipleVersesRequest {
  type: "multiple_verses";
  raw_query: string;
  parsed_query: Array<{
    chapter: number;
    verse: number;
    verse_end?: number;
  }>;
  parsed_options: ParsedOptions;
}

export interface ParsedOptions {
  // Universal options
  sort_results?: boolean;
  normalize_god_casing?: boolean;
  include_word_by_word?: boolean;
  // Search-specific options
  search_strategy?: "exact" | "fuzzy";
  search_language?: string;
  search_case_sensitive?: boolean;
  search_ignore_commentary?: boolean;
  search_apply_highlight?: boolean;
}
