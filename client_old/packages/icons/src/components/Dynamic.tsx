import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function DynamicIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path fill="stroke-current" d="M20.638 11h2.918l-2.918 9.655H24.5l-.944 2.655-2.918 8.207 2.152-8.207h-4.325L20.639 11Z"></path><path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m23.556 23.31.944-2.655h-3.862L23.556 11h-2.918l-2.173 12.31h4.325m.766 0-2.918 8.207 2.152-8.207m.766 0h-.766"></path>
    </svg>
  );
}

export { DynamicIcon };
