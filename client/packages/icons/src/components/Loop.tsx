import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function LoopIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.021" d="M16.672 27.021h-2.526a3.368 3.368 0 0 1-3.368-3.367v-6.736a3.368 3.368 0 0 1 3.368-3.367h13.47a3.368 3.368 0 0 1 3.368 3.367v6.736a3.368 3.368 0 0 1-3.368 3.367h-6.735m0 0 3.368-3.367M20.88 27.02l3.368 3.368"></path>
    </svg>
  );
}

export { LoopIcon };
