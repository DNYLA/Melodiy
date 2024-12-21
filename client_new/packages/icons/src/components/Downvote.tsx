import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function DownvoteIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-width="2" d="M30.214 13.832v7.988c0 .874-.709 1.583-1.584 1.583h-1.632c-.564 0-1.086.3-1.37.788l-2.991 5.149c-.813 1.399-2.954.822-2.954-.796v-3.557c0-.875-.709-1.584-1.583-1.584h-2.123a3.168 3.168 0 0 1-3.087-3.876l1.107-4.82a3.168 3.168 0 0 1 3.087-2.459H28.63c.875 0 1.584.71 1.584 1.584Z"></path>
    </svg>
  );
}

export { DownvoteIcon };
