'use client';

import { useEffect, useState } from 'react';

import Modal from '@/_components/modal';
import SelectBox from '@/_components/select-box';

import CardApprove from '../CardApprove';
import CardPending from '../CardPending';
import CardRejected from '../CardRejected';

type RegisterStatusModalProps = {
  date: Date;
  isOpen: boolean;
  onClose: () => void;
  activityId?: number;
};

const values = ['2시', '3시', '4시'];

function RegisterStatusModal({ isOpen, onClose, date, activityId }: RegisterStatusModalProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const handleClick = (index: number) => {
    setActiveIndex(index);
  };
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(0);
    }
  }, [isOpen]);

  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <header className="flex justify-between">
          <h2>예약 정보</h2>
          <p className="tex cursor-pointer text-3xl" onClick={onClose}>
            ×
          </p>
        </header>
        <ul className="mt-[27px] flex h-[43px] border-b-2">
          {['신청 2', '승인 0', '거절 0'].map((label, index) => (
            <li
              key={index}
              className={`cursor-pointer px-[10px] pb-[13px] text-xl font-semibold ${activeIndex === index ? 'border-b-4 border-green-200 text-green-200' : ''}`}
              onClick={() => handleClick(index)}
            >
              {label}
            </li>
          ))}
        </ul>
        <h3 className="mb-[14px] mt-[25px]">예약 날짜</h3>
        <p className="mb-[10px]">{formattedDate}</p>
        <SelectBox values={values} />
        <h3 className="mt-8">예약 내역</h3>
        {activeIndex === 0 && <CardPending />}
        {activeIndex === 1 && <CardApprove />}
        {activeIndex === 2 && <CardRejected />}
      </div>
    </Modal>
  );
}

export default RegisterStatusModal;
