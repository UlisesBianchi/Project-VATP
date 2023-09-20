import React, { useState } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';
import ConfirmacionReserva from './ConfirmacionReserva';


function Reserve() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialDate = searchParams.get('date') || '';
  const productId = searchParams.get('productId') || '';
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    fecha: initialDate,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataWithProductId = {
      ...formData,
      productId: productId // Agregar el productId al formData
    };
    try {
      const response = await axios.post('http://18.191.210.53:8082/reservas/realizar', formDataWithProductId);

      if (response.status === 200) {
        alert('Reserva creada con éxito');
        
        navigate('/otra-pagina');
      } else {
        throw new Error('Error al crear la reserva');
      }
    } catch (error) {
      console.error(error);
      alert('Error al crear la reserva');
    }
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
              value={dayjs(formData.fecha).format('YYYY-MM-DD')}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <input type='hidden' name='productId' value={productId}/>
            <Button type={handleSubmit} variant="contained" color="primary">
              Enviar Reserva
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Reserve;  