import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const TermsAndConditions = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Términos y Condiciones
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          A continuación se detallan los términos y condiciones de uso de los servicios proporcionados por Un Viaje al Paladar:
        </Typography>
        <Typography variant="h5" sx={{ mb: 1 }}>
          1. Aceptación de los Términos
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Al acceder y utilizar nuestros servicios, usted acepta estar sujeto a estos términos y condiciones. Si no está de acuerdo con alguno de estos términos, le recomendamos que no utilice nuestros servicios.
        </Typography>
        <Typography variant="h5" sx={{ mb: 1 }}>
          2. Uso Apropiado
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Usted se compromete a utilizar nuestros servicios de manera apropiada y de acuerdo con las leyes y regulaciones aplicables.
        </Typography>
        <Typography variant="h5" sx={{ mb: 1 }}>
          3. Cambios en los Términos
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigencia inmediatamente después de su publicación en nuestro sitio web.
        </Typography>
        <Typography variant="h5" sx={{ mb: 1 }}>
          4. Privacidad
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Su privacidad es importante para nosotros. Consulte nuestra política de privacidad para obtener más información sobre cómo manejamos sus datos personales.
        </Typography>
      </Paper>
    </Container>
  );
}

export default TermsAndConditions;