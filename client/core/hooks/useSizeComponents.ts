import { useState, useLayoutEffect, RefObject } from 'react';

export type SizeProps = {
  width: number;
  height: number;
};

export function useSizeComponents<T> (ref?: RefObject<T>) { // если речь идет о рефе от useRef хука, то ref не опционален,
  const initSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const [size, setSize] = useState<SizeProps>(initSize);

  function updateSize () {
    let newSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    if (ref?.current instanceof HTMLElement) { // и здесь
      newSize = {
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      };
      setSize(newSize);
    }
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}
