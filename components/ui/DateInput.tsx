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
}

export default function DateInput({
  id,
  selected,
  onChange,
  placeholder = "Select date",
  required = false,
  maxDate = new Date(),
}: DateInputProps) {
  return (
    <div className="relative flex">
      <DatePicker
        id={id}
        selected={selected}
        onChange={onChange}
        placeholderText={placeholder}
        required={required}
        maxDate={maxDate}
        dateFormat="MMMM d, yyyy"
        className="w-full rounded-lg border border-border px-4 py-2.5 pr-10 text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
        wrapperClassName="w-full"
        showPopperArrow={false}
      />
      <Calendar
        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light pointer-events-none"
        aria-hidden
      />
    </div>
  );
}
