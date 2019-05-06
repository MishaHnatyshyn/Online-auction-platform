import React from 'react';
import { NavLink } from 'react-router-dom';

export default function GridItem({ photos, _id, name, currPrice, startPrice }) {
  return (
    <div className="grid-item">
      <div className="grid-item-data">
        <NavLink to={`/lot/${_id}`}>
          <div>{name}</div>
          <div>${currPrice || startPrice}</div>
        </NavLink>
      </div>
      <img src={`/${_id}/${photos[0]}`} alt={name} />
    </div>
  );
}
