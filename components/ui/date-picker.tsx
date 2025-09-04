"use client";

import * as React from "react";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import DatePickerReact from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datepicker.css";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  showTimeSelect?: boolean;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
}

// Custom input component for react-datepicker
const CustomInput = React.forwardRef<HTMLInputElement, any>(
  ({ value, onClick, placeholder, className, disabled }, ref) => (
    <div className="relative">
      <Input
        ref={ref}
        value={value}
        onClick={onClick}
        placeholder={placeholder}
        readOnly
        disabled={disabled}
        className={cn("cursor-pointer pr-10", className)}
      />
      <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  )
);

CustomInput.displayName = "CustomInput";

// Custom header component for react-datepicker
const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: any) => (
  <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
    <button
      type="button"
      onClick={decreaseMonth}
      disabled={prevMonthButtonDisabled}
      className="p-1.5 hover:bg-white/20 rounded-md text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ChevronLeft className="w-4 h-4" />
    </button>

    <span className="text-sm font-semibold px-2">
      {format(date, "MMMM yyyy", { locale: vi })}
    </span>

    <button
      type="button"
      onClick={increaseMonth}
      disabled={nextMonthButtonDisabled}
      className="p-1.5 hover:bg-white/20 rounded-md text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ChevronRight className="w-4 h-4" />
    </button>
  </div>
);

// Enhanced DatePicker with react-datepicker
export function EnhancedDatePicker({
  date,
  onDateChange,
  placeholder = "Chọn ngày",
  className,
  disabled = false,
  showTimeSelect = false,
  dateFormat = "dd/MM/yyyy",
  minDate,
  maxDate,
  placement = "bottom-start",
}: DatePickerProps) {
  const handleDateChange = (date: Date | null) => {
    onDateChange?.(date || undefined);
  };

  return (
    <div className="relative">
      <DatePickerReact
        selected={date}
        onChange={handleDateChange}
        customInput={
          <CustomInput
            placeholder={placeholder}
            className={className}
            disabled={disabled}
          />
        }
        renderCustomHeader={CustomHeader}
        showMonthDropdown={false}
        showYearDropdown={false}
        dropdownMode="select"
        showTimeSelect={showTimeSelect}
        dateFormat={dateFormat}
        minDate={minDate}
        maxDate={maxDate}
        locale={vi}
        className="w-full"
        calendarClassName="!border-0 !shadow-lg !rounded-xl !bg-white !overflow-hidden !text-sm"
        dayClassName={(date) =>
          "!hover:bg-indigo-100 !hover:text-indigo-900 !rounded-md !transition-all !duration-150 !font-medium !text-sm"
        }
        weekDayClassName={() => "!text-gray-600 !font-semibold !text-xs"}
        monthClassName={() =>
          "!hover:bg-indigo-100 !rounded-md !transition-colors"
        }
        timeClassName={() => "!hover:bg-indigo-100 !rounded-md"}
        popperClassName="!z-[9999] datepicker-close-to-input"
        popperPlacement={placement}
        showPopperArrow={false}
        fixedHeight
        todayButton="📅 Hôm nay"
        // Tắt navigation mặc định để dùng custom header
        showMonthYearPicker={false}
        previousMonthButtonLabel="‹"
        nextMonthButtonLabel="›"
        disabledKeyboardNavigation={false}
        // Giảm kích thước
        monthsShown={1}
        inline={false}
        // Sử dụng portal để tránh bị cha element ảnh hưởng
        withPortal={false}
      />
    </div>
  );
}

// Original DatePicker (keeping for backward compatibility)
export function DatePicker({
  date,
  onDateChange,
  placeholder = "Chọn ngày",
  className,
}: Pick<
  DatePickerProps,
  "date" | "onDateChange" | "placeholder" | "className"
>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal rounded-xl",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "dd/MM/yyyy", { locale: vi })
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 rounded-2xl shadow-xl border-0">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-t-2xl">
          <div className="text-center font-semibold">
            {date
              ? format(date, "MMMM yyyy", { locale: vi })
              : format(new Date(), "MMMM yyyy", { locale: vi })}
          </div>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          initialFocus
          className="rounded-b-2xl"
        />
      </PopoverContent>
    </Popover>
  );
}
