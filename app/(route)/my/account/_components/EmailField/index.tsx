import Input from '@/_components/Input';

interface EmailFieldProps {
  defaultValue: string;
}

function EmailField({ defaultValue }: EmailFieldProps) {
  return (
    <div className="grid gap-4">
      <label htmlFor="email" className="text-2xl font-bold leading-none text-black">
        이메일
      </label>
      <Input readOnly disabled id="email" value={defaultValue} placeholder="이메일을 입력해 주세요" />
    </div>
  );
}

export default EmailField;
