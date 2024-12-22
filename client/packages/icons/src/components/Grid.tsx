import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function GridIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <rect width="8.182" height="8.182" x="11.011" y="10.496" stroke="stroke-current" stroke-width="2" rx="2"></rect><rect width="8.182" height="8.182" x="11.011" y="22.314" stroke="stroke-current" stroke-width="2" rx="2"></rect><rect width="8.182" height="8.182" x="22.829" y="10.496" stroke="stroke-current" stroke-width="2" rx="2"></rect><rect width="8.182" height="8.182" x="22.829" y="22.314" stroke="stroke-current" stroke-width="2" rx="2"></rect>
    </svg>
  );
}

export { GridIcon };
