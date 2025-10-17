import React from "react";
import { Eye, EyeOff } from "lucide-react";

export default function EyeIcon({ open, onClick }) {
  const Icon = open ? EyeOff : Eye;

  return (
    <Icon
      size={22}
      color="#6B7280"
      strokeWidth={2}
      style={{
        cursor: "pointer",
        position: "absolute",
        right: "12px",
        top: "50%",
        transform: "translateY(-50%)",
      }}
      onClick={onClick}
    />
  );
}
