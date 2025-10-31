import { Box } from '@mui/material';

const PriceBadge = ({ price }) => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2px 8px',
        backgroundColor: '#E5E7EB',
        borderRadius: '4px',
        fontWeight: 600,
        fontSize: '12px',
        lineHeight: '16px',
        color: '#4B5563',
      }}
    >
      {price}
    </Box>
  );
};

export default PriceBadge;
