import React, { useState } from "react";
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import InputField from "../../atoms/InputField/InputField.jsx";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <Box sx={{ width: "100%", maxWidth: 400 }}>
      <Typography
        variant="h4"
        sx={{ color: "#111827", fontWeight: 700, mb: 2 }}
      >
        Bem-vindo de volta!
      </Typography>

      <Typography
        sx={{
          color: "#6B7280",
          fontSize: "1rem",
          mb: 4,
        }}
      >
        Não tem uma conta?{" "}
        <Link href="#" sx={{ color: "#2563EB", fontWeight: 600 }}>
          Cadastre-se
        </Link>
      </Typography>

      <InputField
        label="Email"
        type="email"
        placeholder="Escreva seu email completo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputField
        label="Senha"
        type="password"
        placeholder="Digite sua senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 2,
          height: 52,
          fontWeight: 600,
          fontSize: 18,
          background: "linear-gradient(90deg, #2563EB, #3B82F6)",
          "&:hover": { opacity: 0.9 },
        }}
      >
        Entrar
      </Button>
    </Box>
  );
}
