import type { Gender } from "./dates";

type ChartGender = Gender | "unknown";

const CHINESE_CHART: Record<number, ChartGender[]> = {
  18: ["boy", "boy", "boy", "boy", "boy", "girl", "girl", "girl", "girl", "girl", "boy", "boy"],
  19: ["girl", "girl", "girl", "girl", "boy", "boy", "boy", "boy", "boy", "boy", "girl", "girl"],
  20: ["girl", "girl", "girl", "girl", "boy", "boy", "boy", "boy", "boy", "girl", "girl", "girl"],
  21: ["boy", "boy", "boy", "boy", "girl", "girl", "girl", "girl", "girl", "boy", "boy", "boy"],
  22: ["boy", "boy", "boy", "boy", "girl", "girl", "girl", "girl", "girl", "boy", "boy", "boy"],
  23: ["boy", "boy", "boy", "girl", "girl", "girl", "girl", "girl", "boy", "boy", "boy", "boy"],
  24: ["girl", "girl", "girl", "girl", "boy", "boy", "boy", "boy", "boy", "girl", "girl", "girl"],
  25: ["girl", "girl", "girl", "boy", "boy", "boy", "boy", "boy", "girl", "girl", "girl", "girl"],
  26: ["boy", "boy", "boy", "girl", "girl", "girl", "girl", "girl", "boy", "boy", "boy", "boy"],
  27: ["boy", "boy", "girl", "girl", "girl", "girl", "girl", "boy", "boy", "boy", "boy", "boy"],
  28: ["girl", "girl", "boy", "boy", "boy", "boy", "boy", "girl", "girl", "girl", "girl", "girl"],
  29: ["girl", "boy", "boy", "boy", "boy", "boy", "girl", "girl", "girl", "girl", "girl", "boy"],
  30: ["boy", "girl", "girl", "girl", "girl", "girl", "boy", "boy", "boy", "boy", "boy", "girl"],
  31: ["girl", "boy", "boy", "boy", "boy", "boy", "girl", "girl", "girl", "girl", "girl", "boy"],
  32: ["boy", "girl", "girl", "girl", "girl", "girl", "boy", "boy", "boy", "boy", "boy", "girl"],
  33: ["boy", "girl", "girl", "girl", "girl", "boy", "boy", "boy", "boy", "boy", "girl", "girl"],
  34: ["girl", "boy", "boy", "boy", "boy", "girl", "girl", "girl", "girl", "girl", "boy", "boy"],
  35: ["boy", "girl", "girl", "girl", "girl", "boy", "boy", "boy", "boy", "boy", "girl", "girl"],
  36: ["girl", "boy", "boy", "boy", "boy", "girl", "girl", "girl", "girl", "girl", "boy", "boy"],
  37: ["girl", "boy", "boy", "boy", "girl", "girl", "girl", "girl", "girl", "boy", "boy", "boy"],
  38: ["boy", "girl", "girl", "girl", "boy", "boy", "boy", "boy", "boy", "girl", "girl", "girl"],
  39: ["boy", "girl", "girl", "boy", "boy", "boy", "boy", "boy", "girl", "girl", "girl", "girl"],
  40: ["girl", "boy", "boy", "girl", "girl", "girl", "girl", "girl", "boy", "boy", "boy", "boy"],
  41: ["girl", "boy", "girl", "girl", "girl", "girl", "girl", "boy", "boy", "boy", "boy", "girl"],
  42: ["boy", "girl", "boy", "boy", "boy", "boy", "boy", "girl", "girl", "girl", "girl", "boy"],
  43: ["boy", "girl", "boy", "boy", "boy", "boy", "girl", "girl", "girl", "girl", "boy", "boy"],
  44: ["girl", "boy", "girl", "girl", "girl", "girl", "boy", "boy", "boy", "boy", "girl", "girl"],
  45: ["girl", "boy", "girl", "girl", "girl", "boy", "boy", "boy", "boy", "girl", "girl", "girl"],
};

export interface FavorableDateRange {
  month: number;
  startDate: Date;
  endDate: Date;
}

export interface ChineseResults {
  lunarAge: number;
  monthlyPredictions: ChartGender[];
  favorableMonths: number[];
  favorableDateRanges: FavorableDateRange[];
  desiredGender: Gender;
  conceptionYear: number;
  motherBirthDate: Date;
}

export function getChineseChartPredictions(lunarAge: number): ChartGender[] {
  let ageToUse = lunarAge;
  if (lunarAge < 18) ageToUse = 18;
  if (lunarAge > 45) ageToUse = 45;

  return CHINESE_CHART[ageToUse] ?? Array(12).fill("unknown" as ChartGender);
}

export function calculateChineseResults(
  motherBirthDate: Date,
  conceptionYear: number,
  desiredGender: Gender
): ChineseResults {
  const motherAge = conceptionYear - motherBirthDate.getFullYear();
  const lunarAge = motherAge + 1;

  const monthlyPredictions = getChineseChartPredictions(lunarAge);

  const favorableMonths: number[] = [];
  for (let month = 1; month <= 12; month++) {
    if (monthlyPredictions[month - 1] === desiredGender) {
      favorableMonths.push(month);
    }
  }

  const favorableDateRanges = favorableMonths.map((month) => {
    const startDate = new Date(conceptionYear, month - 1, 1);
    const endDate = new Date(conceptionYear, month, 0);
    return { month, startDate, endDate };
  });

  return {
    lunarAge,
    monthlyPredictions,
    favorableMonths,
    favorableDateRanges,
    desiredGender,
    conceptionYear,
    motherBirthDate,
  };
}

export function getConceptionYearOptions(): number[] {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 6 }, (_, i) => currentYear + i);
}
