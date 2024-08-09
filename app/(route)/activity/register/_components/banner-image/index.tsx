'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ActivityEdit } from '@/(route)/activity/edit/[id]/page';

import { usePostImage } from '@/_hooks/use-post-image';

import type { Activity } from '../../page';
import CommonModal from '../common-modal';
import FileInput from '../file-input';

export interface BannerImageProps<T> {
  setFormData: Dispatch<SetStateAction<T>>;
  value?: string;
}

/**
 * 메인 배너 이미지 업로드 및 form 데이터 업데이트하는 컴포넌트입니다.
 * @param value 체험 수정 페이지에서 이미 default 이미지값이 있는 경우 (이미지 주소)
 * @setFormdata 업로드한 이미지로 formdata 업데이트 (setState 함수)
 */
function BannerImage<T extends Activity | ActivityEdit>({ value, setFormData }: BannerImageProps<T>) {
  const router = useRouter();
  const [bannerImage, setBannerImage] = useState<string[]>([]);
  const [modalState, setModalState] = useState({
    isOpen: false,
    message: '',
    onClose: () => {},
  });

  const closeModal = () => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
    }));
    modalState.onClose();
  };

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
        <label htmlFor="banner" className="w-fit text-[20px] font-bold leading-[1.3] tablet:text-xl tablet:leading-[1.1]">
          배너 이미지
        </label>
        <FileInput id="banner" images={bannerImage} onClear={onClearBanner} onChange={onChangeBanner} accept="image/*" />
      </div>
    </>
  );
}

export default BannerImage;
