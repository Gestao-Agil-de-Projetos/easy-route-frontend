import { Box } from '@mui/material';

const TimeBadge = ({ time, variant = 'red' }) => {
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

  const style = variants[variant] || variants.red;

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
      {time}
    </Box>
  );
};

export default TimeBadge;
