import { useEffect, useRef, useState } from 'react';

export const useScrollable = () => {
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isScrollable, setIsScrollable] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollWidth, scrollLeft, clientWidth } = scrollRef.current;
        if (scrollWidth - scrollLeft === clientWidth) {
          setIsEnd(true);
        } else {
          setIsEnd(false);
        }
      }
    };

    const checkScrollable = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current;
        setIsScrollable(scrollWidth > clientWidth);
      }
    };

    checkScrollable();

    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }

    window.addEventListener('resize', checkScrollable);

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', checkScrollable);
    };
  }, []);

  return { scrollRef, isEnd, isScrollable };
};
