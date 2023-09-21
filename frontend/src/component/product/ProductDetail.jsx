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
import Rating from "./Rating";
;

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

  useEffect(() => {
    axios.get(url).then((res) => {
      const detailData = res.data;
      setDetail(detailData);
      setImagesArray(detailData.images);
      setCaracteristicas(detailData.caracteristicasProductos);
    });
  }, []);

  // console.log(detail.caracteristicasProductos);

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
                color: "primary.main", // Set the text color for contrast
              }}
            >
              <ShareButton />
              <Rating />
            </Toolbar>

      <ImageGallery images={imagesArray} />
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
          <FeatureList />
          <Politicas />
        </Box>
        <Box
          sx={{
            justifyContent: "space-around",
            width: "20vw",
            marginLeft: "2rem",
          }}
        >
          <Calendario />
        </Box>
      </Container>
    </>
  );
};

export default ProductDetail;