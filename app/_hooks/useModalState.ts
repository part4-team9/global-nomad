'use client';

import { useState } from 'react';

/**
 * useModalState
 *
 * 이 커스텀 훅은 모달의 열림/닫힘 상태와 모달에 표시할 메시지를 관리합니다.
 * 또한, 모달이 닫힐 때 호출되는 콜백 함수를 설정할 수 있습니다.
 *
 * @returns {object} modalState - 모달의 현재 상태를 포함하는 객체입니다.
 * @returns {boolean} modalState.isOpen - 모달이 열려 있는지 여부를 나타내는 상태입니다.
 * @returns {string} modalState.message - 모달에 표시할 메시지입니다.
 * @returns {Function} modalState.onClose - 모달이 닫힐 때 실행되는 콜백 함수입니다.
 *
 * @returns {Function} setModalState - 모달 상태를 직접 설정할 수 있는 함수입니다.
 * @returns {Function} openModal - 모달을 열고 `isOpen` 상태를 true로 변경하는 함수입니다.
 * @returns {Function} activeCloseModal - 모달을 닫고 `isOpen` 상태를 false로 변경하는 함수입니다.
 * @returns {Function} activeCloseModal - 모달을 닫고 `isOpen` 상태를 false로 변경하며, `onClose` 콜백 함수를 실행하는 함수입니다.
 */

const useModalState = () => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    message: '',
    onClose: () => {},
  });

  const openModal = () => {
    setModalState((prev) => ({
      ...prev,
      isOpen: true,
    }));
  };

  const closeModal = () => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const activeCloseModal = () => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
    }));
    modalState.onClose();
  };

  return { modalState, setModalState, openModal, closeModal, activeCloseModal };
};

export default useModalState;
