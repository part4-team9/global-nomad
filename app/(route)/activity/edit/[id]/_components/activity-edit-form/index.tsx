'use client';

import { useEffect, useState } from 'react';
import type { ActivityDetail, SubImage } from '@/_apis/activities/getActivity';
import AddressModal from '@/(route)/activity/register/_components/address-modal';
import BannerImage from '@/(route)/activity/register/_components/banner-image';
import ScheduleEditor from '@/(route)/activity/register/_components/schedule-editor';
import SchedulePicker from '@/(route)/activity/register/_components/schedule-picker';
import type { Activity } from '@/(route)/activity/register/page';

import ACTIVITY_CATEGORY from '@/_constants/activity-category';

import Button from '@/_components/button';
import Input from '@/_components/input';
import SelectBox from '@/_components/select-box';
import Textarea from '@/_components/textarea';

interface EditFormProps {
  buttonTitle: string;
  data?: ActivityDetail;
  isSuccess: boolean;
  title: string;
}

function ActivityEditForm({ data, isSuccess, title, buttonTitle }: EditFormProps) {
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

  useEffect(() => {
    if (isSuccess && data) {
      const { address, bannerImageUrl, category, description, price, schedules, subImages, title: ActivityTitle } = data;
      const subImageUrls: string[] = [];
      subImages.forEach((image: SubImage) => {
        subImageUrls.push(image.imageUrl);
      });

      setFormData({
        address,
        bannerImageUrl,
        category,
        description,
        price,
        schedules,
        subImageUrls,
        title: ActivityTitle,
      });
    }
  }, [isSuccess, data]);

  const onSubmitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

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
    // setButtonDisable(isDisabled || isPending);
    setButtonDisable(isDisabled);
  }, [formData]);

  return (
    <form className="grid gap-6" onSubmit={onSubmitForm}>
      <div className="flex flex-wrap justify-between">
        <h2 className="leading-1.3 text-3xl font-bold">{title}</h2>
        <Button type="submit" variant="black" disabled={buttonDisable} className="h-12 w-[120px]">
          {buttonTitle}
        </Button>
      </div>
      <div className="grid gap-6">
        <Input id="title" placeholder="제목" value={formData.title} onChange={handleChangeInput} className="pl-4 pr-4" />
        <SelectBox keyName="category" value={formData.category} values={ACTIVITY_CATEGORY} placeholder="카테고리" onSelect={handleSelectChange} />
        <Textarea id="description" value={formData.description} size="big" placeholder="설명" onChange={handleChangeInput} />
        <div className="grid gap-3 tablet:gap-4">
          <label htmlFor="price" className="w-fit text-[20px] font-bold leading-[1.3] tablet:text-xl tablet:leading-[1.1]">
            가격
          </label>
          <Input id="price" type="number" placeholder="가격" value={formData.price} onChange={handleChangeInput} className="pl-4 pr-4" />
        </div>
        <div className="grid gap-3 tablet:gap-4">
          <label htmlFor="address" className="w-fit text-[20px] font-bold leading-[1.3] tablet:text-xl tablet:leading-[1.1]">
            주소
          </label>
          <Input readOnly id="address" placeholder="주소를 입력해주세요" onClick={handleAddressModal} value={formData.address} />
          <AddressModal isOpen={addressModalState} onClose={handleAddressModal} onComplete={handleSelectChange} />
        </div>
        <div className="grid gap-4 lg:gap-5">
          <label htmlFor="date" className="w-fit text-[20px] font-bold leading-[1.3] tablet:mb-2 tablet:text-xl tablet:leading-[1.1] lg:mb-1">
            예약 가능한 시간대
          </label>
          <SchedulePicker scheduleArray={formData.schedules} setFormData={setFormData} />

          {formData.schedules.length > 0 && (
            <div className="grid gap-2 border-t border-solid border-gray-200 pt-4 tablet:gap-4 lg:gap-5 lg:pt-5">
              {formData.schedules.map((s, index) => (
                <ScheduleEditor key={index} schedule={s} scheduleArray={formData.schedules} setFormData={setFormData} />
              ))}
            </div>
          )}
        </div>
        <BannerImage value={formData.bannerImageUrl} setFormData={setFormData} />
        {/* <IntroduceImage value={formData.subImageUrls} setFormData={setFormData} /> */}
      </div>
    </form>
  );
}

export default ActivityEditForm;
