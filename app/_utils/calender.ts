import { cva } from 'class-variance-authority';

export const calcLastColumCellStyles = ({ index, length }: { index: number; length: number }) => {
  const styles = cva('', {
    variants: {
      position: {
        default: 'border-r',
        last: 'border-r-0',
      },
    },
    defaultVariants: {
      position: 'default',
    },
  });
  const position = index === length - 1 ? 'last' : 'default';
  return styles({ position });
};
