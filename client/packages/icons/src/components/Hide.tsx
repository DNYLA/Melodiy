import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function HideIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-width="1.684" d="M30.131 21.13c0 2.35-.874 4.492-2.315 6.125A9.26 9.26 0 0 1 11.61 21.13c0-2.372.891-4.535 2.358-6.174a9.26 9.26 0 0 1 16.164 6.174Z"></path>
    </svg>
  );
}

export { HideIcon };
