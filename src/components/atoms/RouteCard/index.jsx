import React from 'react';
import { Box } from '@mui/material';

export default function RouteCard({ 
  children, 
  sx = {}, 
  onClick,
  hoverable = false,
  variant = 'default',
  // borderLeft removido para visual mais limpo
  ...props 
}) {
  return (
    <Box
      onClick={onClick}
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #ececec',
        padding: '28px 32px',
        boxShadow: '0 2px 16px 0 rgba(0,0,0,0.06)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.2s, transform 0.2s',
        '&:hover': hoverable ? {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 24px 0 rgba(0,0,0,0.12)',
        } : {},
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
