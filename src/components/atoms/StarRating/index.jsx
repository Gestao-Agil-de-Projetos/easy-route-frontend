import { Box } from '@mui/material';
import { Star } from 'lucide-react';

const StarRating = ({ rating, onRate, readOnly = false, size = 24 }) => {
  return (
    <Box sx={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Box
          key={star}
          onClick={() => !readOnly && onRate && onRate(star)}
          sx={{
            cursor: readOnly ? 'default' : 'pointer',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: readOnly ? 'none' : 'scale(1.1)',
            },
          }}
        >
          <Star
            size={size}
            fill={star <= rating ? '#EAB308' : '#D1D5DB'}
            color={star <= rating ? '#EAB308' : '#D1D5DB'}
          />
        </Box>
      ))}
    </Box>
  );
};

export default StarRating;
