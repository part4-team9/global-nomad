/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect, useState } from 'react';

import type { AddImageProps } from '../banner-image';
import FileInput from '../file-input';

function IntroduceImage({ setFormData }: AddImageProps) {
  const [subImages, setSubImages] = useState<string[]>([]);
  const [subImgDisable, setSubImgDisable] = useState(false);

  const handleSubImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      /**
       * @TODO api 체험 이미지 url 생성 필요
       */
      const imageUrl = URL.createObjectURL(e.target.files?.[0]);
      setSubImages((prev) => [...prev, imageUrl]);
    }
  };

  const clearSubImage = (image: string) => {
    setSubImages((prev) => prev.filter((img) => img !== image));
  };

  useEffect(() => {
    setSubImgDisable(subImages.length >= 4);

    setFormData((prev) => ({
      ...prev,
      subImageUrls: subImages,
    }));
  }, [subImages]);

  return (
    <div className="grid gap-4">
      <label htmlFor="sub" className="w-fit text-xl font-bold">
        소개 이미지
      </label>
      <FileInput id="sub" disabled={subImgDisable} images={subImages} onClear={clearSubImage} onChange={handleSubImages} accept="image/*" />
      <span className="text-lg leading-[1.4] text-gray-700">*이미지는 최대 4개까지 등록 가능합니다.</span>
    </div>
  );
}

export default IntroduceImage;
