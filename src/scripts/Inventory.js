import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../utils/api';
import CardItem from './CardItem';

function Inventory() {
  const [cards, setCards] = useState([]);
  const [cardMap, setCardMap] = useState({});
  const [cardPathMap, setCardPathMap] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const loadInventory = async () => {
      try {
        // 1. 查詢玩家背包
        const invData = await fetchWithAuth('https://huahaohuahua.ddns.net:4000/inventory');
        setCards(invData.cards);

        // 2. 取得 card.json
        const cardRes = await fetch('https://huahaohuahua.ddns.net:669/card.json', {
          headers: {
            referer: 'https://huahaohuahua.ddns.net:8999/',
          },
        });
        const cardJson = await cardRes.json();

        // 3. 建立 cardMap（card_id 對應 card 詳情）
        const map = {};
        const pathMap = {};
        for (const item of cardJson.list || []) {
          map[item.card_id] = item;
          pathMap[item.card_id] = `https://huahaohuahua.ddns.net:669/${item.path}`;
        }

        setCardMap(map);
        setCardPathMap(pathMap);
      } catch (err) {
        console.error(err);
        setError('⚠️ 無法載入背包資訊：' + err.message);
      }
    };

    loadInventory();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>玩家背包</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cards.map((card) => (
          <CardItem
            key={card.card_uid}
            card={card}
            cardInfo={cardMap[card.card_id]}
            imageUrl={cardPathMap[card.card_id]}
          />
        ))}
      </div>
    </div>
  );
}

export default Inventory;
