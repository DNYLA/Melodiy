'use client';

import { wait } from '@/lib/utils';
import { Combobox, Transition } from '@headlessui/react';
import { VariantProps, cva } from 'class-variance-authority';
import { FC, Fragment, useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';

export interface SearchSelectProps extends VariantProps<typeof selectVariants> {
  className?: string;
}

const selectVariants = cva(
  'w-full inline-flex h-[35px] items-center gap-[5px] bg-neutral-700',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type Person = {
  id: number;
  name: string;
};

const peopleList: Person[] = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
];

const SearchSelect: FC<SearchSelectProps> = ({ variant, className }) => {
  // const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [people, setPeople] = useState<Person[]>(peopleList);
  const [selectedPeople, setSelectedPeople] = useState([people[0], people[1]]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const fetchResults = async (value: string) => {
    setQuery(value);
    setLoading(true);
    await wait(2500);
    console.log('Huhh');
    const newPerson: Person = {
      id: Math.floor(Math.random() * 2500),
      name: value,
    };
    console.log('Setting People');
    setPeople([...peopleList, newPerson]);
    setLoading(false);

    console.log('Done');
  };

  return (
    <div className="w-full">
      <Combobox
        multiple
        value={selectedPeople}
        onChange={(peoples) => setSelectedPeople(peoples)}
      >
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-neutral-700 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Button className="inset-y-0 right-0 flex  w-full items-center">
            {/* <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-white focus:ring-0"
              // displayValue={(person: Person) => person.name}
              displayValue={(people: Person[]) => {
                console.log(people);
                return people.map((person) => person.name).join(', ');
              }}
              // onChange={(event) => setQuery(event.target.value)}
            /> */}
            <div className="">
              {selectedPeople.length > 0 && (
                <ul>
                  {selectedPeople.map((person) => (
                    <li key={person.id}>{person.name}</li>
                  ))}
                </ul>
              )}
            </div>
            <Combobox.Input
              className={'w-full'}
              onChange={(event) => fetchResults(event.target.value)}
            />
            {/* <FaChevronUp className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
          </Combobox.Button>
        </div>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-700 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {(filteredPeople.length === 0 && query !== '') || loading ? (
              <div className="relative cursor-default select-none px-4 py-2 text-white">
                {loading ? 'Loading...' : 'Nothing found.'}
              </div>
            ) : (
              filteredPeople.map((person: Person) => (
                <Combobox.Option
                  key={person.id}
                  value={person}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-teal-600 text-yellow-300' : 'text-white'
                    }`
                  }
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        >
                          <IoMdCheckmark
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
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
export default SearchSelect;
