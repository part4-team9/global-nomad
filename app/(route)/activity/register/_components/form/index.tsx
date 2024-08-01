'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';

import ACTIVITY_CATEGORY from '@/_constants/activity-category';

import { generateTimeArray } from '@/_utils/generateTimeArray';

import AddressModal from '@/_components/address-modal';
import Button from '@/_components/button';
import CalendarWrapper from '@/_components/calendar-picker';
import FileInput from '@/_components/file-input';
import Input from '@/_components/input';
import SelectBox from '@/_components/select-box';
import Textarea from '@/_components/textarea';

import type { Activity, Schedule } from '../../page';

import DeleteIcon from 'public/assets/icons/btn-minus.svg';
import AddIcon from 'public/assets/icons/btn-plus.svg';

interface ActivityFormProps {
  buttonTitle: string;
  title: string;
}

function ActivityForm({ title, buttonTitle }: ActivityFormProps) {
  const timeArray = generateTimeArray();
  const [addressModalState, setAddressModalState] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [addButtonDisable, setAddButtonDisable] = useState(true);
  const [subImgDisable, setSubImgDisable] = useState(false);
  const [bannerImage, setBannerImage] = useState<string[]>([]);
  const [subImages, setSubImages] = useState<string[]>([]);
  const [scheduleData, setScheduleData] = useState<Schedule>({
    date: '',
    startTime: '',
    endTime: '',
  });
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

  const handleScheduleChange = (key: string, value: string | Date) => {
    let formattedValue = value;

    if (key === 'date') {
      formattedValue = dayjs(value).format('YYYY-MM-DD');
    }
    setScheduleData((prev) => ({
      ...prev,
      [key]: formattedValue,
    }));
  };

  const addSchedule = () => {
    setFormData((prev) => ({
      ...prev,
      schedules: [...prev.schedules, scheduleData],
    }));
    setScheduleData({
      date: '',
      startTime: '',
      endTime: '',
    });
  };

  const deleteSchedule = (schedule: Schedule) => {
    const { schedules: scheduleArray } = formData;
    const updatedArray = scheduleArray.filter((s) => JSON.stringify(s) !== JSON.stringify(schedule));
    setFormData((prev) => ({
      ...prev,
      schedules: updatedArray,
    }));
  };

  useEffect(() => {
    const { date, startTime, endTime } = scheduleData;
    const isDisable = date === '' || startTime === '' || endTime === '';
    const { schedules: scheduleArray } = formData;

    const isSame = scheduleArray.some((arr) => JSON.stringify(arr) === JSON.stringify(scheduleData));

    if (!isDisable) {
      console.log(scheduleData);
    }
    setAddButtonDisable(isDisable || isSame);
  }, [scheduleData]);

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
    const { address, bannerImageUrl, category, description, price, schedules: formSchedules, title: formTitle } = formData;
    // 버튼 disable 조건
    const isDisabled =
      address === '' || bannerImageUrl === '' || category === '' || description === '' || price === '' || formSchedules.length === 0 || formTitle === '';
    setButtonDisable(isDisabled);
    console.log(formData, 'form');
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
          <Input readOnly id="address" placeholder="주소를 입력해주세요" onClick={handleModalState} value={formData.address} />
          <AddressModal isOpen={addressModalState} onClose={handleModalState} onComplete={handleSelectChange} />
        </div>
        <div className="grid gap-4">
          <label htmlFor="date" className="w-fit text-xl font-bold">
            예약 가능한 시간대
          </label>
          <div className="flex items-center gap-5">
            <CalendarWrapper onChange={handleScheduleChange} value={scheduleData.date} />
            <div className="flex items-center gap-3">
              <SelectBox
                value={scheduleData.startTime}
                keyName="startTime"
                values={timeArray}
                placeholder="HH:MM"
                onSelect={handleScheduleChange}
                className="max-w-[140px] py-[15px] pl-4 pr-3"
              />
              <span className="text-[20px] font-bold leading-[1.3]">~</span>
              <SelectBox
                value={scheduleData.endTime}
                keyName="endTime"
                values={timeArray}
                placeholder="HH:MM"
                onSelect={handleScheduleChange}
                className="max-w-[140px] py-[15px] pl-4 pr-3"
              />
            </div>
            <button type="button" disabled={addButtonDisable} onClick={addSchedule}>
              <Image src={AddIcon} alt="추가" />
            </button>
          </div>
          <div className="grid gap-5 border-t border-solid border-gray-200 pt-5">
            {formData.schedules.length > 0 &&
              formData.schedules.map((s, index) => (
                <div key={index} className="flex items-center gap-5">
                  <input readOnly value={s.date} className="flex-1 rounded border border-solid border-gray-600 py-[15px] pl-4 pr-3 outline-none" />
                  <div className="flex items-center gap-3">
                    <input
                      readOnly
                      value={s.startTime}
                      className="max-w-[140px] rounded border border-solid border-gray-600 py-[15px] pl-4 pr-3 outline-none"
                    />
                    <span className="text-[20px] font-bold leading-[1.3]">~</span>
                    <input readOnly value={s.endTime} className="max-w-[140px] rounded border border-solid border-gray-600 py-[15px] pl-4 pr-3 outline-none" />
                  </div>
                  <button type="button" onClick={() => deleteSchedule(s)}>
                    <Image src={DeleteIcon} alt="삭제" />
                  </button>
                </div>
              ))}
          </div>
        </div>
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
