'use client';

import type { ReactNode } from 'react';

const ColorValue: { [key: string]: string } = {
  white: '#FFFFFF',
  nomadBlack: '#112211',
  gray: '#a4a1aa',
};

interface ButtonProps {
  border: boolean | undefined;
  borderColor?: 'white' | 'nomadBlack' | 'gray';
  btnColor: 'white' | 'nomadBlack' | 'gray';
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  textColor: 'white' | 'nomadBlack' | 'gray';
}

export default function Button({
  border = false,
  borderColor = 'nomadBlack',
  btnColor,
  children,
  className,
  disabled = false,
  onClick,
  textColor,
}: ButtonProps) {
  return (
    <button
      type="button"
      aria-label="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: ColorValue[btnColor],
        color: ColorValue[textColor],
        border: border ? `solid 1px ${ColorValue[borderColor]}` : 'none',
      }}
      className={`${className}`}
    >
      {children}
    </button>
  );
}
