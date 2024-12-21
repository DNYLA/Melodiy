import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function AddSimpleIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.021" d="M20.627 13.985v7.144m0 7.144v-7.144m0 0h-7.144m7.144 0h7.144"></path>
    </svg>
  );
}

export { AddSimpleIcon };
