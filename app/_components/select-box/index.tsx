'use client';

import { forwardRef, useState } from 'react';
import Image from 'next/image';

import SelectUl from '../select-box-list';

import ArrowDown from 'public/assets/icons/arrow-down.svg';

interface SelectBoxProps {
  error?: boolean;
  errorMessage?: string;
  head?: string;
  id?: string;
  onSelect?: (value: string) => void;
  placeholder?: string;
  values: string[];
}

/**
 * Select Box 공통 컴포넌트
 * @param placeholder select box placeholder
 * @param values select box 리스트에 들어갈 string 배열 (map 돌려서 보여줌)
 * @param head legend에 보여줄 텍스트
 * @param error 값이 true일 경우 error 스타일 활성화 아니라면 false (기본값 false 설정 필요)
 * @param errorMessage input 밑에 보여줄 에러 메세지
 * @param onSelect 셀렉트박스 선택시 data 업데이트 함수 (react hook form)
 */
export default forwardRef(function SelectBox(
  { id, placeholder, values, head, error, errorMessage, onSelect, ...rest }: SelectBoxProps,
  ref: React.LegacyRef<HTMLInputElement>,
) {
  const [showList, setShowList] = useState(false);
  const [fade, setFade] = useState(false);
  const [inputValue, setInputValue] = useState(''); // user가 선택한 리스트

  // 유효성 체크 여부에 따른 border style 변경
  const inputStatusClass = error ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-green-200';

  const openSelectBox = () => {
    setShowList(true);
    setFade(true);
  };

  const closeSelectBox = () => {
    setFade(false);

    setTimeout(() => {
      setShowList(false);
    }, 350);
  };

  const handleClickListItem = (item: string) => {
    setInputValue(item);
    if (onSelect) {
      onSelect(item);
    }
    closeSelectBox();
  };

  return (
    <>
      {showList && <div onClick={showList ? closeSelectBox : openSelectBox} className="fixed left-0 top-0 z-0 h-full w-full" />}
      <div className="relative">
        <fieldset
          onClick={showList ? closeSelectBox : openSelectBox}
          className={`cursor-pointer rounded border border-solid bg-white pb-[15px] ${head ? 'pt-[5px]' : 'pt-[15px]'} pl-4 pr-3 ${inputStatusClass}`}
        >
          {head && <legend className="px-1 text-sm">{head}</legend>}
          <div className="flex items-center justify-between gap-3">
            <input
              readOnly
              id={id}
              value={inputValue}
              placeholder={placeholder}
              ref={ref}
              {...rest}
              className="flex-1 cursor-pointer leading-[1.6] text-black outline-none placeholder:text-gray-500"
            />
            <Image src={ArrowDown} alt="더보기" className={`duration-500 ${fade ? 'rotate-180' : 'rotate-0'}`} />
          </div>
        </fieldset>
        {error && errorMessage && <span className="mt-2 pl-2 text-xs leading-[1.3] text-red-500">{errorMessage}</span>}
        {showList && (
          <ul
            className={`absolute z-10 mt-2 grid w-full gap-[2px] rounded-md bg-white p-2 opacity-100 shadow-medium ${fade ? 'animate-fade-in' : 'animate-fade-out'}`}
          >
            {values?.map((value, idx) => <SelectUl key={idx} value={value} inputValue={inputValue} onClick={handleClickListItem} />)}
          </ul>
        )}
      </div>
    </>
  );
});
