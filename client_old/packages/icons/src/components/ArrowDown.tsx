import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function ArrowDownIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.021" d="M20.8 13.473v14.312m0 0 5.892-5.893M20.8 27.785l-5.893-5.893"></path>
    </svg>
  );
}

export { ArrowDownIcon };
