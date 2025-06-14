"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "./badge";

export default function BackButton() {
    const router = useRouter();
    return (
        <Badge variant="secondary" className="text-xs hover:text-muted-foreground cursor-pointer" onClick={() => router.back()}>
            <ArrowLeftIcon className="h-3 w-3" />
        </Badge>
    );
}