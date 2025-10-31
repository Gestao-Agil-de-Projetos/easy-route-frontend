import { Box } from '@mui/material';
import SearchBar from '../../molecules/SearchBar';
import DatePickerDialog from '../../atoms/DatePickerDialog';
import SearchDropdown from '../../molecules/SearchDropdown';
import { useState } from 'react';

const SearchSection = ({ onSearchChange, availableTrips, onTripSelect }) => {
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [selectedDate, setSelectedDate] = useState('Hoje');
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleFromChange = (e) => {
    setFromValue(e.target.value);
    const hasSearch = e.target.value.trim() !== '' || toValue.trim() !== '';
    setShowDropdown(hasSearch);
    onSearchChange && onSearchChange({ from: e.target.value, to: toValue, date: selectedDate });
  };

  const handleToChange = (e) => {
    setToValue(e.target.value);
    const hasSearch = fromValue.trim() !== '' || e.target.value.trim() !== '';
    setShowDropdown(hasSearch);
    onSearchChange && onSearchChange({ from: fromValue, to: e.target.value, date: selectedDate });
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onSearchChange && onSearchChange({ from: fromValue, to: toValue, date });
  };

  const handleOpenDatePicker = () => {
    setDatePickerOpen(true);
  };

  const handleCloseDatePicker = () => {
    setDatePickerOpen(false);
  };

  const handleTripSelect = (trip) => {
    setShowDropdown(false);
    onTripSelect && onTripSelect(trip);
  };

  const handleFromLocationClick = () => {
    // Integrar com API de geolocalização do navegador
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.allorigins.win/get?url=${encodeURIComponent(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)}`
            );
            const data = await response.json();
            const location = JSON.parse(data.contents);
            const city = location.address?.city || location.address?.town || location.address?.county || 'Local Atual';
            setFromValue(city);
            setShowDropdown(true);
            onSearchChange && onSearchChange({ from: city, to: toValue, date: selectedDate });
          } catch (error) {
            console.error('Erro ao buscar localização:', error);
            setFromValue('Local atual');
            setShowDropdown(true);
            onSearchChange && onSearchChange({ from: 'Local atual', to: toValue, date: selectedDate });
          }
        },
        (error) => {
          console.error('Erro ao obter geolocalização:', error);
          // Fallback para "Local atual" se o usuário negar permissão
          setFromValue('Local atual');
          setShowDropdown(true);
          onSearchChange && onSearchChange({ from: 'Local atual', to: toValue, date: selectedDate });
        }
      );
    } else {
      // Navegador não suporta geolocalização
      setFromValue('Local atual');
      setShowDropdown(true);
      onSearchChange && onSearchChange({ from: 'Local atual', to: toValue, date: selectedDate });
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0px 4px 6px -4px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(5px)',
          borderRadius: '16px',
          padding: { xs: '16px', sm: '20px', md: '24px' },
        }}
      >
        <SearchBar
          fromValue={fromValue}
          toValue={toValue}
          selectedDate={selectedDate}
          onFromChange={handleFromChange}
          onToChange={handleToChange}
          onDateSelect={handleOpenDatePicker}
          onFromLocationClick={handleFromLocationClick}
        />
      </Box>

      <SearchDropdown
        trips={availableTrips}
        onTripSelect={handleTripSelect}
        isVisible={showDropdown}
      />
      
      <DatePickerDialog
        open={datePickerOpen}
        onClose={handleCloseDatePicker}
        selectedDate={selectedDate}
        onSelectDate={handleDateSelect}
      />
    </Box>
  );
};

export default SearchSection;
