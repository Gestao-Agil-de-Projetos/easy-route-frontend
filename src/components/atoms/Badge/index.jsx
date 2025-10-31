import React from 'react';
import { Chip } from '@mui/material';
import { colors, borderRadius, typography, transitions } from '../../../conf/designTokens';

export default function Badge({ 
  text, 
  variant = 'default', // default, success, warning, error, info
  size = 'medium', // small, medium, large
  icon = null,
  pulse = false,
  bgColor,
  textColor,
  sx = {},
  ...props 
}) {
  const variantStyles = {
    default: {
      backgroundColor: bgColor || colors.neutral[100],
      color: textColor || colors.neutral[700],
      boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
    },
    success: {
      backgroundColor: bgColor || colors.success.bg,
      color: textColor || colors.success.text,
      boxShadow: `0 2px 8px ${colors.success.main}20, inset 0 1px 0 rgba(255,255,255,0.5)`,
    },
    warning: {
      backgroundColor: bgColor || colors.warning.bg,
      color: textColor || colors.warning.text,
      boxShadow: `0 2px 8px ${colors.warning.main}20, inset 0 1px 0 rgba(255,255,255,0.5)`,
    },
    error: {
      backgroundColor: bgColor || colors.error.bg,
      color: textColor || colors.error.text,
      boxShadow: `0 2px 8px ${colors.error.main}20, inset 0 1px 0 rgba(255,255,255,0.5)`,
    },
    info: {
      backgroundColor: bgColor || colors.info.bg,
      color: textColor || colors.info.text,
      boxShadow: `0 2px 8px ${colors.info.main}20, inset 0 1px 0 rgba(255,255,255,0.5)`,
    },
  };

  const sizeStyles = {
    small: {
      fontSize: typography.fontSize.xs,
      height: '20px',
    },
    medium: {
      fontSize: typography.fontSize.sm,
      height: '24px',
    },
    large: {
      fontSize: typography.fontSize.base,
      height: '32px',
    },
  };

  const pulseAnimation = pulse ? {
    '@keyframes pulse': {
      '0%, 100%': { 
        opacity: 1,
        transform: 'scale(1)',
      },
      '50%': { 
        opacity: 0.8,
        transform: 'scale(1.05)',
      },
    },
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  } : {};

  return (
    <Chip
      label={text}
      icon={icon}
      size={size === 'large' ? 'medium' : 'small'}
      sx={{
        borderRadius: borderRadius.full,
        fontWeight: typography.fontWeight.semibold,
        transition: `all ${transitions.duration.fast} ${transitions.easing.easeOut}`,
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...pulseAnimation,
        ...sx,
      }}
      {...props}
    />
  );
}
