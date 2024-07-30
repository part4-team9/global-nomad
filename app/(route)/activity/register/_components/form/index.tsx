'use client';

import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

import ACTIVITY_CATEGORY from '@/_constants/activity-category';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Activity>({ mode: 'onSubmit' });
  const onSubmit: SubmitHandler<Activity> = (data) => {
    console.log(data, 'data');
  };

  console.log(errors.title);

  return (
    <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <h2 className="leading-1.3 text-3xl font-bold">{title}</h2>
        <button type="submit">{buttonTitle}</button>
      </div>
      <div className="grid gap-6">
        <div>
          <Input
            placeholder="제목"
            error={Boolean(errors?.title)}
            errorMessage={errors?.title?.message}
            {...register('title', { required: '제목을 입력해주세요' })}
          />
        </div>
        <SelectBox values={ACTIVITY_CATEGORY} placeholder="카테고리" />
        <Textarea size="big" placeholder="설명" />
        <div className="grid gap-4">
          <label htmlFor="price" className="text-xl font-bold">
            가격
          </label>
          <Input id="price" type="number" placeholder="가격" />
        </div>
        <div className="grid gap-4">
          <label htmlFor="address" className="text-xl font-bold">
            주소
          </label>
          <Input id="address" placeholder="주소를 입력해주세요" />
        </div>
        <div className="grid gap-4">
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
        </div>
      </div>
    </form>
  );
}

export default ActivityForm;
