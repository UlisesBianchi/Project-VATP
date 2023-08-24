import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Toolbar,
  IconButton,
  Container,
  Paper,
  Grid,
  Icon,
  Button,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ImageGallery from "./ImageGallery";
import FeatureList from "./FeatureList";

const ProductDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState("");
  const url = `http://18.191.210.53:8082/productos/${id}`;

  useEffect(() => {
    axios.get(url).then((res) => {
      const detailData = res.data;
      setDetail(detailData);

      // Crear un array de las imageUrl
      const images = detailData.map((item) => item.image);
      console.log(images);
    });
  }, [id]);

  console.log(detail);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navega hacia atrás en la pila de rutas
  };

  const images = [
    {
      url: "https://www.infobae.com/new-resizer/CYS7pt2Pm365KmNrgjN7dCEbSzI=/992x661/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/08/13201409/gastronomia-del-mundo-3.jpg",
      alt: "Imagen 1",
    },
    {
      url: "https://www.mdzol.com/u/fotografias/m/2021/9/13/f608x342-1108566_1138289_126.jpg",
      alt: "Imagen 2",
    },
    {
      url: "https://www.nomadasexperience.com/wp-content/uploads/2023/03/Los-25-Mejores-restaurantes-de-comidas-rapidas-en-Estados-Unidos.jpg",
      alt: "Imagen 3",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF_VYD1ExzdAxkJvt7n_IgVe-rJfMrvwGTvw&usqp=CAU",
      alt: "Imagen 4",
    },
    {
      url: "https://www.recetasnestle.com.ar/sites/default/files/styles/crop_article_banner_desktop_nes/public/2022-06/ingredientes-comida-de-mar-parrilla.jpg?itok=DBjT8e7S",
      alt: "Imagen 5",
    },
  ];

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
                  src={images[0].url}
                  alt={images[0].alt}
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
          justifyContent: "center",
          padding: "25",
          backgroundColor: "primary.main", // Set the background color to primary color
          color: "primary.contrastText", // Set the text color for contrast
        }}
      >
        <Typography variant="h4" color="white">
          Imagenes
        </Typography>
      </Toolbar>
      <ImageGallery images={images} />
      <Toolbar sx={{ display: "flex", justifyContent: "end" }}>
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
          <Link
          sx= {{
            textDecoration: "none",
          }}>
            <Typography
              sx={{
                color: "white",
              }}
            >
              Ver más
            </Typography>
          </Link>
        </Button>
      </Toolbar>
      <Toolbar>
        <Typography variant="h4" color="primary">
          Caracteristicas
        </Typography>
      </Toolbar>
      <Box>
        <FeatureList />
      </Box>
    </>
  );
};

export default ProductDetail;
