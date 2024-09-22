import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function BulletPointIcon({
  width = 3,
  height = 4,
  className,
}: Partial<IconProps>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="7"
      viewBox="0 0 3 4"
      fill="none"
    >
      <circle cx="1.5" cy="2" r="1.5" fill="#898989" />
    </svg>
  );
}

export { BulletPointIcon };
