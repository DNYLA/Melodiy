import { IconProps } from '../types';
import { twMerge } from 'tailwind-merge';

function VolumeIcon({ width = 50, height = 50, className }: Partial<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={twMerge('text-base-accent stroke-current', className)}
    fill="none"
    viewBox="0 0 41 42" >
      <g clip-path="url(#a)"><path stroke="stroke-current" stroke-width="2.021" d="M13.526 24.242c-2.979-1.489-2.979-5.74 0-7.229l8.732-4.366a.673.673 0 0 1 .975.602v14.757c0 .5-.527.826-.975.602l-8.732-4.366Z"></path><path stroke="stroke-current" stroke-linecap="round" stroke-width="1.684" d="M27.61 25.68c.79-.215 1.52-.693 2.1-1.388.812-.972 1.268-2.29 1.268-3.664s-.456-2.692-1.268-3.663c-.58-.696-1.31-1.173-2.1-1.388"></path><path fill="stroke-current" stroke="stroke-current" stroke-width=".842" d="M26.769 20.117c0-.182.153-.336.322-.266a.841.841 0 0 1 0 1.556c-.169.07-.322-.084-.322-.267v-1.023Z"></path></g><defs><clipPath id="a"><path fill="#fff" d="M9.09 8.842h23.573v23.573H9.09z"></path></clipPath></defs>
    </svg>
  );
}

export { VolumeIcon };
