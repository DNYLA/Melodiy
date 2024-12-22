import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function PinIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m30.245 16.593 1.518 1.518m-1.518-1.518-6.7 6.7a.78.78 0 0 0-.223.457l-.334 2.753a.779.779 0 0 1-1.324.457l-3.929-3.928m12.51-6.439-6.071-6.071m-1.518-1.518 1.518 1.518m0 0-6.7 6.7a.779.779 0 0 1-.457.223l-2.753.334a.779.779 0 0 0-.457 1.324l3.928 3.929m0 0L12.568 28.2"></path>
    </svg>
  );
}

export { PinIcon };