import React, { useEffect, useState } from "react";
import CardProducts from "../component/product/CardProducts";
import { useLocation, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import axios from "axios";

const ResultSearchDate = () => {
  
  const { fecha } = useParams();
  const [search, setSearch] = useState([]);

  useEffect(() => {
    const url = `http://18.191.210.53:8082/disponibilidad/por-fecha/${fecha}`;
    axios
      .get(url)
      .then((res) => {
        const searchData = res.data;
        setSearch(searchData);
      })
      .catch((error) => {
        console.error("Error al obtener productos por fecha:", error);
      });
  }, [fecha]);

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

export default ResultSearchDate;
