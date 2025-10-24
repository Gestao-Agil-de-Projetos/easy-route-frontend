import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Header from '../../organisms/Header';
import SearchSection from '../../organisms/SearchSection';
import MapWithVans from '../../organisms/MapWithVans';
import TripConfirmationCard from '../../molecules/TripConfirmationCard';
import ExpandableReservations from '../../organisms/ExpandableReservations';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState({ from: '', to: '', date: 'Hoje' });
  const [userLocation, setUserLocation] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [availableTrips, setAvailableTrips] = useState([]);
  const [reservationsExpanded, setReservationsExpanded] = useState(false);
  const [showLastTrip, setShowLastTrip] = useState(true);

  // Mock data - última viagem para avaliar
  const lastTrip = {
    from: 'VCA',
    to: 'POÇÕES',
    date: '03/10 - 22h',
    driver: 'Pedro Tigre',
    price: 'R$ 25,40',
  };

  // Mock data - reservas
  const reservations = [
    { from: 'VCA', to: 'POÇÕES', time: '14:00', date: 'Hoje', timeBadge: '2h', variant: 'red' },
    { from: 'BRUMADO', to: 'VCA', time: '08:00', date: 'Amanhã', timeBadge: '8h', variant: 'orange' },
    { from: 'VCA', to: 'BARRA', time: '09:30', date: '15/10', timeBadge: '15/10', variant: 'yellow' },
    { from: 'POÇÕES', to: 'VITÓRIA DA CONQUISTA', time: '16:00', date: 'Hoje', timeBadge: '4h', variant: 'red' },
    { from: 'VCA', to: 'ITAPETINGA', time: '07:30', date: 'Amanhã', timeBadge: '10h', variant: 'orange' },
    { from: 'BARRA', to: 'BRUMADO', time: '11:00', date: '16/10', timeBadge: '16/10', variant: 'yellow' },
  ];

  // Mock data - histórico
  const history = [
    { 
      from: 'VCA', 
      to: 'POÇÕES', 
      date: '09/10', 
      price: 'R$ 35,00',
      review: { rating: 5, text: 'Viagem excelente! Motorista pontual e educado.' }
    },
    { 
      from: 'BRUMADO', 
      to: 'VCA', 
      date: '05/10', 
      price: 'R$ 45,00',
      review: { rating: 4, text: '' }
    },
    { 
      from: 'VCA', 
      to: 'BARRA', 
      date: '01/10', 
      price: 'R$ 70,00',
      review: { rating: 3, text: 'Viagem ok, mas teve atraso.' }
    },
    { 
      from: 'ITAPETINGA', 
      to: 'VCA', 
      date: '28/09', 
      price: 'R$ 50,00',
      review: { rating: 5, text: 'Ótima viagem!' }
    },
    { 
      from: 'VCA', 
      to: 'POÇÕES', 
      date: '25/09', 
      price: 'R$ 35,00',
      review: { rating: 4, text: 'Muito bom' }
    },
    { 
      from: 'BARRA', 
      to: 'BRUMADO', 
      date: '20/09', 
      price: 'R$ 60,00',
      review: { rating: 5, text: 'Perfeito!' }
    },
  ];

  // Mock data - viagens disponíveis
  const allTrips = [
    {
      id: 1,
      from: 'BRUMADO',
      to: 'VCA',
      distance: '120 Km',
      duration: '2h30',
      driver: 'João Silva',
      seats: 3,
      date: 'Hoje',
      time: '14:00',
      price: 'R$ 45,00',
      position: [-14.2031, -41.6656],
    },
    {
      id: 2,
      from: 'VCA',
      to: 'POÇÕES',
      distance: '69 Km',
      duration: '1h06',
      driver: 'Maria Santos',
      seats: 2,
      date: 'Hoje',
      time: '16:00',
      price: 'R$ 35,00',
      position: [-14.8631, -40.8444],
    },
    {
      id: 3,
      from: 'BRUMADO',
      to: 'VCA',
      distance: '120 Km',
      duration: '2h30',
      driver: 'Pedro Costa',
      seats: 4,
      date: 'Amanhã',
      time: '08:00',
      price: 'R$ 45,00',
      position: [-14.2031, -41.6656],
    },
    {
      id: 4,
      from: 'POÇÕES',
      to: 'BRUMADO',
      distance: '85 Km',
      duration: '1h45',
      driver: 'Ana Lima',
      seats: 1,
      date: 'Hoje',
      time: '18:00',
      price: 'R$ 40,00',
      position: [-14.5219, -40.3653],
    },
  ];

  // Obter localização do usuário ao carregar
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
          // Fallback para Vitória da Conquista
          setUserLocation([-14.8631, -40.8444]);
        }
      );
    } else {
      // Fallback para Vitória da Conquista
      setUserLocation([-14.8631, -40.8444]);
    }
  }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);

    // Filtrar viagens disponíveis
    const filtered = allTrips.filter((trip) => {
      const fromQuery = query?.from?.toLowerCase().trim() || '';
      const toQuery = query?.to?.toLowerCase().trim() || '';
      const dateQuery = query?.date || '';

      const fromMatches = !fromQuery || trip.from.toLowerCase().includes(fromQuery);
      const toMatches = !toQuery || trip.to.toLowerCase().includes(toQuery);
      const dateMatches = !dateQuery || trip.date === dateQuery;

      return fromMatches && toMatches && dateMatches;
    });

    setAvailableTrips(filtered);
  };

  const handleTripSelect = (trip) => {
    setSelectedTrip(trip);
  };

  const handleConfirmTrip = () => {
    console.log('Viagem confirmada:', selectedTrip);
    alert(`Reserva confirmada!\n${selectedTrip.from} → ${selectedTrip.to}\nMotorista: ${selectedTrip.driver}`);
    setSelectedTrip(null);
  };

  const handleCancelTrip = () => {
    setSelectedTrip(null);
  };

  const handleLogoClick = () => {
    setSelectedTrip(null);
    setSearchQuery({ from: '', to: '', date: 'Hoje' });
    setAvailableTrips([]);
  };

  const handleReviewComplete = (review) => {
    console.log('Review completo:', review);
    setShowLastTrip(false);
  };

  // Determina quais vans mostrar no mapa
  const vansToShow = selectedTrip ? [] : (availableTrips.length > 0 ? availableTrips : allTrips);

  return (
    <Box sx={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Mapa como Background */}
      {userLocation && (
        <MapWithVans
          userLocation={userLocation}
          vans={vansToShow}
          selectedTrip={selectedTrip}
          onVanClick={handleTripSelect}
        />
      )}

      {/* Header */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          overflow: 'visible',
        }}
      >
        <Header onLogoClick={handleLogoClick} />
      </Box>

      {/* Search Section - só mostra se não tem viagem selecionada */}
      {!selectedTrip && (
        <Box
          sx={{
            position: 'fixed',
            top: { xs: '90px', sm: '100px' },
            left: '50%',
            transform: 'translateX(-50%)',
            width: { xs: '95%', sm: '90%' },
            maxWidth: '900px',
            maxHeight: { xs: 'calc(100vh - 100px)', sm: 'calc(100vh - 120px)' },
            overflowY: 'auto',
            overflowX: 'hidden',
            zIndex: 1000,
            paddingBottom: { xs: '20px', sm: '24px' },
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '3px',
            },
          }}
        >
          <SearchSection
            onSearchChange={handleSearchChange}
            availableTrips={availableTrips}
            onTripSelect={handleTripSelect}
          />

          {/* Expandable Reservations with Last Trip */}
          <ExpandableReservations
            reservations={reservations}
            history={history}
            isExpanded={reservationsExpanded}
            onToggle={() => setReservationsExpanded(!reservationsExpanded)}
            lastTrip={showLastTrip ? lastTrip : null}
            onReviewComplete={handleReviewComplete}
          />
        </Box>
      )}

      {/* Trip Confirmation Card */}
      {selectedTrip && (
        <TripConfirmationCard
          trip={selectedTrip}
          onConfirm={handleConfirmTrip}
          onCancel={handleCancelTrip}
        />
      )}
    </Box>
  );
};

export default HomePage;
