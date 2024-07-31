'use client';

import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

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
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Activity>({ mode: 'onSubmit' });

  const handleModalState = () => {
    setModalState((prev) => !prev);
  };

  const handleComplete = (address: string) => {
    setValue('address', address, { shouldValidate: true });
  };

  const setCategory = (value: string) => {
    setValue('category', value, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<Activity> = (data) => {
    console.log(data, 'data');
  };

  return (
    <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <h2 className="leading-1.3 text-3xl font-bold">{title}</h2>
        <button type="submit">{buttonTitle}</button>
      </div>
      <div className="grid gap-6">
        <Input
          placeholder="제목"
          error={Boolean(errors?.title)}
          errorMessage={errors?.title?.message}
          {...register('title', { required: '제목을 입력해주세요' })}
        />
        <Input error errorMessage="비밀번호 입력해주삼" type="password" />
        <SelectBox
          values={ACTIVITY_CATEGORY}
          placeholder="카테고리"
          error={Boolean(errors?.category)}
          errorMessage={errors?.category?.message}
          onSelect={setCategory}
          {...register('category', { required: '카테고리를 선택해주세요' })}
        />
        <Textarea
          size="big"
          placeholder="설명"
          error={Boolean(errors?.description)}
          errorMessage={errors?.description?.message}
          {...register('description', { required: '설명을 입력해주세요' })}
        />
        <div className="grid gap-4">
          <label htmlFor="price" className="w-fit text-xl font-bold">
            가격
          </label>
          <Input
            id="price"
            type="number"
            placeholder="가격"
            error={Boolean(errors?.price)}
            errorMessage={errors?.price?.message}
            {...register('price', { required: '가격을 입력해주세요' })}
          />
        </div>
        <div className="grid gap-4">
          <label htmlFor="address" className="w-fit text-xl font-bold">
            주소
          </label>
          <Input
            readOnly
            id="address"
            placeholder="주소를 입력해주세요"
            error={Boolean(errors?.address)}
            errorMessage={errors?.address?.message}
            onClick={handleModalState}
            {...register('address', { required: '주소를 입력해주세요' })}
          />
          <AddressModal isOpen={modalState} onClose={handleModalState} onComplete={handleComplete} />
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
          <FileInput
            accept="image/*"
            error={Boolean(errors?.bannerImageUrl)}
            errorMessage={errors?.bannerImageUrl?.message}
            {...register('bannerImageUrl', { required: '배너 이미지를 등록해주세요' })}
          />
        </div>
      </div>
    </form>
  );
}

export default ActivityForm;
