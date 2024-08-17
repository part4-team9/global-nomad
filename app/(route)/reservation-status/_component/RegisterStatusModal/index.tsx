'use client';

import Modal from '@/_components/modal';
import SelectBox from '@/_components/select-box';
import CardPending from '../CardPending';
import CardApprove from '../CardApprove';
import CardRejected from '../CardRejected';
import { useState } from 'react';

type RegisterStatusModalProps = {
  isOpen: boolean;
  message: string;
  onClose: () => void;
};

const values = ['2시', '3시', '4시'];

function RegisterStatusModal({ isOpen, onClose, message }: RegisterStatusModalProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <header className="flex justify-between">
          <h2>예약 정보</h2>
          <p className="tex cursor-pointer text-3xl" onClick={onClose}>
            ×
          </p>
        </header>
        <ul className="flex border-b-2 text-l">
          {['신청 2', '승인 0', '거절 0'].map((label, index) => (
            <li
              key={index}
              className={`cursor-pointer px-[10px] py-[13px] ${activeIndex === index ? 'text-green-500 border-b-4 border-green-500' : ''}`}
              onClick={() => handleClick(index)}
            >
              {label}
            </li>
          ))}
        </ul>
        <h3 className="mb-[14px] mt-[25px]">예약 날짜</h3>
        <p>2023년 2월 10일</p>
        <SelectBox values={values} />
        <h3 className="mt-8">예약 내역</h3>
        <CardPending />
        <CardApprove />
        <CardRejected />
      </div>
    </Modal>
  );
}

export default RegisterStatusModal;
