import React from 'react';
import { logout } from '@/_actions';

function LogoutButton() {
  const handleLogout = () => {
    void logout();
  };

  return (
    <button type="submit" onClick={handleLogout}>
      로그아웃
    </button>
  );
}

export default LogoutButton;
