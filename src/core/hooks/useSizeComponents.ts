import { useState, useLayoutEffect, RefObject } from 'react';

export function useSizeComponents<T>(ref?: RefObject<T>) {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      let newSize = [window.innerWidth, window.innerHeight];
      if (ref?.current instanceof HTMLElement) {
        newSize = [ref.current.offsetWidth, ref.current.offsetHeight];
      }
      setSize(newSize);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}
