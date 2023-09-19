import { Paper, Container, Typography } from "@mui/material";
import React from "react";

const AboutUs = () => {
  return (
    <div>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Sobre Nosotros - Un Viaje al Paladar
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Bienvenido a Un Viaje al Paladar, tu compañero en la exploración de
            los sabores del mundo. Desde [año de fundación], hemos estado
            dedicados a compartir la autenticidad y riqueza de la cocina local e
            internacional con entusiasmo y pasión.
          </Typography>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Nuestra Misión
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            En Un Viaje al Paladar, creemos en la importancia de conectar a las
            personas a través de la comida. Nuestra misión es proporcionar
            experiencias gastronómicas excepcionales que no solo satisfagan el
            paladar, sino que también enriquezcan el alma y fomenten la
            comprensión cultural.
          </Typography>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Nuestro Equipo
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Nuestro equipo está compuesto por apasionados expertos culinarios y
            amantes de la comida que comparten una visión común: brindar
            experiencias culinarias memorables. Juntos, trabajamos
            incansablemente para diseñar y llevar a cabo tours gastronómicos que
            te transporten a un viaje de descubrimiento gastronómico.
          </Typography>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Contáctanos
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Estamos ansiosos por compartir esta experiencia culinaria contigo.
            Si tienes preguntas, comentarios o simplemente deseas obtener más
            información sobre nuestros tours, no dudes en contactarnos. Estamos
            disponibles en [correo electrónico] y [número de teléfono].
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default AboutUs;