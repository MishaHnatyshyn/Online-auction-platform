import React from 'react';

export default function CheckBox({
  id, name, checked, handler, label, value
}) {
  return (
    <label className="check-box-container">
      {label}
      <input type="checkbox" name={name} id={id} value={value} checked={checked} onChange={handler} />
      <span className="checkmark" />
    </label>
  );
}
