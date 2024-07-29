'use client';

import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import Input from '@/_components/input';

type FormValues = {
  email: string;
  password: string;
};

function LoginForm() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // 회원가입 성공 시 리디렉션
        router.push('/login');
      } else {
        // 에러 처리
        console.error('회원가입 실패');
      }
    } catch (error) {
      console.error('서버와 통신 중 오류 발생:', error);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="grid w-full gap-7">
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
      <button type="submit" disabled={isSubmitting} className="border bg-gray-100 py-[14px]">
        로그인
      </button>
    </form>
  );
}

export default LoginForm;
