import React from "react";
import { Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RouteLeftPanel from "../../organisms/RouteLeftPanel";
import RouteRegisterForm from "../../molecules/RouteRegisterForm";
import { theme } from "../../../conf/theme";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => navigate("/");

  return (
    <Grid
      container
      sx={{
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
        flexDirection: { xs: "column", md: "row" },
        boxSizing: "border-box",
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
          boxSizing: "border-box",
          flexShrink: 0,
        }}
      >
        <RouteLeftPanel />
      </Grid>

      <Grid
        sx={{
          width: { xs: "100%", md: "50%" },
          height: { xs: "60vh", md: "100vh" },
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center", md: "center" },
          justifyContent: "center",
          backgroundColor: theme.palette.background.default,
          px: { xs: 4, sm: 6, md: 0 },
          py: { xs: 4, sm: 8, md: 0 },
          boxSizing: "border-box",
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            mt: { xs: 2, sm: 0 },
          }}
        >
          <RouteRegisterForm handleLoginClick={handleLoginClick} />
        </Box>
      </Grid>
    </Grid>
  );
}
