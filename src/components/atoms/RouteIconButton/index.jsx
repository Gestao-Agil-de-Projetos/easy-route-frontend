import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { colors, transitions } from '../../../conf/designTokens';

export default function RouteIconButton({ 
  icon: Icon,
  tooltip = '',
  onClick,
  variant = 'default', // default, primary, success, warning, error
  size = 'medium', // small, medium, large
  disabled = false,
  ...props
}) {
  const variantColors = {
    default: colors.neutral[600],
    primary: colors.primary.main,
    success: colors.success.main,
    warning: colors.warning.main,
    error: colors.error.main,
  };

  const sizeMap = {
    small: 20,
    medium: 24,
    large: 32,
  };

  const button = (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      size={size}
      sx={{
        color: variantColors[variant],
        transition: `all ${transitions.duration.fast} ${transitions.easing.easeOut}`,
        '&:hover': {
          backgroundColor: `${variantColors[variant]}15`,
          transform: 'scale(1.1)',
        },
        '&:active': {
          transform: 'scale(0.95)',
        },
      }}
      {...props}
    >
      <Icon sx={{ fontSize: sizeMap[size] }} />
    </IconButton>
  );

  return tooltip ? (
    <Tooltip title={tooltip} arrow>
      {button}
    </Tooltip>
  ) : button;
}
