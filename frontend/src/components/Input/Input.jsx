import React from "react";
import '../Input/Input.css'

export default function Input({
  type,
  value,
  placeholder,
  onChange,
  label,
  reference,
}) {
  return (
    <div className="input-container">
      <label htmlFor={reference}>{label}</label>
      <input className="input"
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        id={reference}
      />
    </div>
  );
}