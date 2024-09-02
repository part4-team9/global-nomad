import type { Dispatch, SetStateAction } from 'react';

import type { Activity, ActivityEdit } from '@/_types/activities/form.types';
import ACTIVITY_CATEGORY from '@/_constants/activityCategory';

import Input from '@/_components/Input';
import SelectBox from '@/_components/SelectBox';

import AddressModal from '../AddressModal';
import FormField from '../FormField';
import PriceButtons from '../PriceButtons';
import TextEditor from '../TextEditor';

interface BasicInfoForm<T> {
  addressModalState: boolean;
  formData: T;
  handleAddressModal: () => void;
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (key: string, value: string) => void;
  priceFormat: string;
  setFormData: Dispatch<SetStateAction<T>>;
  setPriceFormat: Dispatch<SetStateAction<string>>;
}

function BasicInfoForm<T extends Activity | ActivityEdit>({
  formData,
  setFormData,
  handleChangeInput,
  handleSelectChange,
  priceFormat,
  setPriceFormat,
  addressModalState,
  handleAddressModal,
}: BasicInfoForm<T>) {
  return (
    <>
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
    </>
  );
}

export default BasicInfoForm;
