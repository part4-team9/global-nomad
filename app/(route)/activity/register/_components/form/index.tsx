'use client';

import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

import ACTIVITY_CATEGORY from '@/_constants/activity-category';

import AddressModal from '@/_components/address-modal';
import Input from '@/_components/input';
import SelectBox from '@/_components/select-box';
import Textarea from '@/_components/textarea';

import type { Activity } from '../../page';

import PlusIcon from 'public/assets/icons/plus.svg';

interface ActivityFormProps {
  buttonTitle: string;
  title: string;
}

function ActivityForm({ title, buttonTitle }: ActivityFormProps) {
  const [modalState, setModalState] = useState(false);
  const {
    register,
    handleSubmit,
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
          <label htmlFor="price" className="text-xl font-bold">
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
          <label htmlFor="address" className="text-xl font-bold">
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
          <Input id="date" type="date" placeholder="YY/MM/DD" />
        </div>
        <div className="grid gap-4">
          <label htmlFor="banner" className="text-xl font-bold">
            배너 이미지
          </label>
          <div className="flex items-center gap-2 tablet:gap-6">
            <div className="relative flex aspect-square w-1/2 flex-col items-center justify-center gap-[30px] rounded-xl border border-dashed border-gray-700 tablet:w-1/4">
              <Image src={PlusIcon} alt="등록" />
              <span>이미지 등록</span>
              <input id="banner" type="file" className="absolute left-0 top-0 h-full w-full opacity-0" />
            </div>
            <div className="aspect-square w-1/2 rounded-xl bg-slate-400 tablet:w-1/4" />
          </div>
        </div> */}
      </div>
    </form>
  );
}

export default ActivityForm;
