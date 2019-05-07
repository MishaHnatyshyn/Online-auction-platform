import React from 'react';
import spinner from './spinner.png';
import './loader.scss'

export default function Loader() {
  return (
    <div className="loader">
      <img src={spinner} alt="spinner" className="spinner" />
    </div>
  );
}
