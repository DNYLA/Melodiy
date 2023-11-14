import { clamp } from '@/lib/utils/number';
import { RefObject, useEffect } from 'react';

export default function useResize(
  parent: RefObject<HTMLDivElement>,
  dragger: RefObject<HTMLDivElement>,
  key: string
) {
  // //TODO: Switch to Framer Motion / GSAP / react-spring
  useEffect(() => {
    if (dragger.current) {
      const savedSize = localStorage.getItem(key);

      if (savedSize) {
        // Sort of a hack, if we are restoring sidebar width from a saved width,
        // we want a smooth transition, but we don't want it if user is manually
        // resizing, so we remove it after.
        parent.current!.classList.add('transition-all');
        resize(Number(savedSize));

        setTimeout(() => {
          parent.current!.classList.remove('transition-all');
        }, 200);
      }

      dragger.current.addEventListener('mousedown', () => {
        document.addEventListener('mousemove', resize, false);
        document.addEventListener(
          'mouseup',
          () => {
            document.removeEventListener('mousemove', resize, false);
          },
          false
        );
      });
    }
  }, []);

  const resize = (xx: number | MouseEvent) => {
    let x = typeof xx == 'number' ? xx : xx.x;
    x = clamp(x, 0, 300);

    localStorage.setItem(key, String(x));
    if (x < 130) {
      parent.current!.style.width = `0px`;
      parent.current!.classList.add('collapsed-sidebar');
      return;
    }
    parent.current!.classList.remove('collapsed-sidebar');
    parent.current!.style.width = `${x}px`;
  };

  return;
}
