import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // 👈 Importante!
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function RegisterForm() {
  const [role, setRole] = useState("passageiro");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // 👈 Hook de navegação

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) setRole(newRole);
  };

  const handleLoginClick = () => {
    navigate("/"); // 👈 Redireciona para a página de login
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "90%", sm: 420 },
        mx: "auto",
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

      {/* Botões de escolha */}
      <ToggleButtonGroup
        value={role}
        exclusive
        onChange={handleRoleChange}
        sx={{
          width: "100%",
          mb: 1,
          display: "flex",
          justifyContent: "center",
          borderRadius: "12px",
          backgroundColor: "#F1F5F9",
        }}
      >
        <ToggleButton
          value="passageiro"
          sx={{
            flex: 1,
            textTransform: "none",
            fontWeight: 600,
            color: role === "passageiro" ? "white" : "#475569",
            backgroundColor: role === "passageiro" ? "#2563EB" : "transparent",
            "&:hover": { backgroundColor: "#2563EB20" },
          }}
        >
          Sou um Passageiro
        </ToggleButton>
        <ToggleButton
          value="motorista"
          sx={{
            flex: 1,
            textTransform: "none",
            fontWeight: 600,
            color: role === "motorista" ? "white" : "#475569",
            backgroundColor: role === "motorista" ? "#2563EB" : "transparent",
            "&:hover": { backgroundColor: "#2563EB20" },
          }}
        >
          Sou um Motorista
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Link para login */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          mb: -1,
        }}
      >
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

      {/* Inputs */}
      <TextField label="Nome" placeholder="Escreva seu nome completo" fullWidth />
      <TextField label="Email" placeholder="Escreva seu email completo" fullWidth />
      <TextField label="CPF / CNPJ" placeholder="000.000.000-00" fullWidth />
      <TextField label="Telefone (opcional)" placeholder="(DD) 00000-0000" fullWidth />

      {/* Campo de senha */}
      <TextField
        label="Senha"
        placeholder="Digite uma senha"
        type={showPassword ? "text" : "password"}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Botão principal */}
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
          "&:hover": {
            background: "linear-gradient(90deg, #1E40AF 0%, #2563EB 100%)",
          },
        }}
      >
        Crie sua Conta
      </Button>
    </Box>
  );
}
