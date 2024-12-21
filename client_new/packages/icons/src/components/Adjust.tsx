import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function AdjustIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-width="2" d="M20.248 14h-7a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h7"></path><path stroke="stroke-current" stroke-linecap="round" stroke-width="2" d="M21.248 28.23h7a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2h-7"></path><rect width="6.231" height="6.231" x="24.018" y="13" stroke="stroke-current" stroke-width="2" rx="3.115"></rect><rect width="6.231" height="6.231" x="17.479" y="29.23" stroke="stroke-current" stroke-width="2" rx="3.115" transform="rotate(-180 17.48 29.23)"></rect>
    </svg>
  );
}

export { AdjustIcon };
