import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Stack, Box } from '@mui/material';
import { colors } from '../../../conf/theme';
import RouteButton from '../../atoms/RouteButton';
import RouteText from '../../atoms/RouteText';
import RouteInputField from '../../atoms/RouteInputField';

const ChangePasswordDialog = ({
  open,
  onClose,
  passwordData,
  onPasswordDataChange,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth disableEnforceFocus>
      <DialogTitle sx={{ fontWeight: 700, color: colors.neutral[900] }}>Alterar Senha</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Stack spacing={2}>
          <Box>
            <RouteText
              text="Senha Atual"
              sx={{ fontSize: '12px', fontWeight: 600, color: colors.neutral[600], mb: 1, textTransform: 'uppercase' }}
            />
            <RouteInputField
              type="password"
              value={passwordData.current}
              onChange={(e) => onPasswordDataChange({ ...passwordData, current: e.target.value })}
              placeholder="Digite sua senha atual"
              fullWidth
            />
          </Box>
          <Box>
            <RouteText
              text="Nova Senha"
              sx={{ fontSize: '12px', fontWeight: 600, color: colors.neutral[600], mb: 1, textTransform: 'uppercase' }}
            />
            <RouteInputField
              type="password"
              value={passwordData.new}
              onChange={(e) => onPasswordDataChange({ ...passwordData, new: e.target.value })}
              placeholder="Digite a nova senha"
              fullWidth
            />
          </Box>
          <Box>
            <RouteText
              text="Confirmar Senha"
              sx={{ fontSize: '12px', fontWeight: 600, color: colors.neutral[600], mb: 1, textTransform: 'uppercase' }}
            />
            <RouteInputField
              type="password"
              value={passwordData.confirm}
              onChange={(e) => onPasswordDataChange({ ...passwordData, confirm: e.target.value })}
              placeholder="Confirme a nova senha"
              fullWidth
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <RouteButton onClick={onClose} variant="outlined" color="primary">
          Cancelar
        </RouteButton>
        <RouteButton onClick={onSubmit} variant="contained" color="primary">
          Atualizar Senha
        </RouteButton>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;
