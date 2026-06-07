import ShettlesCalendar from "@/components/calendar/ShettlesCalendar";
import { formatDate } from "@/lib/dates";
import type { ShettlesResults } from "@/lib/shettles";

interface ShettlesResultsViewProps {
  results: ShettlesResults;
}

export default function ShettlesResultsView({ results }: ShettlesResultsViewProps) {
  const { desiredGender, ovulationDate, fertileWindow, recommendedDates, additionalTips } =
    results;

  return (
    <div className="rounded-2xl bg-neutral border border-line p-6 md:p-8">
      <h3 className="text-primary mb-3">Shettles Method Results</h3>
      <p>
        Based on your input, here are your personalized recommendations for conceiving
        a {desiredGender}:
      </p>

      <div className="mb-6 space-y-2">
        <p className="mb-0">
          <strong>Estimated Ovulation Date:</strong> {formatDate(ovulationDate)}
        </p>
        <p className="mb-0">
          <strong>Fertile Window:</strong> {formatDate(fertileWindow[0])} to{" "}
          {formatDate(fertileWindow[fertileWindow.length - 1])}
        </p>
      </div>

      <div className="mb-6">
        <h4 className="text-lg">Calendar View</h4>
        <ShettlesCalendar
          ovulationDate={ovulationDate}
          fertileWindow={fertileWindow}
          recommendedDates={recommendedDates}
          desiredGender={desiredGender}
        />
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
        <p>
          <strong>Recommended Intercourse Dates:</strong>
        </p>
        <ul>
          {recommendedDates.map((date, i) => (
            <li key={i}>{formatDate(date)}</li>
          ))}
        </ul>
        <p>
          <strong>Additional Tips:</strong>
        </p>
        <ul>
          {additionalTips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>

      <div className="text-sm text-foreground-light border-t border-line pt-4">
        <p className="mb-0">
          <strong>Remember:</strong> The Shettles Method is not scientifically proven
          and has approximately a 50% success rate. These recommendations are based on
          traditional beliefs and theories.
        </p>
      </div>
    </div>
  );
}
