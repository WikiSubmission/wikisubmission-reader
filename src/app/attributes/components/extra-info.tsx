"use client";
import { NameStore } from "@/hooks/use-name";
import { AnimatePresence } from "framer-motion";
import Article from "./article";
import VerseList from "./verse-list";

export function ExtraInfo() {
  const { extraInfoType } = NameStore();
  return (
    <AnimatePresence>
      {extraInfoType === "article" ? (
        <Article />
      ) : extraInfoType === "verse-list" ? (
        // <VerseList verses={[]} VerseComponent={undefined} />
        <div />
      ) : extraInfoType === "gematria" ? (
        <div /> // <Gematria />
      ) : null}
    </AnimatePresence>
  );
}
