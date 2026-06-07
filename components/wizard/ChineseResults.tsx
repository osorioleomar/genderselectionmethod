import ChineseYearOverview from "@/components/calendar/ChineseYearOverview";
import { formatDateShort, MONTH_NAMES } from "@/lib/dates";
import type { ChineseResults } from "@/lib/chinese-calendar";

interface ChineseResultsViewProps {
  results: ChineseResults;
}

export default function ChineseResultsView({ results }: ChineseResultsViewProps) {
  const {
    desiredGender,
    lunarAge,
    conceptionYear,
    motherBirthDate,
    monthlyPredictions,
    favorableMonths,
    favorableDateRanges,
  } = results;

  return (
    <div className="rounded-2xl bg-neutral border border-border p-6 md:p-8">
      <h3 className="text-primary mb-3">Chinese Birth Calendar Results</h3>
      <p>
        Based on the mother&apos;s lunar age of {lunarAge}, here are the favorable
        months for conceiving a {desiredGender} in {conceptionYear}:
      </p>

      <div className="mb-6 space-y-2">
        <p className="mb-0">
          <strong>Mother&apos;s Birth Date:</strong> {formatDateShort(motherBirthDate)}
        </p>
        <p className="mb-0">
          <strong>Mother&apos;s Lunar Age:</strong> {lunarAge}
        </p>
        <p className="mb-0">
          <strong>Desired Gender:</strong>{" "}
          {desiredGender.charAt(0).toUpperCase() + desiredGender.slice(1)}
        </p>
      </div>

      <div className="mb-6">
        <h4 className="text-lg">Chinese Birth Chart</h4>
        <ChineseYearOverview
          year={conceptionYear}
          favorableMonths={favorableMonths}
          desiredGender={desiredGender}
        />

        <div className="overflow-x-auto mt-4 rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-neutral">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Month</th>
                <th className="px-4 py-3 text-left font-semibold">Prediction</th>
                <th className="px-4 py-3 text-left font-semibold">Date Range</th>
              </tr>
            </thead>
            <tbody>
              {monthlyPredictions.map((prediction, index) => {
                const month = index + 1;
                const isFavorable = favorableMonths.includes(month);
                const startDate = new Date(conceptionYear, month - 1, 1);
                const endDate = new Date(conceptionYear, month, 0);

                return (
                  <tr
                    key={month}
                    className={`border-t border-border ${
                      isFavorable ? "bg-green-50" : ""
                    } ${prediction === desiredGender ? "font-medium" : ""}`}
                  >
                    <td className="px-4 py-3">{MONTH_NAMES[index]}</td>
                    <td className="px-4 py-3 capitalize">{prediction}</td>
                    <td className="px-4 py-3">
                      {formatDateShort(startDate)} - {formatDateShort(endDate)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className={`rounded-xl p-4 mb-4 ${
          desiredGender === "boy" ? "bg-boy/10 border border-boy/30" : "bg-girl/10 border border-girl/30"
        }`}
      >
        <h4 className="text-lg">
          Recommendations for Conceiving a{" "}
          {desiredGender.charAt(0).toUpperCase() + desiredGender.slice(1)}
        </h4>

        {favorableMonths.length > 0 ? (
          <>
            <p>
              According to the Chinese Birth Calendar, the following months in{" "}
              {conceptionYear} are favorable for conceiving a {desiredGender}:
            </p>
            <ul>
              {favorableDateRanges.map((range) => (
                <li key={range.month}>
                  <strong>{MONTH_NAMES[range.month - 1]}:</strong>{" "}
                  {formatDateShort(range.startDate)} - {formatDateShort(range.endDate)}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p>
              According to the Chinese Birth Calendar, there are no favorable months in{" "}
              {conceptionYear} for conceiving a {desiredGender} at the mother&apos;s lunar
              age of {lunarAge}.
            </p>
            <p className="mb-0">
              You may want to try a different year or consider the Shettles Method instead.
            </p>
          </>
        )}
      </div>

      <div className="text-sm text-text-light border-t border-border pt-4">
        <p className="mb-0">
          <strong>Remember:</strong> The Chinese Birth Calendar is a traditional method
          with no scientific basis. These predictions are based on ancient beliefs and
          cultural traditions.
        </p>
      </div>
    </div>
  );
}
