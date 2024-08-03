'use client';

import { forwardRef, useEffect, useState } from 'react';
import Image from 'next/image';

import SelectUl from '../select-box-list';

import ArrowDown from 'public/assets/icons/arrow-down.svg';

interface SelectBoxProps {
  className?: string;
  error?: boolean;
  errorMessage?: string;
  head?: string;
  id?: string;
  keyName: string;
  onSelect?: (key: string, value: string) => void;
  placeholder?: string;
  size?: 'default' | 'small';
  value?: string;
  values: string[];
}

/**
 * Select Box 공통 컴포넌트
 * @param value input value 값
 * @param keyName key값 (선택한 value와 함께 key값 전달 위함)
 * @param placeholder select box placeholder
 * @param values select box 리스트에 들어갈 string 배열 (map 돌려서 보여줌)
 * @param head legend에 보여줄 텍스트
 * @param error 값이 true일 경우 error 스타일 활성화 아니라면 false (기본값 false 설정 필요)
 * @param errorMessage input 밑에 보여줄 에러 메세지
 * @param onSelect 셀렉트박스 선택시 data 업데이트 함수 (react hook form)
 * @param className fieldset에 덮어쓸 className
 * @param size select box size (모바일에서 작아지면 small)
 */
export default forwardRef(function SelectBox(
  { value, keyName, id, placeholder, values, head, error, errorMessage, onSelect, className, size = 'default', ...rest }: SelectBoxProps,
  ref: React.LegacyRef<HTMLInputElement>,
) {
  const [showList, setShowList] = useState(false);
  const [fade, setFade] = useState(false);
  const [inputValue, setInputValue] = useState(value); // user가 선택한 리스트

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
      onSelect(keyName, item);
    }
    closeSelectBox();
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <>
      {showList && <div onClick={closeSelectBox} className="fixed left-0 top-0 z-0 h-full w-full" />}
      <div className="relative">
        <fieldset
          onClick={showList ? closeSelectBox : openSelectBox}
          className={`${size === 'small' ? 'py-2 pl-3 pr-[6px] tablet:py-[15px] tablet:pl-4 tablet:pr-3' : 'py-[15px] pl-4 pr-3'} cursor-pointer rounded border border-solid bg-white ${head && 'pt-[5px]'} ${inputStatusClass} ${className}`}
        >
          {head && <legend className="px-1 text-sm">{head}</legend>}
          <div className="flex items-center justify-between gap-[5px]">
            <input
              readOnly
              id={id}
              value={inputValue}
              placeholder={placeholder}
              ref={ref}
              {...rest}
              className={`w-full flex-1 cursor-pointer text-black outline-none placeholder:text-gray-500 ${size === 'small' ? 'text-sm leading-[1.8] tablet:text-base tablet:leading-[1.6]' : 'leading-[1.6]'}`}
            />
            <div className={`${size === 'small' ? 'w-[20.5px] tablet:w-6' : 'w-6'}`}>
              <Image src={ArrowDown} alt="더보기" className={`duration-500 ${fade ? 'rotate-180' : 'rotate-0'}`} />
            </div>
          </div>
        </fieldset>
        {error && errorMessage && <span className="mt-2 block pl-2 text-xs leading-[1.3] text-red-500">{errorMessage}</span>}
        {showList && (
          <ul
            className={`absolute z-10 mt-2 grid h-[300px] w-full gap-[2px] overflow-y-scroll rounded-md bg-white p-2 opacity-100 shadow-medium ${fade ? 'animate-fade-in' : 'animate-fade-out'}`}
          >
            {values?.map((v, idx) => <SelectUl key={idx} value={v} size={size} inputValue={inputValue} onClick={handleClickListItem} />)}
          </ul>
        )}
      </div>
    </>
  );
});
