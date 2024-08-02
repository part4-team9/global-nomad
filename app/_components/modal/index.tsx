'use client';

import { type ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { useModal } from '@/_hooks/useModal';

export type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  size?: string;
};

/**
 * 사용법
 * ex)
 * const { isOpen, openModal, closeModal } = useModal();
 * 
 *  <button onClick={openModal}>Open Modal</button>
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className="m-auto px-[90px] pb-[28px] pt-[26px] text-right text-[18px] md:w-[540px] md:px-[33px]">
        <p className="pb-[43px] pt-[53px] text-center">가입이 완료되었습니다!</p>
        <span className="flex justify-center md:justify-end">
          <button className="h-[42px] w-[138px] rounded-[8px] bg-black text-white">확인</button> // 버튼 컴포넌트 넣어주시면 될 것 같습니다!
          <button onClick={closeModal}>취소</button> // 버튼 컴포넌트 넣어주시면 될 것 같습니다!
        </span>
      </div>
    </Modal>
 */

/**
 * Modal 컴포넌트의 props
 *
 * @property {boolean} isOpen - Modal Open 여부
 * @property {() => void} onClose - Modal Close 함수
 * @property {ReactNode} children - Modal 자식 요소들
 * @property {string} size - Modal Size (default: 기본 modal, full: 풀 사이즈 modal(mobile))
 */

export default function Modal({ isOpen, onClose, size = 'default', children }: ModalProps) {
  const { isMounted } = useModal();
  let defaultClass = '';
  let fullClass = '';

  switch (size) {
    case 'full':
      defaultClass = '';
      fullClass = 'w-full h-full rounded-none mobile:w-auto mobile:h-auto mobile:rounded-xl';
      break;
    default:
      defaultClass = 'px-6';
      break;
  }

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // 배경 클릭 시 모달 닫기
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen || !isMounted) return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-70 ${defaultClass}`}
      onClick={handleBackgroundClick}
      onKeyDown={handleKeyDown}
    >
      <div className={`relative rounded-[12px] bg-white shadow-lg ${fullClass}`}>{children}</div>
    </div>,
    document.getElementById('modal-root') as HTMLElement,
  );
}
