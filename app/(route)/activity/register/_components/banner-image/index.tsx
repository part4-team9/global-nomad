'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

import type { Activity } from '../../page';
import FileInput from '../file-input';

export interface AddImageProps {
  setFormData: Dispatch<SetStateAction<Activity>>;
}

function BannerImage({ setFormData }: AddImageProps) {
  const [bannerImage, setBannerImage] = useState<string[]>([]);

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
       * @TODO api 체험 이미지 url 생성 필요
       */
      const imageUrl = URL.createObjectURL(e.target.files?.[0]);
      setBannerImage([imageUrl]);
      setFormData((prev) => ({
        ...prev,
        bannerImageUrl: imageUrl,
      }));
    }
  };

  return (
    <div className="grid gap-4">
      <label htmlFor="banner" className="w-fit text-xl font-bold">
        배너 이미지
      </label>
      <FileInput id="banner" images={bannerImage} onClear={onClearBanner} onChange={onChangeBanner} accept="image/*" />
    </div>
  );
}

export default BannerImage;
