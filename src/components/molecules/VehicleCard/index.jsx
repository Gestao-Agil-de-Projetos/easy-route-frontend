import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { DirectionsCar, MoreVert, Edit, Delete, History } from '@mui/icons-material';
import RouteCard from '../../atoms/RouteCard';
import IconBox from '../../atoms/IconBox';
import RouteText from '../../atoms/RouteText';
import Badge from '../../atoms/Badge';
import { colors } from '../../../conf/theme';

export default function VehicleCard({ vehicle, onRemove, onEdit, status = 'active' }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const statusConfig = {
    active: { label: 'Ativo', variant: 'success' },
    maintenance: { label: 'Manutenção', variant: 'warning' },
    inactive: { label: 'Inativo', variant: 'default' },
  };

  return (
    <RouteCard 
      hoverable
      sx={{ 
        p: { xs: 2, sm: 2.5 }, 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: { xs: 2, sm: 0 }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: { xs: '100%', sm: 'auto' } }}>
        <IconBox 
          icon={DirectionsCar} 
          bgColor={colors.neutral[100]} 
          iconColor={colors.primary.main}
          animated
        />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
            <RouteText 
              text={`${vehicle.make} ${vehicle.model}`} 
              weight="bold"
              sx={{ fontSize: { xs: '15px', sm: '17px' }, color: colors.neutral[800] }} 
            />
            <Badge 
              text={statusConfig[status].label} 
              variant={statusConfig[status].variant}
              size="small"
            />
          </Box>
          <RouteText 
            text={`${vehicle.plate} • ${vehicle.year} • ${vehicle.capacity} vagas`} 
            sx={{ fontSize: { xs: '13px', sm: '14px' }, color: colors.neutral[500], fontWeight: 500 }} 
          />
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title="Mais opções" arrow>
          <IconButton 
            onClick={(e) => setAnchorEl(e.currentTarget)}
            size="small"
            sx={{ 
              color: colors.neutral[600],
              '&:hover': { backgroundColor: colors.neutral[100] }
            }}
          >
            <MoreVert />
          </IconButton>
        </Tooltip>
        
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {onEdit && (
            <MenuItem 
              onClick={() => { 
                onEdit(vehicle.id); 
                setAnchorEl(null); 
              }}
              sx={{ fontSize: '14px', gap: 1 }}
            >
              <Edit fontSize="small" />
              Editar
            </MenuItem>
          )}
          <MenuItem 
            onClick={() => setAnchorEl(null)}
            sx={{ fontSize: '14px', gap: 1 }}
          >
            <History fontSize="small" />
            Ver histórico
          </MenuItem>
          <MenuItem 
            onClick={() => { 
              onRemove(vehicle.id); 
              setAnchorEl(null); 
            }}
            sx={{ 
              fontSize: '14px', 
              gap: 1,
              color: colors.error.main,
              '&:hover': { backgroundColor: colors.error.light }
            }}
          >
            <Delete fontSize="small" />
            Remover
          </MenuItem>
        </Menu>
      </Box>
    </RouteCard>
  );
}
