import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardProducts from '../component/product/CardProducts';
import { Box } from '@mui/material';

const ResultSearchProduct = () => {
  const { productoId } = useParams();
  const [search, setSearch] = useState({}); 

  useEffect(() => {
    const url = `http://18.191.210.53:8082/productos/${productoId}`;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setSearch(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener productos por ID:", error);
      });
  }, [productoId]);

  console.log(search);

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
      {/* Renderizamos los resultados del objeto search */}
      {Object.keys(search).length > 0 ? (
        <CardProducts key={search.id} product={search} />
      ) : (
        <p>No se encontraron resultados</p>
      )}
    </Box>
  );
};

export default ResultSearchProduct;
