"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hash } from "lucide-react";
import Link from "next/link";

export function RootWordView({ root }: { root: string }) {
    const [data, setData] = useState<{ verse_id: string; word_index: number, english_text: string; arabic_text: string; transliterated_text: string }[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://quran.wikisubmission.org/verses-with-root/${encodeURIComponent(root)}`);
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
        <Card className="w-full max-w-md mt-2 mr-2">
            <CardHeader className="pb-2 pr-10">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base">
                        Root
                    </CardTitle>
                    <p className="text-xl text-muted-foreground mt-1 text-right" dir="rtl">
                        <span className="font-medium text-primary">{root}</span>
                    </p>
                </div>
            </CardHeader>

            <CardContent className="pt-0">
                {loading ? (
                    // Loading animation.
                    <div className="animate-pulse space-y-2">
                        <div className="h-3 bg-muted rounded w-3/4"></div>
                        <div className="space-y-2">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="h-6 w-6 bg-muted rounded-full"></div>
                                    <div className="space-y-1 flex-1">
                                        <div className="h-3 bg-muted rounded w-1/3"></div>
                                        <div className="h-2 bg-muted rounded w-1/4"></div>
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
                                <strong>{data.length}</strong> instance{data.length !== 1 ? 's' : ''} with this root:
                            </p>
                            <div className="space-y-1">
                                {data.map((entry, idx) => (
                                    <Link
                                        key={idx}
                                        href={`/quran/${entry.verse_id}?word=${entry.word_index}`}
                                        className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 transition-colors group cursor-pointer block"
                                    >
                                        <div className="flex-shrink-0">
                                            <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
                                                <span className="text-xs font-medium text-primary">
                                                    {idx + 1}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0 flex items-center justify-between">
                                            <div>
                                                <div className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                                                    {entry.verse_id}<span className="text-muted-foreground"> (word #{entry.word_index + 1})</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    {entry.transliterated_text}
                                                </p>
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
                                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-3 h-3 text-muted-foreground text-xs">
                                                →
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-4">
                        <div className="w-8 h-8 mx-auto mb-2 bg-muted rounded-full flex items-center justify-center">
                            <Hash className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <h3 className="text-sm font-medium mb-1">No verses found</h3>
                        <p className="text-xs text-muted-foreground">
                            No verses contain <span dir="rtl" className="font-arabic">{root}</span>
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}