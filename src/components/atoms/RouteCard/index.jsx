import React from 'react';
import { Card } from '@mui/material';
import { colors, shadows, borderRadius, transitions } from '../../../conf/designTokens';

export default function RouteCard({ 
  children, 
  sx = {}, 
  onClick,
  hoverable = false,
  variant = 'default', // default, outlined, elevated
  borderLeft = null,
  ...props 
}) {
  const hoverStyles = hoverable ? {
    transition: `all ${transitions.duration.normal} ${transitions.easing.easeOut}`,
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: shadows.lg,
      borderColor: colors.primary.main,
    }
  } : {};

  const variantStyles = {
    default: {
      backgroundColor: colors.background.paper,
      border: `2px solid ${colors.neutral[200]}`,
      boxShadow: shadows.sm,
    },
    outlined: {
      backgroundColor: 'transparent',
      border: `2px solid ${colors.neutral[200]}`,
      boxShadow: 'none',
    },
    elevated: {
      backgroundColor: colors.background.paper,
      border: 'none',
      boxShadow: shadows.md,
    }
  };

  const borderLeftStyle = borderLeft ? {
    borderLeftWidth: '4px',
    borderLeftColor: borderLeft,
  } : {};

  return (
    <Card 
      onClick={onClick}
      sx={{ 
        borderRadius: borderRadius.xl,
        cursor: onClick ? 'pointer' : 'default',
        ...variantStyles[variant],
        ...borderLeftStyle,
        ...hoverStyles,
        ...sx 
      }}
      {...props}
    >
      {children}
    </Card>
  );
}
