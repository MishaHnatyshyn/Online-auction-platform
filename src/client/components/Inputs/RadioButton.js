import React from 'react';

export default function RadioButton({
  id, name, checked, handler, label, value
}) {
  return (
    <label className="radio-button-container">
      {label}
      <input type="radio" name={name} id={id} value={value} checked={checked} onChange={handler} />
      <span className="checkmark" />
    </label>
  );
}
