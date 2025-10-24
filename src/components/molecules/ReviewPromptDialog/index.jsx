import { Dialog, DialogTitle, DialogContent, Box, Button, Typography } from '@mui/material';

const ReviewPromptDialog = ({ open, onClose, onAccept, onDecline }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          padding: '16px',
          minWidth: { xs: '90%', sm: '400px' },
        }
      }}
    >
      <DialogTitle>
        <Typography sx={{ fontWeight: 600, fontSize: '18px', color: '#1F2937', textAlign: 'center' }}>
          Deseja escrever uma mensagem?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ fontSize: '14px', color: '#6B7280', textAlign: 'center', marginBottom: 2 }}>
          Compartilhe sua experiência e ajude outros passageiros!
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            onClick={onDecline}
            sx={{
              flex: 1,
              padding: '12px',
              color: '#6B7280',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#F3F4F6',
                borderColor: '#D1D5DB',
              },
            }}
          >
            Não, obrigado
          </Button>
          <Button
            onClick={onAccept}
            sx={{
              flex: 1,
              padding: '12px',
              backgroundColor: '#3B82F6',
              color: 'white',
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#2563EB',
              },
            }}
          >
            Sim, avaliar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewPromptDialog;
