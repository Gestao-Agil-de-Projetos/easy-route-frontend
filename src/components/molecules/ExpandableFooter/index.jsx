import React from 'react';
import { Box } from '@mui/material';
import { theme } from '../../../conf/theme';
import RouteText from '../../atoms/RouteText';

const ExpandIcon = ({ isExpanded }) => (
  <Box 
    sx={{ 
      width: 16, 
      height: 16, 
      position: 'relative', 
      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', 
      transition: 'transform 0.3s' 
    }}
  >
    <Box sx={{ 
      position: 'absolute', 
      left: '25%', 
      right: '25%', 
      top: '37.5%', 
      bottom: '37.5%', 
      borderRight: '1.33px solid', 
      borderBottom: '1.33px solid', 
      borderColor: theme.palette.tertiary.main, 
      transform: 'rotate(45deg)' 
    }} />
  </Box>
);

export default function ExpandableFooter({ isExpanded, onToggle, expandedText, collapsedText }) {
  return (
    <Box 
      onClick={onToggle} 
      sx={{ 
        boxSizing: 'border-box', 
        background: '#F9FAFB', 
        borderTop: '1px solid #E5E7EB', 
        px: 5, 
        py: 2, 
        textAlign: 'center', 
        cursor: 'pointer', 
        transition: 'all 0.2s ease', 
        '&:hover': { backgroundColor: '#F3F4F6' } 
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <RouteText 
          text={isExpanded ? expandedText : collapsedText} 
          sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '20px', color: theme.palette.tertiary.main }} 
        />
        <ExpandIcon isExpanded={isExpanded} />
      </Box>
    </Box>
  );
}
