import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function FolderIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linejoin="round" stroke-width="2" d="M31.503 27.248a3 3 0 0 1-3 3h-16a3 3 0 0 1-3-3v-12.5a3 3 0 0 1 3-3h4.36a3 3 0 0 1 2.525 1.381l.345.538a3 3 0 0 0 2.525 1.381h6.245a3 3 0 0 1 3 3v9.2Z"></path>
    </svg>
  );
}

export { FolderIcon };
