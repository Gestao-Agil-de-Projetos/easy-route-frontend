import React from 'react';
import { Box } from '@mui/material';

export default function RouteDivider({ 
  width = '80%',
  color = '#E5E7EB',
  thickness = '1.5px',
  margin = 2,
  sx = {}
}) {
  return (
    <Box 
      sx={{ 
        width: width, 
        mx: 'auto', 
        borderBottom: `${thickness} solid ${color}`, 
        my: margin,
        ...sx
      }} 
    />
  );
}
