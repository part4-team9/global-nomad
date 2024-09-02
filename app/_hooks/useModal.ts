import { useEffect, useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return {
    isOpen,
    isMounted,
    openModal,
    closeModal,
  };
};
