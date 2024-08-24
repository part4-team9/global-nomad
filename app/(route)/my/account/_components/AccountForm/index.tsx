'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { patchUser } from '@/_apis/user/userAccount';
import { useMutation } from '@tanstack/react-query';

import type { GetUserType } from '@/_types/user';
import type { ErrorResponse, UserFormData } from '@/_types/userAccount';

import useModalState from '@/_hooks/useModalState';

import Button from '@/_components/button';

import CommonModal from '../CommonModal';
import EmailField from '../EmailField';
import NewPasswordField from '../NewPasswordField';
import NicknameField from '../NicknameField';
import PasswordConfirmField from '../PasswordConfirmField';

const EXPIRED_COOKIE = 'authConfirm=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

/**
 * AccountForm
 *
 * 사용자가 계정 정보를 수정할 수 있는 폼 컴포넌트입니다.
 * 이메일은 수정할 수 없으며, 읽기 전용으로 표시됩니다.
 *
 * 사용자가 페이지에서 벗어날 때 'authConfirm' 쿠키를 만료시켜, 보안성을 강화합니다.
 *
 * @param {GetUserType} data 기존 유저 데이터 (닉네임, 이메일, 프로필 이미지 URL)
 *
 * @returns {JSX.Element} 사용자가 정보를 수정할 수 있는 폼을 렌더링합니다.
 */
function AccountForm({ data }: { data: GetUserType }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<UserFormData>({
    mode: 'onChange',
    defaultValues: {
      nickname: data.nickname,
      profileImageUrl: data.profileImageUrl,
      newPassword: '',
    },
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const { modalState, setModalState, closeModal, activeCloseModal } = useModalState();
  const newPassword = watch('newPassword');

  const handleChangePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const accountMutation = useMutation({
    mutationFn: patchUser,
    onSuccess: () => {
      setModalState((prev) => ({
        ...prev,
        isOpen: true,
        message: '수정이 완료되었습니다.',
        onClose: () => {
          document.cookie = EXPIRED_COOKIE;
          window.location.href = '/my/account';
        },
      }));
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const status = error.response?.status;
      const message = error?.response?.data?.message || '정보 수정에 실패했습니다.';

      if (status === 401) {
        setModalState((prev) => ({
          ...prev,
          isOpen: true,
          message: '로그인 정보가 유효하지 않습니다. 다시 로그인해 주세요.',
          onClose: () => router.push('/login'),
        }));
      } else {
        setModalState((prev) => ({
          ...prev,
          isOpen: true,
          message,
        }));
      }
    },
  });

  const { isPending } = accountMutation;

  const onSubmit = (formData: UserFormData) => {
    setModalState((prev) => ({
      ...prev,
      mode: 'confirm',
      isOpen: true,
      message: '변경된 내용을 저장하시겠습니까?',
      onClose: () => accountMutation.mutate(formData),
    }));
  };

  useEffect(() => {
    setButtonDisabled(isPending || !isValid || isSubmitting || passwordConfirm === '' || passwordError);
  }, [isPending, isValid, isSubmitting, passwordConfirm, passwordError]);

  useEffect(() => {
    setPasswordError(passwordConfirm !== '' && newPassword !== passwordConfirm);
  }, [newPassword, passwordConfirm]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      document.cookie = EXPIRED_COOKIE;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <form className="grid gap-4 tablet:gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-black">내 정보</h1>
          <Button variant="black" type="submit" disabled={buttonDisabled} className="h-12 w-[120px]">
            수정하기
          </Button>
        </div>
        <div className="grid gap-8">
          <NicknameField register={register} errors={errors} />
          <EmailField defaultValue={data.email} />
          <NewPasswordField errors={errors} register={register} />
          <PasswordConfirmField value={passwordConfirm} error={passwordError} onChange={handleChangePassword} />
        </div>
      </form>
      <CommonModal
        mode={modalState.mode}
        message={modalState.message}
        isOpen={modalState.isOpen}
        closeModal={closeModal}
        activeCloseModal={activeCloseModal}
        isPending={isPending}
      />
    </>
  );
}

export default AccountForm;
