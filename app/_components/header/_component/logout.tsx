import React from 'react';
import { logout } from '@/_actions';
import useUserStore from '@/store/useUserStore';

function LogoutButton() {
  const setLoginStatus = useUserStore((state) => state.setLoginStatus);
  const handleLogout = () => {
    void logout();
    setLoginStatus(false);
  };

  return (
    <button type="submit" className="w-full py-2 text-center" onClick={handleLogout}>
      로그아웃
    </button>
  );
}

export default LogoutButton;
