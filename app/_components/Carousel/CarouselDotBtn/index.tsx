/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import type { ComponentPropsWithRef } from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';

type UseDotButtonType = {
  onDotButtonClick: (index: number) => void;
  scrollSnaps: number[];
  selectedIndex: number;
};

export default function useCarouselDotBtn(emblaApi: EmblaCarouselType | undefined, onButtonClick?: (emblaApi: EmblaCarouselType) => void): UseDotButtonType {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      if (onButtonClick) onButtonClick(emblaApi);
    },
    [emblaApi, onButtonClick],
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
}

type PropType = ComponentPropsWithRef<'button'>;

export const DotButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};
