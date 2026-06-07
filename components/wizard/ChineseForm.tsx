"use client";

import DateInput from "@/components/ui/DateInput";
import type { Gender } from "@/lib/dates";
import { calculateChineseResults, getConceptionYearOptions } from "@/lib/chinese-calendar";
import type { ChineseResults } from "@/lib/chinese-calendar";

interface ChineseFormProps {
  gender: Gender;
  motherBirthDate: Date | null;
  conceptionYear: number;
  onMotherBirthDateChange: (date: Date | null) => void;
  onConceptionYearChange: (year: number) => void;
  onResults: (results: ChineseResults) => void;
  error: string | null;
  onError: (error: string | null) => void;
}

export default function ChineseForm({
  gender,
  motherBirthDate,
  conceptionYear,
  onMotherBirthDateChange,
  onConceptionYearChange,
  onResults,
  error,
  onError,
}: ChineseFormProps) {
  const yearOptions = getConceptionYearOptions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onError(null);

    if (!motherBirthDate) {
      onError("Please select the mother's date of birth.");
      return;
    }

    const results = calculateChineseResults(motherBirthDate, conceptionYear, gender);
    onResults(results);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="mother-birth-date" className="block text-sm font-semibold mb-2">
            Mother&apos;s date of birth:
          </label>
          <DateInput
            id="mother-birth-date"
            selected={motherBirthDate}
            onChange={onMotherBirthDateChange}
            required
          />
        </div>
        <div>
          <label htmlFor="conception-year" className="block text-sm font-semibold mb-2">
            Year of planned conception:
          </label>
          <select
            id="conception-year"
            value={conceptionYear}
            onChange={(e) => onConceptionYearChange(parseInt(e.target.value, 10))}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && (
        <p className="text-red-600 text-sm mb-4" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn-primary w-full sm:w-auto">
        Find Favorable Months
      </button>
    </form>
  );
}
