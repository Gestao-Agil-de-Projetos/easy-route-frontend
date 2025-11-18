import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Global } from '@emotion/react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Drawer, useMediaQuery, useTheme } from '@mui/material';
import { DirectionsBus, CheckCircle, History, Menu as MenuIcon } from '@mui/icons-material';
import { theme } from '../../../conf/theme';
import { AuthContext } from '../../../contexts/AuthContext';
import RouteText from '../../atoms/RouteText';
import RouteSnackBar from '../../atoms/RouteSnackBar';
import OwnerSidebar from '../../organisms/OwnerSidebar';
import TripForm from '../../organisms/TripForm';
import VehicleForm from '../../organisms/VehicleForm';
import ActiveTripCard from '../../organisms/ActiveTripCard';
import ReservationTripCard from '../../organisms/ReservationTripCard';
import HistoryTripCard from '../../organisms/HistoryTripCard';
import VehicleCard from '../../molecules/VehicleCard';
import StatCard from '../../molecules/StatCard';
import { getAllVans, createVan, deleteVan } from '../../../api/van';
import { createTrip, getTripsByOwner, deleteTrip } from '../../../api/trip';

export default function OwnerPage() {
  const { logoutUser, token, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const [tab, setTab] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedReservation, setExpandedReservation] = useState(null);
  const [expandedHistory, setExpandedHistory] = useState(null);
  const [expandedTrip, setExpandedTrip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', type: 'success' });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null, type: null });
  const [vehicles, setVehicles] = useState([]);
  const [activeTrips, setActiveTrips] = useState([]);
  const [reservationTrips, setReservationTrips] = useState([]);
  const [historyTrips, setHistoryTrips] = useState([]);
  const [newVehicle, setNewVehicle] = useState({ make: '', model: '', plate: '', year: '', capacity: '' });
  const [vehicleErrors, setVehicleErrors] = useState({});
  const [newTrip, setNewTrip] = useState({ origin: '', destination: '', time: '', vehicle: '', capacity: '' });
  const [tripErrors, setTripErrors] = useState({});

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ open: true, message, type });
  }, []);

  const handleLogout = useCallback(() => {
    logoutUser();
    showNotification('Logout realizado com sucesso', 'success');
    navigate('/login', { replace: true });
  }, [logoutUser, navigate, showNotification]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleTabChange = (newTab) => {
    setTab(newTab);
    if (isMobile) setMobileOpen(false);
  };

  const loadVehicles = useCallback(async () => {
    try {
      const res = await getAllVans(token);
      if (res.success) setVehicles(res.data || []);
    } catch {
      showNotification('Erro ao carregar veículos', 'error');
    }
  }, [token, showNotification]);

  const loadTrips = useCallback(async () => {
    try {
      const activeRes = await getTripsByOwner('ONGOING', token);
      const reservedRes = await getTripsByOwner('SCHEDULED', token);
      const historyRes = await getTripsByOwner('FINISHED', token);
      if (activeRes.success) setActiveTrips(activeRes.data || []);
      if (reservedRes.success) setReservationTrips(reservedRes.data || []);
      if (historyRes.success) setHistoryTrips(historyRes.data || []);
    } catch {
      showNotification('Erro ao carregar viagens', 'error');
    }
  }, [token, showNotification]);

  useEffect(() => {
    if (!token) return;
    loadVehicles();
    loadTrips();
  }, [token, loadVehicles, loadTrips]);

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

  const handleVehicleChange = (updatedData) => {
    setNewVehicle(updatedData);
    const changedField = Object.keys(updatedData).find(key => updatedData[key] !== newVehicle[key]);
    if (changedField && vehicleErrors[changedField]) {
      setVehicleErrors({ ...vehicleErrors, [changedField]: '' });
    }
  };

  const handleTripChange = (updatedData) => {
    setNewTrip(updatedData);
    const changedField = Object.keys(updatedData).find(key => updatedData[key] !== newTrip[key]);
    if (changedField && tripErrors[changedField]) {
      setTripErrors({ ...tripErrors, [changedField]: '' });
    }
  };

  const handleAddVehicle = async () => {
    if (!validateVehicle()) {
      showNotification('Preencha todos os campos', 'error');
      return;
    }
    setLoading(true);
    try {
      await createVan({ plate: newVehicle.plate, model: newVehicle.model, capacity: parseInt(newVehicle.capacity) }, token);
      showNotification(`${newVehicle.make} adicionado!`, 'success');
      setNewVehicle({ make: '', model: '', plate: '', year: '', capacity: '' });
      loadVehicles();
    } catch {
      showNotification('Erro ao adicionar veículo', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTrip = async () => {
    if (!validateTrip()) {
      showNotification('Preencha todos os campos', 'error');
      return;
    }
    setLoading(true);
    try {
      await createTrip({ start_time: newTrip.time, total_seats: parseInt(newTrip.capacity), route_id: parseInt(newTrip.vehicle), price: 0 }, token);
      showNotification('Viagem registrada!', 'success');
      setNewTrip({ origin: '', destination: '', time: '', vehicle: '', capacity: '' });
      loadTrips();
    } catch {
      showNotification('Erro ao criar viagem', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveVehicle = (id) => {
    setDeleteDialog({ open: true, id, type: 'vehicle' });
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      if (deleteDialog.type === 'vehicle') {
        await deleteVan(deleteDialog.id, token);
        setVehicles(vehicles.filter(v => v.id !== deleteDialog.id));
        showNotification('Veículo removido!', 'success');
      } else if (deleteDialog.type === 'trip') {
        await deleteTrip(deleteDialog.id, token);
        loadTrips();
        showNotification('Viagem removida!', 'success');
      }
    } catch {
      showNotification('Erro ao remover', 'error');
    } finally {
      setLoading(false);
      setDeleteDialog({ open: false, id: null, type: null });
    }
  };

  return (
    <>
      <Global styles={`html, body, #root { height: 100%; width: 100vw; overflow-x: hidden !important; }`} />
      <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F9FAFB', width: '100%' }}>
        <RouteSnackBar open={notification.open} message={notification.message} severity={notification.type} onClose={() => setNotification({ ...notification, open: false })} />

        <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, id: null, type: null })}>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogContent>Tem certeza que deseja remover?</DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog({ open: false, id: null, type: null })}>Cancelar</Button>
            <Button onClick={confirmDelete} color="error" variant="contained" disabled={loading}>Remover</Button>
          </DialogActions>
        </Dialog>

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
              '&:hover': { backgroundColor: '#f3f4f6' },
            }}
          >
            <MenuIcon sx={{ color: theme.palette.tertiary.main }} />
          </IconButton>
        )}

        {!isMobile && <OwnerSidebar activeTab={tab} onTabChange={handleTabChange} onLogout={handleLogout} userName={user?.name} userEmail={user?.email} />}

        {isMobile && (
          <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260 } }}>
            <OwnerSidebar activeTab={tab} onTabChange={handleTabChange} onLogout={handleLogout} userName={user?.name} userEmail={user?.email} />
          </Drawer>
        )}

        <Box sx={{ flex: 1, minHeight: '100vh', p: { xs: 2, sm: 3 }, pt: { xs: 8, md: 3 }, display: 'flex', flexDirection: 'column', marginLeft: { xs: 0, md: '260px' }, width: { xs: '100%', md: 'calc(100% - 260px)' }, maxWidth: '100%', overflowX: 'hidden' }}>
          {tab === 0 && (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <RouteText text="Viagens Ativas" variant="h5" sx={{ fontWeight: 700, color: '#1F2937', fontSize: { xs: '20px', sm: '22px', md: '24px' }, mb: { xs: 2, sm: 3 } }} />
              <TripForm tripData={newTrip} errors={tripErrors} loading={loading} vehicles={vehicles} onChange={handleTripChange} onSubmit={handleAddTrip} />
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                {activeTrips.length > 0 ? (
                  activeTrips.map((trip) => (
                    <ActiveTripCard key={trip.id} trip={trip} isExpanded={expandedTrip === trip.id} onToggle={() => setExpandedTrip(expandedTrip === trip.id ? null : trip.id)} />
                  ))
                ) : (
                  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <RouteText text="Nenhuma viagem ativa no momento" sx={{ color: '#6B7280', fontSize: { xs: '14px', sm: '16px' }, textAlign: 'center' }} />
                  </Box>
                )}
              </Box>
            </Box>
          )}

          {tab === 1 && (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <RouteText text="Meus Veículos" variant="h5" sx={{ fontWeight: 700, color: '#1F2937', fontSize: { xs: '20px', sm: '22px', md: '24px' }, mb: { xs: 2, sm: 3 } }} />
              <VehicleForm vehicleData={newVehicle} errors={vehicleErrors} loading={loading} onChange={handleVehicleChange} onSubmit={handleAddVehicle} />
              <Box sx={{ flex: 1, overflowY: 'auto' }}>
                <RouteText text={`Veículos Registrados (${vehicles.length})`} sx={{ fontWeight: 600, mb: 2, fontSize: { xs: '16px', sm: '18px' } }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {vehicles.map((v) => (
                    <VehicleCard key={v.id} vehicle={v} onRemove={handleRemoveVehicle} />
                  ))}
                </Box>
              </Box>
            </Box>
          )}

          {tab === 2 && (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <RouteText text="Reservas Futuras" variant="h5" sx={{ fontWeight: 700, color: '#1F2937', fontSize: { xs: '20px', sm: '22px', md: '24px' }, mb: { xs: 2, sm: 3 } }} />
              <Box sx={{ flex: 1, overflowY: 'auto' }}>
                {reservationTrips.map((r) => (
                  <ReservationTripCard key={r.id} reservation={r} isExpanded={expandedReservation === r.id} onToggle={() => setExpandedReservation(expandedReservation === r.id ? null : r.id)} />
                ))}
              </Box>
            </Box>
          )}

          {tab === 3 && (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <RouteText text="Histórico de Viagens" variant="h5" sx={{ fontWeight: 700, color: '#1F2937', fontSize: { xs: '20px', sm: '22px', md: '24px' }, mb: { xs: 2, sm: 3 } }} />
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: { xs: 1.5, sm: 2 }, mb: { xs: 2, sm: 3 } }}>
                <StatCard icon={DirectionsBus} label="Total de Viagens" value={historyTrips.length} bgColor="#A7F3D0" />
                <StatCard icon={CheckCircle} label="Passageiros" value={historyTrips.reduce((a, t) => a + (t.total_seats || 0), 0)} bgColor="#DBEAFE" />
                <StatCard icon={DirectionsBus} label="Faturamento" value={`R$ ${historyTrips.reduce((a, t) => a + (t.price || 0), 0).toFixed(2)}`} bgColor="#DCFCE7" />
                <StatCard icon={History} label="Média" value={historyTrips.length > 0 ? Math.round(historyTrips.reduce((a, t) => a + (t.total_seats || 0), 0) / historyTrips.length) : 0} bgColor="#FED7AA" />
              </Box>
              <Box sx={{ flex: 1, overflowY: 'auto' }}>
                {historyTrips.map((t) => (
                  <HistoryTripCard key={t.id} trip={t} isExpanded={expandedHistory === t.id} onToggle={() => setExpandedHistory(expandedHistory === t.id ? null : t.id)} />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
