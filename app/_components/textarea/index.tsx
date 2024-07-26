'use client';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size: 'small' | 'big';
}

/**
 * Textarea 공통 컴포넌트
 * @size small: 후기 작성, big: 체험 등록
 */
function Textarea({ size, ...rest }: TextareaProps) {
  const isSmall = size === 'small' ? 'mobile:h-[240px]' : '';

  return (
    <div>
      <textarea
        className={`h-[346px] w-full resize-none rounded border border-solid border-gray-600 px-4 py-2 leading-[1.6] text-black outline-none placeholder:text-gray-500 ${isSmall}`}
        {...rest}
      />
    </div>
  );
}

export default Textarea;
