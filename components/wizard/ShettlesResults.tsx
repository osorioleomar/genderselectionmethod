"use client";

import ShettlesCalendar from "@/components/calendar/ShettlesCalendar";
import ShareButtons from "@/components/ShareButtons";
import { formatDate } from "@/lib/dates";
import { buildShettlesShareMessage } from "@/lib/share";
import { useSiteOrigin } from "@/lib/useSiteOrigin";
import type { ShettlesResults } from "@/lib/shettles";

interface ShettlesResultsViewProps {
  results: ShettlesResults;
}

export default function ShettlesResultsView({ results }: ShettlesResultsViewProps) {
  const { desiredGender, ovulationDate, fertileWindow, recommendedDates, additionalTips } =
    results;

  const genderLabel = desiredGender.charAt(0).toUpperCase() + desiredGender.slice(1);
  const siteOrigin = useSiteOrigin();
  const sharePayload = siteOrigin ? buildShettlesShareMessage(results, siteOrigin) : null;

  return (
    <div className="rounded-2xl bg-neutral border border-line p-4 sm:p-6 md:p-8">
      <h3 className="text-primary mb-2 text-lg sm:text-xl">Your Shettles plan</h3>
      <p className="text-sm sm:text-base mb-4">
        Here&apos;s when to try if you&apos;re hoping for a {desiredGender}.
      </p>

      <div className="mb-4 sm:mb-6 space-y-2 text-sm sm:text-base">
        <p className="mb-0">
          <strong>Your likely ovulation day:</strong> {formatDate(ovulationDate)}
        </p>
        <p className="mb-0">
          <strong>Days you could get pregnant:</strong> {formatDate(fertileWindow[0])} –{" "}
          {formatDate(fertileWindow[fertileWindow.length - 1])}
        </p>
      </div>

      <div className="mb-4 sm:mb-6">
        <h4 className="text-base sm:text-lg mb-2">Your calendar</h4>
        <p className="text-xs sm:text-sm text-foreground-light mb-3">
          ★ = best days to try · 🥚 = ovulation · teal = fertile window
        </p>
        <ShettlesCalendar
          ovulationDate={ovulationDate}
          fertileWindow={fertileWindow}
          recommendedDates={recommendedDates}
          desiredGender={desiredGender}
        />
      </div>

      <div
        className={`rounded-xl p-4 mb-4 ${
          desiredGender === "boy"
            ? "bg-boy/10 border border-boy/30"
            : "bg-girl/10 border border-girl/30"
        }`}
      >
        <h4 className="text-base sm:text-lg mb-2">Best days to try for a {genderLabel}</h4>
        <ul className="mb-4 ml-4">
          {recommendedDates.map((date, i) => (
            <li key={i}>{formatDate(date)}</li>
          ))}
        </ul>
        <ul className="ml-4 mb-0 space-y-1 text-sm">
          {additionalTips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>

      {sharePayload && (
        <ShareButtons
          variant="celebration"
          message={sharePayload.message}
          url={sharePayload.url}
          title={sharePayload.title}
          headline="Share your plan with your partner"
          subline="Send the dates to your partner or save for later."
          genderTint={desiredGender}
        />
      )}

      <div className="text-xs sm:text-sm text-foreground-light border-t border-line pt-4">
        <p className="mb-0">
          <strong>Heads up:</strong> This method isn&apos;t proven. Many couples still have
          about a 50/50 chance either way.
        </p>
      </div>
    </div>
  );
}
