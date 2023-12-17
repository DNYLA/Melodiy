'use client';

import { Input } from '@/components/Inputs/Input';
import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';

export interface DebounceInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const DebouncedInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleReRoute();
    }
  };

  const handleReRoute = useCallback(() => {
    if (!debouncedValue || debouncedValue == '') return;
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({ url: '/search', query });
    router.push(url);
    // redirect(url, RedirectType.push);
  }, [debouncedValue, router]);

  useEffect(() => {
    handleReRoute();
  }, [debouncedValue, router, handleReRoute]);

  return (
    <Input
      variant={'alternative'}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search"
      onKeyDown={handleKeyDown}
    />
  );
};

export default DebouncedInput;
