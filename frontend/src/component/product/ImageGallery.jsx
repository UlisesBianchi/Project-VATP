import { useState } from 'react';
import { Box, Grid, ImageList, ImageListItem, Modal, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Rating from './Rating';

const ImageGallery = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (index) => {
    setSelectedImageIndex(index);
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
    setOpenModal(false);
  }

  const allImages = [images[0], ...images.slice(1, 5)];

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
              cursor: "pointer",
            }}
            onClick={() => handleOpenModal(0)}
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
                style={{
                  borderRadius: "10px",
                  cursor: "pointer",
                  width: "100%",
                }}
                onClick={() => handleOpenModal(index + 1)}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>

      <Modal open={openModal} onClose={handleCloseModal} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box>
          <IconButton onClick={handleCloseModal} sx={{ position: 'absolute', top: 150, right: 150, color: 'primary' }}>
            <CloseIcon />
          </IconButton>
          <img
            src={allImages[selectedImageIndex]}
            style={{
              maxWidth: "100vw",
              maxHeight: "75vh",
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