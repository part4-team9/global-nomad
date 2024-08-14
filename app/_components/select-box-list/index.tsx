'use client';

import Image from 'next/image';

import CheckMark from 'public/assets/icons/check-mark.svg';

interface SelectUlProps {
  inputValue?: string;
  onClick: (item: string) => void;
  value?: string;
}

/**
 * select box list item 컴포넌트
 * @value map 돌려서 받은 value
 * @onClick list item 클릭 이벤트, 클릭한 value를 select box 값으로 보여줌
 * @inputValue user가 선택한 리스트 값
 */
function SelectUl({ value, onClick, inputValue }: SelectUlProps) {
  const isSelect = value === inputValue;
  const onClickItem = () => {
    if (value) {
      onClick(value);
    }
  };

  return (
    <li onClick={() => onClickItem()} className={`flex cursor-pointer items-center gap-2 rounded-md p-2 ${isSelect ? 'bg-nomad-black' : 'hover:bg-green-100'}`}>
      <div className="h-5 w-5">{isSelect && <Image src={CheckMark} alt="선택" />}</div>
      <span className={`leading-[1.6] ${isSelect ? 'text-white' : 'text-black'}`}>{value}</span>
    </li>
  );
}

export default SelectUl;
