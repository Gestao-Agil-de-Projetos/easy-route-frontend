import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import EyeToggle from "../RouteEyeToggle";
import { theme } from "../../../conf/theme";

export default function RouteInputField({
  field,
  form,
  label,
  type,
  placeholder,
  ...props
}) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const error = form.touched[field.name] && Boolean(form.errors[field.name]);
  const helperText = form.touched[field.name] && form.errors[field.name];

  return (
    <TextField
      {...field}
      {...props}
      label={label}
      type={isPassword && !visible ? "password" : "text"}
      placeholder={placeholder}
      variant="outlined"
      fullWidth
      error={error}
      helperText={helperText}
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
