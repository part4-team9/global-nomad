'use client';

/**
 * @interface ButtonProps
 * @property borderRadius - borderRadius 기본값 '4px'
 * @property className - 추가적인 CSS 설정
 * @property disabled - 버튼 비활성화
 * @property fontSize - 텍스트의 폰트 크기를 설정
 * @property isSelected - 버튼이 선택 여부 결정 ture이면 색상변화
 * @property onClick - 버튼 클릭 이벤트 핸들러
 * @property type - 버튼의 동작
 * @property variant - 버튼의 색상
 */

interface ButtonProps {
  borderRadius?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  fontSize?: 'm' | 'base';
  isSelected?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant: 'white' | 'black';
}

const fontSizeClass = {
  m: 'text-m',
  base: 'text-base',
};

export default function Button({
  children,
  onClick,
  disabled = false,
  className = '',
  fontSize = 'base',
  borderRadius = '4px',
  variant = 'white',
  type = 'button',
  isSelected = false,
}: ButtonProps) {
  const baseStyle = `
    font-bold rounded-md transition-colors duration-200
    ${fontSizeClass[fontSize]}
  `;

  let stateStyles = '';
  if (variant === 'white') {
    stateStyles = isSelected ? `bg-nomad-black text-white` : `bg-white text-nomad-black hover:bg-gray-100`;
  } else if (variant === 'black') {
    stateStyles = disabled ? `bg-gray-500 text-white` : `bg-nomad-black text-white hover:bg-white hover:text-nomad-black`;
  }

  const borderStyle = disabled ? '' : 'border border-nomad-black';
  const buttonStyle = `${baseStyle} ${stateStyles} ${className} ${borderStyle}`;

  return (
    // eslint-disable-next-line react/button-has-type
    <button className={buttonStyle} onClick={onClick} disabled={disabled} type={type} style={{ borderRadius }}>
      {children}
    </button>
  );
}
