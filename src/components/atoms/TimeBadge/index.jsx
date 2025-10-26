import { Box } from '@mui/material';
import { useMemo } from 'react';

const TimeBadge = ({ time, date, variant = 'red' }) => {
  const variants = {
    red: {
      bg: '#FEE2E2',
      color: '#B91C1C',
    },
    orange: {
      bg: '#FFEDD5',
      color: '#C2410C',
    },
    yellow: {
      bg: '#FEF9C3',
      color: '#A16207',
    },
    green: {
      bg: '#DCFCE7',
      color: '#15803D',
    },
  };

  const calculateHoursRemaining = useMemo(() => {
    if (!time || !date) return { display: time, variant: 'red' };

    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    
    let tripDate = new Date();
    
    if (date === 'Hoje') {
      tripDate.setHours(hours, minutes, 0, 0);
    } else if (date === 'Amanhã') {
      tripDate.setDate(tripDate.getDate() + 1);
      tripDate.setHours(hours, minutes, 0, 0);
    } else {
      const [day, month] = date.split('/').map(Number);
      tripDate.setMonth(month - 1);
      tripDate.setDate(day);
      tripDate.setHours(hours, minutes, 0, 0);
    }

    const timeDiff = tripDate - now;
    const hoursRemaining = Math.ceil(timeDiff / (1000 * 60 * 60));

    let displayText = time;
    let colorVariant = 'red';

    if (hoursRemaining <= 0) {
      displayText = 'Saiu';
      colorVariant = 'gray';
    } else if (hoursRemaining <= 2) {
      displayText = `Faltam ${hoursRemaining}h`;
      colorVariant = 'red';
    } else if (hoursRemaining <= 8) {
      displayText = `Faltam ${hoursRemaining}h`;
      colorVariant = 'orange';
    } else {
      displayText = `Faltam ${hoursRemaining}h`;
      colorVariant = 'yellow';
    }

    return { display: displayText, variant: colorVariant };
  }, [time, date]);

  const style = variants[calculateHoursRemaining.variant] || variants.red;

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4px 8px',
        backgroundColor: style.bg,
        borderRadius: '9999px',
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: '20px',
        color: style.color,
        minWidth: '48px',
      }}
    >
      {calculateHoursRemaining.display}
    </Box>
  );
};

export default TimeBadge;
