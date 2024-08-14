import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

/**
 * 브라우저 창의 너비(width)를 추적하고 반환합니다.
 */
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    handleResize();
    const debouncedHandleResize = debounce(handleResize, 300);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
