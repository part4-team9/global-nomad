'use client';

import Image from 'next/image';

import useWindowSize from '@/_hooks/useWindowSize';

import { cn } from '@/_utils/classNames';

import CheckMark from 'public/assets/icons/check-mark.svg';

interface SelectUlProps {
  inputValue?: string;
  onClick: (item: string) => void;
  size?: 'default' | 'small';
  value?: string;
}

/**
 * select box list item 컴포넌트
 * @value map 돌려서 받은 value
 * @onClick list item 클릭 이벤트, 클릭한 value를 select box 값으로 보여줌
 * @inputValue user가 선택한 리스트 값
 */
function SelectUl({ value, onClick, inputValue, size = 'default' }: SelectUlProps) {
  const windowSize = useWindowSize();
  const isPC = windowSize > 1023;
  const isSelect = value === inputValue;
  const onClickItem = () => {
    if (value) {
      onClick(value);
    }
  };

  return (
    <li
      onClick={() => onClickItem()}
      className={cn([
        'flex cursor-pointer items-center gap-2 rounded-md p-2',
        size === 'small' && 'justify-center',
        isSelect ? 'bg-nomad-black' : 'hover:bg-green-100',
      ])}
    >
      {isPC && size === 'default' && <div className="h-5 w-5">{isSelect && <Image src={CheckMark} alt="선택" />}</div>}
      <span className={cn(['leading-[1.6]', size === 'small' && 'text-sm tablet:text-base', isSelect ? 'text-white' : 'text-black'])}>{value}</span>
    </li>
  );
}

export default SelectUl;
