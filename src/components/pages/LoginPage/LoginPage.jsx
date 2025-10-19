import React from "react";
import { Grid, Box } from "@mui/material";
import LeftPanel from "../../organisms/LeftPanel/LeftPanel.jsx";
import LoginForm from "../../molecules/LoginForm/LoginForm.jsx";

export default function LoginPage() {
  return (
    <Grid container sx={{ height: "100vh", flexDirection: { xs: "column", md: "row" } }}>
      {/* Lado esquerdo */}
      <Grid
        sx={{
          flexBasis: { xs: "100%", md: "50%" },
          flexShrink: 0,
          backgroundColor: { xs: "#ffffffff", md: "#2563EB" }, // cor do Figma
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: { xs: "50%", md: "100%" }, // altura proporcional no mobile
        }}
      >
        <LeftPanel />
      </Grid>

      {/* Lado direito */}
      <Grid
        sx={{
          flexBasis: { xs: "100%", md: "50%" },
          display: "flex",
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "center",
          backgroundColor: "#F9FAFB",
          px: { xs: 3, md: 0 }, // padding responsivo
          py: { xs: 48, md: 0 }, // espaço vertical no mobile
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400, // largura máxima do formulário
          }}
        >
          <LoginForm />
        </Box>
      </Grid>
    </Grid>
  );
}
