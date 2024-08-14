import { cn } from '@/_utils/classNames';
import cx from 'clsx';

interface Props {
  width?: number;
  height?: number;
  color?: string;
  rest?: React.SVGProps<SVGSVGElement>;
}

const IconReservationStatus = ({ width = 24, height = 24, color = 'gray-500', ...rest }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    preserveAspectRatio="xMidYMid meet"
    className={cx(color)}
    {...rest}
  >
    <path
      className={cx('fill-current stroke-current')}
      d="M17.5 3v.5H19A1.5 1.5 0 0 1 20.5 5v14c0 .834-.666 1.5-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V5c0-.824.676-1.5 1.5-1.5h1.5v-2h1v2h9v-2h1V3ZM19 19.5h.5v-11h-15v11H19ZM4.5 7v.5h15v-3h-15V7Zm5.706 8.694.354.353.354-.353 4.518-4.519.359.356-5.23 5.222-2.464-2.463.353-.353 1.756 1.757Z"
    />
    <path
      className={cx('fill-current stroke-current')}
      d="M17.5 3v.5H19A1.5 1.5 0 0 1 20.5 5v14c0 .834-.666 1.5-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V5c0-.824.676-1.5 1.5-1.5h1.5v-2h1v2h9v-2h1V3ZM19 19.5h.5v-11h-15v11H19ZM4.5 7v.5h15v-3h-15V7Zm5.706 8.694.354.353.354-.353 4.518-4.519.359.356-5.23 5.222-2.464-2.463.353-.353 1.756 1.757Z"
    />
  </svg>
);
export default IconReservationStatus;
