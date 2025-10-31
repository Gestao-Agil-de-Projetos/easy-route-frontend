import { Box } from '@mui/material';
import TimeBadge from '../../atoms/TimeBadge';
import RouteText from '../../atoms/RouteText';

const ReservationCard = ({ from, to, time, date, timeBadge, variant = 'red' }) => {
  return (
    <Box
      sx={{
        padding: '8px',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: '6px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Box>
        <RouteText
          sx={{
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#000000',
            marginBottom: '4px',
          }}
        >
          {from} → {to}
        </RouteText>
        <RouteText
          sx={{
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '16px',
            color: '#6B7280',
          }}
        >
          {date} - {time}
        </RouteText>
      </Box>
      <TimeBadge time={time} date={date} />
    </Box>
  );
};

export default ReservationCard;
