import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Button() {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      className={twMerge('bg-modal', isActive && 'bg-emerald-400')}
      onClick={() => setIsActive(!isActive)}
    >
      Button
    </button>
  );
}
