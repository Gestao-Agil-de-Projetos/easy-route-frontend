import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import EyeToggle from "../EyeToggle/EyeToggle.jsx";

export default function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
}) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <TextField
      label={label}
      type={isPassword && !visible ? "password" : "text"}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
      InputProps={{
        endAdornment: isPassword ? (
          <InputAdornment position="end">
            <EyeToggle
              visible={visible}
              onClick={() => setVisible((prev) => !prev)}
            />
          </InputAdornment>
        ) : null,
      }}
    />
  );
}
