'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import postImage from '@/_apis/activities/postImage';
import { useMutation } from '@tanstack/react-query';

import type { Activity } from '../../page';
import CommonModal from '../common-modal';
import FileInput from '../file-input';

export interface BannerImageProps {
  setFormData: Dispatch<SetStateAction<Activity>>;
  value?: string;
}

function BannerImage({ value, setFormData }: BannerImageProps) {
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

  const activityMutation = useMutation({
    mutationFn: postImage,
    onError: (error) => {
      if (typeof error === 'number') {
        if (error === 401) {
          setModalState({
            isOpen: true,
            message: '로그인이 필요한 서비스입니다.',
            onClose: () => {
              router.push('/login');
            },
          });
        } else {
          setModalState({
            isOpen: true,
            message: '죄송합니다. 이미지 등록에 실패했습니다.',
            onClose: () => {},
          });
        }
      }
    },
  });

  const onClearBanner = () => {
    setBannerImage([]);
    setFormData((prev) => ({
      ...prev,
      bannerImageUrl: '',
    }));
  };

  const onChangeBanner = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      /**
       * @TODO api 체험 이미지 url로 변경 필요
       */
      activityMutation.mutate(e.target.files?.[0]);
      const imageUrl = URL.createObjectURL(e.target.files?.[0]);
      setBannerImage([imageUrl]);
      setFormData((prev) => ({
        ...prev,
        bannerImageUrl: imageUrl,
      }));
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
