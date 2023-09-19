import React from 'react';
import { Container, Typography, Paper, TextField, Button } from '@mui/material';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar el código para manejar el envío del formulario
    // Por ejemplo, puedes enviar un correo electrónico o almacenar la información en una base de datos.
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Contáctanos
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Correo Electrónico"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Mensaje"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            required
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Enviar Mensaje
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Contact;