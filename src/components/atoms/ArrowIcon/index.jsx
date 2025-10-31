import React from 'react';
import { ArrowForward } from '@mui/icons-material';

export default function ArrowIcon({ color = '#9CA3AF', size = 20 }) {
  return (
    <ArrowForward 
      sx={{ 
        mx: 1, 
        fontSize: size, 
        color: color 
      }} 
    />
  );
}
