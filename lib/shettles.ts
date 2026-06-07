import type { Gender } from "./dates";
import { normalizeDate } from "./dates";

export interface ShettlesResults {
  ovulationDate: Date;
  fertileWindow: Date[];
  recommendedDates: Date[];
  additionalTips: string[];
  desiredGender: Gender;
}

export function calculateShettlesResults(
  lastPeriodDate: Date,
  cycleLength: number,
  desiredGender: Gender
): ShettlesResults {
  const lmp = normalizeDate(lastPeriodDate);

  const ovulationDate = new Date(lmp);
  ovulationDate.setDate(lmp.getDate() + (cycleLength - 14));

  const fertileWindow: Date[] = [];
  for (let i = -5; i <= 1; i++) {
    const date = new Date(ovulationDate);
    date.setDate(ovulationDate.getDate() + i);
    fertileWindow.push(date);
  }

  let recommendedDates: Date[] = [];
  let additionalTips: string[] = [];

  if (desiredGender === "boy") {
    recommendedDates = [
      new Date(ovulationDate),
      new Date(new Date(ovulationDate).setDate(ovulationDate.getDate() - 1)),
    ];

    additionalTips = [
      "Try to time intercourse as close to ovulation as possible.",
      "Male sperm are faster but less resilient, so timing close to ovulation gives them an advantage.",
      "Consider positions that allow for deeper penetration.",
      "The male partner should avoid tight underwear and hot baths to maintain optimal sperm health.",
      "Alkaline environment may favor male sperm, so the female partner might want to avoid acidic foods.",
    ];
  } else {
    recommendedDates = [
      new Date(new Date(ovulationDate).setDate(ovulationDate.getDate() - 2)),
      new Date(new Date(ovulationDate).setDate(ovulationDate.getDate() - 3)),
      new Date(new Date(ovulationDate).setDate(ovulationDate.getDate() - 4)),
    ];

    additionalTips = [
      "Plan intercourse 2-4 days before expected ovulation.",
      "Female sperm are slower but more resilient, so they can survive longer waiting for the egg.",
      "Consider positions with shallower penetration.",
      "More frequent intercourse may reduce sperm count, which some believe may favor female sperm.",
      "Acidic environment may favor female sperm, so the female partner might consider including more acidic foods in her diet.",
    ];
  }

  return {
    ovulationDate,
    fertileWindow,
    recommendedDates,
    additionalTips,
    desiredGender,
  };
}
