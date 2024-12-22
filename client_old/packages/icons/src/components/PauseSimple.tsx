import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function PauseSimpleIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-width="4.191" d="M16.626 14.97v12.574m8.382-12.574v12.574"></path>
    </svg>
  );
}

export { PauseSimpleIcon };
