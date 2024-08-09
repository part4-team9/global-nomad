'use client';

import { useEffect, useState } from 'react';
import type { ActivityDetail } from '@/_apis/activities/getActivity';
import AddressModal from '@/(route)/activity/register/_components/address-modal';
import BannerImage from '@/(route)/activity/register/_components/banner-image';
import IntroduceImage from '@/(route)/activity/register/_components/introduce-image';
import ScheduleEditor from '@/(route)/activity/register/_components/schedule-editor';
import SchedulePicker from '@/(route)/activity/register/_components/schedule-picker';

import ACTIVITY_CATEGORY from '@/_constants/activity-category';

import Button from '@/_components/button';
import Input from '@/_components/input';
import SelectBox from '@/_components/select-box';
import Textarea from '@/_components/textarea';

import type { ActivityEdit, EditDetail } from '../../page';

interface EditFormProps {
  buttonTitle: string;
  data?: ActivityDetail;
  isPending: boolean;
  isSuccess: boolean;
  onSubmit: (formData: ActivityEdit) => void;
  title: string;
}

/**
 * 체험 수정 페이지 Form 데이터 다루는 컴포넌트 입니다.
 * @param data 기존 체험 정보 default값
 * @param isSuccess 데이터 patch 성공 결과
 * @param isPending api patch pending 상태 여부
 * @param onSubmit form 제출시 실행 함수
 * @param title 페이지 타이틀 제목
 * @param buttonTitle submit 버튼 텍스트
 */
function ActivityEditForm({ data, isSuccess, title, buttonTitle, onSubmit, isPending }: EditFormProps) {
  const [addressModalState, setAddressModalState] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [detailData, setDetailData] = useState<EditDetail>({
    schedules: [],
    subImages: [],
  });
  const [formData, setFormData] = useState<ActivityEdit>({
    title: '',
    category: '',
    description: '',
    price: '',
    address: '',
    bannerImageUrl: '',
    subImageIdsToRemove: [],
    subImageUrlsToAdd: [],
    scheduleIdsToRemove: [],
    schedulesToAdd: [],
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { address, bannerImageUrl, category, description, price, schedules, subImages, title: ActivityTitle } = data;

      setDetailData({
        schedules,
        subImages,
      });

      setFormData((prev) => ({
        ...prev,
        title: ActivityTitle,
        category,
        description,
        price,
        address,
        bannerImageUrl,
      }));
    }
  }, [isSuccess, data]);

  const onSubmitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === 'price' ? Number(value) : value,
    }));
  };

  useEffect(() => {
    const { address, bannerImageUrl, category, description, price, title: formTitle } = formData;
    const { schedules } = detailData;
    // 버튼 disable 조건
    const isDisabled =
      address === '' || bannerImageUrl === '' || category === '' || description === '' || price === '' || schedules.length === 0 || formTitle === '';
    setButtonDisable(isDisabled || isPending);
  }, [formData, detailData, isPending]);

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
        <Textarea id="description" value={formData.description} size="big" placeholder="설명" onChange={handleChangeInput} autoComplete="off" />
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
          <SchedulePicker setEditFormData={setFormData} setEditDetail={setDetailData} />

          {detailData.schedules.length > 0 && (
            <div className="grid gap-2 border-t border-solid border-gray-200 pt-4 tablet:gap-4 lg:gap-5 lg:pt-5">
              {detailData.schedules.map((s, index) => (
                <ScheduleEditor
                  key={index}
                  index={index}
                  schedule={s}
                  scheduleArray={detailData.schedules}
                  setEditFormData={setFormData}
                  detailData={formData.schedulesToAdd}
                  setEditDetailData={setDetailData}
                />
              ))}
            </div>
          )}
        </div>
        <BannerImage value={formData.bannerImageUrl} setFormData={setFormData} />
        <IntroduceImage edit editValue={detailData.subImages} setEditFormData={setFormData} setEditDetailData={setDetailData} />
      </div>
    </form>
  );
}

export default ActivityEditForm;
