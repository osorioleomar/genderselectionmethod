"use client";

import { useState } from "react";
import {
  formatDate,
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

function getDayClasses(
  date: Date,
  ovulationDate: Date,
  fertileWindow: Date[],
  recommendedDates: Date[],
  desiredGender: Gender,
  today: Date,
  isOtherMonth: boolean
): string {
  const classes = [
    "relative flex flex-col items-center justify-start p-1 md:p-2 h-[60px] md:h-[100px] lg:h-[120px] border border-line/50 transition-colors",
  ];

  if (isOtherMonth) classes.push("bg-neutral/50 text-foreground-light");
  else classes.push("bg-white");

  if (isSameDay(date, today)) classes.push("ring-2 ring-inset ring-accent");

  if (isDateInArray(date, fertileWindow) && !isSameDay(date, ovulationDate)) {
    classes.push("bg-secondary/30");
  }

  if (isSameDay(date, ovulationDate)) {
    classes.push("bg-accent/40 font-bold");
  }

  if (isDateInArray(date, recommendedDates)) {
    classes.push(
      desiredGender === "boy"
        ? "bg-boy/30 ring-2 ring-boy"
        : "bg-girl/30 ring-2 ring-girl"
    );
  }

  return classes.join(" ");
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

  return (
    <div className="rounded-2xl overflow-hidden shadow-card border border-line">
      <div className="bg-gradient-to-br from-primary to-accent text-white px-4 py-3 flex justify-between items-center">
        <button
          type="button"
          onClick={() => setDisplayDate(new Date(year, month - 1, 1))}
          className="w-8 h-8 rounded-full hover:bg-white/30 flex items-center justify-center text-xl"
          aria-label="Previous month"
        >
          &lt;
        </button>
        <span className="font-heading font-semibold text-lg">
          {MONTH_NAMES[month]} {year}
        </span>
        <button
          type="button"
          onClick={() => setDisplayDate(new Date(year, month + 1, 1))}
          className="w-8 h-8 rounded-full hover:bg-white/30 flex items-center justify-center text-xl"
          aria-label="Next month"
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 bg-neutral border-b border-line">
        {WEEKDAY_NAMES.map((day) => (
          <div
            key={day}
            className="text-center py-2 md:py-3 text-xs md:text-sm font-semibold uppercase text-primary"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map(({ day, date, isOtherMonth }, index) => (
          <div
            key={index}
            className={getDayClasses(
              date,
              ovulationDate,
              fertileWindow,
              recommendedDates,
              desiredGender,
              today,
              isOtherMonth
            )}
          >
            <span className="text-xs md:text-sm font-medium">{day}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 p-4 bg-neutral text-sm">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-secondary/50" />
          <span>
            <strong>Fertile Window</strong>: Days when conception is possible
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-accent/50" />
          <span>
            <strong>Ovulation Day</strong>: When egg is released
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`w-5 h-5 rounded ${desiredGender === "boy" ? "bg-boy/50 ring-1 ring-boy" : "bg-girl/50 ring-1 ring-girl"}`}
          />
          <span>
            <strong>
              Recommended for {desiredGender.charAt(0).toUpperCase() + desiredGender.slice(1)}
            </strong>
            : Optimal timing
          </span>
        </div>
      </div>
    </div>
  );
}
