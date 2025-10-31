import React from 'react';
import { Box, LinearProgress } from '@mui/material';
import { colors, borderRadius, transitions } from '../../../conf/designTokens';
import RouteText from '../RouteText';

export default function ProgressBar({ 
  label, 
  percentage, 
  currentValue, 
  maxValue, 
  barColor, 
  showPercentage = true,
  showValues = true,
  variant = 'default', // default, success, warning, error
  animated = true,
  height = 8,
}) {
  const variantColors = {
    default: barColor || colors.primary.main,
    success: colors.success.main,
    warning: colors.warning.main,
    error: colors.error.main,
  };

  const bgColors = {
    default: colors.neutral[200],
    success: colors.success.light,
    warning: colors.warning.light,
    error: colors.error.light,
  };

  const colorToUse = variantColors[variant];

  return (
    <Box sx={{ mt: 1.5 }}>
      {label && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
          <RouteText 
            text={label} 
            sx={{ fontSize: '12px', fontWeight: 600, color: colors.neutral[500] }} 
          />
          {showPercentage && (
            <RouteText 
              text={`${Math.round(percentage)}%`} 
              sx={{ fontSize: '12px', fontWeight: 700, color: colorToUse }} 
            />
          )}
        </Box>
      )}
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: height,
          borderRadius: borderRadius.sm,
          backgroundColor: bgColors[variant] || colors.neutral[200],
          overflow: 'hidden',
          boxShadow: `inset 0 1px 3px rgba(0,0,0,0.05)`,
          '& .MuiLinearProgress-bar': {
            borderRadius: borderRadius.sm,
            background: colorToUse,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.4), 0 0 8px ${colorToUse}50`,
            transition: animated ? `all ${transitions.duration.slow} ${transitions.easing.easeOut}` : 'width 0.3s ease',
          },
        }}
      />
      {showValues && currentValue !== undefined && maxValue !== undefined && (
        <RouteText 
          text={`${currentValue} de ${maxValue} vagas ocupadas`} 
          sx={{ fontSize: '11px', fontWeight: 500, color: colors.neutral[400], mt: 0.5 }} 
        />
      )}
    </Box>
  );
}
