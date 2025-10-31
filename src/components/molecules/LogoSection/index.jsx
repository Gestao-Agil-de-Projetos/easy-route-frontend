import React from 'react';
import { Box } from '@mui/material';
import { DirectionsBus } from '@mui/icons-material';
import { theme } from '../../../conf/theme';
import RouteText from '../../atoms/RouteText';

export default function LogoSection() {
  return (
    <Box sx={{ px: 3, pb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <DirectionsBus sx={{ fontSize: 32, color: theme.palette.tertiary.main }} />
        <RouteText 
          text="Rota Fácil" 
          sx={{ fontWeight: 800, color: theme.palette.tertiary.main, fontSize: '22px', letterSpacing: 1 }} 
        />
      </Box>
      <RouteText 
        text="Driver" 
        sx={{ fontSize: '13px', fontWeight: 700, color: theme.palette.tertiary.main, ml: 5.5, letterSpacing: 1 }} 
      />
    </Box>
  );
}
