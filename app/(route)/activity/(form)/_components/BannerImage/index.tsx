'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

import type { Activity, ActivityEdit } from '@/_types/activities/form.types';

import { usePostImage } from '@/_hooks/use-post-image';
import useModalState from '@/_hooks/useModalState';

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
  const { modalState, setModalState, closeModal } = useModalState();

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

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.set(IMAGE_FIELD_NAME, e.target.files?.[0]);
      clearBannerImage();
      activityMutation.mutate(formData);
    }
  };

  return (
    <>
      <CommonModal isOpen={modalState.isOpen} onClose={closeModal}>
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
          accept="image/*"
        />
      </div>
    </>
  );
}

export default BannerImage;