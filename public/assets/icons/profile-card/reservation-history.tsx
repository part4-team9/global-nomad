import { cn } from '@/_utils/classNames';
import cx from 'clsx';

interface Props {
  width?: number;
  height?: number;
  color?: string;
  rest?: React.SVGProps<SVGSVGElement>;
}

const IconReservationHistory = ({ width = 24, height = 24, color = 'gray-500', ...rest }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    preserveAspectRatio="xMidYMid meet"
    className={cx(color)}
    {...rest}
  >
    <mask id="a" fill="#fff">
      <path d="m17 21-2.75-3 1.16-1.16L17 18.43l3.59-3.59 1.16 1.41M12.8 21H5c-1.11 0-2-.89-2-2V5c0-1.11.89-2 2-2h14c1.11 0 2 .89 2 2v7.8c-.61-.35-1.28-.6-2-.72V5H5v14h7.08c.12.72.37 1.39.72 2Zm-.8-4H7v-2h5m2.68-2H7v-2h10v1.08c-.85.14-1.63.46-2.32.92ZM17 9H7V7h10" />
    </mask>
    <path
      className={cx('fill-current')}
      d="m17 21-2.75-3 1.16-1.16L17 18.43l3.59-3.59 1.16 1.41M12.8 21H5c-1.11 0-2-.89-2-2V5c0-1.11.89-2 2-2h14c1.11 0 2 .89 2 2v7.8c-.61-.35-1.28-.6-2-.72V5H5v14h7.08c.12.72.37 1.39.72 2Zm-.8-4H7v-2h5m2.68-2H7v-2h10v1.08c-.85.14-1.63.46-2.32.92ZM17 9H7V7h10"
    />
  </svg>
);
export default IconReservationHistory;
