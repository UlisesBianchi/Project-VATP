import React, { useContext, useState, useEffect } from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import CardProduct from "./CardProducts";
import { ContextGlobal } from "../utils/globalContext";
import Filter from "../category/Filter";

const Recomendation = () => {
  const { obj } = useContext(ContextGlobal);
  const isSmallScreen = useMediaQuery("(max-width: 1160px)");
  const isSmallScreen3 = useMediaQuery("(max-width: 320px)");

  const [showCount, setShowCount] = useState(10);
  const productsPerPage = 10;
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    const shuffled = [...obj.product];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledProducts(shuffled);
  }, [obj.product]);

  const handleShowMore = () => {
    setShowCount(showCount + productsPerPage);
  };

  const displayedProducts = shuffledProducts
    .filter(
      (data) =>
        selectedCategoryId === null || data.categoryId === selectedCategoryId
    )
    .slice(0, showCount);

  return (
    <Box
      sx={{
        marginTop: "3vh",
        background: "#E9EEFC",
        paddingBottom: "10vh",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Typography
        color="primary"
        variant="h5"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: isSmallScreen3 ? "1.1rem" : "1.8rem",
          flexWrap: "nowrap",
          overflow: "hidden",
          paddingTop: "5vh",
          "@media (max-width: 356px)": {
            fontSize: "1.1rem",
            fontWeight: "bold",
          },
        }}
      >
        Productos recomendados
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          overflowX: "hidden",
        }}
      >
        <Filter
          category={obj.category}
          onSelectCategory={setSelectedCategoryId}
        />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: isSmallScreen
              ? "repeat(1, 1fr)"
              : "repeat(2, 1fr)",
            gap: { xl: "5rem 20rem", xs: "5rem 5rem" },
            minWidth: "10%",
            maxWidth: "100%",
            marginTop: "2rem",
          }}
        >
          {displayedProducts.map((data) => (
            <CardProduct data={data} key={data.id} />
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "2rem",
          }}
        >
          <Button
            onClick={handleShowMore}
            disabled={showCount >= shuffledProducts.length}
          >
            Mostrar más
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Recomendation;
