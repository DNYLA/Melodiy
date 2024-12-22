import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import * as RadixSelect from '@radix-ui/react-select';
import { twMerge } from 'tailwind-merge';

interface SelectProps {
  placeholder: string;
  items: SelectItem[];
}

export type SelectItem = {
  text: string;
  value: string;
};

function Select({ placeholder, items }: SelectProps) {
  return (
    <RadixSelect.Root>
      <RadixSelect.Trigger
        // className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
        className="inline-flex items-center justify-center shadow-blackA9 h-[35px] appearance-none rounded px-2.5 py-2 bg-neutral-700 text-sm"
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className="">
          <ChevronDownIcon />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className="100% bg-neutral-700 rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] SelectItem">
          <RadixSelect.ScrollUpButton className="flex items-center justify-center h-[25px] text-white cursor-default">
            <ChevronUpIcon />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport className="p-[5px] ">
            <RadixSelect.Group>
              {items.map((item) => (
                <RadixSelect.Item
                  value={item.value}
                  className={twMerge(
                    'text-[13px] leading-none text-white rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-neutral-500 data-[highlighted]:text-violet1'
                  )}
                >
                  <RadixSelect.ItemText>{item.text}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator className="absolute left-0 inline-flex items-center justify-center">
                    <CheckIcon />
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Group>
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <ChevronDownIcon />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}

export { Select };
