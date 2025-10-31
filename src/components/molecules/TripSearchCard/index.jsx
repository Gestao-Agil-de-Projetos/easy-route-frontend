import { Box, Button, Collapse } from '@mui/material';
import { User, MapPin } from 'lucide-react';
import { useState } from 'react';
import RouteText from '../../atoms/RouteText';

const TripSearchCard = ({ from, to, distance, duration, driver, seats, date, time, price, onBook }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box
      sx={{
        padding: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          transform: 'translateY(-2px)',
        },
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ flex: 1 }}>
          <RouteText
            sx={{
              fontWeight: 600,
              fontSize: '18px',
              lineHeight: '28px',
              color: '#1F2937',
              marginBottom: '8px',
            }}
          >
            {from} → {to}
          </RouteText>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <RouteText sx={{ fontSize: '14px', color: '#6B7280' }}>
              <MapPin size={16} style={{ display: 'inline', marginRight: '4px' }} />
              {distance}
            </RouteText>
            <RouteText sx={{ fontSize: '14px', color: '#6B7280' }}>
              ⏱️ {duration}
            </RouteText>
            <RouteText sx={{ fontSize: '14px', color: '#6B7280' }}>
              <User size={16} style={{ display: 'inline', marginRight: '4px' }} />
              {seats} vagas
            </RouteText>
          </Box>
          <RouteText sx={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>
            {date} - {time}
          </RouteText>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <RouteText
            sx={{
              fontWeight: 700,
              fontSize: '20px',
              lineHeight: '28px',
              color: '#1F2937',
            }}
          >
            {price}
          </RouteText>
          <RouteText sx={{ fontSize: '12px', color: '#6B7280' }}>
            Motorista: {driver}
          </RouteText>
        </Box>
      </Box>

      <Collapse in={expanded}>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onBook && onBook();
          }}
          fullWidth
          sx={{
            marginTop: 2,
            backgroundColor: '#3B82F6',
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '16px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#2563EB',
            },
          }}
        >
          Reservar
        </Button>
      </Collapse>
    </Box>
  );
};

export default TripSearchCard;
