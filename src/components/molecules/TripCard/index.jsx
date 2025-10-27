import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Collapse,
  Divider,
  Grid,
  Avatar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function TripCard({ trip }) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
        borderLeft: `4px solid ${trip.status === "LOTADO" ? "#DC2626" : "#CA8A04"}`,
        mb: 2,
        overflow: "hidden",
      }}
    >
      {/* Cabeçalho do Card */}
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {trip.origin} → {trip.destination}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Saída: {trip.departure}
          </Typography>
        </Box>

        <Box textAlign="center">
          <Typography variant="caption" color="#DC2626" fontWeight="bold">
            STATUS
          </Typography>
          <Typography
            variant="h5"
            fontWeight="bold"
            color={trip.status === "LOTADO" ? "#DC2626" : "#CA8A04"}
          >
            {trip.status}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {trip.occupied} / {trip.total} Vagas
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="body2"
            sx={{
              backgroundColor: "#FEE2E2",
              color: "#B91C1C",
              borderRadius: "12px",
              px: 2,
              py: 0.5,
              fontWeight: 600,
            }}
          >
            {trip.departureIn}
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Botão de Detalhes */}
      <Box
        sx={{
          backgroundColor: "#F9FAFB",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 1,
          cursor: "pointer",
        }}
        onClick={handleToggle}
      >
        <Typography color="#047857" fontWeight={600}>
          {open ? "Ocultar Detalhes da Coleta" : "Ver Detalhes da Coleta"}
        </Typography>
        {open ? (
          <ExpandLessIcon sx={{ color: "#047857", ml: 1 }} />
        ) : (
          <ExpandMoreIcon sx={{ color: "#047857", ml: 1 }} />
        )}
      </Box>

      {/* Conteúdo Expandido */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider />

        <Box p={3} sx={{ backgroundColor: "#F9FAFB" }}>
          <Grid container spacing={3}>
            {/* Lista de Passageiros */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Lista de Passageiros ({trip.passengers.length})
              </Typography>
              {trip.passengers.map((p, idx) => (
                <Typography key={idx} sx={{ mb: 0.5 }}>
                  <strong>{p.name}:</strong> Ponto: {p.pickup}
                </Typography>
              ))}
            </Grid>

            {/* Rota de Coleta */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Rota de Coleta Otimizada
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                Tempo total de coleta: {trip.route.time}
              </Typography>
              <Box ml={2} mb={2}>
                {trip.route.stops.map((stop, i) => (
                  <Typography key={i} variant="body2">
                    {stop.name} ({stop.count})
                  </Typography>
                ))}
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: 180,
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={trip.route.mapUrl}
                  alt="Mapa da Rota"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </Box>
  );
}
