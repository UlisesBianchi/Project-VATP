import React from 'react';
import { Box, Grid, ImageList, ImageListItem } from '@mui/material';

const ImageGallery = ({ images }) => {
  const mainImage = images[0]; // La primera imagen se considera la imagen principal
  const otherImages = images.slice(1, 5); // Las siguientes 4 imágenes

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Box display="flex" alignItems="center" justifyContent="center" height="100%">
          <img
            src={mainImage.url}
            alt={mainImage.alt}
            style={{ maxWidth: '100%', height: '95%', borderRadius: '10px', marginTop: "10px" }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <ImageList sx={{ width: '100%', height: '100%' }} cols={2} rowHeight={220}>
          {otherImages.map((item) => (
            <ImageListItem key={item.url}>
              <img
                src={`${item.url}?w=220&h=220&fit=crop&auto=format`}
                srcSet={`${item.url}?w=220&h=220&fit=crop&auto=format&dpr=2 2x`}
                // alt={item.nombre}
                loading="lazy"
                style={{ borderRadius: '10px' }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
    </Grid>
  );
};

export default ImageGallery;
