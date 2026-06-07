import { MONTH_NAMES, type Gender } from "@/lib/dates";

interface ChineseYearOverviewProps {
  year: number;
  favorableMonths: number[];
  desiredGender: Gender;
}

export default function ChineseYearOverview({
  year,
  favorableMonths,
  desiredGender,
}: ChineseYearOverviewProps) {
  return (
    <div>
      <p className="text-foreground-light text-sm mb-4 text-center">
        {year} conception year overview
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3 mb-4">
        {MONTH_NAMES.map((name, index) => {
          const month = index + 1;
          const isFavorable = favorableMonths.includes(month);

          return (
            <div
              key={name}
              className={`rounded-lg p-3 text-center font-semibold text-sm transition-colors ${
                isFavorable
                  ? desiredGender === "boy"
                    ? "bg-boy text-white border-2 border-boy/80"
                    : "bg-girl text-white border-2 border-girl/80"
                  : "bg-neutral text-foreground border border-line"
              }`}
            >
              <div>{name}</div>
              <div className="text-xs mt-1 font-normal opacity-90">
                {isFavorable ? `Favorable for ${desiredGender}` : "Not favorable"}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div
            className={`w-5 h-5 rounded ${desiredGender === "boy" ? "bg-boy" : "bg-girl"}`}
          />
          <span>Favorable for {desiredGender}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-neutral border border-line" />
          <span>Not favorable</span>
        </div>
      </div>
    </div>
  );
}
