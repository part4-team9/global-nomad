/* eslint-disable @typescript-eslint/await-thenable */

'use client';

import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getUser, postLogin } from '@/_apis/user/userAccount';
import { useMutation, useQuery } from '@tanstack/react-query';

import { setCookie } from '@/_utils/cookie';

import Button from '@/_components/button';
import Input from '@/_components/input';

import DefaultProfile from 'public/assets/icons/default-profile.svg';

interface ErrorResponse {
  message: string;
}

interface Inputs {
  email: string;
  password: string;
}

/**
 * 내 정보 수정 페이지 진입 전 비밀번호 체크하는 컴포넌트입니다.
 *
 * 비밀번호가 일치할 경우 정보 수정 페이지로 이동합니다. (my/account)
 * 비밀번호가 틀릴 경우 에러 메세지를 보여주고, 비밀번호 input 값을 초기화합니다.
 */
function AccountConfirm() {
  const router = useRouter();
  const { data, isError, error } = useQuery({ queryKey: ['account'], queryFn: getUser, retry: 0 });
  const [imagePath, setImagePath] = useState(data?.profileImageUrl || DefaultProfile);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const accountCheckMutation = useMutation({
    mutationFn: async (formData: Inputs) => postLogin(formData),
    onSuccess: async () => {
      await setCookie('authConfirm', 'true');
      router.push('/my/account');
    },
    onError: (mutationError: AxiosError<ErrorResponse>) => {
      const status = mutationError.response?.status;
      const message = mutationError?.response?.data?.message;

      if (status === 401) {
        router.push('/login');
      }

      setError('password', { message });
      setValue('password', '');
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    accountCheckMutation.mutate(formData);
  };

  useEffect(() => {
    if (data?.profileImageUrl) {
      setImagePath(data.profileImageUrl);
    }
  }, [data]);

  useEffect(() => {
    if (isError && error instanceof AxiosError) {
      if (error.response?.status === 401) {
        router.push('/login');
      } else {
        // TODO 에러 메세지 모달
      }
    }
  }, [isError, error, router]);

  return (
    <div>
      {data && (
        <form className="grid gap-5 py-5" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-bold text-black">{data.nickname}</h1>
          <div className="flex flex-wrap items-center gap-2 rounded bg-white px-5 py-2 shadow-md">
            <div className="size-8 overflow-hidden rounded-full">
              <Image src={imagePath} alt={`${data?.nickname} 프로필 이미지`} onError={() => setImagePath(DefaultProfile)} className="rounded-full" />
            </div>
            <input readOnly defaultValue={data.email} className="outline-none" {...register('email')} />
          </div>
          <p className="break-keep text-black">내 정보를 수정하려면 비밀번호를 입력해주세요.</p>
          <Input
            type="password"
            placeholder="비밀번호 입력"
            error={Boolean(errors.password)}
            errorMessage={errors.password?.message}
            {...register('password', {
              required: '비밀번호는 필수 입력 항목입니다.',
              minLength: { value: 8, message: '비밀번호는 최소 8자 이상이어야 합니다.' },
            })}
          />
          <Button type="submit" variant="black" className="ml-auto px-5 py-[10px]">
            다음
          </Button>
        </form>
      )}
    </div>
  );
}

export default AccountConfirm;
