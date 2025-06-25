import React from 'react';
import LogoutButton from './LogoutButton';
import Inventory from './Inventory';
function Dashboard({ onLogout }) {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>登入成功</h2>
      <Inventory />
      <p>歡迎回來！這是你的主畫面。</p>
      <LogoutButton onLogout={onLogout} />
    </div>
  );
}

export default Dashboard;
