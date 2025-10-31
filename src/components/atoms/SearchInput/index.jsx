import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Search, MapPin } from 'lucide-react';

const SearchInput = ({ placeholder, value, onChange, icon: Icon, onLocationClick, showLocationButton = false }) => {
  return (
    <TextField
      fullWidth
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      sx={{
        minWidth: '0',
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#F3F4F6',
          borderRadius: '8px',
          border: 'none',
          fontSize: { xs: '14px', sm: '16px', md: '18px' },
          '& fieldset': {
            border: 'none',
          },
          '&:hover fieldset': {
            border: 'none',
          },
          '&.Mui-focused fieldset': {
            border: '2px solid #3B82F6',
          },
        },
        '& .MuiInputBase-input': {
          padding: { xs: '10px 8px 10px 36px', sm: '12px 16px 12px 50px' },
          color: '#757575',
          fontSize: { xs: '14px', sm: '16px', md: '18px' },
        },
        '& .MuiInputBase-input::placeholder': {
          fontSize: { xs: '13px', sm: '16px', md: '18px' },
          opacity: 0.7,
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ marginLeft: { xs: '6px', sm: '12px' } }}>
            {Icon ? <Icon size={18} color="#9CA3AF" /> : <Search size={18} color="#9CA3AF" />}
          </InputAdornment>
        ),
        endAdornment: showLocationButton && (
          <InputAdornment position="end">
            <IconButton
              onClick={onLocationClick}
              sx={{
                padding: { xs: '6px', sm: '8px' },
                '&:hover': {
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                },
              }}
            >
              <MapPin size={18} color="#3B82F6" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;
