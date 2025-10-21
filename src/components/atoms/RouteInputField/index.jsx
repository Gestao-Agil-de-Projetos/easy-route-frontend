import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import EyeToggle from "../RouteEyeToggle";
import { theme } from "../../../conf/theme";

export default function RouteInputField({
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
      variant="outlined"
      fullWidth
      sx={{
        "& .MuiInputBase-root": {
          fontSize: { xs: "14px", sm: "16px" },
        },
      }}
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
