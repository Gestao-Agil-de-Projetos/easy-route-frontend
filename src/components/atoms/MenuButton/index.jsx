import { IconButton } from '@mui/material';
import { Menu } from 'lucide-react';

const MenuButton = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        padding: 0,
        width: '48px',
        height: '48px',
        minWidth: '48px',
        minHeight: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0px 2px 4px -2px rgba(0, 0, 0, 0.1), 0px 4px 6px -1px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(2px)',
        overflow: 'visible',
        flexShrink: 0,
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        },
      }}
    >
      <Menu size={24} color="#374151" />
    </IconButton>
  );
};

export default MenuButton;
