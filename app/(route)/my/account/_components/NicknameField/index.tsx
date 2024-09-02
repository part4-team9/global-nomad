import type { FormFieldProps } from '@/_types/userAccount';

import Input from '@/_components/Input';

function NicknameField({ register, errors }: FormFieldProps) {
  return (
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
  );
}

export default NicknameField;
