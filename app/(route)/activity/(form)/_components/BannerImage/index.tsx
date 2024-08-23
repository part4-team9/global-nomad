'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import type { Activity, ActivityEdit } from '@/_types/activities/form.types';

import { usePostImage } from '@/_hooks/use-post-image';
import useModalState from '@/_hooks/useModalState';

import CommonModal from '../CommonModal';
import FileInput from '../FileInput';

export interface BannerImageProps<T> {
  setFormData: Dispatch<SetStateAction<T>>;
  value?: string;
}

/**
 * 메인 배너 이미지 업로드 및 form 데이터 업데이트하는 컴포넌트입니다.
 *
 * @param value 체험 수정 페이지에서 이미 default 이미지값이 있는 경우 (이미지 주소)
 * @setFormdata 업로드한 이미지로 formdata 업데이트 (setState 함수)
 */
function BannerImage<T extends Activity | ActivityEdit>({ value, setFormData }: BannerImageProps<T>) {
  const router = useRouter();
  const [bannerImage, setBannerImage] = useState<string[]>(value ? [value] : []);
  const { modalState, setModalState, closeModal } = useModalState();

  const getResponse = (res: string) => {
    setBannerImage([res]);
    setFormData((prev) => ({
      ...prev,
      bannerImageUrl: res,
    }));
  };

  const activityMutation = usePostImage({ router, setModalState, callback: getResponse });

  const onClearBanner = () => {
    setBannerImage([]);
    setFormData((prev) => ({
      ...prev,
      bannerImageUrl: '',
    }));
  };

  const onChangeBanner = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBannerImage([]);
      const json = new FormData();
      json.set('image', e.target.files?.[0]);
      activityMutation.mutate(json);
    }
  };

  useEffect(() => {
    if (value) {
      setBannerImage([value]);
    }
  }, [value]);

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
          images={bannerImage}
          onClear={onClearBanner}
          onChange={onChangeBanner}
          accept="image/*"
        />
      </div>
    </>
  );
}

export default BannerImage;
