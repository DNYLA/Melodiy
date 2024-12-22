import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function ShowIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-linecap="round" stroke-width="2" d="M21.073 27.667c-1.963-.013-3.759-.632-5.319-1.504m5.32 1.504v3.082m0-3.082c2.018.014 3.85-.614 5.43-1.504m6.034-5.654s-.645.993-1.804 2.24M9.51 20.35s.705 1.073 1.96 2.398m0 0-2.716 2.715m2.715-2.715c1.065 1.125 2.525 2.43 4.285 3.414m0 0-2 3.086m12.75-3.086 1.75 3.086m-1.75-3.086c1.755-.99 3.197-2.303 4.23-3.414m0 0 2.52 2.52"></path>
    </svg>
  );
}

export { ShowIcon };
