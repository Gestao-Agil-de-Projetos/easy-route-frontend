import { Box } from '@mui/material';
import SearchInput from '../../atoms/SearchInput';
import TimeSelector from '../../atoms/TimeSelector';
import { ArrowRight, Search } from 'lucide-react';

const SearchBar = ({ 
  fromValue, 
  toValue, 
  selectedDate, 
  onFromChange, 
  onToChange, 
  onDateSelect,
  onFromLocationClick 
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1.5, sm: 2 },
        width: '100%',
      }}
    >
      {/* Inputs Row */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: '1fr auto 1fr', 
          },
          gap: { xs: 1.5, sm: 2 },
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* De onde? */}
        <SearchInput
          placeholder="De onde?"
          value={fromValue}
          onChange={onFromChange}
          icon={Search}
          showLocationButton={true}
          onLocationClick={onFromLocationClick}
        />
        
        {/* Arrow - hidden on mobile */}
        <Box sx={{ 
          display: { xs: 'none', sm: 'flex' }, 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#9CA3AF',
        }}>
          <ArrowRight size={24} />
        </Box>
        
        {/* Para onde? */}
        <SearchInput
          placeholder="Para onde?"
          value={toValue}
          onChange={onToChange}
          icon={Search}
        />
      </Box>
      
      {/* Date Selector - Full width on its own row */}
      <TimeSelector selected={true} onClick={onDateSelect}>
        {selectedDate}
      </TimeSelector>
    </Box>
  );
};

export default SearchBar;
