import React, { useEffect } from "react";
import CardProducts from "../component/product/CardProducts";
import { useLocation, useParams } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import axios from "axios"; // Asegúrate de importar axios

const ResultSearch = () => {
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    if (params.fecha && params.productoId) {
      // Construye la URL con los parámetros y realiza la solicitud HTTP
      const url = `http://localhost:8082/disponibilidad/por-fechaProducto/${params.fecha}?productoId=${params.productoId}`;

      // Realiza la solicitud HTTP y muestra los resultados
      axios
        .get(url)
        .then((response) => {
          // Maneja la respuesta y muestra los resultados
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener productos por fecha y ID:", error);
        });
    } else if (params.fecha) {
      // Construye la URL con el parámetro de fecha y realiza la solicitud HTTP
      const url = `http://localhost:8082/disponibilidad/por-fechaStock/${params.fecha}`;
      axios
        .get(url)
        .then((response) => {
          // Maneja la respuesta y muestra los resultados
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener productos por fecha:", error);
        });
    } else if (params.productoId) {
      // Construye la URL con el parámetro de ID y realiza la solicitud HTTP
      const url = `http://localhost:8082/disponibilidad/por-fechaProducto/${params.productoId}`;
      axios
        .get(url)
        .then((response) => {
          // Maneja la respuesta y muestra los resultados
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener productos por ID:", error);
        });
    }
  }, [params]);

  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "10vh",
        marginBottom: "20vh",
        gap: "5vw",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      {searchResults.map((result) => (
        <CardProducts key={result.id} product={result} />
      ))}
    </Box>
  );
};

export default ResultSearch;
