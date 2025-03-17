import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Data } from "@/data";
import Link from "next/link";

export default function QuranAppendices() {
  return (
    <ContentLayout title="Appendices">
      <div className="space-y-4">
        <Link
          href="https://wikisubmission.org/appendices"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="outline">Appendices 1 - 38 (PDF) →</Button>
        </Link>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Data.DataAppendices.map((d) => {
            return (
              <Link
                href={`https://wikisubmission.org/appendix/${d.appendix_number}`}
                target="_blank"
                key={`appendix-${d.appendix_number}`}
              >
                <Card className="w-full h-full flex flex-col justify-between md:min-h-[200px]">
                  <CardHeader className="flex flex-col flex-grow">
                    <CardTitle>
                      <div className="flex justify-between items-center text-left">
                        <span className="font-bold text-lg">
                          {d.appendix_number}. {d.appendix_title_english} →
                        </span>
                      </div>
                    </CardTitle>
                    <CardDescription className="flex-grow">
                      <div className="flex text-left">
                        <span>{d.appendix_preview_english}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </section>
      </div>
    </ContentLayout>
  );
}
