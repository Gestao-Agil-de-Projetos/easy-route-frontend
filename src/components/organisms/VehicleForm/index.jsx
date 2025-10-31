import React from 'react';
import { Box, Button, TextField, CircularProgress } from '@mui/material';
import { theme } from '../../../conf/theme';
import RouteCard from '../../atoms/RouteCard';
import RouteText from '../../atoms/RouteText';

export default function VehicleForm({ 
  vehicleData, 
  errors = {}, 
  loading = false,
  onChange, 
  onSubmit 
}) {
  const handleChange = (field, value) => {
    onChange && onChange({ ...vehicleData, [field]: value });
  };

  return (
    <RouteCard sx={{ mb: 3, p: { xs: 1.5, sm: 2, md: 2.5 } }}>
      <RouteText 
        text="Adicionar Novo Veículo" 
        sx={{ 
          fontWeight: 800, 
          mb: 2.5, 
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
            label="Marca" 
            placeholder="Mercedes-Benz" 
            value={vehicleData.make || ''} 
            onChange={(e) => handleChange('make', e.target.value)} 
            error={!!errors.make} 
            helperText={errors.make} 
            size="small" 
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', height: 48, fontSize: '15px' } }} 
          />
          <TextField 
            fullWidth 
            label="Modelo" 
            placeholder="Sprinter" 
            value={vehicleData.model || ''} 
            onChange={(e) => handleChange('model', e.target.value)} 
            error={!!errors.model} 
            helperText={errors.model} 
            size="small" 
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', height: 48, fontSize: '15px' } }} 
          />
          <TextField 
            fullWidth 
            label="Matrícula" 
            placeholder="AAA-0000" 
            value={vehicleData.plate || ''} 
            onChange={(e) => handleChange('plate', e.target.value)} 
            error={!!errors.plate} 
            helperText={errors.plate} 
            size="small" 
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', height: 48, fontSize: '15px' } }} 
          />
          <TextField 
            fullWidth 
            label="Ano" 
            placeholder="2023" 
            type="number" 
            value={vehicleData.year || ''} 
            onChange={(e) => handleChange('year', e.target.value)} 
            error={!!errors.year} 
            helperText={errors.year} 
            size="small" 
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', height: 48, fontSize: '15px' } }} 
          />
          <TextField 
            fullWidth 
            label="Vagas" 
            placeholder="13" 
            type="number" 
            value={vehicleData.capacity || ''} 
            onChange={(e) => handleChange('capacity', e.target.value)} 
            error={!!errors.capacity} 
            helperText={errors.capacity} 
            size="small" 
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', height: 48, fontSize: '15px' } }} 
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Button 
            variant="contained" 
            onClick={onSubmit} 
            disabled={loading} 
            sx={{ 
              backgroundColor: theme.palette.tertiary.main, 
              width: '100%', 
              maxWidth: 340, 
              height: 48, 
              borderRadius: '10px', 
              fontWeight: 800, 
              fontSize: 18, 
              letterSpacing: 1, 
              boxShadow: '0 2px 8px rgba(5,150,105,0.10)', 
              textTransform: 'uppercase', 
              '&:hover': { backgroundColor: theme.palette.tertiary.dark }, 
              '&:disabled': { backgroundColor: '#D1D5DB' }, 
              transition: 'all 0.2s' 
            }}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Adicionar Veículo'}
          </Button>
        </Box>
      </Box>
    </RouteCard>
  );
}
