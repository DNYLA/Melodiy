import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function ShareIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.021" d="M21.609 22.934V11.658m0 0-4.643 4.643m4.643-4.643 4.643 4.643m3.648 4.975v4.643a2.653 2.653 0 0 1-2.653 2.653H15.971a2.653 2.653 0 0 1-2.653-2.653v-4.643"></path>
    </svg>
  );
}

export { ShareIcon };
