import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function InfoIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.684" d="M20.605 19.5v5.925"></path><path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.021" d="M20.62 16.031v.038"></path><circle cx="20.622" cy="21.13" r="9.261" stroke="stroke-current" stroke-width="1.684"></circle>
    </svg>
  );
}

export { InfoIcon };