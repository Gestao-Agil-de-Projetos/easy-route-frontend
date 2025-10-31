import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { colors, borderRadius, typography, transitions } from '../../../conf/designTokens';

export default function RouteButton({ 
  children,
  variant = 'contained', // contained, outlined, text
  color = 'primary', // primary, success, warning, error, neutral
  size = 'medium', // small, medium, large
  loading = false,
  disabled = false,
  startIcon,
  endIcon,
  fullWidth = false,
  onClick,
  sx = {},
  ...props
}) {
  const colorMap = {
    primary: {
      main: colors.primary.main,
      hover: colors.primary[700],
      light: colors.primary[100],
    },
    success: {
      main: colors.success.main,
      hover: colors.success.dark,
      light: colors.success.light,
    },
    warning: {
      main: colors.warning.main,
      hover: colors.warning.dark,
      light: colors.warning.light,
    },
    error: {
      main: colors.error.main,
      hover: colors.error.dark,
      light: colors.error.light,
    },
    neutral: {
      main: colors.neutral[600],
      hover: colors.neutral[700],
      light: colors.neutral[100],
    },
  };

  const sizeStyles = {
    small: {
      fontSize: typography.fontSize.sm,
      padding: '6px 12px',
      height: '32px',
    },
    medium: {
      fontSize: typography.fontSize.base,
      padding: '10px 20px',
      height: '40px',
    },
    large: {
      fontSize: typography.fontSize.lg,
      padding: '12px 24px',
      height: '48px',
    },
  };

  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : startIcon}
      endIcon={endIcon}
      fullWidth={fullWidth}
      onClick={onClick}
      sx={{
        borderRadius: borderRadius.md,
        textTransform: 'none',
        fontWeight: typography.fontWeight.semibold,
        transition: `all ${transitions.duration.normal} ${transitions.easing.easeOut}`,
        ...sizeStyles[size],
        ...(variant === 'contained' && {
          backgroundColor: colorMap[color].main,
          color: colors.background.paper,
          '&:hover': {
            backgroundColor: colorMap[color].hover,
            transform: 'translateY(-2px)',
            boxShadow: `0 4px 12px ${colorMap[color].main}40`,
          },
        }),
        ...(variant === 'outlined' && {
          borderColor: colorMap[color].main,
          color: colorMap[color].main,
          '&:hover': {
            borderColor: colorMap[color].hover,
            backgroundColor: colorMap[color].light,
          },
        }),
        '&:active': {
          transform: 'translateY(0)',
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
