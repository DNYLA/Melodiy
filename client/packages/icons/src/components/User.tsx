import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function UserIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-width="2.021" d="M24.492 13.891a3.368 3.368 0 1 1-6.735 0 3.368 3.368 0 0 1 6.735 0Z"></path><path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.021" d="m14.205 22.995.75-.5a11.122 11.122 0 0 1 12.339 0l.75.5a3.367 3.367 0 0 1 1.5 2.802v1.677c0 .868-.704 1.572-1.572 1.572H14.277a1.572 1.572 0 0 1-1.572-1.572v-1.677c0-1.126.563-2.178 1.5-2.802Z"></path>
    </svg>
  );
}

export { UserIcon };
