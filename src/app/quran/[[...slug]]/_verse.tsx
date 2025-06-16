"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useQuranSettings } from "@/hooks/use-quran-settings";
import { WQuranVerse, WQuranWordByWord } from "@/types/w-quran";
import { ExternalLink } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RootWordView } from "./_rootwordview";
import Link from "next/link";

export function VerseCard({ verse, requestType }: { verse: WQuranVerse, requestType?: "chapter" | "verse" | "verse_range" | "search" | "multiple_verses" }) {
    const [isHighlighted, setIsHighlighted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const settings = useQuranSettings();
    const searchParams = useSearchParams();
    const verseSearchParam = searchParams.get("verse");

    useEffect(() => {
        if (verse && verse.verse_number.toString() === verseSearchParam) {
            const element = document.getElementById(verseSearchParam);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });

                // Add highlight effect.
                setIsHighlighted(true);
                setTimeout(() => {
                    setIsHighlighted(false);
                }, 2000);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [verseSearchParam]);

    return (
        <Card
            className={isHighlighted ? "mb-6 bg-violet-50 dark:bg-violet-900 shadow-lg relative" : "mb-6 relative"}
            id={verse.verse_number.toString()}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && requestType === "search" && (
                <div className="absolute top-4 right-4 z-10">
                    <Link href={`/quran/${verse.chapter_number}?verse=${verse.verse_number}`}>
                        <Button
                            variant="secondary"
                            size="sm"
                            className="h-8 px-2 gap-1 text-xs hover:bg-primary/30 hover:text-primary transition-colors rounded-full"
                        >
                            <ExternalLink className="h-3 w-3" />
                            Go to verse
                        </Button>
                    </Link>
                </div>
            )}

            {isHovered && requestType === "verse" && (
                <div className="absolute top-4 right-4 z-10">
                    <Link href={`/quran/${verse.chapter_number}?verse=${verse.verse_number}`}>
                        <Button
                            variant="secondary"
                            size="sm"
                            className="h-8 px-2 gap-1 text-xs hover:bg-primary/30 hover:text-primary transition-colors rounded-full"
                        >
                            <ExternalLink className="h-3 w-3" />
                            Go to context
                        </Button>
                    </Link>
                </div>
            )}

            {isHovered && requestType === "verse_range" && (
                <div className="absolute top-4 right-4 z-10">
                    <Link href={`/quran/${verse.chapter_number}`}>
                        <Button
                            variant="secondary"
                            size="sm"
                            className="h-8 px-2 gap-1 text-xs hover:bg-primary/30 hover:text-primary transition-colors rounded-full"
                        >
                            <ExternalLink className="h-3 w-3" />
                            Go to full chapter
                        </Button>
                    </Link>
                </div>
            )}

            <CardHeader className="pb-3 rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-xl">
                            {verse.chapter_number}:<span className="text-grey-800 dark:text-grey-100">{verse.verse_number}</span>
                        </span>
                    </div>
                </div>
                {settings.settings.showSubtitles && verse.verse_subtitle_english && (
                    <div className="mt-2 p-2 rounded text-sm font-medium text-center italic text-violet-600 dark:text-violet-400">
                        {renderHighlightedText(verse.verse_subtitle_english)}
                    </div>
                )}
            </CardHeader>
            <CardContent className="space-y-4">
                {/* English Translation with highlight support */}
                <div className="text-lg leading-relaxed text-gray-800 dark:text-gray-200">
                    {renderHighlightedText(verse.verse_text_english)}
                </div>

                {settings.settings.showWordByWord && (
                    <Separator />
                )}

                {/* Arabic Text */}
                {settings.settings.showArabic && (
                    <div className="text-2xl leading-relaxed font-arabic text-gray-900 dark:text-gray-100 text-right" dir="rtl">
                        <HoverableArabicText verse={verse} />
                    </div>
                )}
                {settings.settings.showTransliteration && (
                    <div>
                        <p className="text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                            {verse.verse_text_transliterated}
                        </p>
                    </div>
                )}

                {/* Footnote */}
                {settings.settings.showFootnotes && verse.verse_footnote_english && (
                    <div className="mt-4 p-3 bg-violet-50 dark:bg-violet-950 rounded border-l-4 border-gray-500">
                        <div className="text-xs text-grey-600 italic">
                            {renderHighlightedText(verse.verse_footnote_english)}
                        </div>
                    </div>
                )}

                {/* Word-by-word */}
                {settings.settings.showWordByWord && verse.word_by_word && verse.word_by_word.length > 0 && (
                    <details className="mt-4" open>
                        <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
                            Word-by-word
                        </summary>
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {verse.word_by_word.map((word, index) => (
                                <div key={index} className="p-2 bg-muted rounded text-center">
                                    <div className="text-sm">{word.arabic_text}</div>
                                    <div className="text-xs text-muted-foreground">{word.transliteration}</div>
                                    <div className="text-sm text-muted-foreground">{word.transliterated_text}</div>
                                    <div className="text-sm text-primary font-semibold">{word.english_text}</div>
                                </div>
                            ))}
                        </div>
                    </details>
                )}
            </CardContent>
        </Card>
    );
}

