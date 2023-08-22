import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ImageGallery from "./ImageGallery";
import FeatureList from "./FeatureList";

const ProductDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState("");
  const url = `http://18.191.210.53:8082/productos/${id}`;

  useEffect(() => {
    axios.get(url).then((res) => setDetail(res.data));
  }, [id]);

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
      url: "https://www.infobae.com/new-resizer/CYS7pt2Pm365KmNrgjN7dCEbSzI=/992x661/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/08/13201409/gastronomia-del-mundo-3.jpg",
      alt: "Imagen 2",
    },
    {
      url: "https://www.infobae.com/new-resizer/CYS7pt2Pm365KmNrgjN7dCEbSzI=/992x661/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/08/13201409/gastronomia-del-mundo-3.jpg",
      alt: "Imagen 3",
    },
    {
      url: "https://www.infobae.com/new-resizer/CYS7pt2Pm365KmNrgjN7dCEbSzI=/992x661/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/08/13201409/gastronomia-del-mundo-3.jpg",
      alt: "Imagen 4",
    },
    {
      url: "https://www.infobae.com/new-resizer/CYS7pt2Pm365KmNrgjN7dCEbSzI=/992x661/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/08/13201409/gastronomia-del-mundo-3.jpg",
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
        }}
      >
        <Typography variant="h4" color="primary">
          {detail.nombre}
        </Typography>
        <IconButton onClick={handleGoBack} color="primary">
          <ArrowBackRoundedIcon />
        </IconButton>
      </Toolbar>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          padding: "10vw",
        }}
      >
        <Card sx={{ width: 500, height: 250 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="250"
              width="200"
              image={`${detail.imagenUrl}`}
              alt={`${detail.name}`}
            />
            <CardContent></CardContent>
          </CardActionArea>
        </Card>
        <Card
          sx={{
            width: 345,
            height: 250,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            ></Typography>
            <Typography variant="h5" component="div">
              {detail.nombre}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {detail.descripcion}
            </Typography>
            <Typography variant="body2">${detail.precio}</Typography>
          </CardContent>
        </Card>
      </Box>
      <Toolbar>
        <Typography variant="h4" color="primary">
          Imagenes
        </Typography>
      </Toolbar>
      <ImageGallery images={images} />
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
