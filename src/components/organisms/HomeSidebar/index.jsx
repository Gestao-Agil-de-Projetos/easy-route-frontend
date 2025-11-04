import React from 'react';
import { Box, Drawer, Button, useMediaQuery } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { colors } from '../../../conf/theme';
import RouteText from '../../atoms/RouteText';
import RouteDivider from '../../atoms/RouteDivider';
import UserProfile from '../../molecules/UserProfile';

export default function HomeSidebar({
  open,
  onClose,
  userName = 'Passageiro',
  userEmail = 'passageiro@email.com',
  userInitials = 'PA',
  onLogout,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const menuItems = [
    { label: 'Meu Perfil', disabled: true },
    { label: 'Minhas Reservas', disabled: true },
    { label: 'Histórico', disabled: true },
    { label: 'Rotas Salvas', disabled: true },
  ];

  const handleLogout = () => {
    onClose();
    onLogout();
  };

  const sidebarContent = (
    <Box
      sx={{
        width: '260px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
      }}
    >
      <UserProfile
        userName={userName}
        userEmail={userEmail}
        userInitials={userInitials}
        avatarTextColor={colors.primary.main}
      />

      <RouteDivider />

      {/* Menu Items */}
      <Box sx={{ flex: 1, py: 2, px: 1 }}>
        {menuItems.map((item) => (
          <Box
            key={item.label}
            sx={{
              py: 1.5,
              px: 2,
              mb: 0.5,
              borderRadius: '6px',
              cursor: item.disabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              opacity: item.disabled ? 0.5 : 1,
              '&:hover': {
                backgroundColor: item.disabled ? 'transparent' : colors.neutral[100],
              },
            }}
            onClick={() => !item.disabled && onClose()}
          >
            <RouteText
              text={item.label}
              weight="medium"
              sx={{
                fontSize: '14px',
                color: colors.neutral[700],
              }}
            />
          </Box>
        ))}
      </Box>

      <RouteDivider />

      {/* Logout Button */}
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<ExitToApp />}
          onClick={handleLogout}
          sx={{
            backgroundColor: colors.error.main,
            color: '#fff',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '14px',
            py: 1,
            '&:hover': {
              backgroundColor: colors.error.dark,
            },
          }}
        >
          Sair
        </Button>
      </Box>
    </Box>
  );

  if (!isMobile) {
    return null;
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: '260px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  );
}
