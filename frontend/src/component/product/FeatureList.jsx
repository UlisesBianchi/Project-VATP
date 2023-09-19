import { Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, Icon, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Air as AirIcon, Wifi2Bar as Wifi2BarIcon, Pets as PetsIcon } from '@mui/icons-material';
import AccessibleIcon from '@mui/icons-material/Accessible';

const FeatureList = () => {
  const features = [
    {
      title: "Aire acondicionado",
      icon: <AirIcon />,
    },
    {
      title: "Wifi",
      icon: <Wifi2BarIcon />,
    },
    {
      title: "Pet friendly",
      icon: <PetsIcon />,
    },
    {
      title: 'Accesibilidad',
      icon: <AccessibleIcon />
    }
    // ... más características
  ];

  return (
    <Accordion sx={{marginBottom: '2rem'}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="features-content"
        id="features-header"
      >
        <Typography variant="h4" color="primary">Características</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List style={{ width: '100%' }}>
          {features.map((feature, index) => (
            <ListItem key={index}>
              <Icon style={{ marginRight: '4px' }}>{feature.icon}</Icon>
              <ListItemText primary={feature.title} />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default FeatureList;