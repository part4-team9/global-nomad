'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { postLogin } from '@/_apis/authentication';

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

  const handleForm = handleSubmit(async (data: FormValues) => {
    console.log(data);
    try {
      const result = await postLogin(data);
      if (result) {
        router.replace('/main');
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form noValidate onSubmit={handleForm} className="grid w-full px-3 md:px-0 gap-7">
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
      {/* 버튼 컴포넌트로 변경 */}
    </form>
  );
}

export default LoginForm;
