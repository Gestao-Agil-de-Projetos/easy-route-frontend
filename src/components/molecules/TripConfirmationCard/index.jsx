import { Box, Typography, Button, Divider, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { User, Clock, MapPin, CreditCard, X, Users } from 'lucide-react';
import { useState } from 'react';

const TripConfirmationCard = ({ trip, onConfirm, onCancel }) => {
  const [paymentMethod, setPaymentMethod] = useState('pix');

  if (!trip) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: { xs: '20px', sm: '24px' },
        borderTopRightRadius: { xs: '20px', sm: '24px' },
        boxShadow: '0px -4px 24px rgba(0, 0, 0, 0.15)',
        padding: { xs: '20px 16px', sm: '24px 20px', md: '32px 40px' },
        zIndex: 1001,
        maxHeight: { xs: '75vh', sm: '60vh' },
        overflowY: 'auto',
        animation: 'slideUp 0.3s ease-out',
        '@keyframes slideUp': {
          from: {
            transform: 'translateY(100%)',
          },
          to: {
            transform: 'translateY(0)',
          },
        },
      }}
    >
      {/* Close Button */}
      <Box
        sx={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '50%',
          transition: 'background-color 0.2s',
          '&:hover': {
            backgroundColor: '#F3F4F6',
          },
        }}
        onClick={onCancel}
      >
        <X size={24} color="#6B7280" />
      </Box>

      {/* Header */}
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: { xs: '20px', sm: '24px' },
          color: '#1F2937',
          marginBottom: { xs: 2, sm: 3 },
          paddingRight: '40px',
        }}
      >
        Confirmar Viagem
      </Typography>

      {/* Route */}
      <Box sx={{ marginBottom: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
          <Box
            sx={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
            }}
          />
          <Typography sx={{ fontWeight: 600, fontSize: '18px', color: '#1F2937' }}>
            {trip.from}
          </Typography>
        </Box>

        <Box
          sx={{
            marginLeft: '5px',
            borderLeft: '2px dashed #D1D5DB',
            height: '24px',
          }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#EF4444',
            }}
          />
          <Typography sx={{ fontWeight: 600, fontSize: '18px', color: '#1F2937' }}>
            {trip.to}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ marginY: 3 }} />

      {/* Trip Details */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <User size={20} color="#6B7280" />
          <Box>
            <Typography sx={{ fontSize: '12px', color: '#9CA3AF' }}>Motorista</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '16px', color: '#1F2937' }}>
              {trip.driver}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Clock size={20} color="#6B7280" />
          <Box>
            <Typography sx={{ fontSize: '12px', color: '#9CA3AF' }}>Horário</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '16px', color: '#1F2937' }}>
              {trip.time} - {trip.date}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <MapPin size={20} color="#6B7280" />
          <Box>
            <Typography sx={{ fontSize: '12px', color: '#9CA3AF' }}>Distância</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '16px', color: '#1F2937' }}>
              {trip.distance} - {trip.duration}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Users size={20} color="#6B7280" />
          <Box>
            <Typography sx={{ fontSize: '12px', color: '#9CA3AF' }}>Vagas Disponíveis</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '16px', color: '#1F2937' }}>
              {trip.seats || 3} vagas
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ marginY: 3 }} />

      {/* Price */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 3,
        }}
      >
        <Typography sx={{ fontSize: '16px', color: '#6B7280' }}>Valor da viagem</Typography>
        <Typography sx={{ fontWeight: 700, fontSize: '28px', color: '#3B82F6' }}>
          {trip.price}
        </Typography>
      </Box>

      {/* Payment Method */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#1F2937', marginBottom: 1.5 }}>
          Método de Pagamento
        </Typography>
        <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <FormControlLabel
              value="pix"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CreditCard size={18} color="#6B7280" />
                  <Typography sx={{ fontSize: '14px', color: '#374151' }}>PIX</Typography>
                </Box>
              }
              sx={{
                margin: 0,
                padding: '10px 14px',
                backgroundColor: paymentMethod === 'pix' ? '#EFF6FF' : '#F9FAFB',
                borderRadius: '10px',
                border: paymentMethod === 'pix' ? '2px solid #3B82F6' : '1px solid #E5E7EB',
              }}
            />
            <FormControlLabel
              value="credito"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CreditCard size={18} color="#6B7280" />
                  <Typography sx={{ fontSize: '14px', color: '#374151' }}>Cartão de Crédito</Typography>
                </Box>
              }
              sx={{
                margin: 0,
                padding: '10px 14px',
                backgroundColor: paymentMethod === 'credito' ? '#EFF6FF' : '#F9FAFB',
                borderRadius: '10px',
                border: paymentMethod === 'credito' ? '2px solid #3B82F6' : '1px solid #E5E7EB',
              }}
            />
            <FormControlLabel
              value="debito"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CreditCard size={18} color="#6B7280" />
                  <Typography sx={{ fontSize: '14px', color: '#374151' }}>Cartão de Débito</Typography>
                </Box>
              }
              sx={{
                margin: 0,
                padding: '10px 14px',
                backgroundColor: paymentMethod === 'debito' ? '#EFF6FF' : '#F9FAFB',
                borderRadius: '10px',
                border: paymentMethod === 'debito' ? '2px solid #3B82F6' : '1px solid #E5E7EB',
              }}
            />
            <FormControlLabel
              value="dinheiro"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CreditCard size={18} color="#6B7280" />
                  <Typography sx={{ fontSize: '14px', color: '#374151' }}>Dinheiro</Typography>
                </Box>
              }
              sx={{
                margin: 0,
                padding: '10px 14px',
                backgroundColor: paymentMethod === 'dinheiro' ? '#EFF6FF' : '#F9FAFB',
                borderRadius: '10px',
                border: paymentMethod === 'dinheiro' ? '2px solid #3B82F6' : '1px solid #E5E7EB',
              }}
            />
          </Box>
        </RadioGroup>
      </Box>

      {/* Confirm Button */}
      <Button
        fullWidth
        onClick={onConfirm}
        sx={{
          padding: '16px',
          backgroundColor: '#3B82F6',
          color: 'white',
          borderRadius: '12px',
          fontWeight: 700,
          fontSize: '16px',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#2563EB',
          },
        }}
      >
        Confirmar Reserva
      </Button>
    </Box>
  );
};

export default TripConfirmationCard;
