import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function Move2Icon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <circle cx="16.895" cy="12.9" r="1.9" fill="stroke-current"></circle><circle cx="24.495" cy="12.9" r="1.9" fill="stroke-current"></circle><circle cx="16.895" cy="20.5" r="1.9" fill="stroke-current"></circle><circle cx="16.895" cy="28.099" r="1.9" fill="stroke-current"></circle><circle cx="24.495" cy="20.5" r="1.9" fill="stroke-current"></circle><circle cx="24.495" cy="28.099" r="1.9" fill="stroke-current"></circle>
    </svg>
  );
}

export { Move2Icon };
