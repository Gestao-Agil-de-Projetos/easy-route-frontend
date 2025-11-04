import React from 'react';
import { Box, Stack } from '@mui/material';
import { colors } from '../../../conf/theme';
import RouteText from '../../atoms/RouteText';
import RouteDivider from '../../atoms/RouteDivider';

const CardHeader = ({ title, action }) => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, gap: 1, flexWrap: 'wrap' }}>
        <RouteText 
          text={title} 
          sx={{ fontSize: { xs: '16px', sm: '18px' }, fontWeight: 700, color: colors.neutral[900] }} 
        />
        {action && action}
      </Box>
      <RouteDivider sx={{ mb: 2.5 }} />
    </>
  );
};

export default CardHeader;
