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
      <p className="text-foreground-light text-sm mb-3 text-center">
        {year} — highlighted months are when to try conceiving for a {desiredGender}
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
        {MONTH_NAMES.map((name, index) => {
          const month = index + 1;
          const isFavorable = favorableMonths.includes(month);
          const shortName = name.slice(0, 3);

          return (
            <div
              key={name}
              className={`rounded-xl p-3 sm:p-4 text-center font-semibold text-sm min-h-[64px] flex flex-col justify-center ${
                isFavorable
                  ? desiredGender === "boy"
                    ? "bg-boy text-white border-2 border-boy shadow-sm"
                    : "bg-girl text-white border-2 border-girl shadow-sm"
                  : "bg-neutral text-foreground-light border border-line"
              }`}
            >
              <div className="text-base">{shortName}</div>
              <div className="text-[10px] sm:text-xs mt-1 font-normal opacity-90">
                {isFavorable ? "Try conceiving" : "Skip"}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div
            className={`w-5 h-5 rounded ${desiredGender === "boy" ? "bg-boy" : "bg-girl"}`}
          />
          <span>Try to conceive this month</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-neutral border border-line" />
          <span>Skip — chart does not favor {desiredGender}</span>
        </div>
      </div>
    </div>
  );
}
