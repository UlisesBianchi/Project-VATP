import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ImageGallery = ({ images }) => {
  const mainImage = images[0]; // La primera imagen se considera la imagen principal
  const otherImages = images.slice(1, 5); // Las siguientes 4 imágenes

  return (
    <Box display="flex" width="100%">
      <Box flex="1" display="flex" alignItems="center" justifyContent="center">
        <img src={mainImage.url} alt={mainImage.alt} style={{ maxWidth: '100%', height: 'auto' }} />
      </Box>
      <Box flex="1" display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
        <Grid container spacing={2}>
          {otherImages.map((image, index) => (
            <Grid item key={index} xs={6}>
              <img src={image.url} alt={image.alt} style={{ maxWidth: '100%', height: 'auto' }} />
            </Grid>
          ))}
        </Grid>
        <Box textAlign="right">
          <Button color="primary">Ver Más</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ImageGallery;
