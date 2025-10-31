import React from 'react';
import { Box } from '@mui/material';
import { Schedule, CalendarToday } from '@mui/icons-material';
import RouteText from '../../atoms/RouteText';
import ArrowIcon from '../../atoms/ArrowIcon';
import { colors } from '../../../conf/theme';

export default function TripHeader({ 
  origin, 
  destination, 
  date, 
  time, 
  showDate = true,
  distance,
  status
}) {
  return (
    <Box sx={{ flexGrow: { xs: 1, sm: 0 }, minWidth: 250 }}>
      {/* Route Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <RouteText 
          text={origin} 
          weight="bold"
          sx={{ fontSize: '20px', lineHeight: '28px', color: colors.neutral[800] }} 
        />
        <ArrowIcon color={colors.primary.main} size={24} />
        <RouteText 
          text={destination} 
          weight="bold"
          sx={{ fontSize: '20px', lineHeight: '28px', color: colors.neutral[800] }} 
        />
      </Box>

      {/* Date and Time Info */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        {showDate ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarToday sx={{ fontSize: 14, color: colors.neutral[400] }} />
            <RouteText 
              text={date ? `${date}` : 'Realizada'} 
              sx={{ fontSize: '14px', fontWeight: 500, color: colors.neutral[600] }} 
            />
          </Box>
        ) : null}
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Schedule sx={{ fontSize: 14, color: colors.neutral[400] }} />
          <RouteText 
            text={showDate ? `${time}` : `Hoje às ${time}`} 
            sx={{ fontSize: '14px', fontWeight: 500, color: colors.neutral[600] }} 
          />
        </Box>

        {distance && (
          <RouteText 
            text={`• ${distance} km`} 
            sx={{ fontSize: '13px', fontWeight: 500, color: colors.neutral[500] }} 
          />
        )}
      </Box>
    </Box>
  );
}
