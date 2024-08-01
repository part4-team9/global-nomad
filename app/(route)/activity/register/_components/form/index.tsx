'use client';

import { useEffect, useState } from 'react';

import ACTIVITY_CATEGORY from '@/_constants/activity-category';

import AddressModal from '@/_components/address-modal';
import CalendarWrapper from '@/_components/calendar-picker';
import FileInput from '@/_components/file-input';
import Input from '@/_components/input';
import SelectBox from '@/_components/select-box';
import Textarea from '@/_components/textarea';

import type { Activity } from '../../page';

interface ActivityFormProps {
  buttonTitle: string;
  title: string;
}

function ActivityForm({ title, buttonTitle }: ActivityFormProps) {
  const [modalState, setModalState] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [subImgDisable, setSubImgDisable] = useState(false);
  const [bannerImage, setBannerImage] = useState<string[]>([]);
  const [subImages, setSubImages] = useState<string[]>([]);
  const [formData, setFormData] = useState<Activity>({
    address: '',
    bannerImageUrl: '',
    category: '',
    description: '',
    price: '',
    schedules: [],
    subImageUrls: [],
    title: '',
  });

  const handleModalState = () => {
    setModalState((prev) => !prev);
  };

  /**
   * @TODO 이 두 함수 합칠 수 있을 듯!
   */
  const handleSelectCategory = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleAddressComplete = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: value,
    }));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      /**
       * @TODO api 체험 이미지 url 생성 필요
       */
      const imageUrl = URL.createObjectURL(e.target.files?.[0]);
      setSubImages((prev) => [...prev, imageUrl]);
    }
  };

  const handleChangeBanner = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      /**
       * @TODO api 체험 이미지 url 생성 필요
       */
      const imageUrl = URL.createObjectURL(e.target.files?.[0]);
      setFormData((prev) => ({
        ...prev,
        bannerImageUrl: imageUrl,
      }));
      setBannerImage([imageUrl]);
    }
  };

  const clearBannerImage = () => {
    setBannerImage([]);
    setFormData((prev) => ({
      ...prev,
      bannerImageUrl: '',
    }));
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

  useEffect(() => {
    const { address, bannerImageUrl, category, description, price, schedules, title: formTitle } = formData;
    // 버튼 disable 조건
    const isDisabled =
      address === '' || bannerImageUrl === '' || category === '' || description === '' || price === '' || schedules.length > 0 || formTitle === '';
    setButtonDisable(isDisabled);
    console.log(formData, 'form');
  }, [formData]);

  return (
    <form className="grid gap-6">
      <div className="flex justify-between">
        <h2 className="leading-1.3 text-3xl font-bold">{title}</h2>
        <button type="submit" disabled={buttonDisable}>
          {buttonTitle}
        </button>
      </div>
      <div className="grid gap-6">
        <Input id="title" placeholder="제목" value={formData.title} onChange={handleChangeInput} />
        <SelectBox values={ACTIVITY_CATEGORY} placeholder="카테고리" onSelect={handleSelectCategory} />
        <Textarea id="description" size="big" placeholder="설명" onChange={handleChangeInput} />
        <div className="grid gap-4">
          <label htmlFor="price" className="w-fit text-xl font-bold">
            가격
          </label>
          <Input id="price" type="number" placeholder="가격" value={formData.price} onChange={handleChangeInput} />
        </div>
        <div className="grid gap-4">
          <label htmlFor="address" className="w-fit text-xl font-bold">
            주소
          </label>
          <Input readOnly id="address" placeholder="주소를 입력해주세요" onClick={handleModalState} value={formData.address} />
          <AddressModal isOpen={modalState} onClose={handleModalState} onComplete={handleAddressComplete} />
        </div>
        {/* <div className="grid gap-4">
          <label htmlFor="date" className="text-xl font-bold">
            예약 가능한 시간대
          </label>
          <CalendarWrapper />
        </div> */}
        <div className="grid gap-4">
          <label htmlFor="banner" className="w-fit text-xl font-bold">
            배너 이미지
          </label>
          <FileInput id="banner" images={bannerImage} onClear={clearBannerImage} onChange={handleChangeBanner} accept="image/*" />
        </div>
        <div className="grid gap-4">
          <label htmlFor="sub" className="w-fit text-xl font-bold">
            소개 이미지
          </label>
          <FileInput id="sub" disabled={subImgDisable} images={subImages} onClear={clearSubImage} onChange={handleSubImages} accept="image/*" />
          <span className="text-lg leading-[1.4] text-gray-700">*이미지는 최대 4개까지 등록 가능합니다.</span>
        </div>
      </div>
    </form>
  );
}

export default ActivityForm;
