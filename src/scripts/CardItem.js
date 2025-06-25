function CardItem({ card, cardInfo, imageUrl }) {
  return (
    <div style={{ margin: '0.5rem', textAlign: 'center' }}>
      <img
        src={imageUrl}
        alt={`Card ${card.card_id}`}
        style={{ width: '120px', height: 'auto', borderRadius: '8px' }}
      />
      <p>Lv.{card.level} / 突破 {card.breakthrough}</p>
      {card.is_locked ? <span>🔒</span> : null}
    </div>
  );
}

export default CardItem;
