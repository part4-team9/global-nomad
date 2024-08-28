import { useState } from 'react';
import Image from 'next/image';

import Modal from '@/_components/modal';

interface ChangeProfileImageModalProps {
  currentProfileImage: string;
  isOpen: boolean;
  onClose: () => void;
  onImageDelete: () => void;
  onImageUpload: (file: File) => void;
}

export default function ChangeProfileImageModal({ isOpen, onClose, currentProfileImage, onImageUpload, onImageDelete }: ChangeProfileImageModalProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
      onClose();
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    onImageDelete();
    setShowDeleteConfirmation(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="m-auto flex flex-col items-center px-5 py-4 text-right text-[18px] md:w-[450px] md:px-[33px]">
        <div className="flex w-full justify-end">
          <button onClick={onClose} type="button">
            <Image src="/assets/icons/close.svg" alt="close-btn" width={24} height={24} />
          </button>
        </div>

        {!showDeleteConfirmation ? (
          <>
            <h3 className="pb-4 text-center">프로필 이미지 변경</h3>
            <div className="mb-5 size-[160px] overflow-hidden rounded-[50%]">
              <Image src={currentProfileImage} alt="current avatar" width={160} height={160} priority />
            </div>
            <div className="flex w-full content-around items-center justify-between">
              <button type="button" onClick={handleDeleteClick} className="text-base">
                이미지 삭제
              </button>
              <label className="block cursor-pointer">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <span className="rounded bg-green-200 px-4 py-2 text-base text-white">이미지 업로드</span>
              </label>
            </div>
          </>
        ) : (
          <DeleteProfileImage currentProfileImage={currentProfileImage} onConfirm={handleConfirmDelete} onCancel={() => setShowDeleteConfirmation(false)} />
        )}
      </div>
    </Modal>
  );
}

interface DeleteProfileImageProps {
  currentProfileImage: string;
  onCancel: () => void;
  onConfirm: () => void;
}

function DeleteProfileImage({ currentProfileImage, onConfirm, onCancel }: DeleteProfileImageProps) {
  const DEFAULT_IMAGE = '/assets/images/default-profile.png';

  return (
    <>
      <h3 className="text-center font-bold">프로필 이미지 초기화</h3>
      <p className="mb-4 text-center text-sm">정말 초기화 하시겠습니까?</p>
      <div className="mb-5 flex w-full items-center justify-between">
        <div className="size-[160px] overflow-hidden rounded-[50%]">
          <Image src={currentProfileImage} alt="current avatar" width={160} height={160} priority />
        </div>
        <span className="text-2xl">
          <Image src="/assets/icons/arrow-right.svg" width={24} height={24} alt="arrow" />
        </span>
        <div className="size-[160px] overflow-hidden rounded-[50%]">
          <Image src={DEFAULT_IMAGE} alt="default avatar" width={160} height={160} priority />
        </div>
      </div>
      <div className="flex w-full content-around items-center justify-between">
        <button onClick={onCancel} type="button" className="text-base text-gray-600 hover:text-gray-700">
          취소
        </button>
        <button onClick={onConfirm} type="button" className="mr-2 rounded bg-red-400 px-4 py-2 text-base text-white hover:bg-red-500">
          삭제
        </button>
      </div>
    </>
  );
}
