import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function DeviceIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <rect width="11.787" height="17.68" x="17.675" y="11.541" stroke="stroke-current" stroke-width="2.063" rx="2.947"></rect><circle cx="23.568" cy="23.328" r="2.947" fill="stroke-current"></circle><circle cx="23.568" cy="15.96" r="1.473" fill="stroke-current"></circle><circle cx="13.255" cy="27.747" r="1.473" fill="stroke-current"></circle><path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.063" d="M13.992 22.59h-.737c-.814 0-1.473-.66-1.473-1.474V15.96c0-.814.66-1.474 1.473-1.474h.737"></path>
    </svg>
  );
}

export { DeviceIcon };
