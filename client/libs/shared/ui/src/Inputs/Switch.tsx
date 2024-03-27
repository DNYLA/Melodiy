import * as SwitchRadix from '@radix-ui/react-switch';
import { FC } from 'react';

interface SwitchProps {
  value: boolean;
  onChange?: (value: boolean) => void;
  children: React.ReactNode;
}

export function Switch({ value, children, onChange }: SwitchProps) {
  return (
    <div className="flex items-center justify-between">
      <label className="pr-[15px] text-[15px] leading-none text-white">
        {children}
      </label>
      <SwitchRadix.Root
        onCheckedChange={onChange}
        checked={value}
        defaultChecked={value}
        className="shadow-blackA4 outline:none relative h-[25px] w-[42px] cursor-default rounded-full bg-black shadow-[0_2px_10px]  shadow-black outline-none transition-all duration-300 focus:shadow-black data-[state=checked]:bg-primary"
      >
        <SwitchRadix.Thumb className="block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-white shadow-black transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
      </SwitchRadix.Root>
    </div>
  );
}
