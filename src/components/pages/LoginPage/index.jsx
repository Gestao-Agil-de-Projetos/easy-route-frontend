import React from "react";
import { Grid, Box } from "@mui/material";
import LeftPanel from "../../organisms/LeftPanel/index.jsx";
import LoginForm from "../../molecules/LoginForm/index.jsx";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  // Função que leva para a tela de registro
  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Painel esquerdo */}
      <Grid
        sx={{
          flexBasis: { xs: "100%", md: "50%" },
          flexShrink: 0,
          backgroundColor: { xs: "#ffffffff", md: "#2563EB" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: { xs: "50%", md: "100%" },
        }}
      >
        <LeftPanel />
      </Grid>

      {/* Painel direito */}
      <Grid
        sx={{
          flexBasis: { xs: "100%", md: "50%" },
          display: "flex",
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "center",
          backgroundColor: "#F9FAFB",
          px: { xs: 3, md: 0 },
          py: { xs: 48, md: 0 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
          }}
        >
          {/* Passa a função para o LoginForm */}
          <LoginForm onRegisterClick={handleRegisterClick} />
        </Box>
      </Grid>
    </Grid>
  );
}
