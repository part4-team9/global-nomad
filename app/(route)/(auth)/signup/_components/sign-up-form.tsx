'use client';

import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import Input from '@/_components/input';

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
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onSubmit' });

  const password = watch('password', ''); // 기본값을 빈 문자열로 설정

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
    <form noValidate className="grid w-full gap-7" onSubmit={handleSubmit(onSubmit)}>
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

      <button type="submit" className="border bg-gray-100 py-[14px]">
        회원가입
      </button>
    </form>
  );
}

export default SignUpForm;
