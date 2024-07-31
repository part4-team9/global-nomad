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
  const [bannerImage, setBannerImage] = useState<string[]>([]);
  const [formData, setFormData] = useState<Activity>({
    address: '',
    bannerImageUrl: '',
    category: '',
    description: '',
    price: undefined,
    schedules: [],
    subImageUrls: [],
    title: '',
  });

  const handleModalState = () => {
    setModalState((prev) => !prev);
  };

  const clearBannerImage = () => {
    setBannerImage([]);
  };

  const handleAddressComplete = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: value,
    }));
  };

  const handleChangeBanner = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageUrl = URL.createObjectURL(e.target.files?.[0]);
      setBannerImage([imageUrl]);
    }
  };

  useEffect(() => {
    const { address, bannerImageUrl, category, description, price, schedules, title: formTitle } = formData;
    const isDisabled =
      address !== '' &&
      bannerImageUrl !== '' &&
      category !== '' &&
      description !== '' &&
      price !== undefined &&
      price >= 0 &&
      schedules.length > 0 &&
      formTitle !== '';
    setButtonDisable(isDisabled);
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
        <Input
          placeholder="제목"
          value={formData.title}
          onChange={() => {
            console.log('ls');
          }}
        />
        <SelectBox values={ACTIVITY_CATEGORY} placeholder="카테고리" />
        <Textarea size="big" placeholder="설명" />
        <div className="grid gap-4">
          <label htmlFor="price" className="w-fit text-xl font-bold">
            가격
          </label>
          <Input
            id="price"
            type="number"
            placeholder="가격"
            value={formData.price}
            onChange={() => {
              console.log('ls');
            }}
          />
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
          <FileInput images={bannerImage} onClear={clearBannerImage} onChange={handleChangeBanner} accept="image/*" />
        </div>
      </div>
    </form>
  );
}

export default ActivityForm;
