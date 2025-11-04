import React from 'react';
import { Stack } from '@mui/material';
import { Mail, Bell, User } from 'lucide-react';
import RouteCard from '../../atoms/RouteCard';
import PreferenceToggle from '../PreferenceToggle';
import CardHeader from '../CardHeader';

const PreferencesSection = ({
  preferences,
  onPreferenceChange,
}) => {
  return (
    <RouteCard sx={{ p: { xs: 2, sm: 3 }, boxShadow: 2 }}>
      <CardHeader title="Preferências" />
      <Stack spacing={2}>
        <PreferenceToggle
          icon={Mail}
          label="Notificações por Email"
          description="Receba atualizações importantes"
          checked={preferences.emailNotifications}
          onChange={() => onPreferenceChange('emailNotifications')}
          color="primary"
        />
        <PreferenceToggle
          icon={Bell}
          label="Notificações Push"
          description="Alertas em tempo real"
          checked={preferences.pushNotifications}
          onChange={() => onPreferenceChange('pushNotifications')}
          color="warning"
        />
        <PreferenceToggle
          icon={User}
          label="Perfil Público"
          description="Outros usuários podem ver"
          checked={preferences.profilePublic}
          onChange={() => onPreferenceChange('profilePublic')}
          color="success"
        />
      </Stack>
    </RouteCard>
  );
};

export default PreferencesSection;
