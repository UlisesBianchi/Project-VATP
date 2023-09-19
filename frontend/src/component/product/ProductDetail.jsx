import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ImageGallery from "./ImageGallery";
import FeatureList from "./FeatureList";
import Politicas from "./Politicas";
import Description from "./Description";
import Search from "../Search";
import Calendario from "./Calendario";

import {
  Box,
  Typography,
  Toolbar,
  IconButton,
  Container,
  Paper,
} from "@mui/material";
import ShareButton from "./SharedButton";

const ProductDetail = () => {
  // const { obj } = useContext(ContextGlobal);
  const { id } = useParams();
  const [detail, setDetail] = useState("");
  const [imagesArray, setImagesArray] = useState([]);
  const [caracteristica, setCaracteristicas] = useState([]);
  const url = `http://18.191.210.53:8082/productos/${id}`;
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // Navega hacia atrÃ¡s en la pila de rutas
  };

  useEffect(() => {
    axios.get(url).then((res) => {
      const detailData = res.data;
      setDetail(detailData);
      setImagesArray(detailData.images);
      setCaracteristicas(detailData.detalles);
    });
  }, []);

  return (
    <>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "25",
          marginTop: "0.5rem",
          // backgroundColor: "primary.main", // Set the background color to primary color
          // color: "primary.contrastText", // Set the text color for contrast
        }}
      >
        <Typography variant="h4" color="primary" marginLeft={"10rem"}>
          {detail.nombre}
        </Typography>
        <IconButton onClick={handleGoBack}>
          <ArrowBackRoundedIcon
            style={{
              color: "#E23333",
              fontSize: "2.5rem",
              paddingRight: "10rem",
            }}
          />
        </IconButton>
      </Toolbar>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "end",
          marginRight: "10rem",
          // backgroundColor: "primary.main", // Set the background color to primary color
          // color: "primary.contrastText", // Set the text color for contrast
        }}
      >
        <ShareButton />
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
            {/* <Typography variant="h4">{detail.nombre}</Typography>
            <Typography variant="body1">{detail.descripcion}</Typography>
            <Typography variant="body1">{detail.precio}</Typography> */}
            <ImageGallery images={imagesArray} />
          </Paper>
        </Box>
      </Container>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: { xs: "column", l: "row", xl: "row" },
          margin: { xs: "10rem" },
        }}
      >
        <Box sx={{ width: "75vw" }}>
          <Description descripcion={detail.descripcion} />
          <FeatureList caracteristica={caracteristica} />
          <Politicas />
        </Box>
        <Box
          sx={{
            justifyContent: "space-around",
            width: "20vw",
            marginLeft: "2rem",
          }}
        >
          {/* <Search /> */}
          <Calendario />
        </Box>
      </Container>
    </>
  );
};

export default ProductDetail;