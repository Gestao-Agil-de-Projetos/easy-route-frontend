import React from 'react';
import { Stack } from '@mui/material';
import { Lock } from 'lucide-react';
import RouteButton from '../../atoms/RouteButton';
import RouteCard from '../../atoms/RouteCard';
import VerificationBadge from '../VerificationBadge';
import CardHeader from '../CardHeader';

const SecuritySection = ({ onChangePassword }) => {
  return (
    <RouteCard sx={{ p: { xs: 2, sm: 3 }, boxShadow: 2 }}>
      <CardHeader title="Segurança" />
      <Stack spacing={2}>
        <RouteButton
          onClick={onChangePassword}
          variant="outlined"
          color="primary"
          fullWidth
          startIcon={<Lock size={16} />}
        >
          Alterar Senha
        </RouteButton>
        <VerificationBadge
          title="Email Verificado"
          subtitle="Seu email está seguro"
          status="verified"
        />
      </Stack>
    </RouteCard>
  );
};

export default SecuritySection;
