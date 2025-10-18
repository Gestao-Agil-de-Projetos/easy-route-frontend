import React from "react";
import { Grid, Box } from "@mui/material";
import LeftPanel from "../../organisms/LeftPanel/LeftPanel.jsx";
import LoginForm from "../../molecules/LoginForm/LoginForm.jsx";

export default function LoginPage() {
  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Lado esquerdo */}
      <Grid
        sx={{
          flexBasis: { xs: "100%", md: "50%" }, // 100% mobile, 50% desktop
          backgroundColor: "#00BFA6", // cor do Figma
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: { xs: "300px", md: "auto" }, // garante altura mínima em mobile
        }}
      >
        <LeftPanel />
      </Grid>

      {/* Lado direito */}
      <Grid
        sx={{
          flexBasis: { xs: "100%", md: "50%" },
          backgroundColor: "#F9FAFB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, md: 0 }, // padding responsivo
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400, // largura máxima do formulário
            px: 3,
          }}
        >
          <LoginForm />
        </Box>
      </Grid>
    </Grid>
  );
}
