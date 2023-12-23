'use client';
import * as RadixSlider from '@radix-ui/react-slider';
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface SliderProps {
  value?: number;
  step?: number;
  onChange?: (value: number) => void;
  onCommit?: (value: number) => void;
  className?: string;
  size?: number;
}

const Slider: FC<SliderProps> = ({
  value = 1,
  step = 0.1,
  size = 3,
  onChange,
  onCommit,
  className,
}) => {
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
        'relative flex h-10 w-full touch-none select-none items-center',
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
        className="relative grow rounded-full bg-neutral-600"
        style={{ height: `${size}px` }}
      >
        <RadixSlider.Range className="absolute h-full rounded-full bg-white" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default Slider;
