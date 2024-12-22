import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function CameraIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.503 17.5v9.49a2.778 2.778 0 0 0 2.777 2.779h19.445a2.778 2.778 0 0 0 2.778-2.778V17.5a2.778 2.778 0 0 0-2.778-2.778h-1.45c-.534 0-1.042-.23-1.393-.632l-1.934-2.208a1.852 1.852 0 0 0-1.393-.632h-7.442c-.534 0-1.042.23-1.393.632l-1.934 2.208c-.352.402-.86.632-1.393.632H11.28A2.778 2.778 0 0 0 8.503 17.5Z"></path><circle cx="21.003" cy="20.971" r="4.167" stroke="stroke-current" stroke-width="2"></circle>
    </svg>
  );
}

export { CameraIcon };
