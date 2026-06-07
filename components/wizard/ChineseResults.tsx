"use client";

import ChineseYearOverview from "@/components/calendar/ChineseYearOverview";
import ShareButtons from "@/components/ShareButtons";
import { formatDateShort, MONTH_NAMES } from "@/lib/dates";
import { getShettlesSuggestion, type ChineseResults } from "@/lib/chinese-calendar";
import { buildChineseShareMessage } from "@/lib/share";
import { useSiteOrigin } from "@/lib/useSiteOrigin";

interface ChineseResultsViewProps {
  results: ChineseResults;
  onTryShettles?: () => void;
}

export default function ChineseResultsView({ results, onTryShettles }: ChineseResultsViewProps) {
  const {
    desiredGender,
    lunarAge,
    conceptionYear,
    motherBirthDate,
    favorableMonths,
    favorableDateRanges,
  } = results;

  const genderLabel = desiredGender.charAt(0).toUpperCase() + desiredGender.slice(1);
  const shettlesSuggestion = getShettlesSuggestion(conceptionYear, favorableMonths);
  const siteOrigin = useSiteOrigin();
  const sharePayload = siteOrigin ? buildChineseShareMessage(results, siteOrigin) : null;
  const hasFavorableMonths = favorableMonths.length > 0;

  return (
    <div className="rounded-2xl bg-neutral border border-line p-4 sm:p-6 md:p-8">
      <h3 className="text-primary mb-2 text-lg sm:text-xl">Your Chinese chart results</h3>
      <p className="text-sm sm:text-base mb-4">
        Highlighted months are when to <strong>try to conceive</strong> in {conceptionYear} if
        you&apos;re hoping for a {desiredGender}. Time intercourse around your fertile window
        during those months — the chart is based on which calendar month conception happens in,
        not a specific day.
      </p>

      <div className="mb-4 sm:mb-6 space-y-2 text-sm sm:text-base">
        <p className="mb-0">
          <strong>Your birthday:</strong> {formatDateShort(motherBirthDate)}
        </p>
        <p className="mb-0">
          <strong>Your chart age:</strong> {lunarAge}{" "}
          <span className="text-foreground-light text-sm">(we add 1 to your regular age)</span>
        </p>
        <p className="mb-0">
          <strong>Hoping for:</strong> {genderLabel}
        </p>
      </div>

      <div className="mb-4 sm:mb-6">
        <h4 className="text-base sm:text-lg mb-2">Year at a glance</h4>
        <ChineseYearOverview
          year={conceptionYear}
          favorableMonths={favorableMonths}
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
        <h4 className="text-base sm:text-lg mb-2">When to try conceiving for a {genderLabel}</h4>

        {hasFavorableMonths ? (
          <>
            <p className="text-sm sm:text-base mb-2">
              Aim for conception during these months in {conceptionYear}. Plan sex around
              ovulation somewhere in each window:
            </p>
            <ul className="ml-4 mb-0">
              {favorableDateRanges.map((range) => (
                <li key={range.month}>
                  <strong>{MONTH_NAMES[range.month - 1]}:</strong>{" "}
                  {formatDateShort(range.startDate)} – {formatDateShort(range.endDate)}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p className="mb-2">
              No months in {conceptionYear} match a {desiredGender} at chart age {lunarAge}.
            </p>
            <p className="mb-0 text-sm">
              Try a different year, or use the Shettles timing tool instead.
            </p>
          </>
        )}
      </div>

      {sharePayload && (
        <ShareButtons
          variant="celebration"
          message={sharePayload.message}
          url={sharePayload.url}
          title={sharePayload.title}
          headline={
            hasFavorableMonths ? "Share your chart results" : "Share this free tool instead"
          }
          subline={
            hasFavorableMonths
              ? "Send the months to your partner or save for later."
              : "Help someone else discover these free calculators."
          }
          genderTint={desiredGender}
        />
      )}

      {shettlesSuggestion && onTryShettles && (
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4 mb-4">
          <h4 className="text-base sm:text-lg mb-2 text-primary">Pinpoint your best days</h4>
          {shettlesSuggestion.timing === "current" ? (
            <p className="text-sm sm:text-base mb-3">
              <strong>{shettlesSuggestion.monthName}</strong> favors a {desiredGender} on the chart
              — and it&apos;s this month. The Chinese chart tells you <em>which month</em>; the
              Shettles method can narrow that down to specific days around ovulation.
            </p>
          ) : (
            <p className="text-sm sm:text-base mb-3">
              <strong>{shettlesSuggestion.monthName}</strong> favors a {desiredGender} on the chart
              next month. Use the Shettles method now to find your exact fertile days and plan
              ahead.
            </p>
          )}
          <button type="button" onClick={onTryShettles} className="btn-primary w-full sm:w-auto">
            {shettlesSuggestion.timing === "current"
              ? "Find exact days with Shettles"
              : "Plan ahead with Shettles"}
          </button>
        </div>
      )}

      <div className="text-xs sm:text-sm text-foreground-light border-t border-line pt-4">
        <p className="mb-0">
          <strong>Heads up:</strong> This chart is a tradition, not science. Treat it as fun,
          not a guarantee.
        </p>
      </div>
    </div>
  );
}
