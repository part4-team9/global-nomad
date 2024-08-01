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
        shouldCloseOnSelect
        selected={startDate}
        onChange={handleDateChange}
        onSelect={handleDateChange}
        minDate={new Date()}
        placeholderText="YY/MM/DD"
        className="w-full rounded border border-solid border-gray-600 py-[15px] pl-4 pr-[68px] caret-transparent outline-none"
      />
      <label htmlFor="date" className="absolute right-6 top-1/2 -translate-y-1/2">
        <Image src={CalendarIcon} alt="달력" />
      </label>
    </div>
  );
}

export default CalendarWrapper;