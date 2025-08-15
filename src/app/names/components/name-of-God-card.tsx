import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { NamesOfGodCardData } from "../types";

export function NamesOfGodCard({ name }: { name: NamesOfGodCardData }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="relative mx-4 my-7 w-64 justify-self-center rounded-2xl border border-white/20 bg-white/10 text-center shadow-lg backdrop-blur-lg">
        {/* Header */}
        <CardHeader className="pb-0">
          <CardTitle className="text-xs tracking-wide text-white/70">
            #{name.order_in_revelation} in Revelation
          </CardTitle>
        </CardHeader>

        {/* Arabic & English */}
        <CardContent className="flex flex-col items-center gap-2">
          <div className="font-[Scheherazade] text-4xl font-bold text-white">
            {name.arabic_text}
          </div>
          <div className="text-sm italic text-white/80">{name.english_text}</div>
        </CardContent>

        {/* Footer Info */}
        <CardFooter className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary" className="bg-white/20 text-xs text-white">
            Gematria: {name.gematria}
          </Badge>
          <Badge variant="secondary" className="bg-white/20 text-xs text-white">
            Ch {name.occurences[0]?.chapter_index} • V {name.occurences[0]?.verse_index} • W{" "}
            {name.occurences[0]?.word_index}
          </Badge>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
