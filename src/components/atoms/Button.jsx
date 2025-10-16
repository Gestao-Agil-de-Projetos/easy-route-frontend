import React from "react";

export default function Button({ children, type = "button" }) {
  return (
    <button type={type} className="primary-button">
      {children}
    </button>
  );
}
