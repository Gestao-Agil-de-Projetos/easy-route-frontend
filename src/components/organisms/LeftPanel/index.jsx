import React from "react";
import { Box, Typography } from "@mui/material";
import blob1 from "../../../assets/blob1.png";
import blob2 from "../../../assets/blob2.png";
import blob3 from "../../../assets/blob3.png";
import bus from "../../../assets/bus.png";
import ball1 from "../../../assets/ball1.png";
import ball2 from "../../../assets/ball2.png";
import rotafacil from "../../../assets/rotafacil.png";
import rotafacil2 from "../../../assets/rotafacil2.png";

export default function LeftPanel() {
  return (
    <Box
  sx={{
    position: "absolute",        // absolute para poder controlar top/left
    top: { xs: 0, md: 0 },       // no mobile e desktop
    left: { xs: 0, md: 0 },      // desktop fica na esquerda (0), mobile 0
    width: { xs: "100%", md: "50%" },  // mobile ocupa 100% da largura
    height: { xs: "40%", md: "100%" }, // mobile altura automática
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
          width: { xs: "40%", md:"67%"},
          top: { xs: "20%", md:"15%"},
          left: { xs: "34%", md:"21%"},
          zIndex: 1,
        }}
      />
      <Box
        component="img"
        src={blob2}
        alt="blob2"
        sx={{
          position: "absolute",
          width: { xs: "38%", md:"56%"},
          top: { xs: "20%", md:"19%"},
          left: { xs: "13%", md:"17%"},
          zIndex: 2,
        }}
      />
      <Box
        component="img"
        src={blob1}
        alt="blob1"
        sx={{
          position: "absolute",
          width: { xs: "30%", md:"48%"},
          top: { xs: "20%", md:"21%"},
          left: { xs: "57%", md:"43%"},
          zIndex: 3,
        }}
      />
      <Box
        component="img"
        src={bus}
        alt="bus"
        sx={{
          position: "absolute",
          width: { xs: "34%", md:"53%"},
          top: { xs: "25%", md:"23%"},
          left: { xs: "34%", md:"29%"},
          zIndex: 4,
        }}
      />
      <Box
        component="img"
        src={ball1}
        alt="ball1"
        sx={{
          position: "absolute",
          width: { xs: "80%", md:"45%"},
          top: { xs: "23%", md:"66%"},
          left: { xs: "23%", md:"57%"},
        }}
      />
      <Box
        component="img"
        src={ball2}
        alt="ball2"
        sx={{
          position: "absolute",
          width: { xs: "50%", md:"32%"},
          top: "-7%",
          left: "0%",
        }}
      />
      <Box
        component="img"
        src={rotafacil}
        alt="Rota Fácil"
        sx={{
          position: "absolute",
          width: { xs: "0%", md:"25%"},
          top: "5%",
          left: "38%",
          zIndex: 5,
        }}
      />
      <Box
        component="img"
        src={rotafacil2}
        alt="Rota Fácil"
        sx={{
          position: "absolute",
          width: { xs: "50%", md:"0%"},
          top: "5%",
          left: "26%",
          zIndex: 5,
        }}
      />
      <Typography
        variant="body2"
        sx={{
          position: "absolute",
          top: { xs: "84%", md:"93%"},
          left: { xs: "11%", md:"24%"},
          width: { xs: "75%", md:"60%"},
          color: "white",
          fontSize: { xs: "1rem", md:"0.9rem"},
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
