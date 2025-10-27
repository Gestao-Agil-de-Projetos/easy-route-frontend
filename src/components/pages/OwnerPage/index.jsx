import React, { useState } from "react"; 
import { Box, Divider } from "@mui/material";
import SidebarDriver from "../../organisms/SlideBarDriver"; 
import TripRegisterForm from "../../molecules/TripRegisterForm"; 
import TripList from "../../organisms/TripList"; 
import TripCard from "../../molecules/TripCard"; 
import RouteText from "../../atoms/RouteText"; 


export default function OwnerScreen() {
  <TripCard trip={tripExample} />

  // Dados simulados do motorista — futuramente virão da API
  const driverData = {
    name: "Pedro Tigre",
    email: "pedro.tigre@email.com",
    initials: "PT",
  };

  // Estado local para armazenar viagens
  const [trips, setTrips] = useState([
    {
      id: 1,
      origin: "Vitória da Conquista",
      destination: "Poções",
      time: "14:00",
      status: "LOTADO",
      seats: { taken: 13, total: 13 },
      departure: "Partida em 30 min",
      color: "error.main",
      buttonText: "Ver Detalhes da Coleta",
    },
    {
      id: 2,
      origin: "Vitória da Conquista",
      destination: "Jequié",
      time: "18:00",
      status: "ABERTA",
      seats: { taken: 8, total: 13 },
      departure: "Recebendo Reservas",
      color: "warning.main",
      buttonText: "Ver Detalhes da Viagem",
    },
  ]);
  // Dropbox de exemplo com mais informações
  const tripExample = {
  origin: "Vitória da Conquista",
  destination: "Poções",
  departure: "Hoje às 14:00",
  status: "LOTADO",
  occupied: 13,
  total: 13,
  departureIn: "Partida em 30 min",
  passengers: [
    { name: "Ana Vitoria", pickup: "Shopping Conquista Sul" },
    { name: "Bruno Costa", pickup: "Entrada do IFBA" },
    { name: "Carla Dias", pickup: "Rodoviária VCA" },
  ],
  route: {
    time: "25 min",
    stops: [
      { name: "Entrada do IFBA", count: 3 },
      { name: "Entrada da UNEX", count: 3 },
      { name: "Rodoviária VCA", count: 4 },
      { name: "Shopping Conquista Sul", count: 3 },
    ],
    mapUrl: "/assets/map-example.png", 
  },
};

  // Função para adicionar nova viagem (simulada)
  const handleAddTrip = (newTrip) => {
    setTrips((prev) => [
      ...prev,
      { id: Date.now(), ...newTrip, status: "ABERTA" },
    ]);
  };

  return (
    <Box display="flex" height="100vh" bgcolor="#F9FAFB">
      {/* Sidebar fixa */}
      <SidebarDriver active="viagens-ativas" user={driverData} />

      {/* Área principal */}
      <Box flex={1} p={4} sx={{ overflowY: "auto" }}>
        {/* Título da Página */}
        <Box mb={3}>
          <RouteText
            text="Viagens Ativas"
            variant="h5"
            sx={{ fontWeight: 700 }}
          />
        </Box>

        {/* Formulário de Registro de Nova Viagem */}
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            p: 3,
            mb: 4,
          }}
        >
          <RouteText
            text="Registrar Nova Viagem"
            variant="h6"
            sx={{ mb: 2, fontWeight: 600 }}
          />
          <TripRegisterForm onSubmit={handleAddTrip} />
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Lista de Viagens (Cards) */}
        <TripList trips={trips} />
      </Box>
    </Box>
  );
}
