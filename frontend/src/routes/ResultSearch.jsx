import React, { useEffect, useState } from "react";
import CardProducts from "../component/product/CardProducts";
import { useLocation, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import axios from "axios";

const ResultSearch = () => {
  const location = useLocation();
  const { productoId, fecha } = useParams();

  const [search, setSearch] = useState([]);

  useEffect(() => {
    if (fecha !== undefined && productoId !== undefined) {
      const url = `http://localhost:8082/disponibilidad/por-fechaProducto/${fecha}?productoId=${productoId}`;
      axios
        .get(url)
        .then((res) => {
          const searchData = res.data;
          setSearch(searchData);
        })
        .catch((error) => {
          console.error("Error al obtener productos por fecha y ID:", error);
        });
    } else if (fecha !== undefined) {
      const url = `http://localhost:8082/disponibilidad/por-fechaStock/${fecha}`;
      axios
        .get(url)
        .then((response) => {
          console.log(response.data);
          setSearch(response.data); // Actualiza el estado con los resultados
        })
        .catch((error) => {
          console.error("Error al obtener productos por fecha:", error);
        });
    } else if (productoId !== undefined) {
      const url = `http://localhost:8082/disponibilidad/por-fechaProducto/${productoId}`;
      axios
        .get(url)
        .then((response) => {
          console.log(response.data);
          setSearch(response.data); // Actualiza el estado con los resultados
        })
        .catch((error) => {
          console.error("Error al obtener productos por ID:", error);
        });
    }
  }, [productoId, fecha]); // Utiliza productoId y fecha como dependencias
  

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
      {search.map((result) => (
        <CardProducts key={result.id} product={result} />
      ))}
    </Box>
  );
};

export default ResultSearch;
