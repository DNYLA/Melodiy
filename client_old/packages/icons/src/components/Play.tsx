import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function PlayIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={twMerge('text-base-accent fill-current', className)}
      fill="none"
      viewBox="0 0 41 42"
    >
      <circle cx="20.881" cy="20.881" r="20.205" fill="fill-current"></circle>
      <path
        fill="#000"
        d="M27.004 19.556a1.53 1.53 0 0 1 0 2.651l-8.036 4.64a1.53 1.53 0 0 1-2.296-1.326v-9.279a1.53 1.53 0 0 1 2.296-1.326l8.036 4.64Z"
      ></path>
    </svg>
  );
}

export { PlayIcon };
