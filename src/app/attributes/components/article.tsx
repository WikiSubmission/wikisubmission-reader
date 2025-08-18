"use client";

import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Article() {
  const markdown = `
  # The 99 Names of God
  Each name reflects a unique attribute of the Creator.

  ## Meaning
  God’s names express His mercy, wisdom, and justice.

  ### Example
  - **Ar-Rahman** (The Most Merciful)
  - **Al-Hakeem** (The All-Wise)
  - **Al-Adl** (The Just)

  These attributes remind us of God’s perfection.
    `;
  return (
    <Card>
      <CardContent>
        <article className="prose prose-lg dark:prose-invert max-w-none columns-1 gap-6 md:columns-3">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </article>
      </CardContent>
    </Card>
  );
}
