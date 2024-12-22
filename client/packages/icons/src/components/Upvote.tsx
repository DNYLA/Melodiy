import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function UpvoteIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-width="2" d="M11.751 27.838V19.85c0-.874.71-1.583 1.584-1.583h1.633c.564 0 1.086-.3 1.37-.788l2.99-5.149c.814-1.399 2.954-.822 2.954.796v3.557c0 .875.71 1.584 1.584 1.584h2.122a3.168 3.168 0 0 1 3.088 3.876l-1.107 4.82a3.168 3.168 0 0 1-3.087 2.459H13.335c-.875 0-1.584-.71-1.584-1.584Z"></path>
    </svg>
  );
}

export { UpvoteIcon };
