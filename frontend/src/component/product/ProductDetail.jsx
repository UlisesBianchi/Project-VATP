import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ImageGallery from "./ImageGallery";
import FeatureList from "./FeatureList";
import Policity from "./Policity"

import {
  Box,
  Typography,
  Toolbar,
  IconButton,
  Container,
  Paper,
  Grid,
  Icon,
} from "@mui/material";

const ProductDetail = () => {
  // const { obj } = useContext(ContextGlobal);
  const { id } = useParams();
  const [detail, setDetail] = useState("");
  const [imagesArray, setImagesArray] = useState([]);
  const [caracteristica, setCaracteristicas] = useState([]);
  const url = `http://18.191.210.53:8082/productos/${id}`;
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // Navega hacia atrás en la pila de rutas
  };

  console.log(detail);

  useEffect(() => {
    axios.get(url).then((res) => {
      const detailData = res.data;
      setDetail(detailData);
      setImagesArray(detailData.images);
      setCaracteristicas(detailData.detalles);
    });
  }, []);

  // console.log(imagesArray);

  return (
    <>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "25",
          backgroundColor: "primary.main", // Set the background color to primary color
          color: "primary.contrastText", // Set the text color for contrast
        }}
      >
        <Typography variant="h4" color="white">
          {detail.nombre}
        </Typography>
        <IconButton onClick={handleGoBack}>
          <ArrowBackRoundedIcon style={{ color: "white" }} />
        </IconButton>
      </Toolbar>

      <Container maxWidth="md" style={{ width: "100vw" }}>
        <Box
          display="flex"
          justifyContent="center"
          minHeight="50vh"
          borderRadius="10px"
          border="1px solid #ccc"
          overflow="hidden"
          margin="2rem"
        >
          <Paper
            elevation={3}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              width: "100vw",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <img
                  src={imagesArray[0]}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    marginBottom: "2rem",
                    borderRadius: "10px",
                  }}
                />
                <Grid>
                  <Typography variant="h4">Descripción</Typography>
                  <Typography variant="body1">{detail.descripcion}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4">{detail.nombre}</Typography>
                <Typography variant="h5">$ {detail.precio}</Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Icon>
                    <LocationOnIcon />
                  </Icon>
                  <Typography variant="h5" style={{ marginLeft: "0.5rem" }}>
                    Ubicación
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
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
          Imagenes
        </Typography>
      </Toolbar>
      <ImageGallery images={imagesArray} />
      {/* <Toolbar sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          sx={{
            width: "10rem", // Ajusta el ancho según tus necesidades
            minWidth: "auto", // Para que sea cuadrado
            borderRadius: "10px", // Estilo de esquinas redondeadas
          }}
        >
          <Link to ={'/gallery'}
          >
            <Typography
              sx={{
                color: "white",
              }}
            >
              Ver más
            </Typography>
          </Link>
        </Button>
      </Toolbar> */}
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
          Caracteristicas
        </Typography>
      </Toolbar>
      <Box>
        <FeatureList caracteristica={caracteristica} />
      </Box>
      <Policity/>
    </>
  );
};

export default ProductDetail;
