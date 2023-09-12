import Input from '@/components/Inputs/Input/Input';
import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 250);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleReRoute();
    }
  };

  const handleReRoute = useCallback(() => {
    if (!value || value == '') return;
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({ url: '/search', query });

    router.push(url);
  }, [debouncedValue, router, value]);

  useEffect(() => {
    handleReRoute();
  }, [debouncedValue, router, handleReRoute]);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search"
      onKeyDown={handleKeyDown}
    />
  );
};

export default SearchInput;
