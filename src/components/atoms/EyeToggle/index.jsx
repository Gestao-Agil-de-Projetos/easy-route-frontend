import React from "react";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function EyeToggle({ visible, onClick }) {
  return (
    <IconButton onClick={onClick} edge="end">
      {visible ? <VisibilityOff /> : <Visibility />}
    </IconButton>
  );
}
