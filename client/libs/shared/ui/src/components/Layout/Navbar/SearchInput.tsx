'use client';

import { useNavigate } from '@tanstack/react-router';
import qs from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import { Input } from '../../Inputs';

export function SearchInput() {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 250);

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

  return (
    <Input
      variant={'alternative'}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search"
      onKeyDown={handleKeyDown}
    />
  );
}
