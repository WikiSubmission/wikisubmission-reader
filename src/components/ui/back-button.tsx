'use client'

import { useRouter } from "next/navigation";
import { Button } from "./button";

export default function BackButton() {
    const router = useRouter();
    
    return (
        <div className="flex">
            <Button variant="secondary" size="sm" onClick={() => router.back()}>
                <span>←</span>
            </Button>
        </div>
    )
}