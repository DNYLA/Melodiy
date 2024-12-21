import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function FontIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path fill="stroke-current" d="M12.495 28.163a1.37 1.37 0 1 1-2.583-.918l4.668-12.924A2 2 0 0 1 16.46 13h.075a2 2 0 0 1 1.88 1.32l4.658 12.898a1.391 1.391 0 1 1-2.622.931l-.738-2.115a1 1 0 0 0-.944-.67h-4.586a1 1 0 0 0-.944.67l-.744 2.129Zm3.64-10.367-1.592 4.526a.5.5 0 0 0 .472.666h2.941a.5.5 0 0 0 .471-.668l-1.61-4.524c-.075-.237-.6-.235-.682 0Zm9.671 10.727a.747.747 0 1 1-1.389-.547l2.499-6.238a1.175 1.175 0 0 1 2.182 0l2.492 6.223a.758.758 0 1 1-1.41.555l-.29-.749a.965.965 0 0 0-.9-.616H27a.965.965 0 0 0-.9.616l-.293.756Zm2-5.137L26.8 25.968h2.404l-1.02-2.582c-.045-.128-.328-.127-.377 0Z"></path>
    </svg>
  );
}

export { FontIcon };
