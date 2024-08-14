import { cn } from '@/_utils/classNames';
import cx from 'clsx';

interface Props {
  width?: number;
  height?: number;
  strokeColor?: string;
  fillColor?: string;
  rest?: React.SVGProps<SVGSVGElement>;
}

const IconProfileEdit = ({ width = 25, height = 24, strokeColor = 'white', fillColor = 'white', ...rest }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    preserveAspectRatio="xMidYMid meet"
    className="fill-none"
    {...rest}
  >
    <path
      stroke={strokeColor}
      fill={fillColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.063}
      d="M17.31 6.06 4.554 18.847l-.773 1.872 1.871-.773L18.44 7.19l-1.13-1.13Zm2.553-2.552-.553.552 1.13 1.13.552-.553a.774.774 0 0 0 0-1.094l-.035-.035a.774.774 0 0 0-1.094 0Z"
    />
  </svg>
);

export default IconProfileEdit;
