import React from 'react';
import { Container, Typography, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Faqs = () => {
  const faqs = [
    {
      question: '¿Cómo puedo reservar un tour gastronómico?',
      answer: 'Puedes reservar un tour gastronómico haciendo clic en el botón "Reservar" en la página del tour que te interese. Luego, sigue las instrucciones para completar tu reserva.'
    },
    {
      question: '¿Cuáles son las opciones de pago?',
      answer: 'Aceptamos tarjetas de crédito y débito principales, así como PayPal. Puedes seleccionar tu método de pago durante el proceso de reserva.'
    },
    {
      question: '¿Cuál es la política de cancelación?',
      answer: 'Nuestra política de cancelación varía según el tour. Consulta la página de detalles del tour en nuestro sitio web para obtener información específica sobre la política de cancelación de ese tour.'
    },
    {
      question: '¿Qué debo llevar en un tour gastronómico?',
      answer: 'Te recomendamos llevar ropa y calzado cómodos, así como un apetito listo para probar deliciosas comidas. También es una buena idea llevar una botella de agua y una cámara para capturar los momentos especiales.'
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Preguntas Frecuentes
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}a-content`}
              id={`panel${index + 1}a-header`}
            >
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </Container>
  );
}

export default Faqs;