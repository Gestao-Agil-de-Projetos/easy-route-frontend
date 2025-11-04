import React from 'react';
import { Box, Switch } from '@mui/material';
import { colors } from '../../../conf/theme';
import IconBox from '../../atoms/IconBox';
import RouteText from '../../atoms/RouteText';

const PreferenceToggle = ({ icon, label, description, checked, onChange, color = 'primary', bgColor }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, backgroundColor: colors.neutral[50], borderRadius: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconBox 
          icon={icon} 
          size={18} 
          color={colors[color]?.main || color} 
          bgColor={bgColor || colors[color]?.light || color}
        />
        <Box>
          <RouteText 
            text={label} 
            sx={{ fontSize: '14px', fontWeight: 600, color: colors.neutral[900] }} 
          />
          <RouteText 
            text={description} 
            sx={{ fontSize: '12px', color: colors.neutral[600], mt: 0.25 }} 
          />
        </Box>
      </Box>
      <Switch checked={checked} onChange={onChange} />
    </Box>
  );
};

export default PreferenceToggle;
