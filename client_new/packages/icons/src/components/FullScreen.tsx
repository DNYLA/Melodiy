import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function FullScreenIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <g clip-path="url(#a)"><path stroke="stroke-current" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.021" d="M12.46 17.734v-3.247c0-.598.484-1.083 1.082-1.083h3.247m12.989 4.33v-3.247c0-.598-.484-1.083-1.082-1.083h-3.247M12.46 23.506v3.247c0 .598.484 1.083 1.082 1.083h3.247m12.989-4.33v3.247c0 .598-.484 1.083-1.082 1.083h-3.247"></path></g><defs><clipPath id="a"><path fill="#fff" d="M11.016 11.96h20.205v17.319H11.016z"></path></clipPath></defs>
    </svg>
  );
}

export { FullScreenIcon };
