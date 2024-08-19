'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { GetUserType } from '@/_types/user';

import useModalState from '@/_hooks/useModalState';

import Button from '@/_components/button';
import Input from '@/_components/input';

import CommonModal from '../CommonModal';

interface FormData {
  newPassword: string;
  nickname: string;
  profileImageUrl?: string;
}

function AccountForm({ data }: { data: GetUserType }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      nickname: data.nickname || '',
      profileImageUrl: data.profileImageUrl,
      newPassword: '',
    },
  });

  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const { modalState, setModalState, openModal, closeModal } = useModalState();
  const newPassword = watch('newPassword');
  const newNickname = watch('nickname');
  const buttonDisabled = !isValid || isSubmitting || passwordConfirm === '' || passwordError;

  console.log(newNickname);

  const handleChangePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const onSubmit = (formData: FormData) => {
    console.log(formData);
  };

  useEffect(() => {
    if (passwordConfirm !== '') {
      setPasswordError(!(newPassword === passwordConfirm));
    }
  }, [newPassword, passwordConfirm]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // 페이지 벗어날 때 authConfirm 쿠키 삭제 (과거로 설정)
      document.cookie = 'authConfirm=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      const hasChanged = data.nickname !== newNickname || newPassword !== '' || passwordConfirm !== '';
      if (hasChanged) {
        e.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [data.nickname, newNickname, newPassword, passwordConfirm]);

  return (
    <form className="grid gap-4 tablet:gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-black">내 정보</h1>
        <Button variant="black" type="submit" disabled={buttonDisabled} className="h-12 w-[120px]">
          수정하기
        </Button>
      </div>
      <div className="grid gap-8">
        <div className="grid gap-4">
          <label htmlFor="nickname" className="text-2xl font-bold leading-none text-black">
            닉네임
          </label>
          <Input
            id="nickname"
            placeholder="닉네임을 입력해 주세요"
            error={Boolean(errors?.nickname)}
            errorMessage={errors.nickname?.message}
            {...register('nickname', { required: '닉네임을 입력해 주세요', maxLength: { value: 10, message: '닉네임은 10자 이하로 작성해주세요.' } })}
          />
        </div>
        <div className="grid gap-4">
          <label htmlFor="email" className="text-2xl font-bold leading-none text-black">
            이메일
          </label>
          <Input readOnly disabled id="email" defaultValue={data.email} placeholder="이메일을 입력해 주세요" />
        </div>
        <div className="grid gap-4">
          <label htmlFor="new-password" className="text-2xl font-bold leading-none text-black">
            새 비밀번호
          </label>
          <Input
            id="new-password"
            type="password"
            placeholder="8자 이상 입력해 주세요"
            error={Boolean(errors?.newPassword)}
            errorMessage={errors.newPassword?.message}
            {...register('newPassword', {
              required: '비밀번호는 필수 입력 항목입니다.',
              minLength: { value: 8, message: '비밀번호는 최소 8자 이상이어야 합니다.' },
            })}
          />
        </div>
        <div className="grid gap-4">
          <label htmlFor="password-confirm" className="text-2xl font-bold leading-none text-black">
            새 비밀번호 재입력
          </label>
          <Input
            id="password-confirm"
            type="password"
            value={passwordConfirm}
            error={passwordError}
            errorMessage="비밀번호가 일치하지 않습니다"
            onChange={handleChangePassword}
            placeholder="비밀번호를 한번 더 입력해 주세요"
          />
        </div>
      </div>
    </form>
  );
}

export default AccountForm;
