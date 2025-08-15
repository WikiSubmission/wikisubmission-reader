"use client";

import { ArrowBigLeftDash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "./badge";

export default function BackButton() {
  const router = useRouter();
  return (
    <Badge
      variant="secondary"
      className="cursor-pointer text-xs hover:text-muted-foreground"
      onClick={() => router.back()}
    >
      <ArrowBigLeftDash className="h-5 w-5 text-muted-foreground" />
    </Badge>
  );
}
