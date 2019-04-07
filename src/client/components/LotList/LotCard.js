import React from 'react';

export default function LotCard({
  name,
  description,
  startPrice,
  currPrice,
  photos,
  timestamp,
}) {
  const displayedDescription = description.length > 100 ? `${description.slice(0, 100)}...` : description;
  return (
    <div className="lot-card">
      <div className="lot-card-content">
        <div className="lot-photo">
          <img src={photos[0]} alt={name} />
        </div>
        <div className="lot-short-data">
          <div className="lot-name">{name}</div>
          <div className="lot-summary">{displayedDescription}</div>
        </div>
      </div>
    </div>
  );
}
