'use client';

import '../../../styles/datepicker.css';

import DatePicker from 'react-datepicker';
import Image from 'next/image';

import CalendarIcon from 'public/assets/icons/calendar.svg';

function CalendarWrapper() {
  return (
    <label htmlFor="date" className="flex items-center">
      <DatePicker id="date" dateFormat="yyyy-MM-dd" shouldCloseOnSelect minDate={new Date()} placeholderText="YY/MM/DD" className="flex-1 outline-none" />
      <div className="">
        <Image src={CalendarIcon} alt="달력" />
      </div>
    </label>
  );
}

export default CalendarWrapper;
