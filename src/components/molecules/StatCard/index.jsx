import React from 'react';
import { Box } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import RouteCard from '../../atoms/RouteCard';
import IconBox from '../../atoms/IconBox';
import RouteText from '../../atoms/RouteText';
import { colors, transitions } from '../../../conf/theme';

export default function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  bgColor,
  trend, // { value: 12, direction: 'up' } or { value: -5, direction: 'down' }
  variant = 'default', // default, primary, success, warning, error
}) {
  const variantColors = {
    default: colors.neutral[100],
    primary: colors.primary[100],
    success: colors.success.light,
    warning: colors.warning.light,
    error: colors.error.light,
  };

  const iconColors = {
    default: colors.neutral[600],
    primary: colors.primary.main,
    success: colors.success.main,
    warning: colors.warning.main,
    error: colors.error.main,
  };

  const TrendIcon = trend?.direction === 'up' ? TrendingUp : TrendingDown;
  const trendColor = trend?.direction === 'up' ? colors.success.main : colors.error.main;

  return (
    <RouteCard 
      hoverable
      sx={{ 
        p: { xs: 2, sm: 2.5 }, 
        display: 'flex', 
        alignItems: 'center', 
        gap: { xs: 1.5, sm: 2.5 },
        position: 'relative',
        overflow: 'visible',
        '&:hover': { 
          transform: 'translateY(-4px)', 
          boxShadow: `0 12px 32px ${iconColors[variant]}20`,
        }
      }}
    >
      <IconBox 
        icon={Icon} 
        bgColor={bgColor || variantColors[variant]} 
        iconColor={iconColors[variant]}
        animated
        sx={{ 
          width: { xs: 48, sm: 56 }, 
          height: { xs: 48, sm: 56 } 
        }}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <RouteText 
          text={label} 
          sx={{ 
            fontSize: { xs: '11px', sm: '13px' }, 
            color: colors.neutral[500], 
            fontWeight: 600, 
            mb: 0.5, 
            letterSpacing: 0.3,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }} 
        />
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <RouteText 
            text={value} 
            animated
            sx={{ 
              fontSize: { xs: '20px', sm: '26px' }, 
              fontWeight: 800, 
              color: colors.neutral[800], 
              lineHeight: 1,
              transition: `all ${transitions.duration.normal} ${transitions.easing.easeOut}`,
            }} 
          />
          {trend && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <TrendIcon sx={{ fontSize: 16, color: trendColor }} />
              <RouteText
                text={`${Math.abs(trend.value)}%`}
                sx={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: trendColor,
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </RouteCard>
  );
}
