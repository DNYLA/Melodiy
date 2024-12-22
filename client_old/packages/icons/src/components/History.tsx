import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function HistoryIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.248 15v5.555l4.684 2.89"></path><path stroke="stroke-current" stroke-width="2" d="M11.248 20c0 5.523 4.478 10 10 10 5.523 0 10-4.477 10-10s-4.477-10-10-10"></path><path stroke="stroke-current" stroke-dasharray="3 3" stroke-linejoin="round" stroke-width="2" d="M11.248 20c0-5.523 4.478-10 10-10"></path>
    </svg>
  );
}

export { HistoryIcon };
