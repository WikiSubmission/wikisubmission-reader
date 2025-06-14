import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Data } from "@/data";
import { Hash } from "lucide-react";
import Link from "next/link";

export default function DefaultView() {
    return (
        <main className="container px-4 pt-5 space-y-10">
            <section className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Quran: The Final Testament</h1>
                <p className="text-muted-foreground">Search and explore the verses of the Quran</p>
            </section>

            <section className="space-y-4 text-center">
                <section className="space-y-2">
                    <Link href="https://library.wikisubmission.org/file/quran-the-final-testament-introduction" target="_blank">
                        <Button variant="outline" className="w-full md:w-3/6">
                            Introduction
                        </Button>
                    </Link>
                </section>
                <div className="grid md:grid-cols-2 gap-6">
                    {Data.Chapters.map((chapter) => (
                        <Link
                            key={chapter.chapter_number}
                            href={`/quran/${chapter.chapter_number}`}
                            className="block"
                        >
                            <Card className="transition hover:shadow-md hover:ring-1 hover:ring-muted-foreground/20 cursor-pointer">
                                <CardHeader>
                                    <CardTitle>
                                        Chapter {chapter.chapter_number},{' '}
                                        <span className="font-bold">{chapter.chapter_title_english}</span>
                                    </CardTitle>
                                    <CardDescription>
                                        {chapter.chapter_title_transliterated} • {chapter.chapter_verses} verses
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Hash className="h-5 w-5" />
                                Downloads
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-sm text-muted-foreground">Access PDFs and other formats.</p>
                            <div className="flex space-x-2">
                                <a href="/downloads">
                                    <Badge variant="default">Downloads →</Badge>
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

        </main>
    );
}