import { List, ListItem, ListItemText, Icon } from '@mui/material';
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
      title: 'Accesesibilidad',
      icon: <AccessibleIcon />
    }
    // ... más características
  ];

  return (
    <List style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      {features.map((feature, index) => (
        <ListItem key={index} style={{ marginRight: '8px' }}>
          <Icon style={{ marginRight: '4px' }}>{feature.icon}</Icon>
          <ListItemText primary={feature.title} />
        </ListItem>
      ))}
    </List>
  );
};

export default FeatureList;