import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 420,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "transparent",
        gap: 2.5,
      }}
    >
      {/* Título principal */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: "#0F172A",
          textAlign: "center",
          mb: 1,
        }}
      >
        Bem-vindo de volta!
      </Typography>

      {/* Link de cadastro */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          mb: -1,
        }}
      >
        <Typography variant="body2" sx={{ color: "#475569" }}>
          Não tem uma conta?{" "}
          <Box
            component="span"
            sx={{
              color: "#2563EB",
              fontWeight: 600,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Cadastre-se
          </Box>
        </Typography>
      </Box>

      {/* Campo de email */}
      <TextField
        label="Email"
        placeholder="Escreva seu email completo"
        variant="outlined"
        fullWidth
        sx={{
          backgroundColor: "#F8FAFC",
          borderRadius: "12px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
          },
          "& .MuiInputLabel-root": {
            fontWeight: 500,
            color: "#475569",
          },
        }}
      />

      {/* Campo de senha */}
      <TextField
        label="Senha"
        placeholder="Digite uma senha"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        fullWidth
        sx={{
          backgroundColor: "#F8FAFC",
          borderRadius: "12px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
          },
          "& .MuiInputLabel-root": {
            fontWeight: 500,
            color: "#475569",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Botão de entrar */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 1,
          height: "68px",
          width: "400px",
          borderRadius: "12px",
          textTransform: "none",
          fontSize: "1.2rem",
          fontWeight: 700,
          background: "linear-gradient(90deg, #2563EB 0%, #3B82F6 100%)",
          "&:hover": {
            background: "linear-gradient(90deg, #1E40AF 0%, #2563EB 100%)",
          },
        }}
      >
        Entrar
      </Button>
    </Box>
  );
}
