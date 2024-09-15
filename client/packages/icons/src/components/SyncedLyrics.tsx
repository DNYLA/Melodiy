import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function SyncedLyricsIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-width="2" d="M11.253 13h4.656m-4.656 6.223h4.656"></path><path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.142 11a9.11 9.11 0 1 1 0 18.221s-5.333 0-8-4.442"></path><path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.348 14.557v5.554l4.684 2.89"></path>
    </svg>
  );
}

export { SyncedLyricsIcon };
