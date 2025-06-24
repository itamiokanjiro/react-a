import React, { useState } from 'react';

function LoginForm({onLogin}) {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    if (!account || !password) {
      setMessage('請輸入帳號與密碼');
      return;
    }

    try {
      const response = await fetch('https://huahaohuahua.ddns.net:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ account, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || '登入失敗');
        return;
      }

      // 登入成功：儲存 token 到 cookie（或 localStorage）
      document.cookie = `token=${result.token}; path=/; max-age=2592000`; // 30 天
      setMessage('✅ 登入成功，歡迎 ' + result.user.account);
      console.log('取得的 token:', result.token);
      onLogin?.(); // 通知 AuthSwitch 刷新狀態

    } catch (error) {
      console.error('登入失敗:', error);
      setMessage('登入時發生錯誤');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>使用者登入</h2>
      <div>
        <input
          type="text"
          placeholder="帳號"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>登入</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginForm;
