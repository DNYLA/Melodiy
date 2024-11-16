'use client';

import { MatchRoute, useMatchRoute, useNavigate } from '@tanstack/react-router';
import qs from 'query-string';
import { useCallback, useEffect, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import { Input } from '../../Inputs';
import { SearchIcon } from '@melodiy/icons';
import { twMerge } from 'tailwind-merge';

export function SearchInput() {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 250);
  const matchRoute = useMatchRoute();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleReRoute();
    }
  };

  const handleReRoute = useCallback(() => {
    if (!debouncedValue || debouncedValue === '') return;
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({ url: '/search', query });
    navigate({ to: url });
  }, [debouncedValue, navigate]);

  useEffect(() => {
    handleReRoute();
  }, [debouncedValue, handleReRoute]);

  const isActive = matchRoute({ to: '/search' }) !== false; //idk how this works but if it isn't equal to false then we are on the page

  return (
    <div
      className={twMerge(
        'flex items-center justify-center cursor-pointer group text-base-accent',
        isActive && 'rounded-[10px] bg-accent text-white',
      )}
    >
      <SearchIcon
        width={50}
        height={50}
        className={twMerge(
          'group-hover:stroke-content group-[&.active]:stroke-content p-1',
        )}
      />
      <Input
        variant="default"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
        className={twMerge(
          'text-base-accent bg-transparent group-hover:text-white group-hover:placeholder:text-white',
          isActive && 'text-white',
        )}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
