"use client";

import { useEffect } from "react";
import DateInput from "@/components/ui/DateInput";
import type { Gender } from "@/lib/dates";
import { calculateShettlesResults } from "@/lib/shettles";
import type { ShettlesResults } from "@/lib/shettles";

interface ShettlesFormProps {
  gender: Gender;
  lastPeriod: Date | null;
  cycleLength: number;
  onLastPeriodChange: (date: Date | null) => void;
  onCycleLengthChange: (length: number) => void;
  onResults: (results: ShettlesResults) => void;
}

export default function ShettlesForm({
  gender,
  lastPeriod,
  cycleLength,
  onLastPeriodChange,
  onCycleLengthChange,
  onResults,
}: ShettlesFormProps) {
  useEffect(() => {
    if (!lastPeriod || cycleLength < 21 || cycleLength > 35) return;
    const results = calculateShettlesResults(lastPeriod, cycleLength, gender);
    onResults(results);
  }, [lastPeriod, cycleLength, gender, onResults]);

  const decreaseCycle = () => onCycleLengthChange(Math.max(21, cycleLength - 1));
  const increaseCycle = () => onCycleLengthChange(Math.min(35, cycleLength + 1));

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="last-period" className="block text-sm font-semibold mb-2">
            First day of last menstrual period:
          </label>
          <DateInput
            id="last-period"
            selected={lastPeriod}
            onChange={onLastPeriodChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cycle-length" className="block text-sm font-semibold mb-2">
            Average menstrual cycle length (days):
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={decreaseCycle}
              className="btn-secondary px-3 py-2 min-w-[44px]"
              aria-label="Decrease cycle length"
            >
              -
            </button>
            <input
              type="number"
              id="cycle-length"
              min={21}
              max={35}
              value={cycleLength}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val) && val >= 21 && val <= 35) onCycleLengthChange(val);
              }}
              className="flex-1 rounded-lg border border-border px-4 py-2.5 text-center focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
            <button
              type="button"
              onClick={increaseCycle}
              className="btn-secondary px-3 py-2 min-w-[44px]"
              aria-label="Increase cycle length"
            >
              +
            </button>
          </div>
          <small className="text-text-light text-sm mt-1 block">
            Most cycles are between 21-35 days
          </small>
        </div>
      </div>
    </div>
  );
}
