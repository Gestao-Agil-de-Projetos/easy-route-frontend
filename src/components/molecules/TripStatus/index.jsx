import React from 'react';
import { Box } from '@mui/material';
import RouteText from '../../atoms/RouteText';

export default function TripStatus({ status, passengers, capacity, statusColor, isFull }) {
  return (
    <Box sx={{ textAlign: 'center', px: 2 }}>
      <RouteText 
        text="STATUS" 
        sx={{ 
          fontWeight: 600, 
          fontSize: '14px', 
          lineHeight: '20px', 
          letterSpacing: '0.7px', 
          color: statusColor, 
          mb: 0.5 
        }} 
      />
      <RouteText 
        text={status} 
        sx={{ 
          fontWeight: 700, 
          fontSize: '30px', 
          lineHeight: '36px', 
          color: isFull ? '#B91C1C' : '#D97706', 
          mb: 0.5 
        }} 
      />
      <RouteText 
        text={`${passengers} / ${capacity} Vagas`} 
        sx={{ fontWeight: 400, fontSize: '12px', lineHeight: '16px', color: '#6B7280' }} 
      />
    </Box>
  );
}
