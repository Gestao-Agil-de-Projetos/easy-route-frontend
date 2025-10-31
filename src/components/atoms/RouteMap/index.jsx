import React from 'react';
import { Box } from '@mui/material';
import { LocationOn, TripOrigin } from '@mui/icons-material';
import { colors, borderRadius, spacing, shadows } from '../../../conf/theme';

export default function RouteMap({ origin, destination, sx = {} }) {
  return (
    <Box
      sx={{
        position: 'relative',
        p: 2.5,
        backgroundColor: colors.neutral[50],
        borderRadius: borderRadius.md,
        border: `1px solid ${colors.neutral[200]}`,
        overflow: 'hidden',
        ...sx,
      }}
    >
      {/* Decorative map background pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `
            linear-gradient(${colors.neutral[400]} 1px, transparent 1px),
            linear-gradient(90deg, ${colors.neutral[400]} 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          pointerEvents: 'none',
        }}
      />

      {/* Route visualization */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Origin */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: colors.success.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: shadows[2],
            }}
          >
            <TripOrigin sx={{ fontSize: 18, color: 'white' }} />
          </Box>
          <Box>
            <Box sx={{ fontSize: '11px', color: colors.neutral[500], fontWeight: 600, mb: 0.25 }}>
              ORIGEM
            </Box>
            <Box sx={{ fontSize: '14px', color: colors.neutral[800], fontWeight: 600 }}>
              {origin}
            </Box>
          </Box>
        </Box>

        {/* Connecting line */}
        <Box
          sx={{
            ml: '15px',
            width: '2px',
            height: '24px',
            background: `linear-gradient(to bottom, ${colors.success.main}, ${colors.error.main})`,
            mb: 2,
          }}
        />

        {/* Destination */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: colors.error.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: shadows[2],
            }}
          >
            <LocationOn sx={{ fontSize: 18, color: 'white' }} />
          </Box>
          <Box>
            <Box sx={{ fontSize: '11px', color: colors.neutral[500], fontWeight: 600, mb: 0.25 }}>
              DESTINO
            </Box>
            <Box sx={{ fontSize: '14px', color: colors.neutral[800], fontWeight: 600 }}>
              {destination}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Distance badge (optional decoration) */}
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          px: 1.5,
          py: 0.5,
          borderRadius: borderRadius.sm,
          backgroundColor: colors.primary.main,
          color: 'white',
          fontSize: '11px',
          fontWeight: 700,
          boxShadow: shadows[1],
        }}
      >
        ROTA
      </Box>
    </Box>
  );
}
