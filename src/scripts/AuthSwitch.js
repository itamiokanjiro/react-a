import React, { useState, useEffect, useCallback } from 'react';
import LoginForm from './LoginForm';
import LogoutButton from './LogoutButton';
import RegisterForm from './RegisterForm';

function AuthSwitch() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const getCookie = (name) => {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  };

  const checkLogin = useCallback(() => {
    const token = getCookie('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  if (isLoggedIn) {
    return <LogoutButton onLogout={checkLogin} />;
  }

  return (
    <div>
      {isRegistering ? (
        <>
            <RegisterForm onLogin={checkLogin} />
            <button onClick={() => setIsRegistering(false)}>已有帳號？回登入</button>
        </>
        ) : (
        <>
            <LoginForm onLogin={checkLogin} />
            <button onClick={() => setIsRegistering(true)}>沒有帳號？前往註冊</button>
        </>
        )}
    </div>
  );
}

export default AuthSwitch;
