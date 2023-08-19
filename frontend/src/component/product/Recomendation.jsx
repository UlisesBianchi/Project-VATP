import { Box, Typography, Button } from "@mui/material";
import CardProduct from "./CardProducts";
import { useContext, useState, useEffect } from "react";
import { ContextGlobal } from "../utils/globalContext";

const Recomendation = () => {
  const { obj } = useContext(ContextGlobal);

  const [showCount, setShowCount] = useState(10); // Inicialmente muestras 10 productos
  const productsPerPage = 10;
  const [shuffledProducts, setShuffledProducts] = useState([]); // Estado para almacenar la lista de productos aleatorios

  useEffect(() => {
    const shuffled = [...obj.product];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledProducts(shuffled);
  }, [obj.product]); // Generar la lista aleatoria cuando cambie la lista original

  const handleShowMore = () => {
    setShowCount(showCount + productsPerPage);
  };

  const displayedProducts = shuffledProducts.slice(0, showCount);

  return (
    <Box sx={{ marginTop: "3vh", background: "#E9EEFC", paddingBottom: "10vh" }}>
      <Typography color="primary" variant="h5" sx={{ marginLeft: "2vw", paddingTop: "5vh" }}>
        Productos recomendados
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignItems: "center" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xl: "repeat(2 ,1fr)", xs: "repeat(1 ,1fr)" }, gap: '3rem', marginTop: '2rem', columnGap: "3rem" }}>
          {displayedProducts.map((data) => (
            <CardProduct data={data} key={data.id} />
          ))}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "2rem" }}>
          <Button onClick={handleShowMore} disabled={showCount >= shuffledProducts.length}>
            Mostrar más
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Recomendation;
