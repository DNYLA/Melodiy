/* eslint-disable no-unused-vars */
import * as RadixSlider from '@radix-ui/react-slider';
import { twMerge } from 'tailwind-merge';

interface SliderProps {
  value?: number;
  step?: number;
  onChange?: (value: number) => void;
  onCommit?: (value: number) => void;
  className?: string;
  size?: number;
}

export function Slider({
  value = 1,
  step = 0.1,
  size = 3,
  onChange,
  onCommit,
  className,
}: SliderProps) {
  const handleChange = (newValue: number[]) => {
    if (!newValue || !newValue[0]) return;
    onChange?.(newValue[0]);
  };

  const handleCommit = (newValue: number[]) => {
    if (!newValue || !newValue[0]) return;

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
        className,
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
        className="relative rounded-full grow bg-base-accent"
        style={{ height: `${size}px` }}
      >
        <RadixSlider.Range className="absolute h-full rounded-full bg-content" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
}
