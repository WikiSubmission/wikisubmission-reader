"use client";

import { ArrowBigLeftDash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "./badge";

export default function BackButton() {
  const router = useRouter();
  return (
    <Badge
      variant="secondary"
      className="text-xs hover:text-muted-foreground cursor-pointer"
      onClick={() => router.back()}
    >
      <ArrowBigLeftDash className="h-5 w-5 text-muted-foreground" />
    </Badge>
  );
}
