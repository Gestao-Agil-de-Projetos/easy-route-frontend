import React from 'react';
import { Box } from '@mui/material';

export default function Badge({ 
  text, 
  variant = 'default',
  size = 'medium',
  pulse = "false",
  sx = {},
  ...props 
}) {
  const variants = {
    default: {
      backgroundColor: '#F3F4F6',
      color: '#374151',
    },
    success: {
      backgroundColor: '#D1FAE5',
      color: '#065F46',
    },
    warning: {
      backgroundColor: '#FEF3C7',
      color: '#92400E',
    },
    error: {
      backgroundColor: '#FEE2E2',
      color: '#991B1B',
    },
  };

  const sizes = {
    small: {
      fontSize: '12px',
      padding: '4px 12px',
    },
    medium: {
      fontSize: '14px',
      padding: '6px 16px',
    },
    large: {
      fontSize: '16px',
      padding: '8px 20px',
    },
  };

  const pulseAnimation = pulse === "true" ? {
    '@keyframes badgePulse': {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.6 },
    },
    animation: 'badgePulse 2s ease-in-out infinite',
  } : {};

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '6px',
        fontWeight: 600,
        ...variants[variant],
        ...sizes[size],
        ...pulseAnimation,
        ...sx,
      }}
      {...props}
    >
      {text}
    </Box>
  );
}
