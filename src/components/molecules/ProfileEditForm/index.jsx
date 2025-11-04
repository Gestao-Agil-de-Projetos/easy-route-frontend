import React from 'react';
import { Box, Stack } from '@mui/material';
import { Save, X } from 'lucide-react';
import { colors } from '../../../conf/theme';
import RouteButton from '../../atoms/RouteButton';
import RouteCard from '../../atoms/RouteCard';
import RouteText from '../../atoms/RouteText';
import RouteInputField from '../../atoms/RouteInputField';
import CardHeader from '../CardHeader';

const ProfileEditForm = ({
  profileData,
  editData,
  onEditDataChange,
  onSave,
  onCancel,
  isEditing,
  onEditToggle,
}) => {
  if (!isEditing) {
    return (
      <RouteCard sx={{ p: { xs: 2, sm: 3 }, boxShadow: 2 }}>
        <CardHeader
          title="Informações Pessoais"
          action={
            <RouteButton
              onClick={onEditToggle}
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<Save size={16} />}
            >
              Editar
            </RouteButton>
          }
        />
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2, backgroundColor: colors.neutral[50], borderRadius: 1.5 }}>
            <Box sx={{ flex: 1 }}>
              <RouteText
                text="Nome"
                sx={{ fontSize: '11px', fontWeight: 700, color: colors.neutral[500], textTransform: 'uppercase', mb: 0.5 }}
              />
              <RouteText
                text={profileData.name}
                sx={{ fontSize: '15px', color: colors.neutral[900], fontWeight: 600 }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2, backgroundColor: colors.neutral[50], borderRadius: 1.5 }}>
            <Box sx={{ flex: 1 }}>
              <RouteText
                text="Email"
                sx={{ fontSize: '11px', fontWeight: 700, color: colors.neutral[500], textTransform: 'uppercase', mb: 0.5 }}
              />
              <RouteText
                text={profileData.email}
                sx={{ fontSize: '15px', color: colors.neutral[900], fontWeight: 600, wordBreak: 'break-all' }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2, backgroundColor: colors.neutral[50], borderRadius: 1.5 }}>
            <Box sx={{ flex: 1 }}>
              <RouteText
                text="Telefone"
                sx={{ fontSize: '11px', fontWeight: 700, color: colors.neutral[500], textTransform: 'uppercase', mb: 0.5 }}
              />
              <RouteText
                text={profileData.phone}
                sx={{ fontSize: '15px', color: colors.neutral[900], fontWeight: 600 }}
              />
            </Box>
          </Box>
        </Stack>
      </RouteCard>
    );
  }

  return (
    <RouteCard sx={{ p: { xs: 2, sm: 3 }, boxShadow: 2 }}>
      <CardHeader title="Editar Informações Pessoais" />
      <Stack spacing={2}>
        <Box>
          <RouteText
            text="Nome Completo"
            sx={{ fontSize: '12px', fontWeight: 600, color: colors.neutral[600], mb: 1, textTransform: 'uppercase' }}
          />
          <RouteInputField
            value={editData.name}
            onChange={(e) => onEditDataChange({ ...editData, name: e.target.value })}
            placeholder="Digite seu nome"
            fullWidth
          />
        </Box>

        <Box>
          <RouteText
            text="Email (não editável)"
            sx={{ fontSize: '12px', fontWeight: 600, color: colors.neutral[600], mb: 1, textTransform: 'uppercase' }}
          />
          <Box sx={{ p: 1.5, backgroundColor: colors.neutral[100], borderRadius: 1, border: `1px solid ${colors.neutral[200]}` }}>
            <RouteText text={profileData.email} sx={{ fontSize: '14px', color: colors.neutral[600] }} />
          </Box>
        </Box>

        <Box>
          <RouteText
            text="Telefone"
            sx={{ fontSize: '12px', fontWeight: 600, color: colors.neutral[600], mb: 1, textTransform: 'uppercase' }}
          />
          <RouteInputField
            value={editData.phone}
            onChange={(e) => onEditDataChange({ ...editData, phone: e.target.value })}
            placeholder="(XX) XXXXX-XXXX"
            fullWidth
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <RouteButton onClick={onSave} variant="contained" color="primary" fullWidth startIcon={<Save size={16} />}>
            Salvar
          </RouteButton>
          <RouteButton onClick={onCancel} variant="outlined" color="primary" fullWidth startIcon={<X size={16} />}>
            Cancelar
          </RouteButton>
        </Box>
      </Stack>
    </RouteCard>
  );
};

export default ProfileEditForm;
