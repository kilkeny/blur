import { useState, useLayoutEffect, RefObject } from 'react';

export type SizeProps = {
  width: number;
  height: number;
};

export function useSizeComponents<T> (ref?: RefObject<T>) {
  const [size, setSize] = useState<SizeProps>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    function updateSize () {
      let newSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      if (ref?.current instanceof HTMLElement) {
        newSize = {
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        };
      }
      setSize(newSize);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}
