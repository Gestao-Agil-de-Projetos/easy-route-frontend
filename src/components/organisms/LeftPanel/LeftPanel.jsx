import React from "react";
import { Box, Typography } from "@mui/material";
import blob1 from "../../../assets/blob1.png";
import blob2 from "../../../assets/blob2.png";
import blob3 from "../../../assets/blob3.png";
import bus from "../../../assets/bus.png";
import ball1 from "../../../assets/ball1.png";
import ball2 from "../../../assets/ball2.png";
import rotafacil from "../../../assets/rotafacil.png";

export default function LeftPanel() {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        backgroundColor: "#2563EB",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="img"
        src={blob3}
        alt="blob3"
        sx={{
          position: "absolute",
          width: "67%",
          top: "15%",
          left: "21%",
          zIndex: 1,
        }}
      />
      <Box
        component="img"
        src={blob2}
        alt="blob2"
        sx={{
          position: "absolute",
          width: "56%",
          top: "19%",
          left: "17%",
          zIndex: 2,
        }}
      />
      <Box
        component="img"
        src={blob1}
        alt="blob1"
        sx={{
          position: "absolute",
          width: "48%",
          top: "21%",
          left: "43%",
          zIndex: 3,
        }}
      />
      <Box
        component="img"
        src={bus}
        alt="bus"
        sx={{
          position: "absolute",
          width: "53%",
          top: "23%",
          left: "29%",
          zIndex: 4,
        }}
      />
      <Box
        component="img"
        src={ball1}
        alt="ball1"
        sx={{
          position: "absolute",
          width: "45%",
          top: "66%",
          left: "57%",
        }}
      />
      <Box
        component="img"
        src={ball2}
        alt="ball2"
        sx={{
          position: "absolute",
          width: "32%",
          top: "0%",
          left: "0%",
        }}
      />
      <Box
        component="img"
        src={rotafacil}
        alt="Rota Fácil"
        sx={{
          position: "absolute",
          width: "25%",
          top: "5%",
          left: "38%",
          zIndex: 5,
        }}
      />
      <Typography
        variant="body2"
        sx={{
          position: "absolute",
          top: "93%",
          left: "24%",
          width: "60%",
          color: "white",
          fontSize: "0.9rem",
          fontWeight: 300,
          textAlign: "center",
          zIndex: 6,
        }}
      >
        Conectando passageiros e motoristas de forma rápida e segura.
      </Typography>
    </Box>
  );
}
