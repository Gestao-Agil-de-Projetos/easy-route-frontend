import { Dialog, DialogTitle, DialogContent, Box, IconButton } from '@mui/material';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import RouteText from '../RouteText';

const DatePickerDialog = ({ open, onClose, selectedDate, onSelectDate }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const tomorrow = new Date(startOfToday.getTime() + 86400000);

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <Box
          key={`empty-${i}`}
          sx={{
            aspectRatio: '1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateString = formatDate(date);
      const normalizedSelected = (() => {
        if (selectedDate === 'Hoje') return formatDate(new Date());
        if (selectedDate === 'Amanhã') return formatDate(tomorrow);
        return selectedDate;
      })();

      const isSelected = normalizedSelected === dateString;
      const isPast = date < startOfToday;
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <Box
          key={day}
            onClick={() => {
            if (!isPast) {
              let returnValue = dateString;
              if (isToday) returnValue = 'Hoje';
              else if (date.toDateString() === tomorrow.toDateString()) returnValue = 'Amanhã';

              onSelectDate(returnValue);
              onClose();
            }
          }}
          sx={{
            aspectRatio: '1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isPast ? 'not-allowed' : 'pointer',
            borderRadius: '50%',
            backgroundColor: isSelected 
              ? '#3B82F6' 
              : isToday 
              ? '#EFF6FF' 
              : 'transparent',
            border: isToday && !isSelected ? '2px solid #3B82F6' : 'none',
            opacity: isPast ? 0.3 : 1,
            transition: 'all 0.2s',
            '&:hover': !isPast ? {
              backgroundColor: isSelected ? '#2563EB' : '#F3F4F6',
              transform: 'scale(1.1)',
            } : {},
          }}
        >
          <RouteText
            sx={{
              fontSize: { xs: '13px', sm: '14px' },
              fontWeight: isSelected || isToday ? 600 : 400,
              color: isSelected 
                ? 'white' 
                : isPast 
                ? '#9CA3AF' 
                : '#1F2937',
            }}
          >
            {day}
          </RouteText>
        </Box>
      );
    }

    return days;
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          padding: { xs: '16px', sm: '20px' },
          minWidth: { xs: '320px', sm: '380px' },
          maxWidth: '420px',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: { xs: '0 0 16px', sm: '0 0 20px' },
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Calendar size={20} color="#2563EB" />
          <RouteText sx={{ fontWeight: 600, fontSize: { xs: '18px', sm: '20px' } }}>
            Selecione a data
          </RouteText>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ padding: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 1,
          }}>
            <IconButton
              onClick={handlePrevMonth}
              sx={{
                padding: '8px',
                '&:hover': {
                  backgroundColor: '#F3F4F6',
                },
              }}
            >
              <ChevronLeft size={20} color="#374151" />
            </IconButton>

            <RouteText sx={{ 
              fontWeight: 600, 
              fontSize: { xs: '15px', sm: '16px' },
              color: '#1F2937',
            }}>
              {monthNames[currentMonth]} {currentYear}
            </RouteText>

            <IconButton
              onClick={handleNextMonth}
              sx={{
                padding: '8px',
                '&:hover': {
                  backgroundColor: '#F3F4F6',
                },
              }}
            >
              <ChevronRight size={20} color="#374151" />
            </IconButton>
          </Box>

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: { xs: '4px', sm: '6px' },
          }}>
            {weekDays.map((day) => (
              <Box
                key={day}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingY: 1,
                }}
              >
                <RouteText sx={{ 
                  fontSize: { xs: '11px', sm: '12px' }, 
                  fontWeight: 600,
                  color: '#6B7280',
                }}>
                  {day}
                </RouteText>
              </Box>
            ))}

            {renderCalendarDays()}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DatePickerDialog;
