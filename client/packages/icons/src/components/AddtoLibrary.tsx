import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function AddtoLibraryIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.021" d="M11.984 20.75v8.77m5.762-8.77v8.77m5.762 0V12.231l2.881 1.995 2.881 1.995v13.297h-5.762ZM12.254 14.717h2.526m2.525 0H14.78m0 0v-2.526m0 2.526v2.526"></path>
    </svg>
  );
}

export { AddtoLibraryIcon };
