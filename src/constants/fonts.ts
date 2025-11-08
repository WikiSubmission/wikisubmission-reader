import { GeistSans } from "geist/font/sans";
import { Charis_SIL, Sora } from "next/font/google";

const Charis_SILFont = Charis_SIL({ subsets: ["latin"], weight: ["400"] });
const SoraFont = Sora({ subsets: ["latin"], weight: ["400"] });

export const Fonts = {
  default: SoraFont,
  wiki: Charis_SILFont,
};
