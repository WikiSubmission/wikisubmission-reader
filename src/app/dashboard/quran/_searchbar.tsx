'use client';

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";

export default function QuranSearchbar(props: {
    defaultValue?: string
}) {
    const [query, setQuery] = useState("");
    const [focused, setFocused] = useState(false);
    const router = useRouter();
    const id = useId();
    return (
        <div className="*:not-first:mt-2">
            <Input
                id={id}
                placeholder="Search chapter, verse, or text"
                type="search"
                defaultValue={props.defaultValue}
                onFocus={() => {
                    setFocused(true);
                }}
                onChange={(e) => {
                    if (!e.target.value || e.target.value.length === 0) setFocused(false);
                    setQuery(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        router.push(`/dashboard/quran/search/${query}`);
                    }
                }}
            />
            {!props.defaultValue && focused && (
                <p className="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
                    Press <kbd>Enter</kbd> to search{query.length > 0 ? ` for "${query}"` : ""}
                </p>
            )}
        </div>
    );
}
