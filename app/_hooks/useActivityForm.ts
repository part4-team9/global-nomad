import { useEffect, useState } from 'react';

import { addCommasToPrice, removeCommas } from '@/_utils/formatNumber';

interface GenericTypes {
  price?: number;
}

const useActivityForm = <T extends GenericTypes>(initialData: T) => {
  const [formData, setFormData] = useState<T>(initialData);
  const [addressModalState, setAddressModalState] = useState(false);
  const [priceFormat, setPriceFormat] = useState(formData.price ? addCommasToPrice(String(formData.price)) : '');

  const handleAddressModal = () => {
    setAddressModalState((prev) => !prev);
  };

  const handleSelectChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      price: priceFormat !== '' ? removeCommas(priceFormat) : undefined,
    }));
  }, [priceFormat]);

  return { formData, setFormData, priceFormat, setPriceFormat, addressModalState, handleAddressModal, handleSelectChange, handleChangeInput };
};

export default useActivityForm;
