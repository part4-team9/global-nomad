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
      d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h14c1.11 0 2-.89 2-2V5a2 2 0 0 0-2-2Zm0 16H5V9h14v10ZM5 7V5h14v2H5Zm5.56 10.46 5.94-5.93-1.07-1.06-4.87 4.87-2.11-2.11-1.06 1.06 3.17 3.17Z"
    />
  </svg>
);
export default IconReservationStatus;
