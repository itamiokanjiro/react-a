import React, { useState } from 'react';

function CookieSetter() {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [savedValue, setSavedValue] = useState(null);

  // 設定 cookie
  const handleSetCookie = () => {
    if (!name || !value) {
      alert('請輸入名稱和值');
      return;
    }

    // 寫入 cookie（預設是 session cookie）
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/`;

    // 更新顯示的值
    setSavedValue(getCookie(name));
  };

  // 讀取 cookie
  const getCookie = (cookieName) => {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, val] = cookie.split('=');
      if (key === cookieName) return decodeURIComponent(val);
    }
    return null;
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>設定 Cookie</h2>
      <div>
        <label>
          名稱: 
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          值: 
          <input value={value} onChange={(e) => setValue(e.target.value)} />
        </label>
      </div>
      <button onClick={handleSetCookie}>新增 Cookie</button>

      {savedValue && (
        <p>
          已設定 cookie：<b>{name}</b> = <b>{savedValue}</b>
        </p>
      )}
    </div>
  );
}

export default CookieSetter;
