"use client";

import { useState } from "react";
import {
  isDateInArray,
  isSameDay,
  MONTH_NAMES,
  WEEKDAY_NAMES,
  type Gender,
} from "@/lib/dates";

interface ShettlesCalendarProps {
  ovulationDate: Date;
  fertileWindow: Date[];
  recommendedDates: Date[];
  desiredGender: Gender;
}

type DayState = "recommended" | "ovulation" | "fertile" | "normal";

function getDayState(
  date: Date,
  ovulationDate: Date,
  fertileWindow: Date[],
  recommendedDates: Date[]
): DayState {
  if (isDateInArray(date, recommendedDates)) return "recommended";
  if (isSameDay(date, ovulationDate)) return "ovulation";
  if (isDateInArray(date, fertileWindow)) return "fertile";
  return "normal";
}

function getDayClasses(
  state: DayState,
  desiredGender: Gender,
  isOtherMonth: boolean,
  isToday: boolean
): string {
  const base =
    "relative flex flex-col items-center justify-center h-10 sm:h-14 md:h-16 border border-line/40 transition-colors";

  let fill = "";
  switch (state) {
    case "recommended":
      fill =
        desiredGender === "boy"
          ? "bg-boy text-white font-bold"
          : "bg-girl text-white font-bold";
      break;
    case "ovulation":
      fill = "bg-accent text-white font-bold";
      break;
    case "fertile":
      fill = "bg-teal-100 border-teal-400 text-teal-900";
      break;
    default:
      fill = isOtherMonth ? "bg-gray-50 text-gray-300" : "bg-white text-foreground";
  }

  const todayRing = isToday ? " ring-2 ring-inset ring-primary" : "";
  return `${base} ${fill}${todayRing}`;
}

function getDayMarker(state: DayState): string | null {
  switch (state) {
    case "recommended":
      return "★";
    case "ovulation":
      return "🥚";
    case "fertile":
      return null;
    default:
      return null;
  }
}

export default function ShettlesCalendar({
  ovulationDate,
  fertileWindow,
  recommendedDates,
  desiredGender,
}: ShettlesCalendarProps) {
  const [displayDate, setDisplayDate] = useState(
    () => new Date(ovulationDate.getFullYear(), ovulationDate.getMonth(), 1)
  );

  const month = displayDate.getMonth();
  const year = displayDate.getFullYear();
  const firstDay = new Date(year, month, 1);
  const startingDay = firstDay.getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const prevMonthTotalDays = new Date(year, month, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cells: { day: number; date: Date; isOtherMonth: boolean }[] = [];

  for (let i = startingDay - 1; i >= 0; i--) {
    const day = prevMonthTotalDays - i;
    cells.push({
      day,
      date: new Date(year, month - 1, day),
      isOtherMonth: true,
    });
  }

  for (let day = 1; day <= totalDays; day++) {
    cells.push({
      day,
      date: new Date(year, month, day),
      isOtherMonth: false,
    });
  }

  const remainingCells = 42 - cells.length;
  for (let day = 1; day <= remainingCells; day++) {
    cells.push({
      day,
      date: new Date(year, month + 1, day),
      isOtherMonth: true,
    });
  }

  const genderLabel = desiredGender.charAt(0).toUpperCase() + desiredGender.slice(1);

  return (
    <div className="rounded-2xl overflow-hidden shadow-card border border-line">
      <div className="bg-gradient-to-br from-primary to-accent text-white px-4 py-3 flex justify-between items-center">
        <button
          type="button"
          onClick={() => setDisplayDate(new Date(year, month - 1, 1))}
          className="w-10 h-10 rounded-full hover:bg-white/30 flex items-center justify-center text-xl touch-manipulation"
          aria-label="Previous month"
        >
          &lt;
        </button>
        <span className="font-heading font-semibold text-base sm:text-lg">
          {MONTH_NAMES[month]} {year}
        </span>
        <button
          type="button"
          onClick={() => setDisplayDate(new Date(year, month + 1, 1))}
          className="w-10 h-10 rounded-full hover:bg-white/30 flex items-center justify-center text-xl touch-manipulation"
          aria-label="Next month"
        >
          &gt;
        </button>
      </div>

      {/* Legend above grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-neutral text-xs sm:text-sm border-b border-line">
        <div className="flex items-center gap-2">
          <div
            className={`w-4 h-4 rounded shrink-0 ${desiredGender === "boy" ? "bg-boy" : "bg-girl"}`}
          />
          <span>
            <strong>Best days</strong> ({genderLabel})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-accent shrink-0" />
          <span>
            <strong>Ovulation</strong> 🥚
          </span>
        </div>
        <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
          <div className="w-4 h-4 rounded bg-teal-100 border border-teal-400 shrink-0" />
          <span>
            <strong>Fertile days</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-7 bg-neutral border-b border-line">
        {WEEKDAY_NAMES.map((day) => (
          <div
            key={day}
            className="text-center py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase text-primary"
          >
            {day.slice(0, 1)}
            <span className="hidden sm:inline">{day.slice(1)}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map(({ day, date, isOtherMonth }, index) => {
          const state = getDayState(date, ovulationDate, fertileWindow, recommendedDates);
          const marker = getDayMarker(state);
          const isToday = isSameDay(date, today);

          return (
            <div
              key={index}
              className={getDayClasses(state, desiredGender, isOtherMonth, isToday)}
              title={
                state === "recommended"
                  ? "Best day to try"
                  : state === "ovulation"
                    ? "Ovulation day"
                    : state === "fertile"
                      ? "Fertile day"
                      : undefined
              }
            >
              <span className="text-[11px] sm:text-sm font-medium leading-none">{day}</span>
              {marker && (
                <span className="text-[10px] sm:text-xs leading-none mt-0.5" aria-hidden>
                  {marker}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
