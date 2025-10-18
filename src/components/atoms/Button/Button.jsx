import React from "react";
import Button from "@mui/material/Button";

export default function LoginButton({ children, ...props }) {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        width: "448px",
        height: "68px",
        borderRadius: "8px",
        fontSize: "1.5rem",
        textTransform: "none",
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
