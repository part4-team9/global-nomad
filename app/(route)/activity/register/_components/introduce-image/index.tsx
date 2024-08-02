/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect, useState } from 'react';

import type { AddImageProps } from '../banner-image';
import CommonModal from '../common-modal';
import FileInput from '../file-input';

function IntroduceImage({ setFormData }: AddImageProps) {
  const [subImages, setSubImages] = useState<string[]>([]);
  const [subImgDisable, setSubImgDisable] = useState(false);
  const [modalState, setModalState] = useState(false);

  const clearSubImage = (image: string) => {
    setSubImages((prev) => prev.filter((img) => img !== image));
  };

  const handleModalState = () => {
    setModalState((prev) => !prev);
  };

  const handleSubImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imageLength = e.target.files.length + subImages.length;

      if (imageLength > 4) {
        handleModalState();
      } else {
        /**
         * @TODO api 체험 이미지 url 생성 필요
         */
        const filesArray = Array.from(e.target.files);

        filesArray.forEach((file) => {
          const imageUrl = URL.createObjectURL(file);
          setSubImages((prev) => [...prev, imageUrl]);
        });
      }
    }
  };

  useEffect(() => {
    setSubImgDisable(subImages.length >= 4);

    setFormData((prev) => ({
      ...prev,
      subImageUrls: subImages,
    }));
  }, [subImages]);

  return (
    <div className="grid gap-6">
      <label htmlFor="sub" className="w-fit text-[20px] font-bold leading-[1.3] tablet:text-xl tablet:leading-[1.1]">
        소개 이미지
      </label>
      <FileInput id="sub" disabled={subImgDisable} images={subImages} onClear={clearSubImage} onChange={handleSubImages} accept="image/*" multiple />
      <span className="break-keep pl-2 text-lg leading-[1.4] text-gray-700">*이미지는 최대 4개까지 등록 가능합니다.</span>
      <CommonModal isOpen={modalState} onClose={handleModalState}>
        이미지는 최대 4개 첨부 가능합니다.
      </CommonModal>
    </div>
  );
}

export default IntroduceImage;
