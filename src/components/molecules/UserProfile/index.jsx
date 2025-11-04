import React from 'react';
import { Box } from '@mui/material';
import RouteAvatar from '../../atoms/RouteAvatar';
import RouteText from '../../atoms/RouteText';

export default function UserProfile({ 
  userName = 'Pedro Tigre', 
  userEmail = 'pedro.tigre@email.com',
  userInitials = 'PT',
  avatarTextColor
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 4, pb: 2 }}>
      <RouteAvatar initials={userInitials} sx={{ mb: 1 }} color={avatarTextColor} />
      <RouteText 
        text={userName} 
        sx={{ fontWeight: 700, color: '#1F2937', fontSize: '16px' }} 
      />
      <RouteText 
        text={userEmail} 
        sx={{ fontSize: '13px', color: '#6B7280' }} 
      />
    </Box>
  );
}
