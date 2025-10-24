import { Box, Typography, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuButton from '../../atoms/MenuButton';
import { MapIcon } from 'lucide-react';

const Header = ({ onLogoClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    }
  };

  const menuItems = [
    { label: 'Meu Perfil', path: '/perfil' },
    { label: 'Reservas', path: '/reservas' },
    { label: 'Histórico', path: '/historico' },
    { label: 'Rotas Salvas', path: '/rotas-salvas' },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '80px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingX: { xs: '12px', sm: '16px', md: '24px' },
        paddingY: '8px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'transparent',
        overflow: 'visible',
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          padding: '8px 16px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          boxShadow: '0px 2px 4px -2px rgba(0, 0, 0, 0.1), 0px 4px 6px -1px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(2px)',
          borderRadius: '9999px',
          cursor: 'pointer',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
        onClick={handleLogoClick}
      >
        <Box
          sx={{
            width: '32px',
            height: '32px',
            backgroundColor: '#2563EB',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MapIcon size={20} color="white" />
        </Box>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '20px',
            lineHeight: '28px',
            color: '#1F2937',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          Rota Fácil
        </Typography>
      </Box>

      {/* Right Side Buttons */}
      <MenuButton onClick={handleMenuClick} />

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            marginTop: '8px',
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 8px 10px -6px rgba(0, 0, 0, 0.1), 0px 20px 25px -5px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            minWidth: '200px',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.label}
            onClick={() => {
              navigate(item.path);
              handleMenuClose();
            }}
            sx={{
              padding: '12px 16px',
              fontFamily: 'Inter',
              fontSize: '16px',
              color: '#374151',
              '&:hover': {
                backgroundColor: '#F3F4F6',
              },
            }}
          >
            {item.label}
          </MenuItem>
        ))}
        <MenuItem
          onClick={() => {
            // Handle logout
            handleMenuClose();
          }}
          sx={{
            padding: '12px 16px',
            fontFamily: 'Inter',
            fontSize: '16px',
            color: '#DC2626',
            borderTop: '1px solid #E5E7EB',
            '&:hover': {
              backgroundColor: '#FEE2E2',
            },
          }}
        >
          Sair
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Header;
