"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Identity } from "@/constants/identity";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <ContentLayout title="Page Not Found">
      <div className="flex justify-center px-4">
        <div className="flex flex-col">
          <span className="bg-gradient-to-r from-violet-800 via-purple-400 to-pink-400 bg-clip-text text-9xl font-bold text-transparent">
            404
          </span>
          <span className="max-w-80 bg-gradient-to-r from-violet-500 via-purple-400 to-pink-400 bg-clip-text text-4xl font-light text-transparent">
            Sorry, we couldn&apos;t find what you were looking for.
          </span>
          <div className="flex flex-col">
            <Button variant="default" className="mt-4 w-fit" onClick={() => router.back()}>
              ← Return to previous page
            </Button>
            <a href={`mailto:${Identity.email}`}>
              <Button variant="outline" className="mt-2 w-fit">
                Contact us
              </Button>
            </a>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
