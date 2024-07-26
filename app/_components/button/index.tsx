'use client';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  fontSize?: 'm' | 'base';
  onClick?: () => void;
}

const fontSizeClass = {
  m: 'text-m',
  base: 'text-base',
};

export default function Button({ children, onClick, disabled = false, className = '', fontSize = 'base' }: ButtonProps) {
  const baseStyle = `
    font-bold rounded-md transition-colors duration-200
    ${fontSizeClass[fontSize]}
  `;

  const stateStyles = disabled ? `bg-gray-500 text-white ` : `bg-nomad-black text-white hover:bg-white hover:text-nomad-black border border-nomad-black`;

  const buttonStyle = `${baseStyle} ${stateStyles} ${className} `;

  return (
    <button className={buttonStyle} onClick={onClick} disabled={disabled} type="button">
      {children}
    </button>
  );
}
