import { useEffect, useState } from 'react';

import { TABLET_BREAKPOINT } from '@/_constants/deviceBreakpoint';

import useWindowSize from './useWindowSize';

interface DeviceType {
  isDevice: boolean;
  isLoading: boolean;
}

/**
 * 현재 디바이스 타입(PC 또는 모바일)을 결정하는 커스텀 React 훅
 *
 * @param {number} [breakpoint] - PC와 모바일을 구분하는 화면 너비의 기준점(픽셀 단위)
 *
 * @returns {DeviceType} 디바이스 타입 정보를 포함하는 객체
 * @property {boolean} isLoading - 창 크기 정보 로딩 상태를 나타내는 불리언 값
 * @property {boolean} isPC - 현재 디바이스가 PC인지 여부를 나타내는 불리언 값
 *
 * @example
 * const { isPC, isLoading } = useDeviceType();
 * // 또는
 * const { isPC, isLoading } = useDeviceType(1024); // 다른 브레이크포인트 사용
 *
 * if (isLoading) {
 *   return <div>Loading...</div>;
 * }
 *
 * return (
 *   <div>
 *     {isPC ? "This is a PC" : "This is a mobile device"}
 *   </div>
 * );
 */
const useDeviceType = (breakpoint: number = TABLET_BREAKPOINT): DeviceType => {
  const windowSize = useWindowSize();
  const [isLoading, setIsLoading] = useState(true);
  const [isDevice, setIsDevice] = useState(false);

  useEffect(() => {
    if (windowSize !== null) {
      setIsDevice(windowSize > breakpoint);
      setIsLoading(false);
    }
  }, [windowSize, breakpoint]);

  return { isDevice, isLoading };
};

export default useDeviceType;
