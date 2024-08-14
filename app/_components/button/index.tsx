'use client';

/**
 * Button 컴포넌트
 *
 * @param {string} [borderRadius='4px'] - borderRadius 기본값 '4px'
 * @param {string} [className=''] - 추가적인 CSS 설정
 * @param {boolean} [disabled=false] - 버튼 비활성화 여부
 * @param {'m' | 'base'} [fontSize='base'] - 텍스트의 폰트 크기
 * @param {boolean} [isSelected=false] - 버튼이 선택 여부 결정 true이면 색상변화
 * @param {() => void} [onClick] - 버튼 클릭 이벤트 핸들러
 * @param {'button' | 'submit' | 'reset'} [type='button'] - 버튼의 타입
 * @param {'white' | 'black'} variant - 버튼의 색상 변형
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
    stateStyles = disabled ? `bg-gray-500 text-white` : `bg-nomad-black text-white hover:bg-green-950`;
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
