import React from 'react';
import { Box, Tabs, Tab, Button } from '@mui/material';
import { DirectionsBus, DirectionsCar, EventAvailable, History, ExitToApp } from '@mui/icons-material';
import { theme } from '../../../conf/theme';
import UserProfile from '../../molecules/UserProfile';
import LogoSection from '../../molecules/LogoSection';
import RouteDivider from '../../atoms/RouteDivider';

export default function OwnerSidebar({ 
  activeTab, 
  onTabChange, 
  userName,
  userEmail,
  userInitials = 'PT',
  onLogout 
}) {
  const getInitials = (name) => {
    if (!name) return userInitials;
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const initials = getInitials(userName);
  return (
    <Box 
      sx={{ 
        width: '260px', 
        backgroundColor: '#fff', 
        borderRight: '1px solid #E5E7EB', 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh', 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        zIndex: 1000 
      }}
    >
      <UserProfile userName={userName} userEmail={userEmail} userInitials={initials} />
      
      <RouteDivider />
      
      <LogoSection />

      <Tabs 
        orientation="vertical" 
        value={activeTab} 
        onChange={(e, v) => onTabChange(v)} 
        sx={{ 
          mt: 1, 
          mb: 2, 
          '& .MuiTab-root': { 
            textTransform: 'none', 
            fontSize: '16px', 
            fontWeight: 500, 
            color: '#374151', 
            pl: 1.5, 
            py: 1.5, 
            mb: 1, 
            borderRadius: '8px', 
            '&.Mui-selected': { 
              background: theme.palette.tertiary.main, 
              color: '#fff', 
              fontWeight: 700 
            } 
          } 
        }}
      >
        <Tab icon={<DirectionsBus />} iconPosition="start" label="Viagens" />
        <Tab icon={<DirectionsCar />} iconPosition="start" label="Veículos" />
        <Tab icon={<EventAvailable />} iconPosition="start" label="Reservas" />
        <Tab icon={<History />} iconPosition="start" label="Histórico" />
      </Tabs>

      <Box sx={{ p: 2, mt: 'auto', borderTop: '1.5px solid #E5E7EB' }}>
        <Button 
          variant="outlined" 
          fullWidth 
          onClick={onLogout}
          sx={{ 
            color: theme.palette.tertiary.main, 
            borderColor: theme.palette.tertiary.main, 
            borderRadius: '8px', 
            fontWeight: 600,
            '&:hover': {
              borderColor: theme.palette.tertiary.main,
              backgroundColor: 'rgba(5, 150, 105, 0.04)'
            }
          }}
        >
          Sair
        </Button>
      </Box>
    </Box>
  );
}
