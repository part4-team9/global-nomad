'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import postActivity from '@/_apis/activities/postActivity';
import AddressModal from '@/(route)/activity/register/_components/address-modal';
import { useMutation } from '@tanstack/react-query';

import ACTIVITY_CATEGORY from '@/_constants/activity-category';

import Button from '@/_components/button';
import Input from '@/_components/input';
import SelectBox from '@/_components/select-box';
import Textarea from '@/_components/textarea';

import type { Activity } from '../../page';
import BannerImage from '../banner-image';
import CommonModal from '../common-modal';
import IntroduceImage from '../introduce-image';
import ScheduleEditor from '../schedule-editor';
import SchedulePicker from '../schedule-picker';

interface ActivityFormProps {
  buttonTitle: string;
  title: string;
}

function ActivityForm({ title, buttonTitle }: ActivityFormProps) {
  const router = useRouter();
  const [addressModalState, setAddressModalState] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [modalState, setModalState] = useState({
    isOpen: false,
    message: '',
    onClose: () => {},
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

  const closeModal = () => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
    }));
    modalState.onClose();
  };

  const activityMutation = useMutation({
    mutationFn: postActivity,
    onSuccess: (res) => {
      console.log('성공', res);
      setModalState({
        isOpen: true,
        message: '체험 등록이 완료되었습니다',
        onClose: () => {
          /**
           * @TODO 체험 상세 url에 맞게 수정 필요
           */
          // router.push(`/activity/${res.data.id}`);
        },
      });
    },
    onError: (error) => {
      if (typeof error === 'number') {
        if (error === 400) {
          setModalState((prev) => ({
            ...prev,
            isOpen: true,
            message: '제목은 문자열로 입력해주세요',
          }));
        } else if (error === 401) {
          setModalState({
            isOpen: true,
            message: '로그인이 필요한 서비스입니다',
            onClose: () => {
              router.push('/login');
            },
          });
        } else if (error === 409) {
          setModalState((prev) => ({
            ...prev,
            isOpen: true,
            message: '겹치는 예약 가능 시간대가 존재합니다',
          }));
        } else {
          setModalState((prev) => ({
            ...prev,
            isOpen: true,
            message: '죄송합니다. 체험 등록에 실패했습니다.',
          }));
        }
      }
    },
  });

  // isPending 상태에서 버튼 disable 처리
  const { isPending } = activityMutation;

  const onSubmitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    activityMutation.mutate(formData);
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
    setButtonDisable(isDisabled || isPending);
  }, [formData, isPending]);

  return (
    <>
      <CommonModal isOpen={modalState.isOpen} onClose={closeModal}>
        {modalState.message}
      </CommonModal>
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
          <Textarea id="description" size="big" placeholder="설명" onChange={handleChangeInput} />
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
          <BannerImage setFormData={setFormData} />
          <IntroduceImage setFormData={setFormData} />
        </div>
      </form>
    </>
  );
}

export default ActivityForm;
