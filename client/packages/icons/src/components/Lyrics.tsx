import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function LyricsIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-width="2" d="M11.762 14.25h12m-12 7h8m-8 7h8"></path><path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M29.762 13.25v8.934m0 0v4.665c0 .75-.533 1.4-1.283 1.401-1.481.003-3.717-.433-3.717-3.088 0-3.97 5-2.978 5-2.978Z"></path>
    </svg>
  );
}

export { LyricsIcon };
