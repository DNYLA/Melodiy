import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function FriendsIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-width="2.021" d="M29.816 14.735a3.368 3.368 0 1 1-6.735 0 3.368 3.368 0 0 1 6.735 0Z"></path><path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.021" d="m19.53 23.839.75-.5a11.123 11.123 0 0 1 12.338 0l.75.5a3.367 3.367 0 0 1 1.5 2.802v1.677c0 .868-.704 1.572-1.572 1.572H19.601a1.572 1.572 0 0 1-1.571-1.572V26.64c0-1.125.563-2.177 1.5-2.801Z"></path><path stroke="stroke-current" stroke-width="2.021" d="M18.397 14.735a3.368 3.368 0 1 1-6.735 0 3.368 3.368 0 0 1 6.735 0Z"></path><path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.021" d="M15.03 21.47v0c-2.196 0-4.343.65-6.17 1.869l-.75.5a3.367 3.367 0 0 0-1.5 2.802v1.677c0 .868.704 1.572 1.572 1.572h6.061"></path>
    </svg>
  );
}

export { FriendsIcon };
