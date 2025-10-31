import React from 'react';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { theme } from '../../../conf/theme';
import RouteCard from '../../atoms/RouteCard';
import RouteText from '../../atoms/RouteText';

export default function TripForm({ 
  tripData, 
  errors = {}, 
  loading = false,
  vehicles = [],
  onChange, 
  onSubmit 
}) {
  const handleChange = (field, value) => {
    onChange && onChange({ ...tripData, [field]: value });
  };

  return (
    <RouteCard sx={{ mb: 3, p: { xs: 2.5, sm: 3, md: 3.5 } }}>
      <RouteText 
        text="Registrar Nova Viagem" 
        sx={{ 
          fontWeight: 900, 
          mb: 3.5, 
          fontSize: { xs: '20px', sm: '24px' }, 
          color: '#0F172A', 
          letterSpacing: -0.3
        }} 
      />
      <Box component="form" autoComplete="off" sx={{ width: '100%' }}>
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(5, 1fr)' }, 
            gap: { xs: 1.5, sm: 2, md: 2.5 }, 
            alignItems: 'flex-start', 
            mb: 3 
          }}
        >
          <TextField 
            fullWidth 
            label="Saindo de:" 
            placeholder="Vitória da Conquista" 
            value={tripData.origin || ''} 
            onChange={(e) => handleChange('origin', e.target.value)} 
            error={!!errors.origin} 
            helperText={errors.origin} 
            size="small" 
            sx={{ 
              '& .MuiOutlinedInput-root': { 
                borderRadius: '12px', 
                height: 52, 
                fontSize: '15px',
                backgroundColor: '#f9fafb',
                '&:hover': {
                  backgroundColor: '#f3f4f6'
                },
                '&.Mui-focused': {
                  backgroundColor: '#ffffff'
                }
              } 
            }} 
          />
          <TextField 
            fullWidth 
            label="Indo para:" 
            placeholder="Ex: Poções" 
            value={tripData.destination || ''} 
            onChange={(e) => handleChange('destination', e.target.value)} 
            error={!!errors.destination} 
            helperText={errors.destination} 
            size="small" 
            sx={{ 
              '& .MuiOutlinedInput-root': { 
                borderRadius: '12px', 
                height: 52, 
                fontSize: '15px',
                backgroundColor: '#f9fafb',
                '&:hover': {
                  backgroundColor: '#f3f4f6'
                },
                '&.Mui-focused': {
                  backgroundColor: '#ffffff'
                }
              } 
            }} 
          />
          <TextField 
            fullWidth 
            label="Vagas" 
            type="number" 
            value={tripData.capacity || ''} 
            onChange={(e) => handleChange('capacity', e.target.value)} 
            error={!!errors.capacity} 
            helperText={errors.capacity} 
            size="small" 
            sx={{ 
              '& .MuiOutlinedInput-root': { 
                borderRadius: '12px', 
                height: 52, 
                fontSize: '15px',
                backgroundColor: '#f9fafb',
                '&:hover': {
                  backgroundColor: '#f3f4f6'
                },
                '&.Mui-focused': {
                  backgroundColor: '#ffffff'
                }
              } 
            }} 
          />
          <TextField 
            fullWidth 
            label="Horário" 
            type="time" 
            value={tripData.time || ''} 
            onChange={(e) => handleChange('time', e.target.value)} 
            error={!!errors.time} 
            helperText={errors.time} 
            size="small" 
            InputLabelProps={{ shrink: true }} 
            sx={{ 
              '& .MuiOutlinedInput-root': { 
                borderRadius: '12px', 
                height: 52, 
                fontSize: '15px',
                backgroundColor: '#f9fafb',
                '&:hover': {
                  backgroundColor: '#f3f4f6'
                },
                '&.Mui-focused': {
                  backgroundColor: '#ffffff'
                }
              } 
            }} 
          />
          <FormControl fullWidth size="small" error={!!errors.vehicle}>
            <InputLabel>Veículo</InputLabel>
            <Select 
              value={tripData.vehicle || ''} 
              onChange={(e) => handleChange('vehicle', e.target.value)} 
              label="Veículo" 
              sx={{ 
                borderRadius: '12px', 
                height: 52, 
                fontSize: '15px',
                backgroundColor: '#f9fafb',
                '&:hover': {
                  backgroundColor: '#f3f4f6'
                },
                '&.Mui-focused': {
                  backgroundColor: '#ffffff'
                }
              }}
            >
              <MenuItem value="" disabled>Selecione um veículo</MenuItem>
              {vehicles.map(v => (
                <MenuItem key={v.id} value={v.id}>
                  {v.make} {v.model}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Button 
            variant="contained" 
            onClick={onSubmit} 
            disabled={loading} 
            sx={{ 
              backgroundColor: theme.palette.tertiary.main, 
              width: '100%', 
              maxWidth: 380, 
              height: 56, 
              borderRadius: '14px', 
              fontWeight: 900, 
              fontSize: { xs: '16px', sm: '18px' }, 
              letterSpacing: 1.2, 
              boxShadow: '0 4px 16px rgba(5,150,105,0.2)', 
              textTransform: 'uppercase', 
              '&:hover': { 
                backgroundColor: theme.palette.tertiary.dark, 
                boxShadow: '0 8px 28px rgba(5,150,105,0.35)',
                transform: 'translateY(-2px)'
              }, 
              '&:disabled': { 
                backgroundColor: '#D1D5DB', 
                boxShadow: 'none' 
              }, 
              transition: 'all 0.3s ease' 
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Registrar Viagem'}
          </Button>
        </Box>
      </Box>
    </RouteCard>
  );
}
