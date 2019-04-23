import React from 'react';

export default function SectionTitle({ text, className }) {
  return (
    <div className={`title-container ${className ? className : ''}`}>
      <span className="title-line" />
      <h2 className="section-title">{text}</h2>
      <span className="title-line" />
    </div>
  );
}
