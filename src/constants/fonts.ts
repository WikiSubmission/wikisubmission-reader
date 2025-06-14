import { GeistSans } from "geist/font/sans";
import { Charis_SIL } from "next/font/google";

const Charis_SILFont = Charis_SIL({ subsets: ["latin"], weight: ["400"] });

export const Fonts = {
  default: GeistSans,
  wiki: Charis_SILFont,
};
