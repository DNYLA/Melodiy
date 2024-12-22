import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function HomeIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.357" d="M25.673 29.295h3.368c.93 0 1.683-.754 1.683-1.684v-7.508c0-.495-.218-.966-.596-1.286l-8.419-7.123a1.684 1.684 0 0 0-2.175 0l-8.419 7.123c-.378.32-.596.79-.596 1.286v7.508c0 .93.754 1.684 1.684 1.684h3.367"></path>
    </svg>
  );
}

export { HomeIcon };
