import { Box, Typography } from '@mui/material';
import React from 'react';

const ConfirmacionReserva = ({ nombre, correo, fecha }) => {
  return (
    <Box>
      <Typography>¡Reserva creada con éxito!</Typography>
      <Typography>Detalles de la reserva:</Typography>
      
        <Typography>Nombre: {nombre}</Typography>
        <Typography>Correo: {correo}</Typography>
        <Typography>Fecha de reserva: {fecha}</Typography>
    
    </Box>
  );
}

export default ConfirmacionReserva;