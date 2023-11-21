'use client';

import Image from '@/components/Data/Image';
import { Combobox, Transition } from '@headlessui/react';
import { FC, Fragment, useEffect, useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';

export type ComboBoxItem = {
  id: number;
  name: string;
  image?: string;
};

export interface ComboBoxProps {
  data?: ComboBoxItem[];
  loading: boolean;
  term: string;
  onChange: (value: ComboBoxItem) => void;
  onReset: () => void;
  placeholder?: string;
  id?: string;
  disabled?: boolean;
}

const SearchComboBox: FC<ComboBoxProps> = ({
  data,
  term,
  onChange,
  loading,
  placeholder,
  id,
  disabled,
  onReset,
}) => {
  const [selectedValue, setSelectedValue] = useState<ComboBoxItem | null>(null);
  const [inputValue, setInputValue] = useState(''); //Want to update inputbox with current value without causing a refetch

  const onSelect = (selected: ComboBoxItem | null) => {
    if (!selected) {
      return;
    }

    onChange(selected);
    setSelectedValue(selected);
    setInputValue(selected.name);
  };

  const onInputChange = (name: string) => {
    if (name == '') {
      setInputValue('');
      onReset();
      return;
    }

    setInputValue(name);
    onChange({ id: -1, name }); //if value === selectedValue.name that means we forced the update in onSelect
  };

  useEffect(() => {
    setInputValue(term);
  }, [term]);

  return (
    <div className="relative w-full cursor-default overflow-hidden rounded bg-neutral-700 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
      <Combobox
        disabled={disabled}
        value={selectedValue}
        onChange={(item) => onSelect(item)}
      >
        <Combobox.Button
          onKeyUp={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          className="inset-y-0 right-0 flex w-full items-center"
        >
          <Combobox.Input
            onKeyDown={(e) => e.stopPropagation()} // prevent conflicts with Headless UI keyboard navigation
            onAbort={() => console.log('here')}
            onAbortCapture={() => console.log('here')}
            value={inputValue}
            placeholder={placeholder}
            // className={'w-full px-3 py-2 focus:outline-none'}
            className="w-full items-center justify-center rounded bg-neutral-700 px-2.5 py-2 text-sm leading-none text-white outline-none placeholder:text-sm placeholder:font-extralight placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:bg-neutral-400"
            onChange={(event) => onInputChange(event.target.value)}
            // as={Input}
            id={id}
          />
          {/* <Input
            id={id}
            value={inputValue}
            placeholder={placeholder}
            // disabled={disabled}
            className="w-full items-center justify-center rounded bg-neutral-700 px-2.5 py-2 text-sm leading-none text-white outline-none placeholder:text-sm placeholder:font-extralight placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:bg-neutral-400"
            onChange={(event) => onInputChange(event.target.value)}
          /> */}
        </Combobox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Combobox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-700 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {!data || data.length === 0 || term === '' || loading ? (
              <div className="relative cursor-default select-none px-4 py-2 text-white">
                {loading ? <>Loading...</> : `Enter an ${id} name to search`}
              </div>
            ) : (
              data.map((item: ComboBoxItem) => (
                <Combobox.Option
                  key={item.id}
                  value={item}
                  className={({ active, selected }) =>
                    `flex cursor-default select-none flex-row px-3 py-2 pr-4 ${
                      selected && !active ? 'bg-neutral-600' : ''
                    } ${active ? 'bg-primary text-white' : 'text-white'}`
                  }
                >
                  {({ selected, active }) => (
                    <div className="flex gap-x-2">
                      <Image
                        src={item.image ?? 'images/default_playlist.png'}
                        alt={`${id} cover`}
                        width={40}
                        height={40}
                        className="rounded"
                      />
                      <span
                        className={`my-auto block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item.name}
                      </span>
                      {selected ? (
                        <span
                          className={`ml-auto items-center pl-3 ${
                            active ? 'text-white' : 'text-white-600'
                          }`}
                        >
                          <IoMdCheckmark
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </div>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </Combobox>
    </div>
  );
};

export default SearchComboBox;
