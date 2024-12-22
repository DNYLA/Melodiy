import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function AudiobookIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21.243 31.248-8.537-2.383a2 2 0 0 1-1.463-1.926V13.767a2 2 0 0 1 2.453-1.948l6 1.395a2 2 0 0 1 1.547 1.948v16.086Zm0 0 8.538-2.383a2 2 0 0 0 1.462-1.926V13.831a2 2 0 0 0-2.5-1.937l-4.7 1.214"></path>
    </svg>
  );
}

export { AudiobookIcon };
