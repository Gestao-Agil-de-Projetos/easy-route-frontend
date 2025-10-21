import React from "react";
import { Typography } from "@mui/material";

export default function RouteText({
  text,
  variant = "body2",
  sx = {},
  children,
  ...props
}) {
  return (
    <Typography
      variant={variant}
      sx={{
        ...sx,
      }}
      {...props}
    >
      {text || children}
    </Typography>
  );
}
