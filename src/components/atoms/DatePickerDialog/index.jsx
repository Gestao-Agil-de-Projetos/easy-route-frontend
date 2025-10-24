import { Dialog, DialogTitle, DialogContent, Box, Button, Typography } from '@mui/material';
import { Calendar } from 'lucide-react';

const DatePickerDialog = ({ open, onClose, selectedDate, onSelectDate }) => {
  const today = new Date();
  const dates = [];

  // Gerar próximos 7 dias
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }

  const formatDate = (date) => {
    if (date.toDateString() === today.toDateString()) return 'Hoje';
    if (date.toDateString() === new Date(today.getTime() + 86400000).toDateString()) return 'Amanhã';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
  };

  const getWeekDay = (date) => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return days[date.getDay()];
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          padding: { xs: '12px', sm: '16px' },
          minWidth: { xs: '280px', sm: '340px' },
          maxWidth: '400px',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        padding: { xs: '8px 12px', sm: '12px 16px' },
      }}>
        <Calendar size={20} color="#2563EB" />
        <Typography sx={{ fontWeight: 600, fontSize: { xs: '16px', sm: '18px' } }}>
          Selecione a data
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ padding: { xs: '8px 12px 12px', sm: '8px 16px 16px' } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          {dates.map((date, index) => {
            const isSelected = selectedDate === formatDate(date);
            return (
              <Button
                key={index}
                onClick={() => {
                  onSelectDate(formatDate(date));
                  onClose();
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: { xs: '10px 14px', sm: '12px 16px' },
                  backgroundColor: isSelected ? '#EFF6FF' : 'transparent',
                  border: isSelected ? '2px solid #3B82F6' : '1px solid #E5E7EB',
                  borderRadius: '10px',
                  textTransform: 'none',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: isSelected ? '#DBEAFE' : '#F9FAFB',
                    borderColor: isSelected ? '#3B82F6' : '#D1D5DB',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography sx={{ 
                    fontWeight: isSelected ? 700 : 600, 
                    fontSize: { xs: '14px', sm: '15px' }, 
                    color: isSelected ? '#2563EB' : '#1F2937' 
                  }}>
                    {formatDate(date)}
                  </Typography>
                  <Typography sx={{ fontSize: { xs: '11px', sm: '12px' }, color: '#6B7280' }}>
                    {getWeekDay(date)}
                  </Typography>
                </Box>
                {index > 1 && (
                  <Typography sx={{ 
                    fontSize: { xs: '13px', sm: '14px' }, 
                    color: isSelected ? '#3B82F6' : '#9CA3AF',
                    fontWeight: isSelected ? 600 : 400,
                  }}>
                    {date.getDate().toString().padStart(2, '0')}/{(date.getMonth() + 1).toString().padStart(2, '0')}
                  </Typography>
                )}
              </Button>
            );
          })}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DatePickerDialog;
