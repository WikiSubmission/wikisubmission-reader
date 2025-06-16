import { GlobalPageProps } from "@/types/global-page-props";
import { parseQuranQuery } from "@/utils/parse-quran-query";
import { stringifyRequestType } from "@/utils/stringify-request-type";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params, searchParams }: GlobalPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;

  if (!slug?.[0]) {
    return {
      title: `Quran: The Final Testament | WikiSubmission`,
      description: `Access the Final Testament at WikiSubmission, a free and open-source platform for Submission`,
    };
  }

  const parsedQuranQuery = parseQuranQuery(slug?.[0], searchParams);

  var query = `${stringifyRequestType(decodeURIComponent(parsedQuranQuery.raw_query))}`;

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
    description: `Access the Final Testament at WikiSubmission, a free and open-source platform for Submission`,
    openGraph: {
      title: `${query} | Quran: The Final Testament | WikiSubmission`,
      description: `Access the Final Testament at WikiSubmission, a free and open-source platform for Submission`,
      url: `https://wikisubmission.org/quran/${parsedQuranQuery.raw_query}`,
      images: [
        {
          url: `https://library.wikisubmission.org/file/logo.png`,
          width: 150,
          height: 150,
          alt: `${parsedQuranQuery.raw_query}`,
        },
      ],
    },
  };
}
