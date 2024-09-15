import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function MoreIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <circle cx="12.7" cy="20.877" r="1.684" fill="stroke-current"></circle><circle cx="21.119" cy="20.877" r="1.684" fill="stroke-current"></circle><circle cx="29.538" cy="20.877" r="1.684" fill="stroke-current"></circle>
    </svg>
  );
}

export { MoreIcon };
