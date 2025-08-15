// TODO: Move fetching to server.

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hash } from "lucide-react";
import Link from "next/link";

export function RootWordView({ root }: { root: string }) {
  const [data, setData] = useState<
    | {
        verse_id: string;
        word_index: number;
        english_text: string;
        arabic_text: string;
        transliterated_text: string;
      }[]
    | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          process.env.TEST_MODE === "true"
            ? `http://localhost:8080/verses-with-root/${encodeURIComponent(root)}`
            : `https://quran.wikisubmission.org/verses-with-root/${encodeURIComponent(root)}`
        );
        if (!response.ok) throw new Error("Failed to load root word data");
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [root]);

  return (
    <Card className="mr-2 mt-2 w-full max-w-md">
      <CardHeader className="pb-2 pr-10">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">Root</CardTitle>
          <p className="mt-1 text-right text-xl text-muted-foreground" dir="rtl">
            <span className="font-medium text-primary">{root}</span>
          </p>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {loading ? (
          // Loading animation.
          <div className="animate-pulse space-y-2">
            <div className="h-3 w-3/4 rounded bg-muted"></div>
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-muted"></div>
                  <div className="flex-1 space-y-1">
                    <div className="h-3 w-1/3 rounded bg-muted"></div>
                    <div className="h-2 w-1/4 rounded bg-muted"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <p className="text-xs text-destructive">No data found for this root word</p>
        ) : data && data.length > 0 ? (
          <div className="space-y-2">
            <div className="max-h-60 overflow-y-auto">
              <p className="text-xs text-muted-foreground">
                <strong>{data.length}</strong> instance
                {data.length !== 1 ? "s" : ""} with this root:
              </p>
              <div className="space-y-1">
                {data.map((entry, idx) => (
                  <Link
                    key={idx}
                    href={`/quran/${entry.verse_id}?word=${entry.word_index}`}
                    className="group block flex cursor-pointer items-center gap-2 rounded p-2 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-xs font-medium text-primary">{idx + 1}</span>
                      </div>
                    </div>
                    <div className="flex min-w-0 flex-1 items-center justify-between">
                      <div>
                        <div className="text-xs font-medium text-primary transition-colors hover:text-primary/80">
                          {entry.verse_id}
                          <span className="text-muted-foreground">
                            {" "}
                            (word #{entry.word_index + 1})
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{entry.transliterated_text}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-primary" dir="rtl">
                          {entry.arabic_text}
                        </p>
                        <p className="text-xs text-muted-foreground" dir="ltr">
                          {entry.english_text}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="h-3 w-3 text-xs text-muted-foreground">→</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center">
            <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              <Hash className="h-4 w-4 text-muted-foreground" />
            </div>
            <h3 className="mb-1 text-sm font-medium">No verses found</h3>
            <p className="text-xs text-muted-foreground">
              No verses contain <span dir="rtl">{root}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
