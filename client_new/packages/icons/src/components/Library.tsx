import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function LibraryIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.021" d="M12.232 12.232V29.52m5.762-17.288V29.52"></path><path fill="stroke-current" stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.021" d="M23.757 29.52V12.231l5.762 3.99v13.297h-5.762Z"></path>
    </svg>
  );
}

export { LibraryIcon };
