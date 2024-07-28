'use client';

interface ButtonProps {
  borderRadius?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  fontSize?: 'm' | 'base';
  isSelected?: boolean;
  onClick?: () => void;
  variant: 'select' | 'action';
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
  variant,
  isSelected = false,
}: ButtonProps) {
  const baseStyle = `
    font-bold rounded-md transition-colors duration-200
    ${fontSizeClass[fontSize]}
  `;

  let stateStyles = '';
  if (variant === 'select') {
    stateStyles = isSelected ? `bg-nomad-black text-white` : `bg-white text-nomad-black hover:bg-gray-100`;
  } else if (variant === 'action') {
    stateStyles = disabled ? `bg-gray-500 text-white` : `bg-nomad-black text-white hover:bg-white hover:text-nomad-black`;
  }

  const borderStyle = disabled ? '' : 'border border-nomad-black';
  const buttonStyle = `${baseStyle} ${stateStyles} ${className} ${borderStyle}`;

  return (
    <button className={buttonStyle} onClick={onClick} disabled={disabled} type="button" style={{ borderRadius }}>
      {children}
    </button>
  );
}
