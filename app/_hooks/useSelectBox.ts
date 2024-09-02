import { useCallback, useState } from 'react';

/**
 * useSelectBox
 *
 * 이 커스텀 훅은 셀렉트 박스의 열림/닫힘 상태와 함께 fade in/out 애니메이션 효과를 관리합니다.
 * 셀렉트 박스를 열거나 닫을 때 호출되는 함수를 제공하며, 해당 상태를 관리하는 boolean 값들을 반환합니다.
 *
 * @returns {boolean} showList - 셀렉트 박스 리스트의 렌더링 여부를 제어하는 상태 (true: 리스트가 열림 / false: 리스트가 닫힘).
 * @returns {boolean} fade - 셀렉트 박스의 fade in/out 애니메이션을 제어하는 상태 (true: fade in 적용 / false: fade out 적용).
 * @returns {Function} openSelectBox - 셀렉트 박스를 열고 fade in 애니메이션을 시작하는 함수.
 * @returns {Function} closeSelectBox - 셀렉트 박스를 닫고 fade out 애니메이션을 시작하는 함수.
 */
const useSelectBox = () => {
  const [showList, setShowList] = useState(false);
  const [fade, setFade] = useState(false);

  const openSelectBox = useCallback(() => {
    setShowList(true);
    setFade(true);
  }, []);

  const closeSelectBox = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      setShowList(false);
    }, 350);
  }, []);

  return { showList, fade, openSelectBox, closeSelectBox };
};

export default useSelectBox;
