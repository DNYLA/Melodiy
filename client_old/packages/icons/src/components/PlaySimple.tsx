import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function PlaySimpleIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path fill="stroke-current" d="M29.018 18.91c1.257.726 1.257 2.54 0 3.265l-9.897 5.715c-1.257.726-2.828-.182-2.828-1.633V14.828c0-1.45 1.571-2.358 2.828-1.632l9.898 5.714Z"></path>
    </svg>
  );
}

export { PlaySimpleIcon };
