import React from 'react';
import { Box, Drawer, Button, useMediaQuery } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
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
  isHome = false,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Meu Perfil', path: '/perfil' },
    { label: 'Minhas Reservas', path: '/reservas' },
    { label: 'Histórico', path: '/historico' },
    { label: 'Rotas Salvas', path: '/rotas-salvas' },
  ];

  const displayMenuItems = isHome 
    ? menuItems 
    : menuItems
        .filter(item => item.path !== location.pathname)
        .map(item => item)
        .concat(location.pathname !== '/home' ? [{ label: 'Início', path: '/home' }] : [])
        .reverse();

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
        {displayMenuItems.map((item) => (
          <Box
            key={item.label}
            sx={{
              py: 1.5,
              px: 2,
              mb: 0.5,
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              '&:hover': {
                backgroundColor: colors.neutral[100],
              },
            }}
            onClick={() => {
              navigate(item.path);
              onClose();
            }}
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
