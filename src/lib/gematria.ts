const ARABIC_GEMATRIA_VALUES: { [key: string]: number } = {
  ا: 1,
  أ: 1,
  إ: 1,
  آ: 1,
  ب: 2,
  ج: 3,
  د: 4,
  ه: 5,
  ة: 5,
  و: 6,
  ز: 7,
  ح: 8,
  ط: 9,
  ي: 10,
  ى: 10,
  ك: 20,
  ل: 30,
  م: 40,
  ن: 50,
  س: 60,
  ع: 70,
  ف: 80,
  ص: 90,
  ق: 100,
  ر: 200,
  ش: 300,
  ت: 400,
  ث: 500,
  خ: 600,
  ذ: 700,
  ض: 800,
  ظ: 900,
  غ: 1000,
};

export function calculateGematria(arabicText: string): number {
  return arabicText.split("").reduce((sum, char) => sum + (ARABIC_GEMATRIA_VALUES[char] || 0), 0);
}

export function getGematriaBreakdown(arabicText: string): { letter: string; value: number }[] {
  return arabicText
    .split("")
    .filter((char) => ARABIC_GEMATRIA_VALUES[char])
    .map((char) => ({
      letter: char,
      value: ARABIC_GEMATRIA_VALUES[char],
    }));
}
