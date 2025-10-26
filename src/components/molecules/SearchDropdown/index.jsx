import { Box, Paper, Divider } from '@mui/material';
import { Clock, MapPin, User } from 'lucide-react';
import RouteText from '../../atoms/RouteText';

const SearchDropdown = ({ trips, onTripSelect, isVisible }) => {
  if (!isVisible || !trips || trips.length === 0) {
    return null;
  }

  return (
    <Paper
      sx={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        marginTop: '8px',
        maxHeight: { xs: '300px', sm: '400px' },
        overflowY: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
        zIndex: 1000,
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#D1D5DB',
          borderRadius: '3px',
        },
      }}
    >
      {trips.map((trip, index) => (
        <Box key={index}>
          <Box
            onClick={() => onTripSelect(trip)}
            sx={{
              padding: { xs: '12px', sm: '16px' },
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: 'rgba(59, 130, 246, 0.05)',
              },
            }}
          >
            {/* Route */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
              <RouteText sx={{ fontWeight: 700, fontSize: '16px', color: '#1F2937' }}>
                {trip.from}
              </RouteText>
              <RouteText sx={{ color: '#9CA3AF' }}>→</RouteText>
              <RouteText sx={{ fontWeight: 700, fontSize: '16px', color: '#1F2937' }}>
                {trip.to}
              </RouteText>
            </Box>

            {/* Details */}
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Clock size={14} color="#6B7280" />
                <RouteText sx={{ fontSize: '13px', color: '#6B7280' }}>
                  {trip.time}
                </RouteText>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <User size={14} color="#6B7280" />
                <RouteText sx={{ fontSize: '13px', color: '#6B7280' }}>
                  {trip.driver}
                </RouteText>
              </Box>

              <RouteText sx={{ fontSize: '13px', color: '#6B7280' }}>
                {trip.distance} · {trip.duration}
              </RouteText>

              <RouteText
                sx={{
                  marginLeft: 'auto',
                  fontWeight: 700,
                  fontSize: '16px',
                  color: '#3B82F6',
                }}
              >
                {trip.price}
              </RouteText>
            </Box>

            <RouteText sx={{ fontSize: '12px', color: '#9CA3AF', marginTop: 0.5 }}>
              {trip.seats} {trip.seats === 1 ? 'vaga disponível' : 'vagas disponíveis'}
            </RouteText>
          </Box>
          {index < trips.length - 1 && <Divider />}
        </Box>
      ))}

      {trips.length === 0 && (
        <Box sx={{ padding: '24px', textAlign: 'center' }}>
          <Typography sx={{ color: '#6B7280', fontSize: '14px' }}>
            Nenhuma viagem encontrada para esta rota
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default SearchDropdown;
