import { Dialog, DialogTitle, DialogContent, Box, Typography, IconButton } from '@mui/material';
import StarRating from '../../atoms/StarRating';
import { X } from 'lucide-react';

const ViewReviewDialog = ({ open, onClose, review, tripInfo }) => {
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
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontWeight: 600, fontSize: '20px', color: '#1F2937' }}>
          Sua Avaliação
        </Typography>
        <IconButton onClick={onClose} size="small">
          <X size={20} />
        </IconButton>
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
                {tripInfo.date} - {tripInfo.price}
              </Typography>
            </Box>
          )}

          {/* Star Rating */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>
              Sua nota
            </Typography>
            <StarRating rating={review?.rating || 0} readOnly={true} />
          </Box>

          {/* Review Text */}
          {review?.text && (
            <Box>
              <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: 1 }}>
                Seu comentário
              </Typography>
              <Box
                sx={{
                  padding: '12px',
                  backgroundColor: '#F9FAFB',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                }}
              >
                <Typography sx={{ fontSize: '14px', color: '#374151', lineHeight: 1.6 }}>
                  {review.text}
                </Typography>
              </Box>
            </Box>
          )}

          {!review?.text && (
            <Box
              sx={{
                padding: '16px',
                backgroundColor: '#F9FAFB',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <Typography sx={{ fontSize: '14px', color: '#6B7280', fontStyle: 'italic' }}>
                Você não deixou um comentário nesta avaliação
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ViewReviewDialog;
