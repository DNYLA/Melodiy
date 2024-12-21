import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function AlbumIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <circle cx="20.881" cy="21.124" r="2.755" stroke="stroke-current" stroke-width="2.021"></circle><path stroke="stroke-current" stroke-linecap="round" stroke-width="2.021" d="M20.881 31.227c-5.58 0-10.103-4.523-10.103-10.103s4.523-10.102 10.103-10.102c2.913 0 5.537 1.232 7.381 3.204"></path><path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.684" d="M29.971 18.498v7.577m0 0v3.763c0 .75-.533 1.403-1.282 1.379-1.238-.039-2.927-.483-2.927-2.616 0-3.368 4.21-2.526 4.21-2.526Z"></path>
    </svg>
  );
}

export { AlbumIcon };
