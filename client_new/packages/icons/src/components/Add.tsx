import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function AddIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.684" d="M24.669 21.113h-4.313m-4.313 0h4.313m0 0v-4.312m0 4.312v4.313"></path><circle cx="20.373" cy="21.13" r="9.261" stroke="stroke-current" stroke-width="1.684"></circle>
    </svg>
  );
}

export { AddIcon };
