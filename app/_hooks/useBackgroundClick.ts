import { useEffect } from 'react';

interface BackgroundClickHandlerProps {
  handler: () => void;
  ref: React.RefObject<HTMLElement>;
}

function useBackgroundClick({ ref, handler }: BackgroundClickHandlerProps) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
}

export default useBackgroundClick;
