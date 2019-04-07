import React from 'react';
import spinner from './spinner.png'

export default function Loader() {
  return (
    <div className="loader">
      <img src={spinner} alt="spinner" />
    </div>
  );
}
