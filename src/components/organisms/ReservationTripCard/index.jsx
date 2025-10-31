import React from 'react';
import { Box, Collapse, Chip, Divider, IconButton } from '@mui/material';
import { CalendarToday, Person, DirectionsBus, ExpandMore, LocationOn } from '@mui/icons-material';
import RouteCard from '../../atoms/RouteCard';
import RouteText from '../../atoms/RouteText';
import Badge from '../../atoms/Badge';
import LeafletRouteMap from '../../atoms/LeafletRouteMap';
import { colors, borderRadius } from '../../../conf/theme';

export default function ReservationTripCard({ reservation, isExpanded, onToggle }) {
  const occupancyPercentage = (reservation.passengers / reservation.capacity) * 100;
  
  return (
    <RouteCard 
      sx={{ 
        mb: { xs: 2, sm: 3 }, 
        background: '#ffffff',
        borderRadius: borderRadius.lg,
        border: `1px solid ${colors.neutral[200]}`,
        boxShadow: '0 2px 16px 0 rgba(0,0,0,0.06)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': { 
          transform: 'translateY(-4px)',
          boxShadow: '0 6px 24px 0 rgba(0,0,0,0.12)',
          borderColor: colors.neutral[300],
        },
      }}
    >
      {/* Header */}
      <Box 
        onClick={onToggle} 
        sx={{ 
          px: { xs: 2, sm: 3 }, 
          pt: { xs: 2, sm: 3 },
          pb: { xs: 2, sm: 2.5 },
          cursor: 'pointer',
          '&:hover .expand-icon': {
            transform: isExpanded ? 'rotate(180deg) scale(1.1)' : 'scale(1.1)',
          }
        }}
      >
        {/* Route Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: { xs: 2, sm: 2.5 } }}>
          <Box sx={{ flex: 1, minWidth: 0, pr: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <CalendarToday sx={{ fontSize: 16, color: colors.neutral[500] }} />
              <RouteText 
                text={`${reservation.date} às ${reservation.time}`}
                sx={{ fontSize: { xs: '12px', sm: '13px' }, color: colors.neutral[600], fontWeight: 500 }}
              />
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: { xs: 1, sm: 1.5 }, 
              mb: 0.5,
              flexWrap: { xs: 'wrap', sm: 'nowrap' }
            }}>
              <RouteText 
                text={reservation.origin}
                weight="bold"
                sx={{ 
                  fontSize: { xs: '15px', sm: '18px' }, 
                  color: colors.neutral[900],
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: { xs: 'normal', sm: 'nowrap' }
                }}
              />
              <DirectionsBus sx={{ fontSize: { xs: 18, sm: 20 }, color: colors.success.main, flexShrink: 0 }} />
              <RouteText 
                text={reservation.destination}
                weight="bold"
                sx={{ 
                  fontSize: { xs: '15px', sm: '18px' }, 
                  color: colors.neutral[900],
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: { xs: 'normal', sm: 'nowrap' }
                }}
              />
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexShrink: 0 }}>
            <Badge 
              text="Confirmada"
              variant="success"
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
            />
            
            <IconButton 
              className="expand-icon"
              size="small"
              sx={{ 
                transition: 'transform 0.3s ease',
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              <ExpandMore />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ mb: { xs: 2, sm: 2.5 }, opacity: 0.5 }} />

        {/* Stats */}
        <Box sx={{ display: 'flex', gap: { xs: 1, sm: 1.5 }, flexWrap: 'wrap' }}>
          <Chip
            icon={<Person sx={{ fontSize: 16 }} />}
            label={`${reservation.passengers} passageiro${reservation.passengers === 1 ? '' : 's'} confirmado${reservation.passengers === 1 ? '' : 's'}`}
            size="small"
            sx={{
              backgroundColor: colors.success[100],
              color: colors.success.text,
              fontWeight: 600,
              fontSize: { xs: '12px', sm: '13px' },
              border: `1px solid ${colors.success[300]}`,
              '& .MuiChip-icon': { color: colors.success.main },
            }}
          />
          
          <Chip
            icon={<CalendarToday sx={{ fontSize: 16 }} />}
            label={`Agendada: ${reservation.date}`}
            size="small"
            sx={{
              backgroundColor: colors.neutral[100],
              color: colors.neutral[700],
              fontWeight: 600,
              fontSize: { xs: '12px', sm: '13px' },
            }}
          />
        </Box>
      </Box>

      {/* Expandable Details */}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Divider />
        
        <Box sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 3 }, backgroundColor: colors.neutral[50] }}>
          {/* Row 1: Titles */}
          <Box 
            sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '0.6fr 1fr' },
              gap: { xs: 2, sm: 3 },
              mb: 2,
            }}
          >
            {/* Passengers Title */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Person sx={{ fontSize: 20, color: colors.success.main }} />
              <RouteText 
                text={`Passageiros Confirmados (${reservation.passengersList?.length || 0})`}
                weight="bold"
                sx={{ fontSize: '15px', color: colors.neutral[800] }}
              />
            </Box>
            {/* Map Title - Empty to align */}
            <Box />
          </Box>

          {/* Row 2: Content */}
          <Box 
            sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '0.6fr 1fr' },
              gap: 3,
            }}
          >
            {/* Passengers List */}
            <Box 
              sx={{ 
                backgroundColor: 'white',
                borderRadius: borderRadius.md,
                border: `1px solid ${colors.neutral[200]}`,
                maxHeight: 280,
                overflowY: 'auto',
                '&::-webkit-scrollbar': { width: '6px' },
                '&::-webkit-scrollbar-track': { background: colors.neutral[100] },
                '&::-webkit-scrollbar-thumb': { 
                  background: colors.neutral[300],
                  borderRadius: '3px',
                },
              }}
            >
              {reservation.passengersList && reservation.passengersList.length > 0 ? (
                reservation.passengersList.map((passenger, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 1.5,
                      borderBottom: index < reservation.passengersList.length - 1 ? `1px solid ${colors.neutral[100]}` : 'none',
                      transition: 'background 0.2s ease',
                      '&:hover': {
                        backgroundColor: colors.success[50],
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          backgroundColor: colors.success[100],
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Person sx={{ fontSize: 16, color: colors.success.main }} />
                      </Box>
                      
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <RouteText 
                          text={passenger.split(' (Ponto: ')[0]}
                          weight="semibold"
                          sx={{ fontSize: '13px', color: colors.neutral[900] }}
                        />
                        {passenger.includes('Ponto:') && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.25 }}>
                            <LocationOn sx={{ fontSize: 12, color: colors.neutral[500], flexShrink: 0 }} />
                            <RouteText 
                              text={passenger.split('Ponto: ')[1]?.replace(')', '')}
                              sx={{ fontSize: '11px', color: colors.neutral[600] }}
                            />
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                ))
              ) : (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <RouteText 
                    text="Nenhuma reserva confirmada"
                    sx={{ color: colors.neutral[500], fontSize: '14px' }}
                  />
                </Box>
              )}
            </Box>

            {/* Route Map */}
            <Box>
              <LeafletRouteMap 
                origin={reservation.originLocation}
                destination={reservation.destinationLocation}
                height="280px"
              />
            </Box>
          </Box>
        </Box>
      </Collapse>
    </RouteCard>
  );
}
