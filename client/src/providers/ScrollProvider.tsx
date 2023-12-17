'use client';

import { MotionValue } from 'framer-motion';
import { createContext } from 'react';

interface ScrollContextType {
  scrollX?: MotionValue;
  scrollY?: MotionValue;
  scrollXProgress?: MotionValue;
  scrollYProgress?: MotionValue;
}
export const ScrollContext = createContext<ScrollContextType>({});
