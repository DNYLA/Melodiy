import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function AddtoQueueIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-width="2.357" d="M19.531 11.96h-4.77a2.806 2.806 0 0 0-2.807 2.807v0a2.806 2.806 0 0 0 2.806 2.807h4.771"></path><path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.357" d="M11.954 23.186h16.838m-16.838 5.613h16.838"></path><path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.021" d="M23.74 14.487h2.526m2.526 0h-2.526m0 0V11.96m0 2.526v2.525"></path>
    </svg>
  );
}

export { AddtoQueueIcon };
