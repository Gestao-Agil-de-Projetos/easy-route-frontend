import React, { useState } from "react";
import { Grid, Box, TextField, Button, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom"; // 👈 Importante!
import LeftPanel from "../../organisms/LeftPanel/index.jsx";

export default function RegisterPage() {
  const [userType, setUserType] = useState("passageiro");
  const navigate = useNavigate(); // 👈 Hook para navegação

  const handleChange = (event, newType) => {
    if (newType !== null) setUserType(newType);
  };

  const handleLoginClick = () => {
    navigate("/"); // 👈 Redireciona para a tela de login
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
          justifyContent: { xs: "flex-end", md: "center" },
          backgroundColor: "#F9FAFB",
          px: { xs: 1, md: 0 },
          py: { xs: 48, md: 0 },
          ml: { xs: -17, md: 0 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2.5,
          }}
        >
          {/* Título */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#0F172A",
              textAlign: "center",
              mb: 1,
            }}
          >
            Cadastre-se Gratuitamente
          </Typography>

          {/* Alternador Passageiro / Motorista */}
          <ToggleButtonGroup
            color="primary"
            value={userType}
            exclusive
            onChange={handleChange}
            sx={{
              display: "flex",
              gap: 1,
              width: "100%",
              justifyContent: "center",
              "& .MuiToggleButton-root": {
                flex: 1,
                textTransform: "none",
                borderRadius: "8px !important",
                border: "1px solid #CBD5E1",
                color: "#0F172A",
                "&.Mui-selected": {
                  backgroundColor: "#2563EB",
                  color: "white",
                  border: "none",
                  "&:hover": { backgroundColor: "#1E40AF" },
                },
              },
            }}
          >
            <ToggleButton value="passageiro">Sou um Passageiro</ToggleButton>
            <ToggleButton value="motorista">Sou um Motorista</ToggleButton>
          </ToggleButtonGroup>

          {/* Link para login */}
          <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", mt: -1 }}>
            <Typography variant="body2" sx={{ color: "#475569" }}>
              Já tem uma conta?{" "}
              <Box
                component="span"
                onClick={handleLoginClick} // 👈 clique funcional
                sx={{
                  color: "#2563EB",
                  fontWeight: 600,
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Faça Login
              </Box>
            </Typography>
          </Box>

          {/* Campos */}
          <TextField label="Nome" placeholder="Escreva seu nome completo" fullWidth sx={{ backgroundColor: "#F8FAFC", borderRadius: "12px" }} />
          <TextField label="Email" placeholder="Escreva seu email completo" fullWidth sx={{ backgroundColor: "#F8FAFC", borderRadius: "12px" }} />
          <TextField label="CPF / CNPJ" placeholder="000.000.000-00" fullWidth sx={{ backgroundColor: "#F8FAFC", borderRadius: "12px" }} />
          <TextField label="Telefone (opcional)" placeholder="(DD) 00000-0000" fullWidth sx={{ backgroundColor: "#F8FAFC", borderRadius: "12px" }} />

          {userType === "motorista" && (
            <TextField label="CNH" placeholder="00000000000" fullWidth sx={{ backgroundColor: "#F8FAFC", borderRadius: "12px" }} />
          )}

          <TextField label="Senha" placeholder="Digite uma senha" type="password" fullWidth sx={{ backgroundColor: "#F8FAFC", borderRadius: "12px" }} />

          {/* Botão */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              height: "68px",
              borderRadius: "12px",
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: 700,
              background: "linear-gradient(90deg, #2563EB 0%, #3B82F6 100%)",
              "&:hover": { background: "linear-gradient(90deg, #1E40AF 0%, #2563EB 100%)" },
            }}
          >
            Crie sua Conta
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
