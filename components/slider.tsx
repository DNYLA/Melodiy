'use client';
import React from 'react';
import * as RadixSlider from '@radix-ui/react-slider';
import { twMerge } from 'tailwind-merge';

interface SliderProps {
  value?: number;
  step?: number;
  onChange?: (value: number) => void;
  className?: string;
  size?: number;
}

function Slider({
  value = 1,
  step = 0.1,
  size = 3,
  onChange,
  className,
}: SliderProps) {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      className={twMerge(
        'relative flex items-center select-none touch-none w-full h-10',
        className
      )}
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={step}
      aria-label="Volume"
    >
      <RadixSlider.Track
        className={`bg-neutral-600 relative grow rounded-full h-[${size}px]`}
      >
        <RadixSlider.Range className="absolute bg-white rounded-full h-full" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
}

export default Slider;
