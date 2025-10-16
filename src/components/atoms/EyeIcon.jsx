import React from "react";
import { Eye, EyeOff } from "lucide-react";

export default function EyeIcon({ open }) {
  const Icon = open ? EyeOff : Eye;

  return (
    <Icon
      size={22}
      color="#6B7280"
      strokeWidth={2}
      style={{
        cursor: "pointer",
        marginRight: "10px",
      }}
    />
  );
}
