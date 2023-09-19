import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Description = ({ descripcion }) => {
  return (
    <Accordion sx={{marginBottom: '2rem'}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h4" color="primary">Descripción</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {descripcion}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default Description;