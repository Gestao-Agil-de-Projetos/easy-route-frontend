import { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RouteInputField from "../../atoms/RouteInputField";
import RouteButton from "../../atoms/RouteButton";
import RouteRoleSelector from "../RouteRoleSelector";
import RouteText from "../../atoms/RouteText";
import { theme } from "../../../conf/theme";

export default function RouteRegisterForm() {
  const [role, setRole] = useState("passageiro");
  const navigate = useNavigate();

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) setRole(newRole);
  };

  const handleLoginClick = () => {
    navigate("/");
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
        gap: 2.5,
      }}
    >
      <RouteText
        variant="h5"
        sx={{
          fontWeight: theme.typography.h5.fontWeight,
          color: theme.palette.text.primary,
          textAlign: "center",
          mb: 1,
        }}
      >
        Cadastre-se Gratuitamente
      </RouteText>

      <RouteRoleSelector
        role={role}
        onChange={handleRoleChange}
        passengerLabel="Sou Passageiro"
        driverLabel="Sou Motorista"
      />

      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr" },
          gap: 1,
        }}
      >
        <RouteInputField label="Nome" placeholder="Escreva seu nome completo" />

        <RouteInputField
          label="Email"
          placeholder="Escreva seu email completo"
        />

        <RouteInputField label="CPF / CNPJ" placeholder="000.000.000-00" />
        <RouteInputField
          label="Telefone (opcional)"
          placeholder="(DD) 00000-0000"
        />

        {role === "motorista" && (
          <RouteInputField label="CNH" placeholder="00000000000" />
        )}

        <RouteInputField
          label="Senha"
          placeholder="Digite uma senha"
          type="password"
          sx={{ gridColumn: "1 / -1" }}
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          mb: -1,
        }}
      >
        <RouteText variant="body2" sx={{ color: theme.palette.text.secondary }}>
          Já tem uma conta?{" "}
          <Box
            component="span"
            onClick={handleLoginClick}
            sx={{
              color: theme.palette.text.link,
              fontWeight: 600,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Faça Login
          </Box>
        </RouteText>
      </Box>

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
        Crie sua Conta
      </RouteButton>
    </Box>
  );
}
