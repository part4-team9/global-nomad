import cx from 'clsx';

interface Props {
  width?: number;
  height?: number;
  color?: string;
  rest?: React.SVGProps<SVGSVGElement>;
}

const IconMyInfo = ({ width = 24, height = 24, color = 'gray-500', ...rest }: Props) => (
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
      className={cx('fill-current')}
      d="m21.1 12.5 1.4 1.41-6.53 6.59L12.5 17l1.4-1.41 2.07 2.08 5.13-5.17ZM11 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 7c.68 0 1.5.09 2.41.26l-1.67 1.67-.74-.03c-2.97 0-6.1 1.46-6.1 2.1v1.1h6.2L13 20H3v-3c0-2.66 5.33-4 8-4Z"
    />
  </svg>
);
export default IconMyInfo;
