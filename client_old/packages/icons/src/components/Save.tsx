import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function SaveIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-width="2.32" d="M12.74 13.32v16.303a1.16 1.16 0 0 0 1.835.944l4.936-3.526a2.32 2.32 0 0 1 2.697 0l4.937 3.526a1.16 1.16 0 0 0 1.834-.944V13.32a2.32 2.32 0 0 0-2.32-2.32H15.06a2.32 2.32 0 0 0-2.32 2.32Z"></path>
    </svg>
  );
}

export { SaveIcon };
