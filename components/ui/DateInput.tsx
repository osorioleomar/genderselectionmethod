"use client";

import DatePicker from "react-datepicker";
import { Calendar } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
  id: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  required?: boolean;
  maxDate?: Date;
  /** Enables year/month dropdowns and opens near a typical parent age (~30 years ago). */
  variant?: "default" | "birthDate";
}

function yearsAgo(years: number, from = new Date()) {
  return new Date(from.getFullYear() - years, from.getMonth(), from.getDate());
}

export default function DateInput({
  id,
  selected,
  onChange,
  placeholder = "Select date",
  required = false,
  maxDate,
  variant = "default",
}: DateInputProps) {
  const today = maxDate ?? new Date();
  const isBirthDate = variant === "birthDate";
  const minDate = isBirthDate ? yearsAgo(80, today) : undefined;
  const openToDate = selected ?? (isBirthDate ? yearsAgo(30, today) : today);

  return (
    <div className="relative w-full">
      <DatePicker
        id={id}
        selected={selected}
        onChange={onChange}
        placeholderText={placeholder}
        required={required}
        maxDate={today}
        minDate={minDate}
        openToDate={openToDate}
        dateFormat="MMMM d, yyyy"
        className="w-full rounded-lg border border-line px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        wrapperClassName="w-full block"
        showPopperArrow={false}
        popperPlacement="bottom-start"
        withPortal
        popperProps={{ strategy: "fixed" }}
        showYearDropdown={isBirthDate}
        showMonthDropdown={isBirthDate}
        dropdownMode="select"
        scrollableYearDropdown={isBirthDate}
        yearDropdownItemNumber={isBirthDate ? 80 : undefined}
      />
      <Calendar
        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-light pointer-events-none"
        aria-hidden
      />
    </div>
  );
}
