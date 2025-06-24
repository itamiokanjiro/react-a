import React, { useState } from 'react';

function LogoutButton({onLogout}) {
  const [message, setMessage] = useState('');
  

  // 移除 token cookie（讓它過期）
  const removeCookie = (name) => {
    document.cookie = `${name}=; path=/; max-age=0`;
  };

  

  const handleLogout = async () => {
    const token = getCookie('token');
    if (token) {
      try {
        await fetch('https://huahaohuahua.ddns.net:4000/logout', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
      } catch (err) {
        console.error('通知後端登出失敗:', err);
      }
    }
    removeCookie('token');
    setMessage('已登出');
    onLogout?.(); // 通知 AuthSwitch 刷新狀態
  };
  function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  }
  

  return (
    <div style={{ padding: '1rem' }}>
      <button onClick={handleLogout}>登出</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LogoutButton;
