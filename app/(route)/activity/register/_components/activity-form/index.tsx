'use client';

import { useEffect, useState } from 'react';
import AddressModal from '@/(route)/activity/register/_components/address-modal';

import ACTIVITY_CATEGORY from '@/_constants/activity-category';

import Button from '@/_components/button';
import Input from '@/_components/input';
import SelectBox from '@/_components/select-box';
import Textarea from '@/_components/textarea';

import type { Activity } from '../../page';
import BannerImage from '../banner-image';
import IntroduceImage from '../introduce-image';
import ScheduleEditor from '../schedule-editor';
import SchedulePicker from '../schedule-picker';

interface ActivityFormProps {
  buttonTitle: string;
  title: string;
}

function ActivityForm({ title, buttonTitle }: ActivityFormProps) {
  const [addressModalState, setAddressModalState] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);
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

  const handleAddressModal = () => {
    setAddressModalState((prev) => !prev);
  };

  /**
   * 카테고리, 주소 선택 다루는 함수
   */
  const handleSelectChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    const { address, bannerImageUrl, category, description, price, schedules: formSchedules, title: formTitle } = formData;
    // 버튼 disable 조건
    const isDisabled =
      address === '' || bannerImageUrl === '' || category === '' || description === '' || price === '' || formSchedules.length === 0 || formTitle === '';
    setButtonDisable(isDisabled);
    // console.log(formData, 'form');
  }, [formData]);

  return (
    <form className="grid gap-6">
      <div className="flex justify-between">
        <h2 className="leading-1.3 text-3xl font-bold">{title}</h2>
        <Button type="submit" variant="black" disabled={buttonDisable} className="w-[120px]">
          {buttonTitle}
        </Button>
      </div>
      <div className="grid gap-6">
        <Input id="title" placeholder="제목" value={formData.title} onChange={handleChangeInput} />
        <SelectBox keyName="category" value={formData.category} values={ACTIVITY_CATEGORY} placeholder="카테고리" onSelect={handleSelectChange} />
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
          <Input readOnly id="address" placeholder="주소를 입력해주세요" onClick={handleAddressModal} value={formData.address} />
          <AddressModal isOpen={addressModalState} onClose={handleAddressModal} onComplete={handleSelectChange} />
        </div>
        <div className="grid gap-4">
          <label htmlFor="date" className="w-fit text-xl font-bold">
            예약 가능한 시간대
          </label>
          <SchedulePicker scheduleArray={formData.schedules} setFormData={setFormData} />

          {formData.schedules.length > 0 && (
            <div className="grid gap-5 border-t border-solid border-gray-200 pt-5">
              {formData.schedules.map((s, index) => (
                <ScheduleEditor key={index} schedule={s} scheduleArray={formData.schedules} setFormData={setFormData} />
              ))}
            </div>
          )}
        </div>
        <BannerImage setFormData={setFormData} />
        <IntroduceImage setFormData={setFormData} />
      </div>
    </form>
  );
}

export default ActivityForm;