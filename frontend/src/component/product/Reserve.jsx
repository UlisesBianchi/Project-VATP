import React, { useState } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';

function Reserve() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    fecha: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de enviar la reserva
    console.log('Formulario enviado:', formData);
  };

  return (
    <Container maxWidth="sm" sx={{marginTop:'2rem'}}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre"
              variant="outlined"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Correo"
              variant="outlined"
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Fecha de reserva"
              variant="outlined"
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Enviar Reserva
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Reserve;