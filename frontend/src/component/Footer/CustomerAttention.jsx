import React from "react";
import { Container, Typography, Paper, Grid, Button } from "@mui/material";

const CustomerAttention = () => {
  const handleInquiryClick = () => {
    // Aquí puedes agregar el código para manejar la consulta del cliente
    // Por ejemplo, puedes mostrar un mensaje de éxito o realizar cualquier otra acción que prefieras.
    alert("¡Gracias por tu consulta!");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Atención al Cliente
        </Typography>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="body1">
              ¿Tienes alguna pregunta o necesitas asistencia? Estamos aquí para
              ayudarte.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Puedes contactarnos a través de correo electrónico en{" "}
              <strong>unviajeatupaladar@gmail.com</strong> o llamarnos al{" "}
              <strong>+123456789</strong>.
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={6}></Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CustomerAttention;
