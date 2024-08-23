'use client';

import { useEffect, useState } from 'react';
import AddressModal from '@/(route)/activity/(form)/_components/AddressModal';

import type { Activity } from '@/_types/activities/form.types';
import ACTIVITY_CATEGORY from '@/_constants/activity-category';

import { addCommasToPrice, removeCommas } from '@/_utils/formatNumber';

import Button from '@/_components/button';
import Input from '@/_components/Input';
import SelectBox from '@/_components/SelectBox';

import BannerImage from '../../../_components/BannerImage';
import FormContainer from '../../../_components/FormContainer';
import FormField from '../../../_components/FormField';
import IntroduceImage from '../../../_components/IntroduceImage';
import PriceButtons from '../../../_components/PriceButtons';
import ScheduleEditor from '../../../_components/ScheduleEditor';
import SchedulePicker from '../../../_components/SchedulePicker';
import TextEditor from '../../../_components/TextEditor';

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
    price: undefined,
    schedules: [],
    subImageUrls: [],
    title: '',
  });

  const handleAddressModal = () => {
    setAddressModalState((prev) => !prev);
  };

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
      price: priceFormat !== '' ? removeCommas(priceFormat) : undefined,
    }));
  }, [priceFormat]);

  useEffect(() => {
    const { address, bannerImageUrl, category, description, price, schedules: formSchedules, title: formTitle } = formData;
    const isDisabled =
      address === '' || bannerImageUrl === '' || category === '' || description === '' || price === undefined || formSchedules.length === 0 || formTitle === '';
    setButtonDisable(isDisabled || isPending);
  }, [formData, isPending]);

  return (
    <FormContainer onSubmit={handleFormSubmit} title={title} buttonTitle={buttonTitle} buttonDisable={buttonDisable}>
      <Input id="title" placeholder="제목" value={formData.title} onChange={handleChangeInput} className="px-4" />
      <SelectBox keyName="category" value={formData.category} values={ACTIVITY_CATEGORY} placeholder="카테고리" onSelect={handleSelectChange} />
      <TextEditor value={formData.description} setFormData={setFormData} />
      <FormField htmlFor="price" label="가격">
        <Input id="price" placeholder="가격" value={priceFormat} onChange={handleChangeInput} className="px-4" />
        <PriceButtons setPriceFormat={setPriceFormat} />
      </FormField>
      <FormField htmlFor="address" label="주소">
        <Input readOnly id="address" placeholder="주소를 입력해주세요" onClick={handleAddressModal} value={formData.address} />
        <AddressModal isOpen={addressModalState} onClose={handleAddressModal} onComplete={handleSelectChange} />
      </FormField>
      <FormField htmlFor="date" label="예약 가능한 시간대">
        <SchedulePicker setFormData={setFormData} />
        {formData.schedules.length > 0 && (
          <div className="grid gap-2 border-t border-solid border-gray-200 pt-4 tablet:gap-4 pc:gap-5 pc:pt-5">
            {formData.schedules.map((s, index) => (
              <ScheduleEditor key={index} index={index} schedule={s} scheduleArray={formData.schedules} setFormData={setFormData} />
            ))}
          </div>
        )}
      </FormField>
      <BannerImage value={formData.bannerImageUrl !== '' ? [formData.bannerImageUrl] : undefined} setFormData={setFormData} />
      <IntroduceImage setRegisterFormData={setFormData} />
    </FormContainer>
  );
}

export default ActivityForm;
