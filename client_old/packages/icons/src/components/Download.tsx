import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function DownloadIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.021" d="M21.119 16.078v9.862m0 0 3.367-3.367M21.12 25.94l-3.368-3.367"></path><circle cx="21.119" cy="21.13" r="9.261" stroke="stroke-current" stroke-width="1.684"></circle>
    </svg>
  );
}

export { DownloadIcon };
