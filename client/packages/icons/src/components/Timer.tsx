import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function TimerIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <circle cx="20.746" cy="22" r="10.1" stroke="stroke-current" stroke-width="1.8"></circle><path stroke="stroke-current" stroke-linecap="round" stroke-width="2" d="M20.746 15v5m4-11h-8"></path>
    </svg>
  );
}

export { TimerIcon };
