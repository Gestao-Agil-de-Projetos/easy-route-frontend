import React from 'react';
import { Box } from '@mui/material';
import RouteText from '../../atoms/RouteText';
import RouteMap from '../../atoms/RouteMap';

export default function PickupRoute({ pickupRoute, origin, destination, showMap = true }) {
  return (
    <Box sx={{ flex: 1 }}>
      <RouteText 
        text="Rota de Coleta Otimizada" 
        sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '24px', color: '#374151', mb: 2 }} 
      />
      <Box sx={{ background: '#E5E7EB', borderRadius: '8px', p: 1.5 }}>
        <RouteText 
          text="Tempo total de coleta: 25 min" 
          sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '20px', color: '#374151', mb: 1 }} 
        />
        {showMap && origin === 'Vitória da Conquista' && destination === 'Poções' && (
          <Box sx={{ 
            mt: 1.5, 
            height: 180, 
            borderRadius: '9px', 
            overflow: 'hidden', 
            border: '1px solid #D1D5DB' 
          }}>
            <RouteMap
              center={[-14.861, -40.844]}
              zoom={9}
              markers={[
                { position: [-14.861, -40.844], popup: 'Vitória da Conquista' },
                { position: [-14.5232, -40.3668], popup: 'Poções' }
              ]}
            />
          </Box>
        )}
        <Box sx={{ mt: 1.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {pickupRoute?.map((point, i) => (
            <RouteText 
              key={i} 
              text={`${i + 1}. ${point.location} (${point.count})`} 
              sx={{ fontSize: '12px', lineHeight: '16px', color: '#4B5563', fontWeight: 400 }} 
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
