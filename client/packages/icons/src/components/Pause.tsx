import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function PauseIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <circle cx="20.378" cy="20.881" r="20.205" fill="fill-current"></circle><path stroke="#000" stroke-linecap="round" stroke-width="3.368" d="M17.01 15.83v10.103m6.736-10.103v10.103"></path>
    </svg>
  );
}

export { PauseIcon };
