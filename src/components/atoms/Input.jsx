import React from "react";

export default function Input({ id, label, type = "text", placeholder, value, onChange, rightElement }) {
  return (
    <div className="input-block">
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      <div className="input-wrapper">
        <input
          id={id}
          className="input-field"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {rightElement && <div className="input-right">{rightElement}</div>}
      </div>
    </div>
  );
}
