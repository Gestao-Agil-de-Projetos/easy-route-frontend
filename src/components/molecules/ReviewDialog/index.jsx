import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, Typography, TextField } from '@mui/material';
import StarRating from '../../atoms/StarRating';
import { useState } from 'react';

const ReviewDialog = ({ open, onClose, rating, onSubmit, tripInfo }) => {
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = () => {
    onSubmit && onSubmit({ rating, text: reviewText });
    setReviewText('');
    onClose();
  };

  const handleCancel = () => {
    setReviewText('');
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          padding: '8px',
          minWidth: { xs: '90%', sm: '500px' },
          maxWidth: '600px',
        }
      }}
    >
      <DialogTitle>
        <Typography sx={{ fontWeight: 600, fontSize: '20px', color: '#1F2937' }}>
          Avaliar Viagem
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, paddingY: 2 }}>
          {/* Trip Info */}
          {tripInfo && (
            <Box>
              <Typography sx={{ fontSize: '16px', fontWeight: 500, color: '#374151', marginBottom: 1 }}>
                {tripInfo.from} → {tripInfo.to}
              </Typography>
              <Typography sx={{ fontSize: '14px', color: '#6B7280' }}>
                {tripInfo.date} - {tripInfo.driver}
              </Typography>
            </Box>
          )}

          {/* Star Rating */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontSize: '16px', fontWeight: 500, color: '#374151' }}>
              Sua avaliação
            </Typography>
            <StarRating rating={rating} readOnly={true} />
          </Box>

          {/* Review Text */}
          <Box>
            <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: 1 }}>
              Escreva seu feedback (opcional)
            </Typography>
            <TextField
              multiline
              rows={4}
              fullWidth
              placeholder="Compartilhe sua experiência sobre esta viagem..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#F9FAFB',
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#E5E7EB',
                  },
                  '&:hover fieldset': {
                    borderColor: '#D1D5DB',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3B82F6',
                  },
                },
              }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button
          onClick={handleCancel}
          sx={{
            color: '#6B7280',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#F3F4F6',
            },
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{
            backgroundColor: '#3B82F6',
            color: 'white',
            textTransform: 'none',
            fontWeight: 600,
            paddingX: 3,
            '&:hover': {
              backgroundColor: '#2563EB',
            },
          }}
        >
          Concluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewDialog;
