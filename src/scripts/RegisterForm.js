import React, { useState } from 'react';

function RegisterForm({ onLogin }) {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    if (!account || !password || !confirmPassword || !email) {
      setMessage('請填寫所有欄位');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('密碼與確認密碼不一致');
      return;
    }

    try {
      const response = await fetch('https://huahaohuahua.ddns.net:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ account, password, email }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || '註冊失敗');
        return;
      }

      // 儲存 token 到 cookie（如果想要自動登入）
      document.cookie = `token=${result.token}; path=/; max-age=2592000`;

      setMessage('✅ 註冊成功');
      onLogin?.();  // 通知切換回登入頁面
    } catch (err) {
      console.error('註冊失敗:', err);
      setMessage('發生錯誤，請稍後再試');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>使用者註冊</h2>
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
      <div>
        <input
          type="password"
          placeholder="確認密碼"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handleRegister}>註冊</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RegisterForm;
