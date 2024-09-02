import type { FormFieldProps } from '@/_types/userAccount';

import Input from '@/_components/Input';

function NewPasswordField({ register, errors }: FormFieldProps) {
  return (
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
  );
}

export default NewPasswordField;
