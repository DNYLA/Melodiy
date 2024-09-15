import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function QueueIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-width="2.357" d="M12.457 14.765a2.806 2.806 0 0 1 2.806-2.806h11.225a2.806 2.806 0 1 1 0 5.613H15.263a2.806 2.806 0 0 1-2.806-2.807Z"></path><path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.357" d="M12.457 23.186h16.838m-16.838 5.611h16.838"></path>
    </svg>
  );
}

export { QueueIcon };
