import React from 'react';
import { Box } from '@mui/material';
import { theme, borderRadius, transitions } from '../../../conf/theme';

export default function IconBox({ 
  icon: Icon, 
  bgColor = '#F3F4F6', 
  iconColor = theme.palette.tertiary.main,
  size = 32,
  padding = 2,
  borderRadius: customBorderRadius,
  animated = false,
  pulse = false,
  sx = {},
}) {
  const animationStyles = animated ? {
    transition: `all ${transitions.duration.normal} ${transitions.easing.easeOut}`,
    '&:hover': {
      transform: 'scale(1.1) rotate(5deg)',
    }
  } : {};

  const pulseAnimation = pulse ? {
    '@keyframes iconPulse': {
      '0%, 100%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.1)' },
    },
    animation: 'iconPulse 2s ease-in-out infinite',
  } : {};

  return (
    <Box 
      sx={{ 
        p: padding, 
        backgroundColor: bgColor, 
        borderRadius: customBorderRadius || borderRadius.lg, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        ...animationStyles,
        ...pulseAnimation,
        ...sx,
      }}
    >
      <Icon sx={{ fontSize: size, color: iconColor }} />
    </Box>
  );
}
