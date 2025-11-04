import React from 'react';
import { Stack } from '@mui/material';
import { LogOut, X } from 'lucide-react';
import { colors } from '../../../conf/theme';
import RouteButton from '../../atoms/RouteButton';
import RouteCard from '../../atoms/RouteCard';
import CardHeader from '../CardHeader';

const AccountSection = ({ onLogout }) => {
  return (
    <RouteCard sx={{ p: { xs: 2, sm: 3 }, boxShadow: 2, borderTop: `3px solid ${colors.error[100]}` }}>
      <CardHeader title="Conta" />
      <Stack spacing={2}>
        <RouteButton
          onClick={onLogout}
          variant="outlined"
          color="primary"
          fullWidth
          startIcon={<LogOut size={16} />}
        >
          Sair da Conta
        </RouteButton>
        <RouteButton variant="outlined" color="error" fullWidth startIcon={<X size={16} />}>
          Deletar Conta
        </RouteButton>
      </Stack>
    </RouteCard>
  );
};

export default AccountSection;
