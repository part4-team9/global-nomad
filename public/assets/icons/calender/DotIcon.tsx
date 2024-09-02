import cx from 'clsx';

interface Props {
  width?: number;
  height?: number;
  colorClass?: string;
  rest?: React.SVGProps<SVGSVGElement>;
}

const DotIcon = ({ width = 8, height = 8, colorClass = 'fill-blue-500', ...rest }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    preserveAspectRatio="xMidYMid meet"
    className={'fill-none'}
    {...rest}
  >
    <circle cx={4.15} cy={4} r={4} className={cx('fill-current', colorClass)} />
  </svg>
);

export default DotIcon;
