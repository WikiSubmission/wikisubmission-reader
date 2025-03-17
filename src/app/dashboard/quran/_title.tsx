import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Database } from "@/types/generated/database.types";
import { GearIcon } from "@radix-ui/react-icons";
import QuranSettings from "./_settings";

export default function QuranChapterTitle({ data }: { data: Database["public"]["Tables"]["DataQuran"]["Row"] | Database["public"]["Tables"]["DataQuran"]["Row"][] }) {

    var title = '';
    var isMultipleChapters = false;

    if (!data || (Array.isArray(data) && data.length === 0)) {
        title = '';
    } else if (Array.isArray(data)) {
        if (data.every(i => i.chapter_title_english !== data?.[0].chapter_title_english)) {
            title = 'Multiple Chapters';
            isMultipleChapters = true;
        } else {
            title = `Sura ${data[0].chapter_number}, ${data[0].chapter_title_english}`;
        }
    } else {
        title = `Sura ${data.chapter_number}, ${data.chapter_title_english}`;
    }

    return (
        <div className="flex flex-col">
            <section>
                <span className="text-4xl font-bold mb-4">
                    <span>{title}</span>
                </span>
            </section>
            {title.length > 0 && Array.isArray(data) && (
                <div className="flex justify-between mt-2">
                    <section className="flex flex-wrap gap-2 rounded-lg">
                        <Badge variant="secondary">
                            <span className="font-light">
                                {isMultipleChapters ? data.length : data?.[0].chapter_verses} verses
                            </span>
                        </Badge>
                        {!isMultipleChapters && (
                            <>
                                <Badge variant="secondary">
                                    <span className="font-light">{data?.[0].chapter_title_arabic_transliteration}</span>
                                </Badge>
                                <Badge variant="secondary">
                                    <span className="font-light">{data?.[0].chapter_title_arabic}</span>
                                </Badge>
                                {data?.[0].chapter_initials && (
                                    <Badge variant="secondary">
                                        <span className="font-light">Initialed</span>
                                    </Badge>
                                )}
                            </>
                        )}
                    </section>
                    <section>
                        <Popover>
                            <PopoverTrigger>
                                <Badge className="items-center gap-1 text-xs">
                                    <GearIcon />
                                    <span className="font-light">Settings</span>
                                </Badge>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="space-y-2">
                                    <QuranSettings />
                                </div>
                            </PopoverContent>
                        </Popover>
                    </section>
                </div>
            )}
        </div>
    )
}