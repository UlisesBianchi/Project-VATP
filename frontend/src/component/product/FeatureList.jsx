import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Icon } from "@mui/material";
import AirIcon from "@mui/icons-material/Air";
import Wifi2BarIcon from '@mui/icons-material/Wifi2Bar';
import PetsIcon from '@mui/icons-material/Pets';

const FeatureList = () => {
  const features = [
    {
      title: "Aire acondicionado",
      icon: <AirIcon/>,
    },
    {
      title: "Wifi",
      icon: <Wifi2BarIcon/>,
    },
    {
      title: "Pet friendy",
      icon: <PetsIcon/>,
    },
    // ... más características
  ];

  return (
    <Grid container spacing={2}>
      {features.map((feature, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6">{feature.title}</Typography>
            <Icon>
              {feature.icon}
            </Icon>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeatureList;