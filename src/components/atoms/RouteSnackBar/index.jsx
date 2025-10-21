import React from "react";
import { Snackbar, Alert } from "@mui/material";

export default function RouteSnackBar({
  open = false,
  message = "",
  severity = "info",
  autoHideDuration = 3000,
  onClose = () => {},
  anchorOrigin = {
    vertical: "bottom",
    horizontal: "left",
  },
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%", fontWeight: 500 }}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
