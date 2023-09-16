import React from "react";
import CardProducts from "../component/product/CardProducts";
import { useLocation } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";

const Results = () => {


  // Obtén los resultados de la búsqueda de la ubicación
  const location = useLocation();
  
  const searchResults = location.state ? location.state.searchResults : [];
  console.log(searchResults);

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

export default Results;