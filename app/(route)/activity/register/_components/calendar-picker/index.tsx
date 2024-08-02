'use client';

import '../../../../../../styles/datepicker.css';

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import Image from 'next/image';

import CalendarIcon from 'public/assets/icons/calendar.svg';

interface DatePickerProps {
  onChange: (key: string, value: string | Date) => void;
  value: string;
}

function CalendarWrapper({ onChange, value }: DatePickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      onChange('date', date);
    }
  };

  useEffect(() => {
    if (value === '') {
      setStartDate(null);
    }
  }, [value]);

  return (
    <div className="relative flex-1">
      <DatePicker
        id="date"
        value={value}
        dateFormat="yy/MM/dd"
        popperPlacement="bottom-start"
        shouldCloseOnSelect
        selected={startDate}
        onChange={handleDateChange}
        onSelect={handleDateChange}
        minDate={new Date()}
        placeholderText="YY/MM/DD"
        className="w-full rounded border border-solid border-gray-600 py-2 pl-[10px] pr-12 text-sm leading-[1.8] caret-transparent outline-none tablet:py-[15px] tablet:pl-4 tablet:pr-[68px] tablet:text-base tablet:leading-[1.6]"
      />
      <label htmlFor="date" className="absolute right-3 top-1/2 -translate-y-1/2 tablet:right-6">
        <Image src={CalendarIcon} alt="달력" />
      </label>
    </div>
  );
}

export default CalendarWrapper;
