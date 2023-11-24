'use client';

import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef } from 'react';

export default function Playlist() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, scrollY } = useScroll({ container: carouselRef });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    console.log('Page scroll: ', latest);
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    console.log('Page scroll Progress: ', latest);
  });
  return (
    <div className="base-container flex flex-col gap-y-5" ref={carouselRef}>
      <div className="h-[400px] bg-red-500">Block 1</div>
      <div className="h-[300px] bg-yellow-500">Block 2</div>
      <div className="h-[250px] bg-green-500">Block 3</div>
      <div className="h-[300px] bg-red-500">Block 4</div>
      <div className="h-[300px] bg-yellow-500">Block 5</div>
      <div className="h-[350px] bg-green-500">Block 6</div>
    </div>
  );
}
