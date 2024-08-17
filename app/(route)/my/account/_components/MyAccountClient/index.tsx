'use client';

import { useEffect } from 'react';

function MyAccountClient() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      // 페이지 벗어날 때 authConfirm 쿠키 삭제 (과거로 설정)
      document.cookie = 'authConfirm=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return <div>내 정보 수정 페이지</div>;
}

export default MyAccountClient;
