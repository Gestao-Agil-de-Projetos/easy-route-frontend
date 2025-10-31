import React from 'react';
import { Avatar } from '@mui/material';
import { theme } from '../../../conf/theme';

export default function RouteAvatar({ 
  initials = 'PT',
  size = 56,
  bgColor = '#E5E7EB',
  color = theme.palette.tertiary.main,
  fontSize,
  sx = {},
  ...props
}) {
  return (
    <Avatar 
      sx={{ 
        width: size, 
        height: size, 
        background: bgColor, 
        color: color, 
        fontWeight: 700, 
        fontSize: fontSize || size / 2,
        ...sx
      }}
      {...props}
    >
      {initials}
    </Avatar>
  );
}
