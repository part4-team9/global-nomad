import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

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
