'use client';

import { useEffect, useState } from 'react';
import AddressModal from '@/(route)/activity/register/_components/AddressModal';

import ACTIVITY_CATEGORY from '@/_constants/activity-category';

import { addCommasToPrice, removeCommas } from '@/_utils/formatNumber';

import Button from '@/_components/button';
import Input from '@/_components/Input';
import SelectBox from '@/_components/SelectBox';
import Textarea from '@/_components/Textarea';

import type { Activity } from '../../page';
import BannerImage from '../BannerImage';
import IntroduceImage from '../IntroduceImage';
import PriceButtons from '../PriceButtons';
import ScheduleEditor from '../ScheduleEditor';
import SchedulePicker from '../SchedulePicker';

interface ActivityFormProps {
  buttonTitle: string;
  isPending: boolean;
  onSubmit: (formData: Activity) => void;
  title: string;
}

/**
 * 체험 등록 페이지 Form 데이터 다루는 컴포넌트 입니다.
 * @param title 페이지 타이틀 제목
 * @param buttonTitle submit 버튼 텍스트
 * @param isPending api post pending 상태 여부
 * @param onSubmit form 제출시 실행 함수
 
 */
function ActivityForm({ title, buttonTitle, onSubmit, isPending }: ActivityFormProps) {
  const [priceFormat, setPriceFormat] = useState('');
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
    const { id, value } = e.target;
    if (id === 'price') {
      setPriceFormat(addCommasToPrice(value));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      price: removeCommas(priceFormat),
    }));
  }, [priceFormat]);

  useEffect(() => {
    const { address, bannerImageUrl, category, description, price, schedules: formSchedules, title: formTitle } = formData;
    // 버튼 disable 조건
    const isDisabled =
      address === '' || bannerImageUrl === '' || category === '' || description === '' || price === '' || formSchedules.length === 0 || formTitle === '';
    setButtonDisable(isDisabled || isPending);
  }, [formData, isPending]);

  return (
    <form className="grid gap-6" onSubmit={handleFormSubmit}>
      <div className="flex flex-wrap justify-between">
        <h2 className="leading-1.3 text-3xl font-bold">{title}</h2>
        <Button type="submit" variant="black" disabled={buttonDisable} className="h-12 w-[120px]">
          {buttonTitle}
        </Button>
      </div>
      <div className="grid gap-6">
        <Input id="title" placeholder="제목" value={formData.title} onChange={handleChangeInput} className="pl-4 pr-4" />
        <SelectBox keyName="category" value={formData.category} values={ACTIVITY_CATEGORY} placeholder="카테고리" onSelect={handleSelectChange} />
        <Textarea id="description" value={formData.description} size="big" placeholder="설명" onChange={handleChangeInput} autoComplete="off" />
        <div className="grid gap-3 tablet:gap-4">
          <label htmlFor="price" className="w-fit text-xl font-bold leading-[1.3] tablet:text-2xl tablet:leading-[1.1]">
            가격
          </label>
          <Input id="price" placeholder="가격" value={priceFormat} onChange={handleChangeInput} className="pl-4 pr-4" />
          <PriceButtons setPriceFormat={setPriceFormat} />
        </div>
        <div className="grid gap-3 tablet:gap-4">
          <label htmlFor="address" className="w-fit text-xl font-bold leading-[1.3] tablet:text-2xl tablet:leading-[1.1]">
            주소
          </label>
          <Input readOnly id="address" placeholder="주소를 입력해주세요" onClick={handleAddressModal} value={formData.address} />
          <AddressModal isOpen={addressModalState} onClose={handleAddressModal} onComplete={handleSelectChange} />
        </div>
        <div className="grid gap-4 lg:gap-5">
          <label htmlFor="date" className="w-fit text-xl font-bold leading-[1.3] tablet:mb-2 tablet:text-2xl tablet:leading-[1.1] lg:mb-1">
            예약 가능한 시간대
          </label>
          <SchedulePicker setRegisterFormData={setFormData} />
          {formData.schedules.length > 0 && (
            <div className="grid gap-2 border-t border-solid border-gray-200 pt-4 tablet:gap-4 lg:gap-5 lg:pt-5">
              {formData.schedules.map((s, index) => (
                <ScheduleEditor key={index} index={index} schedule={s} scheduleArray={formData.schedules} setRegisterFormData={setFormData} />
              ))}
            </div>
          )}
        </div>
        <BannerImage setFormData={setFormData} />
        <IntroduceImage setRegisterFormData={setFormData} />
      </div>
    </form>
  );
}

export default ActivityForm;
