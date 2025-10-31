import React from 'react';
import { Box, Collapse, Chip, Divider, IconButton, Tooltip } from '@mui/material';
import { AccessTime, Person, DirectionsBus, LocationOn, ExpandMore, GroupAdd, Route } from '@mui/icons-material';
import RouteCard from '../../atoms/RouteCard';
import RouteText from '../../atoms/RouteText';
import ProgressBar from '../../atoms/ProgressBar';
import Badge from '../../atoms/Badge';
import LeafletRouteMap from '../../atoms/LeafletRouteMap';
import PassengerList from '../../molecules/PassengerList';
import PickupRoute from '../../molecules/PickupRoute';
import { colors, borderRadius, shadows } from '../../../conf/theme';

export default function ActiveTripCard({ trip, isExpanded, onToggle }) {
  const isFull = trip.status === 'LOTADO';
  const borderColor = isFull ? colors.error.main : colors.success.main;
  const statusBadgeVariant = isFull ? 'error' : 'success';
  const badgeText = isFull ? 'LOTADA' : 'VAGAS DISPONÍVEIS';
  const occupancyPercentage = (trip.passengers / trip.capacity) * 100;
  const progressVariant = isFull ? 'error' : occupancyPercentage > 70 ? 'warning' : 'success';

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
          borderColor: `${borderColor}40`,
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
          position: 'relative',
          '&:hover .expand-icon': {
            transform: isExpanded ? 'rotate(180deg) scale(1.1)' : 'scale(1.1)',
          }
        }}
      >
        {/* Route Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: { xs: 2, sm: 2.5 } }}>
          <Box sx={{ flex: 1, minWidth: 0, pr: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <AccessTime sx={{ fontSize: 16, color: colors.neutral[500] }} />
              <RouteText 
                text={`Hoje às ${trip.time}`}
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
                text={trip.origin}
                weight="bold"
                sx={{ 
                  fontSize: { xs: '15px', sm: '18px' }, 
                  color: colors.neutral[900],
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: { xs: 'normal', sm: 'nowrap' }
                }}
              />
              <DirectionsBus sx={{ fontSize: { xs: 18, sm: 20 }, color: borderColor, flexShrink: 0 }} />
              <RouteText 
                text={trip.destination}
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
              text={badgeText} 
              variant={statusBadgeVariant}
              pulse={isFull ? "true" : "false"}
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

        {/* Stats Chips */}
        <Box sx={{ display: 'flex', gap: { xs: 1, sm: 1.5 }, mb: { xs: 2, sm: 3 }, flexWrap: 'wrap' }}>
          <Chip
            icon={<Person sx={{ fontSize: 16 }} />}
            label={`${trip.passengers}/${trip.capacity} passageiros`}
            size="small"
            sx={{
              backgroundColor: `${borderColor}12`,
              color: borderColor,
              fontWeight: 600,
              fontSize: '13px',
              border: `1px solid ${borderColor}30`,
              '& .MuiChip-icon': { color: borderColor },
            }}
          />
          
          <Chip
            icon={<AccessTime sx={{ fontSize: 16 }} />}
            label={`Partida: ${trip.time}`}
            size="small"
            sx={{
              backgroundColor: colors.neutral[100],
              color: colors.neutral[700],
              fontWeight: 600,
              fontSize: '13px',
            }}
          />
        </Box>

        {/* Progress */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <RouteText 
              text="Ocupação" 
              weight="semibold"
              sx={{ fontSize: '12px', color: colors.neutral[600], textTransform: 'uppercase', letterSpacing: '0.5px' }}
            />
            <RouteText 
              text={`${Math.round(occupancyPercentage)}%`}
              weight="bold"
              sx={{ fontSize: '13px', color: borderColor }}
            />
          </Box>
          
          <ProgressBar
            percentage={occupancyPercentage}
            variant={progressVariant}
            animated={!isFull}
            height={8}
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
              <GroupAdd sx={{ fontSize: 20, color: colors.primary.main }} />
              <RouteText 
                text={`Passageiros (${trip.passengersList?.length || 0})`}
                weight="bold"
                sx={{ fontSize: { xs: '14px', sm: '15px' }, color: colors.neutral[800] }}
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
              gap: { xs: 2, sm: 3 },
              mb: { xs: 2, sm: 3 },
            }}
          >
            {/* Passengers List */}
            <Box 
              sx={{ 
                maxHeight: { xs: 240, sm: 280 }, 
                overflowY: 'auto',
                backgroundColor: 'white',
                borderRadius: borderRadius.md,
                border: `1px solid ${colors.neutral[200]}`,
                '&::-webkit-scrollbar': { width: '6px' },
                '&::-webkit-scrollbar-track': { background: colors.neutral[100] },
                '&::-webkit-scrollbar-thumb': { 
                  background: colors.neutral[300],
                  borderRadius: '3px',
                },
              }}
            >
              {trip.passengersList && trip.passengersList.length > 0 ? (
                trip.passengersList.map((passenger, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 1.5,
                      borderBottom: index < trip.passengersList.length - 1 ? `1px solid ${colors.neutral[100]}` : 'none',
                      transition: 'background 0.2s ease',
                      '&:hover': {
                        backgroundColor: colors.primary[50],
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          backgroundColor: colors.primary[100],
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Person sx={{ fontSize: 16, color: colors.primary.main }} />
                      </Box>
                      
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <RouteText 
                          text={passenger.name}
                          weight="semibold"
                          sx={{ fontSize: '13px', color: colors.neutral[900] }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.25 }}>
                          <LocationOn sx={{ fontSize: 12, color: colors.neutral[500], flexShrink: 0 }} />
                          <RouteText 
                            text={passenger.pickup}
                            sx={{ fontSize: '11px', color: colors.neutral[600] }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))
              ) : (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <RouteText 
                    text="Nenhum passageiro registrado"
                    sx={{ color: colors.neutral[500], fontSize: '14px' }}
                  />
                </Box>
              )}
            </Box>

            {/* Route Map */}
            <Box>
              <LeafletRouteMap 
                origin={trip.originLocation}
                destination={trip.destinationLocation}
                height="280px"
              />
            </Box>
          </Box>

          {/* Bottom Row: Pickup Route Horizontal */}
          {trip.pickupRoute && trip.pickupRoute.length > 0 && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Route sx={{ fontSize: 20, color: colors.primary.main }} />
                <RouteText 
                  text="Pontos de Embarque"
                  weight="bold"
                  sx={{ fontSize: '15px', color: colors.neutral[800] }}
                />
              </Box>
              
              <Box 
                sx={{ 
                  display: 'grid',
                  gridTemplateColumns: { xs: 'repeat(auto-fit, minmax(150px, 1fr))', md: `repeat(${Math.min(trip.pickupRoute.length, 4)}, 1fr)` },
                  gap: 2,
                  backgroundColor: 'white',
                  borderRadius: borderRadius.md,
                  border: `1px solid ${colors.neutral[200]}`,
                  p: 2,
                }}
              >
                {trip.pickupRoute.map((point, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      p: 1.5,
                      borderRadius: borderRadius.sm,
                      backgroundColor: colors.neutral[50],
                      border: `1px solid ${colors.neutral[100]}`,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: colors.success[50],
                        borderColor: colors.success[300],
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: colors.success[100],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `2px solid ${colors.success.main}`,
                        mb: 1,
                      }}
                    >
                      <RouteText 
                        text={String(index + 1)}
                        weight="bold"
                        sx={{ fontSize: '14px', color: colors.success.main }}
                      />
                    </Box>
                    
                    <RouteText 
                      text={point.location}
                      weight="semibold"
                      sx={{ fontSize: '13px', color: colors.neutral[900], mb: 0.5 }}
                    />
                    <RouteText 
                      text={`${point.count} ${point.count === 1 ? 'pass.' : 'pass.'}`}
                      sx={{ fontSize: '11px', color: colors.neutral[600] }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Collapse>
    </RouteCard>
  );
}
