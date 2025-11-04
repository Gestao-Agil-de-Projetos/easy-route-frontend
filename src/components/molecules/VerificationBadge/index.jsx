import React from 'react';
import { Box } from '@mui/material';
import { CheckCircle } from 'lucide-react';
import { colors } from '../../../conf/theme';
import RouteText from '../../atoms/RouteText';

const VerificationBadge = ({ title, subtitle, status = 'verified' }) => {
  const bgColor = status === 'verified' ? colors.success[50] : colors.warning[50];
  const iconColor = status === 'verified' ? colors.success.main : colors.warning.main;

  return (
    <Box sx={{ p: 2, backgroundColor: bgColor, borderRadius: 1.5, display: 'flex', gap: 2, alignItems: 'center' }}>
      <CheckCircle size={20} color={iconColor} />
      <Box sx={{ flex: 1 }}>
        <RouteText 
          text={title} 
          sx={{ fontSize: '13px', fontWeight: 600, color: colors.neutral[900], mb: 0.25 }} 
        />
        <RouteText 
          text={subtitle} 
          sx={{ fontSize: '12px', color: colors.neutral[600] }} 
        />
      </Box>
    </Box>
  );
};

export default VerificationBadge;
