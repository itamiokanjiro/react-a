import React, { useState, useEffect } from 'react';

function CookieReader({ cookieName }) {
  const [cookieValue, setCookieValue] = useState(null);

  useEffect(() => {
    const value = getCookie(cookieName);
    setCookieValue(value);
  }, [cookieName]);

  // 取得 cookie 函式放組件外部或內部都行
  function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  }

  return (
    <div>
      <p>
        Cookie 名稱: <b>{cookieName}</b><br />
        Cookie 值: <b>{cookieValue ?? '找不到該 Cookie'}</b>
      </p>
    </div>
  );
}

export default CookieReader;
