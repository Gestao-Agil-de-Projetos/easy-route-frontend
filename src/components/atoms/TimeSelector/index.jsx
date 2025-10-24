import { Button } from '@mui/material';
import { Clock } from 'lucide-react';

const TimeSelector = ({ selected = false, children, onClick }) => {
  return (
    <Button
      onClick={onClick}
      fullWidth
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '12px 24px',
        backgroundColor: '#F3F4F6',
        borderRadius: '8px',
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '24px',
        color: '#374151',
        textTransform: 'none',
        border: selected ? '2px solid #3B82F6' : 'none',
        '&:hover': {
          backgroundColor: '#E5E7EB',
        },
      }}
      startIcon={<Clock size={20} color="#374151" />}
    >
      {children}
    </Button>
  );
};

export default TimeSelector;
