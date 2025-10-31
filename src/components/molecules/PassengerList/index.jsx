import React from 'react';
import { Box } from '@mui/material';
import { theme } from '../../../conf/theme';
import RouteText from '../../atoms/RouteText';

export default function PassengerList({ passengers, maxHeight = 240, title }) {
  if (!passengers || passengers.length === 0) {
    return (
      <Box>
        {title && (
          <RouteText 
            text={title} 
            sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '24px', color: '#374151', mb: 2 }} 
          />
        )}
        <RouteText 
          text="Nenhum passageiro" 
          sx={{ fontSize: '14px', color: '#6B7280' }} 
        />
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1 }}>
      {title && (
        <RouteText 
          text={title} 
          sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '24px', color: '#374151', mb: 2 }} 
        />
      )}
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 1, 
          maxHeight, 
          overflowY: 'auto', 
          pr: 1, 
          '&::-webkit-scrollbar': { width: '4px' }, 
          '&::-webkit-scrollbar-thumb': { backgroundColor: theme.palette.tertiary.main, borderRadius: '4px' } 
        }}
      >
        {passengers.map((passenger, i) => (
          <Box key={i} sx={{ display: 'flex', gap: 0.5 }}>
            {typeof passenger === 'string' ? (
              <RouteText 
                text={passenger} 
                sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#4B5563' }} 
              />
            ) : (
              <>
                <RouteText 
                  text={`${passenger.name}:`} 
                  sx={{ fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: '#4B5563' }} 
                />
                <RouteText 
                  text={`Ponto: ${passenger.pickup}`} 
                  sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#4B5563' }} 
                />
              </>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
