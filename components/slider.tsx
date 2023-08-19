'use client';
import React, { useEffect } from 'react';
import * as RadixSlider from '@radix-ui/react-slider';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

interface SliderProps {
  value?: number;
  step?: number;
  onChange?: (value: number) => void;
  onCommit?: (value: number) => void;
  className?: string;
  size?: number;
}

function Slider({
  value = 1,
  step = 0.1,
  size = 3,
  onChange,
  onCommit,
  className,
}: SliderProps) {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  const handleCommit = (newValue: number[]) => {
    onCommit?.(newValue[0]);
  };

  const sanitiseValue = () => {
    if (isNaN(value)) return [0];

    return [value];
  };

  return (
    <RadixSlider.Root
      className={twMerge(
        'relative flex items-center select-none touch-none w-full h-10',
        className
      )}
      defaultValue={[1]}
      value={sanitiseValue()}
      onValueChange={handleChange}
      onValueCommit={handleCommit}
      max={1}
      step={step}
      aria-label="Volume"
    >
      <RadixSlider.Track
        className="bg-neutral-600 relative grow rounded-full"
        style={{ height: `${size}px` }}
      >
        <RadixSlider.Range className="absolute bg-white rounded-full h-full" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
}

export default Slider;
