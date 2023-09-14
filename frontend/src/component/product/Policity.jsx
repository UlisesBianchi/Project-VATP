import { Box, Paper, Toolbar,Typography } from '@mui/material'

const Policity = () => {
  return (
    <div>
              <Toolbar
        sx={{
          display: "flex",
          justifyContent: "start",
          padding: "25",
          backgroundColor: "primary.main", // Set the background color to primary color
          color: "primary.contrastText", // Set the text color for contrast
        }}
      >
        <Typography variant="h4" color="white">
          Politicas
        </Typography>
      </Toolbar>
      <Paper elevation={3}>
      <Box p={3}>
        <Typography paragraph>
          En "Un Viaje a Tu Paladar", nos esforzamos por ofrecer experiencias gastronómicas excepcionales a nuestros clientes. Sin embargo, entendemos que en ocasiones pueden surgir circunstancias que requieran una devolución o cancelación. A continuación, detallamos nuestras políticas de devolución:
        </Typography>
        <Typography variant="h6" gutterBottom>
          1. Cancelación de Reservas
        </Typography>
        <Typography paragraph>
          - Si necesitas cancelar tu reserva para una experiencia gastronómica, te pedimos que lo hagas con al menos 48 horas de anticipación. En caso de cancelación dentro de este plazo, te ofreceremos un reembolso completo.
          - Si cancelas con menos de 48 horas de anticipación, lamentablemente no podremos ofrecer un reembolso, pero estaremos encantados de ayudarte a reprogramar tu experiencia en una fecha futura, sujeta a disponibilidad.
        </Typography>
        <Typography variant="h6" gutterBottom>
          2. Experiencias Canceladas por "Un Viaje a Tu Paladar"
        </Typography>
        <Typography paragraph>
          - En el raro caso de que debamos cancelar una experiencia gastronómica debido a circunstancias imprevistas, te ofreceremos la opción de reprogramar la experiencia en una fecha conveniente para ti o un reembolso completo.
        </Typography>
        <Typography variant="h6" gutterBottom>
          3. Experiencias Modificadas
        </Typography>
        <Typography paragraph>
          - Si una experiencia gastronómica se modifica significativamente por razones fuera de nuestro control, te informaremos con la mayor anticipación posible y te daremos la opción de reprogramar o recibir un reembolso completo.
        </Typography>
        <Typography variant="h6" gutterBottom>
          4. Productos y Regalos
        </Typography>
        <Typography paragraph>
          - Los productos y regalos vendidos a través de nuestro sitio web pueden estar sujetos a políticas de devolución específicas. Te recomendamos revisar las políticas de devolución en la página de producto correspondiente antes de realizar una compra.
        </Typography>
        <Typography variant="h6" gutterBottom>
          5. Reclamaciones y Problemas
        </Typography>
        <Typography paragraph>
          - Si experimentas problemas con tu experiencia gastronómica o algún producto que hayas adquirido, te pedimos que nos contactes de inmediato para que podamos resolver la situación de manera satisfactoria.
        </Typography>
      </Box>
    </Paper>
    </div>
  )
}

export default Policity