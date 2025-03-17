import { Aleo, Charis_SIL, Inter, Philosopher, Yeseva_One } from "next/font/google";

const InterFont = Inter({ subsets: ['latin'], weight: ['400'] });
const Charis_SILFont = Charis_SIL({ subsets: ['latin'], weight: ['400'] });
const YeseveOneFont = Yeseva_One({ subsets: ['latin'], weight: ['400'] });

export const Fonts = {
    default: InterFont,
    title: Charis_SILFont,
    quran: YeseveOneFont
}