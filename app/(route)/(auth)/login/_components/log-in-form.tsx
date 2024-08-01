'use client';

import { useState } from 'react';
import type { FieldError, RegisterOptions } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { postLogin } from '@/_apis/authentication';

import { useModal } from '@/_hooks/useModal';

import Input from '@/_components/input';
import Modal from '@/_components/modal';

type FormValues = {
  email: string;
  password: string;
};

interface InputField {
  id: keyof FormValues;
  label: string;
  placeholder: string;
  type: string;
  validation: RegisterOptions<FormValues>;
}

const inputFields: InputField[] = [
  {
    id: 'email',
    label: '이메일',
    type: 'email',
    placeholder: '이메일을 입력해 주세요',
    validation: {
      required: '이메일은 필수 항목입니다.',
      pattern: {
        value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
        message: '잘못된 이메일 입니다.',
      },
    },
  },
  {
    id: 'password',
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해 주세요',
    validation: {
      required: '비밀번호는 필수 항목입니다.',
      minLength: {
        value: 8,
        message: '8자 이상 입력해주세요.',
      },
    },
  },
];

function LoginForm() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    mode: 'onSubmit',
  });

  const { isOpen, openModal, closeModal } = useModal();
  const [modalMessage, setModalMessage] = useState<string>('');

  const handleForm = handleSubmit(async (data: FormValues) => {
    try {
      const result = await postLogin(data);
      if (result) {
        router.replace('/main');
      }
    } catch (error) {
      let message = '로그인 중 오류가 발생했습니다.';
      if (error instanceof Error) {
        message = error.message;
      }
      setModalMessage(message);
      openModal();
    }
  });

  const renderInput = (id: keyof FormValues, label: string, type: string, placeholder: string, validation: RegisterOptions<FormValues>, error?: FieldError) => (
    <div className="grid gap-2" key={id}>
      <label htmlFor={id}>{label}</label>
      <Input id={id} type={type} placeholder={placeholder} error={Boolean(error)} errorMessage={error?.message} {...register(id, validation)} />
    </div>
  );

  return (
    <>
      <form noValidate onSubmit={handleForm} className="grid w-full gap-7 px-3 md:px-0">
        {inputFields.map((field) => renderInput(field.id, field.label, field.type, field.placeholder, field.validation, errors[field.id]))}
        
        {/* 버튼 컴포넌트로 변경 */}
        <button type="submit" disabled={isSubmitting} className="border bg-gray-100 py-[14px]">
          로그인
        </button>
        
      </form>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="m-auto px-[90px] pb-[28px] pt-[26px] text-right text-lg md:w-[540px] md:px-[33px]">
          <p className="pb-[43px] pt-[53px] text-center">{modalMessage}</p>
          <span className="flex justify-center md:justify-end">
            
            {/* 버튼 컴포넌트로 변경 */}
            <button type="button" onClick={closeModal} className="h-[42px] w-[138px] rounded-lg bg-black text-white">
              확인
            </button>

          </span>
        </div>
      </Modal>
    </>
  );
}

export default LoginForm;
