import type { Dispatch, SetStateAction } from 'react';

import { addCommasToPrice, removeCommas } from '@/_utils/formatNumber';

const priceList = [
  {
    text: '🎉 무료체험',
    price: 0,
  },
  {
    text: '+ 100만원',
    price: 1000000,
  },
  {
    text: '+ 10만원',
    price: 100000,
  },
  {
    text: '+ 1만원',
    price: 10000,
  },
];

interface PriceButtonsProps {
  setPriceFormat: Dispatch<SetStateAction<string>>;
}

function PriceButtons({ setPriceFormat }: PriceButtonsProps) {
  const handleClickPrice = (price: number) => {
    if (price === 0) {
      setPriceFormat(String(0));
    } else {
      setPriceFormat((prev) => addCommasToPrice(String(removeCommas(prev) + price)));
    }
  };

  return (
    <div className="ml-auto flex gap-2">
      {priceList.map((data) => (
        <button type="button" key={data.price} onClick={() => handleClickPrice(data.price)} className="rounded px-2 py-[2px] text-sm font-medium shadow-md">
          {data.text}
        </button>
      ))}
    </div>
  );
}

export default PriceButtons;