// Utility to render highlighted text with markdown-like **highlight** and handle newlines
const renderHighlightedText = (text?: string | null) => {
    if (!text) return null;

    // Split by newlines first
    const lines = text.split('\n');

    return lines.map((line, lineIndex) => (
        <span key={lineIndex}>
            {line.split(/(\*\*.*?\*\*)/g).map((part, index) =>
                part.startsWith("**") && part.endsWith("**") ? (
                    <span key={index} className="bg-yellow-300 dark:bg-yellow-800 rounded px-0">
                        {part.slice(2, -2)}
                    </span>
                ) : (
                    part
                )
            )}
            {lineIndex < lines.length - 1 && <br />}
        </span>
    ));
};

const HoverableArabicText = ({ verse }: { verse: WQuranVerse }) => {
    if (!verse.word_by_word || verse.word_by_word.length === 0) {
        return <>{verse.verse_text_arabic}</>;
    }

    return (
        <span className="select-text">
            {verse.word_by_word.map((word, index) => (
                <span key={index}>
                    <WordTooltip word={word}>
                        <span>{word.arabic_text}</span>
                    </WordTooltip>
                    {index < (verse.word_by_word?.length ?? 0) - 1 && '\u00A0'}
                </span>
            ))}
        </span>
    );
};

export const WordTooltip = ({
    word,
    children,
}: {
    word: WQuranWordByWord;
    children: React.ReactNode;
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutId) clearTimeout(timeoutId);
        if (!modalOpen) setIsVisible(true);
    };

    const handleMouseLeave = () => {
        const id = setTimeout(() => setIsVisible(false), 57);
        setTimeoutId(id);
    };

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (word.root_word && !modalOpen) {
            setIsVisible(false);
            setModalOpen(true);
        }
    };

    const handleOpenChange = (open: boolean) => {
        setModalOpen(open);
        if (!open) {
            setIsVisible(false);
            if (timeoutId) clearTimeout(timeoutId);
        }
    };

    return (
        <div
            className="relative inline-block overflow-visible"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span
                className="cursor-pointer hover:bg-violet-100 dark:hover:bg-violet-900 p-1 rounded transition-colors"
                onClick={handleClick}
            >
                {children}
            </span>

            {/* Hover Tooltip */}
            {isVisible && !modalOpen && (
                <div
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white dark:bg-violet-100 text-white dark:text-violet-900 text-xs rounded p-1 shadow-lg z-10 select-text"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="space-y-1 p-1">
                        <div className="text-gray-600 dark:text-gray-600 text-center text-xs" dir="ltr">
                            {word.transliteration}
                        </div>
                        <div className="text-gray-600 dark:text-gray-600 text-center text-xs" dir="ltr">
                            {word.transliterated_text}
                        </div>
                        <div className="font-semibold text-lg text-center text-primary dark:text-secondary" dir="ltr">
                            {word.english_text}
                        </div>
                        {word.root_word && (
                            <div className="text-gray-400 dark:text-gray-500 text-xs text-center font-arabic" dir="rtl">
                                {word.root_word}
                            </div>
                        )}
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
                </div>
            )}

            {/* Clickable Dialog */}
            <Dialog open={modalOpen} onOpenChange={handleOpenChange}>
                <DialogContent className="max-w-md">
                    <RootWordView root={word.root_word!} />
                </DialogContent>
            </Dialog>
        </div>
    );
};