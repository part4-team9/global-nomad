import Input from '@/_components/Input';

interface PasswordConfirmProps {
  error: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
}

function PasswordConfirmField({ value, error, onChange }: PasswordConfirmProps) {
  return (
    <div className="grid gap-4">
      <label htmlFor="password-confirm" className="text-2xl font-bold leading-none text-black">
        새 비밀번호 재입력
      </label>
      <Input
        id="password-confirm"
        type="password"
        value={value}
        error={error}
        errorMessage="비밀번호가 일치하지 않습니다"
        onChange={onChange}
        placeholder="비밀번호를 한번 더 입력해 주세요"
      />
    </div>
  );
}

export default PasswordConfirmField;
