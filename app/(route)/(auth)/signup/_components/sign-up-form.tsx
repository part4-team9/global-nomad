'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { postSignup } from '@/_apis/user';

import { useModal } from '@/_hooks/useModal';

import Input from '@/_components/input';
import Modal from '@/_components/modal';

type FormValues = {
  confirmPassword: string;
  email: string;
  nickname: string;
  password: string;
};

function SignUpForm() {
  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({ mode: 'onSubmit' });

  const { isOpen, openModal, closeModal } = useModal();
  const [modalMessage, setModalMessage] = useState<string>('');

  const password = watch('password', '');

  const handleForm = handleSubmit(async (data: FormValues) => {
    console.log(data);
    try {
      const result = await postSignup(data);
      if (result) {
        router.replace('/login');
        setModalMessage('가입이 완료되었습니다!');
        openModal();
      }
    } catch (error) {
      console.log(error);

      let message = '회원가입 중 오류가 발생했습니다.';
      if (error instanceof Error) {
        message = error.message;
      }
      setModalMessage(message);
      openModal();
    }
  });

  return (
    <>
      <form noValidate onSubmit={handleForm} className="grid w-full gap-7 px-3 md:px-0">
        <div className="grid w-full gap-2">
          <label htmlFor="email">이메일</label>
          <Input
            id="email"
            type="email"
            placeholder="이메일을 입력해 주세요"
            error={Boolean(errors?.email)}
            errorMessage={errors?.email?.message}
            {...register('email', {
              required: '이메일은 필수 항목입니다.',
              pattern: {
                value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                message: '잘못된 이메일 입니다.',
              },
            })}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="nickname">닉네임</label>
          <Input
            id="nickname"
            type="text"
            placeholder="닉네임을 입력해 주세요"
            error={Boolean(errors?.nickname)}
            errorMessage={errors?.nickname?.message}
            {...register('nickname', {
              required: '닉네임은 필수 항목입니다.',
              maxLength: {
                value: 10,
                message: '닉네임은 10글자 이내로 작성해주세요',
              },
            })}
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="password">비밀번호</label>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            error={Boolean(errors?.password)}
            errorMessage={errors?.password?.message}
            {...register('password', {
              required: '비밀번호는 필수 항목입니다.',
              minLength: {
                value: 8,
                message: '8자 이상 입력해주세요.',
              },
            })}
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="비밀번호를 한 번 더 입력해 주세요"
            error={Boolean(errors?.confirmPassword)}
            errorMessage={errors?.confirmPassword?.message}
            {...register('confirmPassword', {
              required: '비밀번호 확인은 필수 항목입니다.',
              validate: (value) => value === password || '비밀번호가 일치하지 않습니다.',
            })}
          />
        </div>

        <button type="submit" disabled={isSubmitting} className="border bg-gray-100 py-[14px]">
          회원가입
        </button>
        {/* 버튼 컴포넌트로 변경 */}
      </form>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="m-auto px-[90px] pb-[28px] pt-[26px] text-right text-[18px] md:w-[540px] md:px-[33px]">
          <p className="pb-[43px] pt-[53px] text-center">{modalMessage}</p>
          <span className="flex justify-center md:justify-end">
            <button type="button" onClick={closeModal} className="h-[42px] w-[138px] rounded-[8px] bg-black text-white">
              확인
            </button>
            {/* 버튼 컴포넌트로 변경 */}
          </span>
        </div>
      </Modal>
    </>
  );
}

export default SignUpForm;
