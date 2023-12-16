'use client';

import Image from '@/components/Data/Image';
import { Combobox, Transition } from '@headlessui/react';
import { FC, Fragment, useEffect, useState } from 'react';
import { IoIosCheckmarkCircle, IoMdCheckmark } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';

export type ComboBoxItem = {
  id?: string;
  name: string;
  verified: boolean;
  image?: string;
};

export interface ComboBoxProps {
  data?: ComboBoxItem[];
  loading: boolean;
  term: string;
  onChange: (value: ComboBoxItem) => void;
  onReset: () => void;
  placeholder?: string;
  disabled?: boolean;
}

const SearchComboBox: FC<ComboBoxProps> = ({
  data,
  term,
  onChange,
  loading,
  placeholder,
  disabled,
  onReset,
}) => {
  const [selectedValue, setSelectedValue] = useState<ComboBoxItem | null>(null);
  const [inputValue, setInputValue] = useState(''); //Want to update inputbox with current value without causing a refetch

  const onSelect = (selected: ComboBoxItem | null) => {
    console.log(selected);
    if (!selected) {
      onReset();
      setInputValue('');
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
      setSelectedValue(null);
      return;
    }

    setInputValue(name);
    // setSelectedValue(null);
    onChange({ id: undefined, name, verified: false }); //if value === selectedValue.name that means we forced the update in onSelect
  };

  const onBlur = () => {
    // if (!selectedValue) {
    //   onReset();
    //   setInputValue('');
    // } else if (selectedValue && selectedValue.name !== inputValue) {
    //   setInputValue(selectedValue.name);
    // }

    if (
      selectedValue &&
      selectedValue.name !== inputValue &&
      inputValue !== ''
    ) {
      setInputValue(selectedValue.name);
      onChange(selectedValue);
    }
  };

  useEffect(() => {
    setInputValue(term);
    console.log(term);
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
            autoComplete={'off'}
            onBlur={onBlur}
            onKeyDown={(e) => e.stopPropagation()} // prevent conflicts with Headless UI keyboard navigation
            onAbort={() => console.log('here')}
            onAbortCapture={() => console.log('here')}
            value={inputValue}
            placeholder={placeholder}
            className="w-full items-center justify-center rounded bg-neutral-700 px-2.5 py-2 text-sm leading-none text-white outline-none placeholder:text-sm placeholder:font-extralight placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:bg-neutral-400"
            onChange={(event) => onInputChange(event.target.value)}
          />
          {/* <Input
            autoComplete={'none'}
            onBlur={onBlur}
            onKeyDown={(e) => e.stopPropagation()} // prevent conflicts with Headless UI keyboard navigation
            onAbort={() => console.log('here')}
            onAbortCapture={() => console.log('here')}
            value={inputValue}
            placeholder={placeholder}
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
                {loading ? (
                  <>Loading...</>
                ) : term.length > 3 && (!data || data?.length == 0) ? (
                  `${inputValue} not found`
                ) : (
                  `Enter three character(s) to search`
                )}
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
                        alt={`item cover`}
                        width={40}
                        height={40}
                        className="rounded"
                      />

                      <span
                        className={`my-auto flex gap-x-1  truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item.verified && (
                          <IoIosCheckmarkCircle
                            className={twMerge(
                              'text-primary',
                              active && 'text-primary-light'
                            )}
                            size={18}
                          />
                        )}
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
            {inputValue.length >= 3 && (
              <Combobox.Option
                key={'new'}
                value={{ id: 'new', name: inputValue }}
                className={({ active, selected }) =>
                  `flex cursor-default select-none flex-row px-3 py-2 pr-4 ${
                    selected && !active ? 'bg-neutral-600' : ''
                  } ${active ? 'bg-primary text-white' : 'text-white'}`
                }
              >
                <span>Create new {inputValue}</span>
              </Combobox.Option>
            )}
          </Combobox.Options>
        </Transition>
      </Combobox>
    </div>
  );
};

export default SearchComboBox;
