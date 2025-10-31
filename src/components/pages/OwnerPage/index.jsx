import React, { useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Global } from '@emotion/react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Drawer, useMediaQuery, useTheme } from '@mui/material';
import { DirectionsBus, CheckCircle, History, Menu as MenuIcon } from '@mui/icons-material';
import { theme } from '../../../conf/theme';
import { AuthContext } from '../../../contexts/AuthContext';
import RouteText from '../../atoms/RouteText';
import RouteSnackBar from '../../atoms/RouteSnackBar';

// Organisms
import OwnerSidebar from '../../organisms/OwnerSidebar';
import TripForm from '../../organisms/TripForm';
import VehicleForm from '../../organisms/VehicleForm';
import ActiveTripCard from '../../organisms/ActiveTripCard';
import ReservationTripCard from '../../organisms/ReservationTripCard';
import HistoryTripCard from '../../organisms/HistoryTripCard';

// Molecules
import VehicleCard from '../../molecules/VehicleCard';
import StatCard from '../../molecules/StatCard';

export default function OwnerPage() {
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down('lg'));
  
  const [tab, setTab] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedReservation, setExpandedReservation] = useState(null);
  const [expandedHistory, setExpandedHistory] = useState(null);
  const [expandedTrip, setExpandedTrip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', type: 'success' });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });
  
  const handleLogout = useCallback(() => {
    logoutUser();
    showNotification('Logout realizado com sucesso', 'success');
    navigate('/login', { replace: true });
  }, [logoutUser, navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTabChange = (newTab) => {
    setTab(newTab);
    if (isMobile) {
      setMobileOpen(false);
    }
  };
  
  const [newTrip, setNewTrip] = useState({ origin: '', destination: '', time: '', vehicle: '', capacity: '' });
  const [tripErrors, setTripErrors] = useState({});
  const [newVehicle, setNewVehicle] = useState({ make: '', model: '', plate: '', year: '', capacity: '' });
  const [vehicleErrors, setVehicleErrors] = useState({});
  const [vehicles, setVehicles] = useState([
    { id: 1, make: 'Mercedes-Benz', model: 'Sprinter', plate: 'JPK-9657', year: 2022, capacity: 13 },
    { id: 2, make: 'Fiat', model: 'Ducato', plate: 'XYZ-1234', year: 2021, capacity: 15 },
  ]);

  const activeTrips = [
    { 
      id: 1, 
      origin: 'Vitória da Conquista', 
      destination: 'Rio de Janeiro',
      originLocation: 'Vitória da Conquista, BA',
      destinationLocation: 'Rio de Janeiro, RJ',
      date: '30/10/2025', 
      time: '14:00', 
      status: 'LOTADO', 
      passengers: 13, 
      capacity: 13, 
      passengersList: [
        { name: 'Ana Vitoria', pickup: 'Shopping Conquista Sul' },
        { name: 'Bruno Costa', pickup: 'Entrada do IFBA' },
        { name: 'Carla Dias', pickup: 'Rodoviária VCA' },
        { name: 'Daniel Moreira', pickup: 'Entrada da UNEX' },
        { name: 'Elisa Fernandes', pickup: 'Shopping Conquista Sul' },
        { name: 'Fábio Guedes', pickup: 'Entrada do IFBA' },
        { name: 'Gabriela Lima', pickup: 'Rodoviária VCA' },
        { name: 'Hugo Mendes', pickup: 'Entrada da UNEX' },
        { name: 'Isabela Nunes', pickup: 'Shopping Conquista Sul' },
        { name: 'João Paulo', pickup: 'Entrada do IFBA' },
        { name: 'Larissa Rocha', pickup: 'Rodoviária VCA' },
        { name: 'Marcos Silva', pickup: 'Entrada da UNEX' },
        { name: 'Mariana Oliveira', pickup: 'Rodoviária VCA' },
      ],
      pickupRoute: [
        { location: 'Entrada do IFBA', count: 3 },
        { location: 'Entrada da UNEX', count: 3 },
        { location: 'Rodoviária VCA', count: 4 },
        { location: 'Shopping Conquista Sul', count: 3 },
      ]
    },
    { 
      id: 2, 
      origin: 'Vitória da Conquista', 
      destination: 'Ilhéus',
      originLocation: 'Vitória da Conquista, BA',
      destinationLocation: 'Ilhéus, BA',
      date: '30/10/2025', 
      time: '09:00', 
      status: 'ABERTA', 
      passengers: 8, 
      capacity: 13,
      passengersList: [
        { name: 'Alex Santos', pickup: 'Entrada do IFBA' },
        { name: 'Beatriz Lima', pickup: 'Rodoviária VCA' },
        { name: 'César Oliveira', pickup: 'Entrada da UNEX' },
        { name: 'Denise Rocha', pickup: 'Shopping Conquista Sul' },
        { name: 'Emerson Costa', pickup: 'Entrada do IFBA' },
        { name: 'Fernanda Silva', pickup: 'Rodoviária VCA' },
        { name: 'Gustavo Mendes', pickup: 'Entrada da UNEX' },
        { name: 'Helena Dias', pickup: 'Shopping Conquista Sul' },
      ],
      pickupRoute: [
        { location: 'Entrada do IFBA', count: 2 },
        { location: 'Entrada da UNEX', count: 2 },
        { location: 'Rodoviária VCA', count: 2 },
        { location: 'Shopping Conquista Sul', count: 2 },
      ]
    },
  ];

  const reservations = [
    { 
      id: 1, 
      origin: 'Vitória da Conquista', 
      destination: 'São Paulo',
      originLocation: 'Vitória da Conquista, BA',
      destinationLocation: 'São Paulo, SP',
      date: '28/10/2025', 
      time: '11:30', 
      status: 'AGENDADA', 
      passengers: 2, 
      capacity: 13, 
      passengersList: ['Marcos Andrade (Ponto: Rodoviária VCA)', 'Luisa Pereira (Ponto: Entrada do IFBA)'] 
    },
    { 
      id: 2, 
      origin: 'Vitória da Conquista', 
      destination: 'Belo Horizonte',
      originLocation: 'Vitória da Conquista, BA',
      destinationLocation: 'Belo Horizonte, MG',
      date: '29/10/2025', 
      time: '08:00', 
      status: 'AGENDADA', 
      passengers: 5, 
      capacity: 13, 
      passengersList: ['João Silva (Ponto: Rodoviária)', 'Maria Santos (Ponto: IFBA)', 'Pedro Costa (Ponto: Shopping)', 'Ana Lima (Ponto: Rodoviária)', 'Carlos Mendes (Ponto: UNEX)'] 
    },
  ];

  const historyTrips = [
    { 
      id: 1, 
      origin: 'Vitória da Conquista', 
      destination: 'Salvador',
      date: '20/10/2025', 
      fare: 'R$ 455,00', 
      passengers: 13, 
      passengers_list: ['Ana', 'Bruno', 'Carla', 'Daniel', 'Elisa', 'Fábio', 'Gabriela', 'Hugo', 'Isabela', 'João', 'Larissa', 'Marcos', 'Mariana'] 
    },
    { 
      id: 2, 
      origin: 'Vitória da Conquista', 
      destination: 'Fortaleza',
      date: '18/10/2025', 
      fare: 'R$ 540,00', 
      passengers: 12, 
      passengers_list: ['Carlos', 'Debora', 'Eduardo', 'Fernanda', 'Gustavo', 'Helena', 'Igor', 'Julia', 'Kevin', 'Laura', 'Marcio', 'Natalia'] 
    },
  ];

  const showNotification = useCallback((message, type = 'success') => setNotification({ open: true, message, type }), []);

  const validateTrip = () => {
    const errors = {};
    if (!newTrip.origin?.trim()) errors.origin = 'Obrigatório';
    if (!newTrip.destination?.trim()) errors.destination = 'Obrigatório';
    if (!newTrip.time) errors.time = 'Obrigatório';
    if (!newTrip.vehicle) errors.vehicle = 'Obrigatório';
    if (!newTrip.capacity || parseInt(newTrip.capacity) <= 0) errors.capacity = 'Inválido';
    setTripErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateVehicle = () => {
    const errors = {};
    if (!newVehicle.make?.trim()) errors.make = 'Obrigatório';
    if (!newVehicle.model?.trim()) errors.model = 'Obrigatório';
    if (!newVehicle.plate?.trim()) errors.plate = 'Obrigatório';
    if (!newVehicle.year || parseInt(newVehicle.year) < 1900) errors.year = 'Inválido';
    if (!newVehicle.capacity || parseInt(newVehicle.capacity) <= 0) errors.capacity = 'Inválido';
    setVehicleErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleTripChange = (updatedData) => {
    setNewTrip(updatedData);
    const changedField = Object.keys(updatedData).find(key => updatedData[key] !== newTrip[key]);
    if (changedField && tripErrors[changedField]) {
      setTripErrors({ ...tripErrors, [changedField]: '' });
    }
  };

  const handleVehicleChange = (updatedData) => {
    setNewVehicle(updatedData);
    const changedField = Object.keys(updatedData).find(key => updatedData[key] !== newVehicle[key]);
    if (changedField && vehicleErrors[changedField]) {
      setVehicleErrors({ ...vehicleErrors, [changedField]: '' });
    }
  };

  const handleAddTrip = async () => {
    if (!validateTrip()) { showNotification('Preencha todos os campos', 'error'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    showNotification('Viagem registrada!', 'success');
    setNewTrip({ origin: '', destination: '', time: '', vehicle: '', capacity: '' });
    setLoading(false);
  };

  const handleAddVehicle = async () => {
    if (!validateVehicle()) { showNotification('Preencha todos os campos', 'error'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setVehicles([...vehicles, { id: vehicles.length + 1, ...newVehicle, year: parseInt(newVehicle.year), capacity: parseInt(newVehicle.capacity) }]);
    showNotification(`${newVehicle.make} adicionado!`, 'success');
    setNewVehicle({ make: '', model: '', plate: '', year: '', capacity: '' });
    setLoading(false);
  };

  const handleRemoveVehicle = (id) => setDeleteDialog({ open: true, id });
  
  const confirmDelete = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    setVehicles(vehicles.filter(v => v.id !== deleteDialog.id));
    showNotification('Veículo removido!', 'success');
    setLoading(false);
    setDeleteDialog({ open: false, id: null });
  };

  return (
    <>
      <Global styles={`html, body, #root { height: 100%; width: 100vw; overflow-x: hidden !important; }`} />
      <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F9FAFB', width: '100%' }}>
        <RouteSnackBar 
          open={notification.open} 
          message={notification.message} 
          severity={notification.type} 
          onClose={() => setNotification({ ...notification, open: false })} 
        />
        
        <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, id: null })}>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogContent>Tem certeza que deseja remover este veículo?</DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog({ open: false, id: null })}>Cancelar</Button>
            <Button onClick={confirmDelete} color="error" variant="contained" disabled={loading}>Remover</Button>
          </DialogActions>
        </Dialog>

        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              position: 'fixed',
              top: 16,
              left: 16,
              zIndex: 1300,
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': {
                backgroundColor: '#f3f4f6',
              }
            }}
          >
            <MenuIcon sx={{ color: theme.palette.tertiary.main }} />
          </IconButton>
        )}

        {/* Sidebar - Desktop (fixed) */}
        {!isMobile && (
          <OwnerSidebar 
            activeTab={tab} 
            onTabChange={handleTabChange} 
            onLogout={handleLogout}
          />
        )}

        {/* Sidebar - Mobile (drawer) */}
        {isMobile && (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: 260,
              },
            }}
          >
            <OwnerSidebar 
              activeTab={tab} 
              onTabChange={handleTabChange} 
              onLogout={handleLogout}
            />
          </Drawer>
        )}

        <Box sx={{ 
          flex: 1, 
          minHeight: '100vh', 
          p: { xs: 2, sm: 3 }, 
          pt: { xs: 8, md: 3 },
          display: 'flex', 
          flexDirection: 'column', 
          marginLeft: { xs: 0, md: '260px' },
          width: { xs: '100%', md: 'calc(100% - 260px)' },
          maxWidth: '100%',
          overflowX: 'hidden'
        }}>
          {/* Tab 0: Viagens Ativas */}
          {tab === 0 && (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <RouteText 
                text="Viagens Ativas" 
                variant="h5" 
                sx={{ 
                  fontWeight: 700, 
                  color: '#1F2937', 
                  fontSize: { xs: '20px', sm: '22px', md: '24px' }, 
                  mb: { xs: 2, sm: 3 } 
                }} 
              />
              <TripForm
                tripData={newTrip}
                errors={tripErrors}
                loading={loading}
                vehicles={vehicles}
                onChange={handleTripChange}
                onSubmit={handleAddTrip}
              />
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                {activeTrips.length > 0 ? (
                  activeTrips.map((trip) => (
                    <ActiveTripCard
                      key={trip.id}
                      trip={trip}
                      isExpanded={expandedTrip === trip.id}
                      onToggle={() => setExpandedTrip(expandedTrip === trip.id ? null : trip.id)}
                    />
                  ))
                ) : (
                  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <RouteText 
                      text="Nenhuma viagem ativa no momento" 
                      sx={{ 
                        color: '#6B7280', 
                        fontSize: { xs: '14px', sm: '16px' },
                        textAlign: 'center'
                      }} 
                    />
                  </Box>
                )}
              </Box>
            </Box>
          )}

          {/* Tab 1: Veículos */}
          {tab === 1 && (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <RouteText 
                text="Meus Veículos" 
                variant="h5" 
                sx={{ 
                  fontWeight: 700, 
                  color: '#1F2937', 
                  fontSize: { xs: '20px', sm: '22px', md: '24px' }, 
                  mb: { xs: 2, sm: 3 } 
                }} 
              />
              <VehicleForm
                vehicleData={newVehicle}
                errors={vehicleErrors}
                loading={loading}
                onChange={handleVehicleChange}
                onSubmit={handleAddVehicle}
              />
              <Box sx={{ flex: 1, overflowY: 'auto' }}>
                <RouteText 
                  text={`Veículos Registrados (${vehicles.length})`} 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 2, 
                    fontSize: { xs: '16px', sm: '18px' } 
                  }} 
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {vehicles.map(v => <VehicleCard key={v.id} vehicle={v} onRemove={handleRemoveVehicle} />)}
                </Box>
              </Box>
            </Box>
          )}

          {/* Tab 2: Reservas */}
          {tab === 2 && (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <RouteText 
                text="Reservas Futuras" 
                variant="h5" 
                sx={{ 
                  fontWeight: 700, 
                  color: '#1F2937', 
                  fontSize: { xs: '20px', sm: '22px', md: '24px' }, 
                  mb: { xs: 2, sm: 3 } 
                }} 
              />
              <Box sx={{ flex: 1, overflowY: 'auto' }}>
                {reservations.map(r => (
                  <ReservationTripCard
                    key={r.id}
                    reservation={r}
                    isExpanded={expandedReservation === r.id}
                    onToggle={() => setExpandedReservation(expandedReservation === r.id ? null : r.id)}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Tab 3: Histórico */}
          {tab === 3 && (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <RouteText 
                text="Histórico de Viagens" 
                variant="h5" 
                sx={{ 
                  fontWeight: 700, 
                  color: '#1F2937', 
                  fontSize: { xs: '20px', sm: '22px', md: '24px' }, 
                  mb: { xs: 2, sm: 3 } 
                }} 
              />
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { 
                  xs: 'repeat(1, 1fr)', 
                  sm: 'repeat(2, 1fr)', 
                  md: 'repeat(4, 1fr)' 
                }, 
                gap: { xs: 1.5, sm: 2 }, 
                mb: { xs: 2, sm: 3 } 
              }}>
                <StatCard 
                  icon={DirectionsBus} 
                  label="Total de Viagens" 
                  value={historyTrips.length} 
                  bgColor="#A7F3D0" 
                />
                <StatCard 
                  icon={CheckCircle} 
                  label="Passageiros" 
                  value={historyTrips.reduce((a, t) => a + t.passengers, 0)} 
                  bgColor="#DBEAFE" 
                />
                <StatCard 
                  icon={DirectionsBus} 
                  label="Faturamento" 
                  value={`R$ ${historyTrips.reduce((a, t) => a + parseFloat(t.fare.replace('R$ ', '').replace(',', '.')), 0).toFixed(2)}`} 
                  bgColor="#DCFCE7" 
                />
                <StatCard 
                  icon={History} 
                  label="Média" 
                  value={Math.round(historyTrips.reduce((a, t) => a + t.passengers, 0) / historyTrips.length)} 
                  bgColor="#FED7AA" 
                />
              </Box>
              <Box sx={{ flex: 1, overflowY: 'auto' }}>
                {historyTrips.map(t => (
                  <HistoryTripCard
                    key={t.id}
                    trip={t}
                    isExpanded={expandedHistory === t.id}
                    onToggle={() => setExpandedHistory(expandedHistory === t.id ? null : t.id)}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}