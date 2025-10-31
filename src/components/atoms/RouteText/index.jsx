import React from "react";
import { Typography } from "@mui/material";
import { colors, typography, transitions } from '../../../conf/theme';

export default function RouteText({
  text,
  variant = "body2",
  color = 'default', // default, primary, secondary, success, warning, error, info
  weight = 'regular', // light, regular, medium, semibold, bold, extrabold
  align = 'left',
  animated = false,
  sx = {},
  children,
  ...props
}) {
  const colorMap = {
    default: colors.neutral[800],
    primary: colors.primary.main,
    secondary: colors.neutral[600],
    success: colors.success.main,
    warning: colors.warning.main,
    error: colors.error.main,
    info: colors.info.main,
  };

  const animationStyles = animated ? {
    transition: `all ${transitions.duration.normal} ${transitions.easing.easeOut}`,
  } : {};

  return (
    <Typography
      variant={variant}
      sx={{
        color: colorMap[color] || color,
        fontWeight: typography.fontWeight[weight] || weight,
        textAlign: align,
        ...animationStyles,
        ...sx,
      }}
      {...props}
    >
      {text || children}
    </Typography>
  );
}
