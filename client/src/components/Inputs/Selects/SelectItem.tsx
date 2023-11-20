import * as Select from '@radix-ui/react-select';
import { SelectItemProps } from '@radix-ui/react-select';
import { forwardRef } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={twMerge(
          'relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-violet11 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[highlighted]:outline-none',
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
          <FaCheck />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export default SelectItem;
