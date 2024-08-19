import { useEffect, useState } from 'react';

interface FetchSizeOptions {
  desktopSize: number;
  mobileSize: number;
  tabletSize: number;
}

const useResFetchCount = ({ mobileSize, tabletSize, desktopSize }: FetchSizeOptions) => {
  const [fetchSize, setFetchSize] = useState<number>(9);

  useEffect(() => {
    const updateFetchSize = () => {
      if (window.innerWidth < 424) {
        setFetchSize(mobileSize);
      } else if (window.innerWidth < 768) {
        setFetchSize(tabletSize);
      } else {
        setFetchSize(desktopSize);
      }
    };

    updateFetchSize();
    window.addEventListener('resize', updateFetchSize);

    return () => {
      window.removeEventListener('resize', updateFetchSize);
    };
  }, [mobileSize, tabletSize, desktopSize]);

  return fetchSize;
};

export default useResFetchCount;
