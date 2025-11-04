import React from 'react';
import { Box } from '@mui/material';
import { colors } from '../../../conf/theme';
import IconBox from '../../atoms/IconBox';
import RouteText from '../../atoms/RouteText';

const ProfileInfoItem = ({ icon, label, value, color = 'primary', bgColor }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2, backgroundColor: colors.neutral[50], borderRadius: 1.5 }}>
      <IconBox 
        icon={icon} 
        size={20} 
        color={colors[color]?.main || color} 
        bgColor={bgColor || colors[color]?.[100] || color}
      />
      <Box sx={{ flex: 1 }}>
        <RouteText 
          text={label} 
          sx={{ fontSize: '11px', fontWeight: 700, color: colors.neutral[500], textTransform: 'uppercase', mb: 0.5 }} 
        />
        <RouteText 
          text={value} 
          sx={{ fontSize: '15px', color: colors.neutral[900], fontWeight: 600, wordBreak: 'break-all' }} 
        />
      </Box>
    </Box>
  );
};

export default ProfileInfoItem;
