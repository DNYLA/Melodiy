import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function AddtoPlaylistIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <rect width="20" height="20" stroke="stroke-current" stroke-linejoin="round" stroke-width="2" rx="3" transform="matrix(1 0 0 -1 10.249 32.248)"></rect><path stroke="stroke-current" stroke-linejoin="round" stroke-width="1.5" d="M12.249 12.248h16a3 3 0 0 0-3-3h-10a3 3 0 0 0-3 3Z"></path><path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.021" d="M16.249 22.248h4m4 0h-4m0 0v-4m0 4v4"></path>
    </svg>
  );
}

export { AddtoPlaylistIcon };
