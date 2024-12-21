import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function RemovefromQueueIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.357" d="M12.705 23.186h16.838m-16.838 5.611h16.838"></path><path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.021" d="m18.612 12.814 2.539 2.54m2.539 2.538-2.539-2.539m0 0 2.539-2.539m-2.539 2.54-2.539 2.538"></path>
    </svg>
  );
}

export { RemovefromQueueIcon };
