import React from "react";
import { Box, Avatar, Typography, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { DirectionsCar, EventNote, BarChart2, Search } from "lucide-react";
import { theme } from "../../../conf/theme";
import logo from "../../../assets/logo-rotafacil.png";

export default function SidebarDriver({ active = "viagens-ativas", user = {} }) {
  const menuItems = [
    { id: "viagens-ativas", label: "Viagens Ativas", icon: <Search size={20} /> },
    { id: "meus-veiculos", label: "Meus Veículos", icon: <DirectionsCar size={20} /> },
    { id: "reservas-futuras", label: "Reservas Futuras", icon: <EventNote size={20} /> },
    { id: "historico", label: "Histórico", icon: <BarChart2 size={20} /> },
  ];

  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        borderRight: "1px solid #E5E7EB",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: "#fff",
      }}
    >
      {/* Topo: Logo e Menu */}
      <Box>
        {/* Logo */}
        <Box display="flex" alignItems="center" gap={1} px={2} py={3}>
          <Box
            component="img"
            src={logo}
            alt="Rota Fácil Logo"
            sx={{ width: 40, height: 40 }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Rota Fácil
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
            >
              Driver
            </Typography>
          </Box>
        </Box>

        {/* Menu */}
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.id}
              sx={{
                borderRadius: 1.5,
                mx: 1,
                mb: 0.5,
                bgcolor: active === item.id ? theme.palette.primary.main : "transparent",
                color: active === item.id ? "#fff" : "#374151",
                "&:hover": {
                  bgcolor: active === item.id ? theme.palette.primary.main : "#F3F4F6",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: active === item.id ? "#fff" : "#374151",
                  minWidth: 36,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: active === item.id ? 600 : 500,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Rodapé: Perfil do Usuário */}
      <Box
        display="flex"
        alignItems="center"
        gap={1.5}
        px={2}
        py={2}
        sx={{ borderTop: "1px solid #E5E7EB" }}
      >
        <Avatar sx={{ bgcolor: "#A7F3D0", color: "#065F46", fontWeight: 700 }}>
          {user?.initials || "PT"}
        </Avatar>
        <Box>
          <Typography variant="subtitle2" sx={{ color: "#374151", fontWeight: 600 }}>
            {user?.name || "Pedro Tigre"}
          </Typography>
          <Typography variant="caption" sx={{ color: "#6B7280" }}>
            {user?.email || "pedro.tigre@email.com"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
