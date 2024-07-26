'use client';

import { useState } from 'react';
import Image from 'next/image';

import SelectUl from '../select-box-list';

import ArrowDown from 'public/assets/icons/arrow-down.svg';

interface SelectBoxProps {
  id?: string;
  placeholder?: string;
  values: string[];
}

/**
 * Select Box 공통 컴포넌트
 * @placeholder select box placeholder
 * @values select box 리스트에 들어갈 string 배열 (map 돌려서 보여줌)
 */
function SelectBox({ id, placeholder, values }: SelectBoxProps) {
  const [showList, setShowList] = useState(false);
  const [isRotate, setIsRotate] = useState(false);
  const [inputValue, setInputValue] = useState(''); // user가 선택한 리스트

  const ToggleBox = () => {
    setShowList((prev) => !prev);
    setIsRotate((prev) => !prev);
  };

  const handleClickListItem = (item: string) => {
    setInputValue(item);
    ToggleBox();
  };

  return (
    <>
      {showList && <div onClick={ToggleBox} className="fixed left-0 top-0 z-0 h-full w-full" />}
      <div className="relative">
        <div
          onClick={ToggleBox}
          className="flex cursor-pointer items-center justify-between gap-3 rounded border border-solid border-gray-600 bg-white py-2 pl-4 pr-3"
        >
          <input
            readOnly
            id={id}
            value={inputValue}
            placeholder={placeholder}
            className="flex-1 cursor-pointer leading-[1.6] text-black outline-none placeholder:text-gray-500"
          />
          <Image src={ArrowDown} alt="더보기" className={`duration-500 ${isRotate ? 'rotate-180' : 'rotate-0'}`} />
        </div>
        {showList && (
          <ul className="shadow-medium absolute mt-2 grid w-full gap-[2px] rounded-md bg-white p-2 opacity-100">
            {values?.map((value, idx) => <SelectUl key={idx} value={value} inputValue={inputValue} onClick={handleClickListItem} />)}
          </ul>
        )}
      </div>
    </>
  );
}

export default SelectBox;
