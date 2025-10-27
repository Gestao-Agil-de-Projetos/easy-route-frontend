import React, { useState } from "react";
import { Box, Grid, TextField, Button, Paper } from "@mui/material";

const TripRegisterForm = ({ onAddTrip }) => {
  const [form, setForm] = useState({
    origin: "",
    destination: "",
    vehicle: "",
    seats: "",
    time: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTrip({
      ...form,
      id: Date.now(),
      filled: 0,
      status: "ABERTA",
      departureIn: "Recebendo Reservas",
    });
    setForm({ origin: "", destination: "", vehicle: "", seats: "", time: "" });
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Saindo de"
              name="origin"
              fullWidth
              value={form.origin}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Indo para"
              name="destination"
              fullWidth
              value={form.destination}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <TextField
              label="Veículo"
              name="vehicle"
              fullWidth
              value={form.vehicle}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <TextField
              label="Vagas"
              name="seats"
              type="number"
              fullWidth
              value={form.seats}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <TextField
              label="Horário"
              name="time"
              type="time"
              fullWidth
              value={form.time}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                height: "100%",
                bgcolor: "#0b8457",
                "&:hover": { bgcolor: "#097b4d" },
              }}
            >
              Registrar Viagem
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default TripRegisterForm;
