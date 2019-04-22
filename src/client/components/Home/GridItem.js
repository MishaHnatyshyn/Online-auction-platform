import React from 'react';

export default function GridItem({ photo }) {
  return (
    <div className="grid-item">
      <div className="grid-item-data" />
      <img src={photo} />
    </div>
  );
}
