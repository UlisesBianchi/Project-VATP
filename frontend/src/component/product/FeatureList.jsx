import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const FeatureList = () => {
  const features = [
    {
      title: "Característica 1",
      description: "Descripción de la característica 1.",
    },
    {
      title: "Característica 2",
      description: "Descripción de la característica 2.",
    },
    {
      title: "Característica 3",
      description: "Descripción de la característica 3.",
    },
    // ... más características
  ];

  return (
    <Grid container spacing={2}>
      {features.map((feature, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6">{feature.title}</Typography>
            <Typography variant="body1">{feature.description}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeatureList;
