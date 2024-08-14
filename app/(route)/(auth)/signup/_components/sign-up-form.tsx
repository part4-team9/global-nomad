'use client';

import { useState } from 'react';
import type { FieldError, RegisterOptions } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import type { SignupFormValues } from '@/_apis/type';
import { postSignup } from '@/_apis/user';

import { useModal } from '@/_hooks/useModal';

import Button from '@/_components/button';
import Input from '@/_components/input';
import Modal from '@/_components/modal';

interface InputField {
  id: keyof SignupFormValues;
  label: string;
  placeholder: string;
  type: string;
  validation: RegisterOptions<SignupFormValues>;
}

function SignUpForm() {
  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<SignupFormValues>({ mode: 'onSubmit' });

  const { isOpen, openModal, closeModal } = useModal();
  const [redirectToLogin, setRedirectToLogin] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  const password = watch('password', '');

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
      id: 'nickname',
      label: '닉네임',
      type: 'nickname',
      placeholder: '닉네임을 입력해주세요.',
      validation: {
        required: '닉네임은 필수 항목입니다.',
        maxLength: {
          value: 10,
          message: '닉네임은 10글자 이내로 작성해주세요',
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
    {
      id: 'confirmPassword',
      label: '비밀번호 확인',
      type: 'password',
      placeholder: '비밀번호를 한 번 더 입력해 주세요',
      validation: {
        required: '비밀번호 확인은 필수 항목입니다.',
        validate: (value) => value === password || '비밀번호가 일치하지 않습니다.',
      },
    },
  ];

  const handleForm = handleSubmit(async (data: SignupFormValues) => {
    try {
      const result = await postSignup(data);
      if (result) {
        setModalMessage('가입이 완료되었습니다!');
        setRedirectToLogin(true);
      }
    } catch (error) {
      let message = '회원가입 중 오류가 발생했습니다.';
      if (error instanceof Error) {
        message = error.message;
      }
      setModalMessage(message);
    }
    openModal();
  });

  const handleModalClose = () => {
    if (redirectToLogin) {
      router.replace('/login');
    }
    closeModal();
  };

  const renderInput = (id: keyof SignupFormValues, label: string, type: string, placeholder: string, validation: RegisterOptions<SignupFormValues>, error?: FieldError) => (
    <div className="grid gap-2" key={id}>
      <label htmlFor={id}>{label}</label>
      <Input id={id} type={type} placeholder={placeholder} error={Boolean(error)} errorMessage={error?.message} {...register(id, validation)} />
    </div>
  );

  return (
    <>
      <form noValidate onSubmit={handleForm} className="grid w-full gap-7 px-3 md:px-0">
        {inputFields.map((field) => renderInput(field.id, field.label, field.type, field.placeholder, field.validation, errors[field.id]))}
        <Button className="py-[14px]" type="submit" disabled={isSubmitting || !isValid} variant="black">
          회원가입
        </Button>
      </form>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="m-auto px-[90px] pb-[28px] pt-[26px] text-right text-lg md:w-[540px] md:px-[33px]">
          <p className="pb-[43px] pt-[53px] text-center">{modalMessage}</p>
          <span className="flex justify-center md:justify-end">
            <Button className="h-[42px] w-[138px]" type="button" variant="black" onClick={handleModalClose}>
              확인
            </Button>
          </span>
        </div>
      </Modal>
    </>
  );
}

export default SignUpForm;
