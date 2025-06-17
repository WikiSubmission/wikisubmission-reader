import BackButton from "@/components/ui/back-button";
import { Badge } from "@/components/ui/badge";
import { WQuranAPIResponse } from "@/types/w-quran";
import { stringifyRequestType } from "@/utils/stringify-request-type";
import QuranSettingsButton from "./settings-button";
import PlayAllButton from "./play-all-button";

export default function UtilitySection({
  result,
}: {
  result: WQuranAPIResponse;
}) {
  return (
    <main className="flex items-center justify-between">
      {/* Left side */}
      <section className="flex gap-2 items-center">
        {/* [Button: Back] */}
        <BackButton />
        {/* [Badge: Request type] */}
        <Badge variant="default">
          {stringifyRequestType(result.request.type)}
        </Badge>
        {/* [Badge: Verse count] */}
        {result.request.type === "chapter" && (
          <Badge variant="secondary">
            {result.response.data.map((v) => v.verse_number >= 1).length - 1}{" "}
            verse{result.response.data.length !== 1 ? "s" : ""}
          </Badge>
        )}
      </section>
      {/* Right side */}
      <section className="flex gap-2 items-center">
        {/* [Button: Play All] */}
        <PlayAllButton verses={result.response.data} />
        {/* [Button: Settings] */}
        <QuranSettingsButton />
      </section>
    </main>
  );
}
