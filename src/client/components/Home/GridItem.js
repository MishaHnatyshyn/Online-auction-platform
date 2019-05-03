import React from 'react';
import { NavLink } from 'react-router-dom';

export default function GridItem({ photos, _id, name, currPrice }) {
  return (
    <div className="grid-item">
      <div className="grid-item-data">
        <NavLink to={`/lot/${_id}`}>
          <div>{name}</div>
          <div>${currPrice}</div>
        </NavLink>
      </div>
      <img src={photos[0]} />
    </div>
  );
}
