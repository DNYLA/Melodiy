import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function MiniplayerIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path fill="stroke-current" d="M20.029 22.906c0-.93.753-1.683 1.683-1.683h7.577c.93 0 1.684.754 1.684 1.683v4.21c0 .93-.754 1.684-1.684 1.684h-7.577c-.93 0-1.683-.754-1.683-1.684v-4.21Z"></path><path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.021" d="M17.503 27.957h-4.21c-.93 0-1.683-.754-1.683-1.684V14.486c0-.93.753-1.683 1.683-1.683h15.154c.93 0 1.684.754 1.684 1.683v4.21"></path>
    </svg>
  );
}

export { MiniplayerIcon };
