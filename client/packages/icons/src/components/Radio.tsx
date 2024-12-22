import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function RadioIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <circle cx="21.13" cy="21.125" r="1.964" fill="stroke-current"></circle><path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.964" d="M24.53 16.639a5.446 5.446 0 0 1 2.056 4.268 5.446 5.446 0 0 1-2.056 4.269m-6.8 0a5.446 5.446 0 0 1-2.057-4.269c0-1.642.725-3.114 1.872-4.114m9.705-3.525a9.728 9.728 0 0 1 3.702 7.639 9.728 9.728 0 0 1-3.703 7.64m-12.239 0a9.728 9.728 0 0 1-.332-15.004"></path>
    </svg>
  );
}

export { RadioIcon };
