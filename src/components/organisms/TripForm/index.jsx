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
    <RouteCard sx={{ mb: 3, p: { xs: 1.5, sm: 2, md: 2.5 } }}>
      <RouteText 
        text="Registrar Nova Viagem" 
        sx={{ 
          fontWeight: 800, 
          mb: 3, 
          fontSize: { xs: '18px', sm: '20px' }, 
          color: '#1F2937', 
          letterSpacing: 0.5 
        }} 
      />
      <Box component="form" autoComplete="off" sx={{ width: '100%' }}>
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(5, 1fr)' }, 
            gap: { xs: 1.2, sm: 1.5, md: 2 }, 
            alignItems: 'flex-start', 
            mb: 2.2 
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
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', height: 48, fontSize: '15px' } }} 
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
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', height: 48, fontSize: '15px' } }} 
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
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', height: 48, fontSize: '15px' } }} 
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
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', height: 48, fontSize: '15px' } }} 
          />
          <FormControl fullWidth size="small" error={!!errors.vehicle}>
            <InputLabel>Veículo</InputLabel>
            <Select 
              value={tripData.vehicle || ''} 
              onChange={(e) => handleChange('vehicle', e.target.value)} 
              label="Veículo" 
              sx={{ borderRadius: '10px', height: 48, fontSize: '15px' }}
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
              maxWidth: 360, 
              height: 52, 
              borderRadius: '12px', 
              fontWeight: 800, 
              fontSize: { xs: '16px', sm: '18px' }, 
              letterSpacing: 1.2, 
              boxShadow: '0 4px 12px rgba(5,150,105,0.15)', 
              textTransform: 'uppercase', 
              '&:hover': { 
                backgroundColor: theme.palette.tertiary.dark, 
                boxShadow: '0 6px 16px rgba(5,150,105,0.25)' 
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
