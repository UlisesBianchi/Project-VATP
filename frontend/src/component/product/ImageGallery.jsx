import { useState } from 'react';
import { Box, Button, Grid, ImageList, ImageListItem, Typography, Toolbar, Modal } from "@mui/material";


const ImageGallery = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // Estado para el índice de la imagen seleccionada
  const [openModal, setOpenModal] = useState(false); // Estado para saber si el modal está abierto

  const handleOpenModal = (index) => {
    setSelectedImageIndex(index);
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
    setOpenModal(false);
  }

  const allImages = [images[0], ...images.slice(1, 5)]; // Arreglo de todas las imágenes

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <img
            src={images[0]}
            style={{
              maxWidth: "100%",
              height: "95%",
              borderRadius: "10px",
              marginTop: "10px",
            }}
            onClick={() => handleOpenModal(0)} // Abrir modal con mainImage al hacer clic
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <ImageList
          sx={{
            width: "100%",
            height: "100%",
            "@media (min-width: 768px)": {
              width: "50%",
            },
          }}
          cols={2}
          rowHeight={220}
        >
          {images.slice(1, 5).map((item, index) => (
            <ImageListItem key={index}>
              <img
                src={`${item}?w=220&h=220&fit=crop&auto=format`}
                srcSet={`${item}?w=220&h=220&fit=crop&auto=format&dpr=2 2x`}
                loading="lazy"
                style={{ borderRadius: "10px", cursor: "pointer" }}
                onClick={() => handleOpenModal(index + 1)} // Abrir modal con otras imágenes al hacer clic
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
      <Toolbar sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          sx={{
            width: "10rem",
            minWidth: "auto",
            borderRadius: "10px",
          }}
          onClick={() => handleOpenModal(0)} // Abrir modal con mainImage al hacer clic
        >
          <Typography
            sx={{
              color: "white",
            }}
          >
            Ver más
          </Typography>
        </Button>
      </Toolbar>

      {/* Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box>
          <img
            src={allImages[selectedImageIndex]}
            style={{
              maxWidth: "100%",
              maxHeight: "100vh",
              margin: "auto",
              display: "block",
            }}
          />
        </Box>
      </Modal>
    </Grid>
  );
};

export default ImageGallery;