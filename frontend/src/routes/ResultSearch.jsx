import React, { useEffect, useState } from "react";
import CardProducts from "../component/product/CardProducts";
import { useLocation } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";

const ResultSearch = () => {
  const location = useLocation();
  const searchResults = location.state ? location.state.searchResults : [];
  const selectedDate = location.state ? location.state.selectedDate : null;

  const url = selectedDate
    ? `http://18.191.210.53:8082/disponibilidad/por-fechaStock/${selectedDate}`
    : "";

  // Realiza la solicitud HTTP con esta URL y muestra los resultados

  return (
    <Box
      sx={{
        display:"flex",
        marginTop:"10vh",
        marginBottom:"20vh",
        gap:"5vw",
        alignItems:"center",
        justifyContent:"space-evenly",
      }}
    >
      {searchResults.map((result) => (
        <CardProducts key={result.id} product={result} />
      ))}
    </Box>
  );
};

export default ResultSearch;
