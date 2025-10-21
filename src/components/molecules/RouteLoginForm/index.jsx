import React from "react";
import RouteButton from "../../atoms/RouteButton";
import RouteInputField from "../../atoms/RouteInputField";
import RouteText from "../../atoms/RouteText";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { theme } from "../../../conf/theme";

export default function RouteLoginForm() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "90%", sm: theme.sizes.form.maxWidth },
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "transparent",
        gap: 2.5,
      }}
    >
      <RouteText
        text="Bem-vindo!"
        variant="h5"
        sx={{
          position: "static",
          fontWeight: theme.typography.h5.fontWeight,
          color: theme.palette.text.primary,
          textAlign: "center",
        }}
      />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <RouteText
          variant="body2"
          sx={{ color: theme.palette.text.secondary, position: "static" }}
        >
          Não tem uma conta?{" "}
          <Box
            component="span"
            onClick={handleRegisterClick}
            sx={{
              color: theme.palette.text.link,
              fontWeight: 600,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Cadastre-se
          </Box>
        </RouteText>
      </Box>

      <RouteInputField label="Email" placeholder="Escreva seu email completo" />

      <RouteInputField
        label="Senha"
        placeholder="Digite uma senha"
        type="password"
      />

      <RouteButton
        variant="contained"
        fullWidth
        sx={{
          mt: 1,
          height: theme.sizes.button.medium.height,
          borderRadius: theme.shape.borderRadius,
          textTransform: theme.typography.button.textTransform,
          fontSize: "1.1rem",
          fontWeight: 700,
          background: theme.palette.primary.gradient,
          "&:hover": {
            background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          },
        }}
      >
        Entrar
      </RouteButton>
    </Box>
  );
}
