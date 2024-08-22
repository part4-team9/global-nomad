'use client';

import { useEffect, useState } from 'react';
import AddressModal from '@/(route)/activity/register/_components/AddressModal';
import BannerImage from '@/(route)/activity/register/_components/BannerImage';
import IntroduceImage from '@/(route)/activity/register/_components/IntroduceImage';
import PriceButtons from '@/(route)/activity/register/_components/PriceButtons';
import ScheduleEditor from '@/(route)/activity/register/_components/ScheduleEditor';
import SchedulePicker from '@/(route)/activity/register/_components/SchedulePicker';

import type { ActivityDetail, ActivityEdit, EditDetail } from '@/_types/activities/register';
import ACTIVITY_CATEGORY from '@/_constants/activity-category';

import { addCommasToPrice, removeCommas } from '@/_utils/formatNumber';

import Button from '@/_components/button';
import Input from '@/_components/Input';
import SelectBox from '@/_components/SelectBox';
import Textarea from '@/_components/Textarea';

interface EditFormProps {
  buttonTitle: string;
  data?: ActivityDetail;
  isPending: boolean;
  onSubmit: (formData: ActivityEdit) => void;
  title: string;
}

/**
 * 체험 수정 페이지 Form 데이터를 처리하고 렌더링하는 컴포넌트 입니다.
 *
 * @param {ActivityDetail} data 기존 체험 정보로 기본값으로 사용
 * @param {boolean} isPending API 요청이 진행 중인지 여부를 나타냄
 * @param {function} onSubmit form 제출시 실행되는 함수
 * @param {string} title 페이지의 타이틀 제목
 * @param {string} buttonTitle 제출 버튼의 텍스트
 */
function ActivityEditForm({ data, title, buttonTitle, onSubmit, isPending }: EditFormProps) {
  const [priceFormat, setPriceFormat] = useState(addCommasToPrice(String(data?.price)));
  const [addressModalState, setAddressModalState] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [detailData, setDetailData] = useState<EditDetail>({
    schedules: data?.schedules || [],
    subImages: data?.subImages || [],
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
    ...data,
  });

  useEffect(() => {
    if (data) {
      const { address, bannerImageUrl, category, description, price, schedules, subImages, title: ActivityTitle } = data;

      const formatPrice = addCommasToPrice(String(price));
      setPriceFormat(formatPrice);

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
  }, [data]);

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
    if (id === 'price') {
      setPriceFormat(addCommasToPrice(value));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      price: removeCommas(priceFormat),
    }));
  }, [priceFormat]);

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
        <h2 className="text-3xl font-bold leading-[1.3]">{title}</h2>
        <Button type="submit" variant="black" disabled={buttonDisable} className="h-12 w-[120px]">
          {buttonTitle}
        </Button>
      </div>
      <div className="grid gap-6">
        <Input id="title" placeholder="제목" value={formData.title} onChange={handleChangeInput} className="px-4" />
        <SelectBox keyName="category" value={formData.category} values={ACTIVITY_CATEGORY} placeholder="카테고리" onSelect={handleSelectChange} />
        <Textarea id="description" value={formData.description} size="big" placeholder="설명" onChange={handleChangeInput} autoComplete="off" />
        <div className="grid gap-3 tablet:gap-4">
          <label htmlFor="price" className="w-fit text-xl font-bold leading-[1.3] tablet:text-2xl tablet:leading-[1.1]">
            가격
          </label>
          <Input id="price" placeholder="가격" value={priceFormat} onChange={handleChangeInput} className="px-4" />
          <PriceButtons setPriceFormat={setPriceFormat} />
        </div>
        <div className="grid gap-3 tablet:gap-4">
          <label htmlFor="address" className="w-fit text-xl font-bold leading-[1.3] tablet:text-2xl tablet:leading-[1.1]">
            주소
          </label>
          <Input readOnly id="address" placeholder="주소를 입력해주세요" onClick={handleAddressModal} value={formData.address} />
          <AddressModal isOpen={addressModalState} onClose={handleAddressModal} onComplete={handleSelectChange} />
        </div>
        <div className="grid gap-4 pc:gap-5">
          <label htmlFor="date" className="w-fit text-xl font-bold leading-[1.3] tablet:mb-2 tablet:text-2xl tablet:leading-[1.1] pc:mb-1">
            예약 가능한 시간대
          </label>
          <SchedulePicker setEditFormData={setFormData} setEditDetail={setDetailData} />

          {detailData.schedules.length > 0 && (
            <div className="grid gap-2 border-t border-solid border-gray-200 pt-4 tablet:gap-4 pc:gap-5 pc:pt-5">
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
