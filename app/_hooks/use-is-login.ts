'use client';

import { useEffect, useState } from 'react';

import { getCookie } from '@/_utils/cookie';

const useCheckLoginStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const accessToken = getCookie('accessToken');
      setIsLoggedIn(!!accessToken);
    };

    checkLoginStatus();
  }, []);

  return { isLoggedIn, setIsLoggedIn };
};

export default useCheckLoginStatus;
