'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

import type { Activity, ActivityEdit } from '@/_types/activities/form.types';

import useModalState from '@/_hooks/useModalState';
import { usePostImage } from '@/_hooks/usePostImage';

import CommonModal from '../CommonModal';
import FileInput from '../FileInput';

export interface BannerImageProps<T> {
  setFormData: Dispatch<SetStateAction<T>>;
  value?: string[];
}

/**
 * 메인 배너 이미지 업로드 및 폼 데이터 업데이트를 처리하는 컴포넌트입니다.
 *
 * @param {string[]} value - 체험 수정 페이지에서 기본 이미지 URL 값 (선택 사항)
 * @param {Dispatch<SetStateAction<T>>} setFormData - 업로드한 이미지로 폼 데이터를 업데이트하는 함수
 */
function BannerImage<T extends Activity | ActivityEdit>({ value, setFormData }: BannerImageProps<T>) {
  const router = useRouter();
  const { modalState, setModalState, activeCloseModal } = useModalState();

  const IMAGE_FIELD_NAME = 'image';

  const getResponse = (res: string) => {
    setFormData((prev) => ({
      ...prev,
      bannerImageUrl: res,
    }));
  };

  const activityMutation = usePostImage({ router, setModalState, callback: getResponse });

  const clearBannerImage = () => {
    setFormData((prev) => ({
      ...prev,
      bannerImageUrl: '',
    }));
  };

  const handleBannerUpload = (file: File) => {
    const formData = new FormData();
    formData.set(IMAGE_FIELD_NAME, file);
    clearBannerImage();
    activityMutation.mutate(formData);
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleBannerUpload(e.target.files?.[0]);
    }
  };

  const handleDropImage: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleBannerUpload(e.dataTransfer.files?.[0]);
    }
  };

  return (
    <>
      <CommonModal isOpen={modalState.isOpen} activeCloseModal={activeCloseModal}>
        {modalState.message}
      </CommonModal>
      <div className="grid gap-6">
        <label htmlFor="banner" className="w-fit text-xl font-bold leading-[1.3] tablet:text-2xl tablet:leading-[1.1]">
          배너 이미지
        </label>
        <FileInput
          id="banner"
          count={1}
          isPending={activityMutation.isPending}
          images={value}
          onClear={clearBannerImage}
          onChange={handleBannerChange}
          onDrop={handleDropImage}
        />
      </div>
    </>
  );
}

export default BannerImage;
