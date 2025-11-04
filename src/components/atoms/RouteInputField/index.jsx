import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import EyeToggle from "../RouteEyeToggle";
import { theme } from "../../../conf/theme";

export default function RouteInputField(props) {
  const [visible, setVisible] = useState(false);
  const { field, form, label, type, placeholder, value, onChange, ...rest } = props;
  const isPassword = type === "password";

  // Se vier field/form (Formik), usa o modo Formik. Senão, usa value/onChange controlado.
  let error = false;
  let helperText = '';
  let inputProps = {};
  if (field && form) {
    error = form.touched[field.name] && Boolean(form.errors[field.name]);
    helperText = form.touched[field.name] && form.errors[field.name];
    inputProps = { ...field };
  } else {
    inputProps = { value, onChange };
  }

  return (
    <TextField
      {...inputProps}
      {...rest}
      label={label}
      type={isPassword && !visible ? "password" : type || "text"}
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
