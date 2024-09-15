import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function PrivateIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <path stroke="stroke-current" stroke-width="1.775" d="M13.978 17.1S12.825 10 20.124 10c7.3 0 6.147 7.1 6.147 7.1m.066.445H13.911a2.663 2.663 0 0 0-2.662 2.663v9.32a2.663 2.663 0 0 0 2.662 2.662h12.426A2.663 2.663 0 0 0 29 29.527v-9.32a2.663 2.663 0 0 0-2.663-2.662Z"></path><circle cx="20.124" cy="25.088" r="2.663" stroke="stroke-current" stroke-width="1.775"></circle>
    </svg>
  );
}

export { PrivateIcon };
