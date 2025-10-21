import React from "react";
import { Grid, Box } from "@mui/material";
import RouteLeftPanel from "../../organisms/RouteLeftPanel";
import RouteLoginForm from "../../molecules/RouteLoginForm";
import { useNavigate } from "react-router-dom";
import { theme } from "../../../conf/theme";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleRegisterClick = () => navigate("/register");

  return (
    <Grid
      container
      sx={{
        width: "100vw",
        height: "100vh",
        overflowX: "hidden",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Grid
        sx={{
          width: { xs: "100%", md: "50%" },
          height: { xs: "40vh", md: "100vh" },
          backgroundColor: {
            xs: theme.palette.primary.contrastText,
            md: theme.palette.primary.main,
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RouteLeftPanel />
      </Grid>

      <Grid
        sx={{
          width: { xs: "100%", md: "50%" },
          height: { xs: "60vh", md: "100vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.background.default,
          px: { xs: 4, sm: 6, md: 0 },
          py: { xs: 8, sm: 10, md: 0 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
          }}
        >
          <RouteLoginForm onRegisterClick={handleRegisterClick} />
        </Box>
      </Grid>
    </Grid>
  );
}
